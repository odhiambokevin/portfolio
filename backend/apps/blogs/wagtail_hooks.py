"""wagtail registrations for the blogs app (wagtail finds this file automatically)"""
from django.urls import path, reverse
from wagtail import hooks
from wagtail.admin.menu import MenuItem
from wagtail.admin.ui.tables import UpdatedAtColumn
from wagtail.snippets.models import register_snippet
from wagtail.snippets.views.snippets import SnippetViewSet

from .admin_views import import_markdown_view
from .models import Blog


class BlogViewSet(SnippetViewSet):
    """the Blog posts section of the wagtail admin (/cms/snippets/blogs/blog/)"""
    model = Blog
    icon = "doc-full"
    menu_label = "Blog posts"
    menu_name = "blog-posts"
    menu_order = 200
    add_to_admin_menu = True
    list_display = ["title", "category", "author", "posted_on", UpdatedAtColumn()]
    list_filter = ["category"]
    inspect_view_enabled = False


register_snippet(BlogViewSet)


class ImportMarkdownMenuItem(MenuItem):
    def is_shown(self, request):
        return request.user.has_perm("blogs.add_blog")


@hooks.register("register_admin_urls")
def register_import_markdown_url():
    return [path("blogs/import-markdown/", import_markdown_view, name="blogs_import_markdown")]


@hooks.register("register_admin_menu_item")
def register_import_markdown_menu_item():
    return ImportMarkdownMenuItem("Import markdown", reverse("blogs_import_markdown"), icon_name="upload", order=201)


@hooks.register("construct_main_menu")
def hide_page_explorer(request, menu_items):
    """the site is headless, the blog is not a wagtail page tree"""
    menu_items[:] = [item for item in menu_items if item.name != "explorer"]


@hooks.register("construct_settings_menu")
def hide_wagtail_user_management(request, menu_items):
    """users are managed in the django admin (/vault/), wagtail's user forms do not know this project's custom user model"""
    menu_items[:] = [item for item in menu_items if item.name != "users"]
