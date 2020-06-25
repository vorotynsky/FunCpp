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


class DonationSerializer(serializers.ModelSerializer):
    transaction = TransactionSaveSerializer()

    class Meta:
        model = Donation
        fields = ['moocher', 'name', 'message', 'transaction']
        read_only_fields = fields


class DonationInputSerializer(serializers.ModelSerializer):
    money = serializers.DecimalField(decimal_places=2, max_digits=8)

    class Meta:
        model = Donation
        fields = ['moocher', 'name', 'message']
