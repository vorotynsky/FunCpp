from rest_framework import serializers
from .models import *


class MoocherPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MoocherPage
        fields = ['name', 'bio', 'user']
        read_only_fields = ['user']

    def create(self, validated_data):
        return MoocherPage.objects.create(**validated_data)
