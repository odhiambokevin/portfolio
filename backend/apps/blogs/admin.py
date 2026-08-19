"""admin settings for blogs app"""
from django.contrib import admin
from .models import Blog

class BlogAdmin(admin.ModelAdmin):
    """Fields to be displayed"""
    list_display = ["id","title","slug","author","content","image","posted_on"]
    list_filter = ["author","posted_on"]
    search_fields = ("title","author","posted_on",)
    list_display_links = ["title"]
    prepopulated_fields = {'slug': ('title',)} 

admin.site.register(Blog, BlogAdmin)