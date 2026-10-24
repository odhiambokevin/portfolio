"""url configuration for project"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from wagtail import urls as wagtail_urls
from wagtail.admin import urls as wagtailadmin_urls
from .views import home


urlpatterns = [
    path('vault/', admin.site.urls),
    path('cms/', include(wagtailadmin_urls)), #wagtail admin: manage blog posts here
    path('api/feedback/', include('apps.feedback.urls')),
    path('api/blogs/', include('apps.blogs.urls')),
    path('', home),
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

#wagtail's page serving. must stay last because the site is headless so it only exists so wagtail's admin can build page links
urlpatterns += [path('', include(wagtail_urls))]

admin.site.site_header = "Portfolio Admin"
admin.site.site_title = "Portfolio"
admin.site.index_title = "Admin Panel"