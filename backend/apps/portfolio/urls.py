"""urls for portfolio app"""
from django.urls import path
from .views import PortfolioListAPIView

urlpatterns = [
    path("", PortfolioListAPIView.as_view(), name = "get_portfolio"),
]