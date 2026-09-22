"""admin settings for blogs app"""
from django.contrib import admin
from .models import Blog

class BlogAdmin(admin.ModelAdmin):
    """Fields to be displayed"""
    list_display = ["id","title","category","tags","posted_on"]
    list_filter = ["posted_on"]
    search_fields = ("title","category","posted_on","tags")
    list_display_links = ["title"]
    prepopulated_fields = {'slug': ('title',)} 

admin.site.register(Blog, BlogAdmin)