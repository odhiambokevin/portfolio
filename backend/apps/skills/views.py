"""views for skills app"""
from rest_framework import permissions, generics
from .models import Skill
from .serializers import SkillSerializer

class SkillListAPIView(generics.ListCreateAPIView):
    #use this if authentication needed before accessing api permission_classes = [permissions.IsAuthenticated]
    permission_classes = [permissions.AllowAny]
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
