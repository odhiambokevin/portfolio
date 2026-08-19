"""views for blogs app"""
from rest_framework import permissions, filters, generics
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from apps.blogs.pagination import BlogPagination
from rest_framework.response import Response
from rest_framework import status
from.exceptions import BlogNotFound
from .models import Blog
from .serializers import BlogSerializer

class BlogListAPIView(generics.ListCreateAPIView):
    #use this if authentication needed before accessing api permission_classes = [permissions.IsAuthenticated]
    permission_classes = [permissions.AllowAny]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    pagination_class = BlogPagination
    filter_backends = [ filters.SearchFilter]

class BlogDetailView(APIView):
    def get(self, request,slug):
        try:
            blog = Blog.objects.get(slug=slug)
        except Blog.DoesNotExist:
            raise BlogNotFound

        serializer = BlogSerializer(blog)
        return Response(serializer.data)