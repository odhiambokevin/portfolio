"""
admin settings for blogs app
blog posts are now created and edited in wagtail /cms/ so drafts, publishing and revisions stay consistent
this admin page is read-only on purpose since editing a post here would bypass wagtail's revisions.
"""
from django.contrib import admin
from .models import Blog

class BlogAdmin(admin.ModelAdmin):
    """Fields to be displayed"""
    list_display = ["id","title","category","tags","posted_on"]
    list_filter = ["live","category","posted_on"]
    search_fields = ("title","category","posted_on","tags")
    list_display_links = ["title"]

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

admin.site.register(Blog, BlogAdmin)