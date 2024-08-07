from .base import *

DEBUG = False

ALLOWED_HOSTS = ["portfolio-be-three.vercel.app", "*odhiambos-projects.vercel.app"]

CORS_ALLOWED_ORIGINS = ["https://kevin-neon.vercel.app"]
CORS_ALLOWED_METHODS = ["DELETE","GET","OPTIONS","PATCH","POST","PUT",]

# HTTPS SETTINGS
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True

#HSTS SETTINGS
SECURE_HSTS_SECONDS = 3153600 #1 year
SECURE_HSTS_PRELOAD = True
SECURE_HSTS_INCLUDE_SUBDOMAINS = True