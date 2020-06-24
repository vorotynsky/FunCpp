from django.db import models
from django.conf import settings


class Balance(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, blank=False, null=False, on_delete=models.DO_NOTHING)
    balance = models.DecimalField(max_digits=8, decimal_places=2)
