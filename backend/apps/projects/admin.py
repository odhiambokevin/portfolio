"""admin settings for projects app"""
from django.contrib import admin
from .models import Project

class ProjectAdmin(admin.ModelAdmin):
    """Fields to be displayed"""
    list_display = ["id","title","url","image","stack"]
    list_filter = ["title"]
    search_fields = ("title",)
    list_display_links = ["title"]

admin.site.register(Project, ProjectAdmin)