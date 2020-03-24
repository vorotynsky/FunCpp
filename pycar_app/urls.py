from django.urls import path
from . import views

urlpatterns = [
    path('car/<str:car_id>/',     views.car_details),
    path('owner/<int:owner_id>/', views.owner_details)
]
