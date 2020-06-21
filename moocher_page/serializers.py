from rest_framework import serializers
from .models import *


class MoocherPageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MoocherPage
        fields = ('name', 'bio')
