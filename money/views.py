from decimal import Decimal

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


class TransactionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk is not None:
            try:
                transaction = Transaction.objects.filter(balance__user=request.user).get(pk=pk)
            except ObjectDoesNotExist:
                return Response(status=404)
            result = TransactionSerializer(transaction, many=False)
            return Response(result.data)
        return Response(status=501)

    def post(self, request, pk=None):
        balance = Balance.objects.get(user=request.user)
        transaction = Transaction.objects.create(balance=balance)
        serializer = TransactionSaveSerializer(instance=transaction, data=request.data)
        if serializer.is_valid():
            money = Decimal(serializer.validated_data['money'])
            type = serializer.validated_data['type']
            if type == 'P':
                balance.balance += money
            elif money > balance.balance:
                return Response(status=400)
            else:
                balance.balance -= money

            serializer.save()
            balance.save()
            return Response(serializer.data)
        return Response(status=400)
