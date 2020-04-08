from django.shortcuts import render
from django.http import Http404
from django.views.generic.list import ListView

from .models import *

# Create your views here.


def owner_details(request, owner_id):
    try:
        owner = Owner.objects.get(pk=owner_id)
    except Owner.DoesNotExist:
        raise Http404("Owner doesn't exists")

    return render(request, 'owner/detail.html', {'owner': owner})


def owner_list(request):
    return render(request, 'owner/list.html', {'owners': Owner.objects.all()})



def car_details(request, car_id):
    try:
        car = Car.objects.get(pk=car_id)
    except Car.DoesNotExist:
        raise Http404("Car doesn't exists")
    return render(request, 'car/detail.html', {'car': car})


class CarList(ListView):
    model = Car
    template_name = 'car/list.html'

