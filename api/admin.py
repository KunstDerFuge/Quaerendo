from django.contrib import admin
from .models import Entity, Source, Claim, Evidence, EvidenceReview, Topic, ReviewInvitation

admin.site.register(Entity)
admin.site.register(Source)
admin.site.register(Claim)
admin.site.register(Evidence)
admin.site.register(EvidenceReview)
admin.site.register(Topic)
admin.site.register(ReviewInvitation)
