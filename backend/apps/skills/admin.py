"""admin settings for skills app"""
from django.contrib import admin
from .models import Skill

class SkillAdmin(admin.ModelAdmin):
    """Fields to be displayed"""
    list_display = ["id","title","description","image"]
    list_display_links = ["title"]

admin.site.register(Skill, SkillAdmin)