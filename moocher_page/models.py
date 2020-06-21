from django.db import models
from django.conf import settings


class MoocherPage(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=False)
    name = models.CharField(max_length=48, unique=True, blank=False, null=False)
    bio = models.TextField(blank=False, null=False)
