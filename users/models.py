from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    bio = models.TextField(max_length=400, blank=True)
    num_contributions = models.IntegerField()
    is_trusted_contributor = models.BooleanField(default=False)
