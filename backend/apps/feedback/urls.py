"""Urls for feedback app"""
from django.urls import path
from .views import FeedbackListAPIView

urlpatterns = [
    path("", FeedbackListAPIView.as_view(), name = "get_feedback"),
]