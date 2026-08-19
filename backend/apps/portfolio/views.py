"""views for portfolio app"""
from rest_framework import permissions, generics
from .models import Portfolio
from .serializers import PortfolioSerializer

class PortfolioListAPIView(generics.ListCreateAPIView):
    #use this if authentication needed before accessing api permission_classes = [permissions.IsAuthenticated]
    permission_classes = [permissions.AllowAny]
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

