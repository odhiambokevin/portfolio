"""Views for emails app"""
from rest_framework import permissions, filters, generics
from apps.feedback.pagination import FeedbackPagination
from .models import Feedback
from .serializers import FeedbackSerializer

class FeedbackListAPIView(generics.ListCreateAPIView):
    #use this if authentication needed before accessing api permission_classes = [permissions.IsAuthenticated]
    permission_classes = [permissions.AllowAny]
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    pagination_class = FeedbackPagination
    filter_backends = [ filters.SearchFilter]
