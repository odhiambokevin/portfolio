
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('vault/', admin.site.urls),
    path('api/v1/feedback/', include('apps.emails.urls')),
]

urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)

admin.site.site_header = "Portfolio Admin"
admin.site.site_title = "Portfolio"
admin.site.index_title = "Admin Panel"