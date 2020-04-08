from django.urls import path
from . import views

urlpatterns = [
    path('car/<str:car_id>/',     views.car_details),
    path('car/list',              views.CarList.as_view()),
    path('owner/<int:owner_id>/', views.owner_details),
    path('owner/list',            views.owner_list),
]
