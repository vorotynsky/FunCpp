from django.contrib import admin
from .models import *


class ReadonlyAdmin(admin.ModelAdmin):
    def has_view_permission(self, request, obj=None):
        return True

    def has_change_permission(self, request, obj=None):
        return False

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


# Register your models here.
admin.site.register(Balance, ReadonlyAdmin)
admin.site.register(Transaction, ReadonlyAdmin)
admin.site.register(Donation)
