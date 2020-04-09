from django.urls import path
from . import views

urlpatterns = [
    path('car/details/<str:car_id>/',     views.car_details),
    path('car/new',                       views.CarCreate.as_view()),
    path('car/list',                      views.CarList.as_view()),
    path('owner/details/<int:owner_id>/', views.owner_details),
    path('owner/list',                    views.owner_list),
    path('owner/new',                     views.owner_create)
]
