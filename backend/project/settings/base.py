"""
Django base settings for project
"""

from pathlib import Path
import os
from decouple import config, Csv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config('SECRET_KEY')

ALLOWED_HOSTS = config("ALLOWED_HOSTS", cast=Csv())

DEBUG = config('DEBUG', default=True, cast=bool)

CORS_ALLOW_CREDENTIALS = True

# Django apps
DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "whitenoise.runserver_nostatic", #whitenoise third party app but needs to be above static file
    "django.contrib.staticfiles",
]

# Libraries and other third party apps
THIRD_PARTY_APPS = [
    'corsheaders',
    'rest_framework',
]

# My custom apps
MY_APPS = [
    "project",
    "apps.users",
    "apps.feedback",   
]

# Application definition
INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + MY_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    "whitenoise.middleware.WhiteNoiseMiddleware",
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware", # for djangocorsheaders
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'project.wsgi.app' #changed to .app for deployment with vercel


# Database
DATABASES = {
    "default": {
        "ENGINE": config("DB_ENGINE"),
        "NAME": config("DB_NAME"),
        "USER": config("DB_USER"),
        "PASSWORD": config("DB_PASSWORD"),
        "HOST": config("DB_HOST"),
        "PORT": config("DB_PORT"),
    }
}

# Email settings
EMAIL_BACKEND = config("EMAIL_BACKEND")
SERVER_EMAIL = config("DEFAULT_FROM_EMAIL") #note: email specified here will only be sending error messages only/strictly
EMAIL_HOST = config("EMAIL_HOST")
EMAIL_HOST_USER = config("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")
EMAIL_PORT = 587
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL")
ADMINS = (("Portfolio Admin", config("ADMIN_EMAIL")),) #where code errors are sent
MANAGERS = ADMINS #managers receive broken link notifications when BrokenLinkEmailsMiddleware is enabled
SITE_NAME = "Kevin Portfolio" #appears at the end of emails sent eg 'From the {SITE_NAME} Team'
DOMAIN = config("DOMAIN")  # the frontend domain eg myfrontend.com (for decoupled architecture setup)

# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Africa/Nairobi'

USE_I18N = True

USE_TZ = True


# Static files
STATIC_URL = 'static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')


# Media files
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "mediafiles"

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# user model
AUTH_USER_MODEL = "users.User"

# Restframework settings
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "apps.users.authentication.CustomJWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ]
}


# Logging
import logging
import logging.config
from django.utils.log import DEFAULT_LOGGING

logger = logging.getLogger(__name__)

LOG_LEVEL = "INFO"

logging.config.dictConfig(
    {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": { #security note: ensure sensitive info eg email addresses/creditcard details/passwords are not logged
            "console": { #the name of the formatter
                "format": "%(asctime)s %(name)s %(module)s.py %(levelname)s %(message)s",
            },
            "file": { # %(name) is the name of the logger
                "format": "%(asctime)s %(levelname)s %(name)s %(module)s.py (line %(lineno)d) %(pathname)s %(message)s",
            },
            "django.server": DEFAULT_LOGGING["formatters"]["django.server"],
        },
        "handlers": { #handlers define how to 'handle' the log records
            "console": {
                "class": "logging.StreamHandler",
                "formatter": "console",
            },
            "file": {
                "level": config("PROJECT_LOG_LEVEL"), #log levels below the specified level are ignored eg. INFO ignores DEBUG logs 
                "class": "logging.FileHandler",
                "formatter": "file",
                "filename": config("DJANGO_LOG_FILE"),
            },
            "mail_admins": { #sends an email to admins
                "level": config("ADMIN_LOG_LEVEL"), #log levels below the specified level are ignored eg. INFO ignores DEBUG logs 
                "class": "django.utils.log.AdminEmailHandler",
                "formatter": "file",
            },
            "django.server": DEFAULT_LOGGING["handlers"]["django.server"],
        },
        "loggers": {
            "": {
                "level": config("PROJECT_LOG_LEVEL"),
                "handlers": ["console", "file","mail_admins"],
                "propagate": False, 
            },
            "apps": {
                "level": config("APPS_LOG_LEVEL"),
                "handlers": ["file","mail_admins"],
                "propagate": False, #does not send logs to any parent
            },
            "django.server": DEFAULT_LOGGING["loggers"]["django.server"],
        },
    }
)

