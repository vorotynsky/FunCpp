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


class DonationView(APIView):
    def get(self, request, pk=None):
        if pk is not None:
            try:
                donation = Donation.objects.get(pk=pk)
                result = DonationSerializer(donation, many=False)
                return Response(result.data)
            except ObjectDoesNotExist:
                return Response(status=404)
        return Response(status=501)


class DonateView(APIView):
    def post(self, request):
        try:
            name = request.data['name']
            message = request.data['message']
            money = request.data['money']
            money = Decimal(money)
            moocher_name = request.data['moocher']
        except:
            return Response(status=400)

        try:
            balance = None
            if request.user is not None:
                balance = Balance.objects.get(user=request.user)
                balance.balance -= money
            moocher = MoocherPage.objects.get(name=moocher_name)
            moocher_balance = Balance.objects.get(user=moocher.user)
            moocher_balance.balance += money

            transaction = Transaction.objects.create(type='D', money=money, balance=balance)
            Donation.objects.create(moocher=moocher, name=name, message=message, transaction=transaction)
            if balance is not None:
                balance.save()
            moocher_balance.save()
        except:
            return Response(status=500)

        return Response(status=200)
