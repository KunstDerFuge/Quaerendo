from django.db import models


class Entity(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)


class Source(models.Model):
    url = models.URLField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    associated_entities = models.ManyToManyField(Entity)
    date_retrieved = models.DateTimeField(auto_now_add=True)


class Claim(models.Model):
    source = models.ForeignKey(Source, related_name='related_claims', on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    evidence = models.ManyToManyField(Source, through='ClaimEvidence', blank=True)


class ClaimEvidence(models.Model):

    class EvidenceRelationship(models.TextChoices):
        PROVES = 'PROVES'
        SUPPORTS = 'SUPPORTS'
        DISPUTES = 'DISPUTES'
        DISPROVES = 'DISPROVES'

    claim = models.ForeignKey(Claim, related_name='evidence_claim', on_delete=models.CASCADE)
    source = models.ForeignKey(Source, related_name='evidence_source', on_delete=models.CASCADE)
    evidence_relationship = models.CharField(choices=EvidenceRelationship.choices, max_length=25)
    verified = models.BooleanField(default=False)
