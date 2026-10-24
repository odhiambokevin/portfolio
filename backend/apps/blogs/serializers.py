"""serializers for blogs app"""
from rest_framework import serializers
from .models import Blog

class BlogSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Blog
        fields = [
            "id", "title", "intro", "credit", "author", "slug", "body",
            "image", "posted_on", "read", "tags", "category",
        ] #explicit list prevents leaking wagtail internal fields
        read_only_fields = fields