from django.urls import path
from .views import *

urlpatterns = [
    path('balance/', BalanceView.as_view()),
]
