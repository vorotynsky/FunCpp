from django.db import models


class Car(models.Model):
    id               = models.CharField(max_length=9, primary_key=True)
    model            = models.CharField(max_length=32)
    provider         = models.CharField(max_length=32)


class Owner(models.Model):
    first_name      = models.CharField(max_length=32)
    last_name       = models.CharField(max_length=48)
    birthday        = models.DateField()
    cars            = models.ManyToManyField(Car, through='Ownership')


class License(models.Model):
    TYPES = [('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D')]
    id              = models.AutoField(primary_key=True)
    type            = models.CharField(max_length=1, choices=TYPES)
    owner           = models.ForeignKey(Owner, on_delete=models.CASCADE)
    issue_date      = models.DateField()
    expiration_date = models.DateField(null=True)


class OwnerShip(models.Model):
    owner           = models.ForeignKey(Owner, on_delete=models.CASCADE)
    car             = models.ForeignKey(Car, on_delete=models.CASCADE)
    start           = models.DateField()
    finish          = models.DateField()
