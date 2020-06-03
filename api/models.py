from django.conf import settings
from django.db import models

from users.models import User


class Entity(models.Model):
    name = models.CharField(max_length=100, unique=True)
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


class Source(models.Model):
    url = models.URLField(max_length=200, blank=True)
    title = models.CharField(max_length=250, blank=True)
    summary = models.TextField(blank=True)
    authors = models.ManyToManyField(Entity, related_name='sources_authored')
    date_retrieved = models.DateTimeField(auto_now_add=True)
    date_published = models.DateTimeField(null=True, blank=True)
    source_degree = models.CharField(choices=SourceDegree.choices, max_length=25, blank=True, null=True)

    def __str__(self):
        return 'Source: {} ({})'.format(self.summary[:30], self.url[:30])


class Topic(models.Model):
    name = models.CharField(max_length=100, unique=True)
    experts = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)

    def __str__(self):
        return self.name


class Claim(models.Model):
    source_of_claim = models.ForeignKey(Source, related_name='claims_cited_in', null=True, blank=True,
                                        on_delete=models.CASCADE)
    claim_text = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    evidence = models.ManyToManyField(Source, through='Evidence', blank=True)
    topic = models.ForeignKey(Topic, related_name='claims', on_delete=models.CASCADE, null=True, blank=True)
    submitted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, null=True, blank=True,
                                     related_name='claims_submitted')

    def __str__(self):
        truncated_claim = self.claim_text[:30].rstrip(' ')
        if len(self.claim_text) > 30:
            truncated_claim += '...'
        return 'Claim: "{}" ({})'.format(truncated_claim, self.source_of_claim.url[:30])


class Evidence(models.Model):
    claim = models.ForeignKey(Claim, related_name='related_evidence', on_delete=models.CASCADE)
    source_of_evidence = models.ForeignKey(Source, related_name='evidence_cited_in', on_delete=models.CASCADE)
    evidence_relationship = models.CharField(choices=EvidenceRelationship.choices, max_length=25)
    description = models.TextField(blank=True)
    submitted_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.DO_NOTHING, null=True, blank=True,
                                     related_name='evidence_submitted')

    def __str__(self):
        return 'Evidence {} {} | {}'.format(self.evidence_relationship, str(self.claim), str(self.source_of_evidence))


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
