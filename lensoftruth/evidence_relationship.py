from django.db import models


class EvidenceRelationship(models.TextChoices):
    PROVES = 'PROVES'
    SUPPORTS = 'SUPPORTS'
    UNRELATED = 'UNRELATED'
    INCONCLUSIVE = 'INCONCLUSIVE'
    DISPUTES = 'DISPUTES'
    DISPROVES = 'DISPROVES'
    SPLIT = 'SPLIT'
