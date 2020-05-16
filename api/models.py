from django.db import models


class Entity(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return 'Entity: {}'.format(self.name)


class Source(models.Model):
    url = models.URLField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    authors = models.ManyToManyField(Entity)
    date_retrieved = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return 'Source: {} ({})'.format(self.description[:30], self.url[:30])


class Claim(models.Model):
    source = models.ForeignKey(Source, related_name='source_of_claims', on_delete=models.CASCADE)
    claim_text = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    evidence = models.ManyToManyField(Source, through='Evidence', blank=True)

    def __str__(self):
        truncated_claim = self.claim_text[:30].rstrip(' ')
        if len(self.claim_text) > 30:
            truncated_claim += '...'
        return 'Claim: "{}" ({})'.format(truncated_claim, self.source.url[:30])


class Evidence(models.Model):

    class EvidenceRelationship(models.TextChoices):
        PROVES = 'PROVES'
        SUPPORTS = 'SUPPORTS'
        DISPUTES = 'DISPUTES'
        DISPROVES = 'DISPROVES'

    claim = models.ForeignKey(Claim, related_name='related_evidence', on_delete=models.CASCADE)
    source = models.ForeignKey(Source, related_name='cited_in_evidence', on_delete=models.CASCADE)
    evidence_relationship = models.CharField(choices=EvidenceRelationship.choices, max_length=25)
    description = models.TextField(blank=True)
    community_verified = models.BooleanField(default=False)
    expert_verified = models.BooleanField(default=False)

    def __str__(self):
        verified = 'Verified'
        if not self.community_verified and not self.expert_verified:
            verified = 'Unverified'
        return '{} evidence {} {} | {}'.format(verified, self.evidence_relationship, str(self.claim), str(self.source))
