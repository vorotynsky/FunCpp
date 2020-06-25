from django.urls import path
from .views import *

urlpatterns = [
    path('balance/', BalanceView.as_view()),
    path('transaction/', TransactionView.as_view()),
    path('transaction/<int:pk>', TransactionView.as_view()),
    path('donation/<int:pk>', DonationView.as_view()),
    path('donate/', DonateView.as_view()),
]
