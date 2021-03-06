"""yaspi URL Configuration

"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    path('', views.index),
    path('vault/', admin.site.urls),
    path('api/v1/auth/', include('djoser.urls')),
    path('api/v1/auth/', include('djoser.urls.jwt')),
    path('api/v1/profile/', include('apps.profiles.urls')),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Yaspi Admin"
admin.site.site_title = "Yaspi"
admin.site.index_title = "Admin Panel"