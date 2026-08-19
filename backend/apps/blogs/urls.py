"""urls for blogs app"""
from django.urls import path
from .views import BlogListAPIView, BlogDetailView

urlpatterns = [
    path("", BlogListAPIView.as_view(), name = "get_feedback"),
    path("<slug:slug>/", BlogDetailView.as_view(), name="blog_detail")
]