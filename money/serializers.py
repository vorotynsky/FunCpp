from rest_framework import serializers
from .models import *


class BalanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Balance
        fields = ['user', 'balance']
        read_only_fields = ['user', 'balance']


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['type', 'money', 'balance', 'time']
        read_only_fields = fields


class TransactionSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['money', 'type']

