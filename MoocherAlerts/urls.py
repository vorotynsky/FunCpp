from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/page/', include('moocher_page.urls')),
    path('admin/', admin.site.urls),
]
