"""urls for projects app"""
from django.urls import path
from .views import ProjectListAPIView

urlpatterns = [
    path("", ProjectListAPIView.as_view(), name = "get_projects"),
]