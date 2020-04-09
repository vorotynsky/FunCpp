from django import forms
from .models import Owner
from .models import Car


class OwnerForm(forms.ModelForm):
    class Meta:
        model = Owner
        fields = {
            "last_name": forms.TextInput(),
            "first_name": forms.TextInput(),
            "birthday": forms.DateInput()
        }


class CarForm(forms.ModelForm):
    class Meta:
        model = Car
        fields = [
            "id", "model", "provider"
        ]
