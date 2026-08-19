"""views for projects app"""
from rest_framework import permissions, generics
from .models import Project
from .serializers import ProjectSerializer

class ProjectListAPIView(generics.ListCreateAPIView):
    #use this if authentication needed before accessing api permission_classes = [permissions.IsAuthenticated]
    permission_classes = [permissions.AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

