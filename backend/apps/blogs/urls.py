"""urls for blogs app"""
from django.urls import path
from .views import BlogListAPIView, BlogDetailView, RelatedBlogsView

urlpatterns = [
    path("", BlogListAPIView.as_view(), name = "get_feedback"),
    path("<slug:slug>/", BlogDetailView.as_view(), name="blog_detail"),
    path("<slug:slug>/related/", RelatedBlogsView.as_view(), name='blog-related'),
]