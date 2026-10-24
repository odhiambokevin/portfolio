"""views for blogs app"""
from django.db.models import F
from rest_framework import permissions, filters, generics
from rest_framework.views import APIView
from apps.blogs.pagination import BlogPagination
from rest_framework.response import Response
from.exceptions import BlogNotFound
from .models import Blog
from .serializers import BlogSerializer

class BlogListAPIView(generics.ListAPIView):
    #use this if authentication needed before accessing api permission_classes = [permissions.IsAuthenticated]
    """read-only. posts are created in wagtail (/cms/), only published ones are served here"""
    permission_classes = [permissions.AllowAny]
    queryset = Blog.objects.published()
    serializer_class = BlogSerializer
    pagination_class = BlogPagination
    filter_backends = [ filters.SearchFilter]

class BlogDetailView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request,slug):
        try:
            blog = Blog.objects.published().get(slug=slug)
        except Blog.DoesNotExist:
            raise BlogNotFound

        serializer = BlogSerializer(blog,context={"request": request})
        return Response(serializer.data)

class RelatedBlogsView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, slug):
        try:
            blog = Blog.objects.published().get(slug=slug)
        except Blog.DoesNotExist:
            raise BlogNotFound

        if not blog.tags:
            related = Blog.objects.none()
        else:
            related = (
                Blog.objects.published()
                .filter(tags__overlap=blog.tags)
                .exclude(pk=blog.pk)
                .order_by('-posted_on')[:3]
            )

        serializer = BlogSerializer(related, many=True, context={"request": request})
        return Response(serializer.data)