from django.contrib import admin
from .models import Entity, Source, Claim, Evidence

admin.site.register(Entity)
admin.site.register(Source)
admin.site.register(Claim)
admin.site.register(Evidence)
