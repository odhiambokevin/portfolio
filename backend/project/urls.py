"""url configuration for project"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import home


urlpatterns = [
    path('vault/', admin.site.urls),
    path('api/feedback/', include('apps.feedback.urls')),
    path('', home),
]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

admin.site.site_header = "Portfolio Admin"
admin.site.site_title = "Portfolio"
admin.site.index_title = "Admin Panel"