from rest_framework import serializers
from .models import *


class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ['user', 'balance']
        read_only_fields = ['user', 'balance']
