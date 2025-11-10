"""URL configuration for project project"""
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('vault/', admin.site.urls),
]
