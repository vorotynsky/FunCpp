from django.db import models
from django.conf import settings


class Balance(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, blank=False, null=False, on_delete=models.DO_NOTHING)
    balance = models.DecimalField(max_digits=8, decimal_places=2, default=0)


class Transaction(models.Model):
    TYPES = [
        ('D', 'Donation'),
        ('W', 'Withdraw'),
        ('P', 'Put')
    ]
    type = models.CharField(max_length=1, choices=TYPES)
    money = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    balance = models.ForeignKey(Balance, blank=False, null=False, on_delete=models.DO_NOTHING)
    time = models.DateTimeField(auto_now=True)
