from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/page/', include('moocher_page.urls')),
    path('api/money/', include('money.urls')),


    path('auth/', include('djoser.urls')),
    path('api/auth/', include('rest_framework.urls')),
    path('auth/', include('djoser.urls.jwt')),

    path('admin/', admin.site.urls),
]
