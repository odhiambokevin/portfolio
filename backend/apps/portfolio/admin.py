"""admin settings for portfolio app"""
from django.contrib import admin
from .models import Portfolio

class PortfolioAdmin(admin.ModelAdmin):
    """Fields to be displayed"""
    list_display = ["id","title","url","image"]
    list_filter = ["title"]
    search_fields = ("title",)
    list_display_links = ["title"]

admin.site.register(Portfolio, PortfolioAdmin)