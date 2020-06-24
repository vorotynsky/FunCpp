from django.core.exceptions import ObjectDoesNotExist
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *


class BalanceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            balance = Balance.objects.get(user=request.user)
        except ObjectDoesNotExist:
            balance = Balance.objects.create(user=request.user, balance=0)
            balance.save()

        result = BalanceSerializer(balance, many=False)
        return Response(result.data)
