"""settings for development environment"""

from .base import *

DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1','localhost', 'backend', '0.0.0.0','*odhiambos-projects.vercel.app']

CORS_ALLOWED_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000", "http://0.0.0.0"]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_METHODS = ["DELETE","GET","OPTIONS","PATCH","POST","PUT",]
CSRF_TRUSTED_ORIGINS = ['http://localhost:3000']

# HTTPS SETTINGS
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False
SECURE_SSL_REDIRECT = False

#HSTS SETTINGS
SECURE_HSTS_SECONDS = 3153600 #1 year
SECURE_HSTS_PRELOAD = False
SECURE_HSTS_INCLUDE_SUBDOMAINS = False