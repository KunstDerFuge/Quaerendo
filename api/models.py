import math
from datetime import datetime, timedelta

import pytz
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models


class Entity(models.Model):
    name = models.CharField(max_length=100)
    short_bio = models.CharField(max_length=80, blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return 'Entity: {}'.format(self.name)


class SourceDegree(models.TextChoices):
    ORIGINAL_RESEARCH = 'ORIGINAL'
    PRIMARY = 'PRIMARY'
    SECONDARY = 'SECONDARY'
    TERTIARY = 'TERTIARY'


class EvidenceRelationship(models.TextChoices):
    PROVES = 'PROVES'
    SUPPORTS = 'SUPPORTS'
    UNRELATED = 'UNRELATED'
    INCONCLUSIVE = 'INCONCLUSIVE'
    DISPUTES = 'DISPUTES'
    DISPROVES = 'DISPROVES'
    SPLIT = 'SPLIT'


class TruthJudgement(models.TextChoices):
    TRUE = 'TRUE'
    LIKELY_TRUE = 'LIKELY_TRUE'
    SPLIT = 'SPLIT'
    LIKELY_FALSE = 'LIKELY_FALSE'
    FALSE = 'FALSE'


class Source(models.Model):
    url = models.URLField(max_length=200, blank=True)
    title = models.CharField(max_length=250, blank=True)
    summary = models.TextField(blank=True)
    authors = models.ManyToManyField(Entity, related_name='sources_authored')
    date_retrieved = models.DateTimeField(auto_now_add=True)
    date_published = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return 'Source: {} ({})'.format(self.summary[:30], self.url[:30])


class Topic(models.Model):
    name = models.CharField(max_length=100, unique=True)
    experts = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='expertise_topics', blank=True)

    def __str__(self):
        return self.name


class Claim(models.Model):
    source_of_claim = models.ForeignKey(Source, related_name='claims_cited_in', on_delete=models.CASCADE)
    claim_text = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    evidence = models.ManyToManyField(Source, through='Evidence', blank=True)
    topics = models.ManyToManyField(Topic, related_name='claims', blank=True)
    submitted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, null=True, blank=True,
                                     related_name='claims_submitted')

    class Meta:
        ordering = ['-id']

    def __str__(self):
        truncated_claim = self.claim_text[:30].rstrip(' ')
        if len(self.claim_text) > 30:
            truncated_claim += '...'
        return 'Claim: "{}" ({})'.format(truncated_claim, self.source_of_claim.url[:30])

    def get_truth_consensus(self, expert: bool) -> TruthJudgement or None:
        evidence: [Evidence] = self.related_evidence.all()
        evidence_consensuses = [piece.get_consensus(expert) for piece in evidence]
        no_info_consensuses = {None, EvidenceRelationship.INCONCLUSIVE, EvidenceRelationship.UNRELATED}
        num_consensuses = len([consensus for consensus in evidence_consensuses if consensus not in no_info_consensuses])
        if num_consensuses == 0:
            return None

        if EvidenceRelationship.PROVES in evidence_consensuses \
                and EvidenceRelationship.DISPROVES not in evidence_consensuses:
            return TruthJudgement.TRUE

        if EvidenceRelationship.DISPROVES in evidence_consensuses \
                and EvidenceRelationship.PROVES not in evidence_consensuses:
            return TruthJudgement.FALSE

        num_required_for_75_pct_consensus = math.ceil(num_consensuses * 0.75)
        supports_count = len([consensus for consensus in evidence_consensuses
                              if consensus == EvidenceRelationship.SUPPORTS])
        if supports_count >= num_required_for_75_pct_consensus:
            return TruthJudgement.LIKELY_TRUE

        disputes_count = len([consensus for consensus in evidence_consensuses
                              if consensus == EvidenceRelationship.DISPUTES])
        if disputes_count >= num_required_for_75_pct_consensus:
            return TruthJudgement.LIKELY_FALSE

        return TruthJudgement.SPLIT

    def get_experts(self) -> [get_user_model()]:
        return get_user_model().objects.filter(expertise_topics__in=self.topics.all()).distinct()


class Evidence(models.Model):
    claim = models.ForeignKey(Claim, related_name='related_evidence', on_delete=models.CASCADE)
    source_of_evidence = models.ForeignKey(Source, related_name='evidence_cited_in', on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    submitted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, null=True, blank=True,
                                     related_name='evidence_submitted')

    def __str__(self):
        return 'Evidence {} | {}'.format(str(self.claim), str(self.source_of_evidence))

    def save(self, *args, **kwargs):
        if not self.pk:  # If this object is being created, not updated:
            # Randomly select some users to invite to review this evidence.
            # TODO: Literally any logic that's better than this random selection
            from users.models import User
            invite_users = set(User.get_n_random_users(10))
            seven_days_from_now = datetime.now(pytz.utc) + timedelta(days=7)
            users_who_have_already_reviewed = [review.reviewer for review in self.reviews.all()]
            # Save this evidence so that we can create ReviewInvitations with this instance
            super().save(*args, **kwargs)
            for user in invite_users:
                if self.submitted_by == user or user in users_who_have_already_reviewed:
                    continue
                invitation = ReviewInvitation(evidence=self, user=user, expiration_date=seven_days_from_now)
                invitation.save()

        else:
            super().save(*args, **kwargs)

    def get_consensus(self, expert: bool) -> EvidenceRelationship or None:
        if self.claim.topics.count() == 0:
            return None
        topic_experts = self.claim.get_experts()
        if expert:
            reviews = self.reviews.filter(reviewer__in=topic_experts).all()
        else:
            reviews = self.reviews.exclude(reviewer__in=topic_experts).all()

        # If 80% of reviewers agree on an evidence relationship, return that. Otherwise, return 'SPLIT'.
        deduced_relationships_by_count = dict()
        num_reviews = len(reviews)
        num_required_for_80_pct_consensus = math.ceil(num_reviews * 0.8)
        if not reviews:
            return None
        for review in reviews:
            if review.deduced_evidence_relationship not in deduced_relationships_by_count:
                deduced_relationships_by_count[review.deduced_evidence_relationship] = 1
            else:
                deduced_relationships_by_count[review.deduced_evidence_relationship] += 1
        for relationship, count in deduced_relationships_by_count.items():
            if count >= num_required_for_80_pct_consensus:
                return relationship
        return EvidenceRelationship.SPLIT

    def get_num_reviews(self, expert: bool) -> int:
        if self.claim.topics.count() == 0:
            topic_experts = []
        else:
            topic_experts = self.claim.get_experts()
        if expert:
            reviews = self.reviews.filter(reviewer__in=topic_experts)
        else:
            reviews = self.reviews.exclude(reviewer__in=topic_experts)
        return reviews.count()


class ReviewInvitation(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='review_invitations')
    evidence = models.ForeignKey(Evidence, on_delete=models.CASCADE, related_name='review_invitations')
    expiration_date = models.DateTimeField()


class EvidenceReview(models.Model):
    evidence = models.ForeignKey(Evidence, on_delete=models.CASCADE, related_name='reviews')
    reviewer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='evidence_reviews')
    deduced_evidence_relationship = models.CharField(choices=EvidenceRelationship.choices, max_length=25)
    deduced_source_degree = models.CharField(choices=SourceDegree.choices, max_length=25)
    is_reliable = models.BooleanField()
    additional_comments = models.CharField(max_length=500, blank=True)


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    upvoters = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='upvoted_comments')
    downvoters = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='downvoted_comments')
    text = models.CharField(max_length=500)
    parent_comment = models.ForeignKey('self', blank=True, null=True, on_delete=models.CASCADE, related_name='replies')
    parent_evidence = models.ForeignKey(Evidence, blank=True, null=True, on_delete=models.CASCADE,
                                        related_name='comments')
    parent_evidence_review = models.ForeignKey(EvidenceReview, blank=True, null=True, on_delete=models.CASCADE,
                                               related_name='comments')
