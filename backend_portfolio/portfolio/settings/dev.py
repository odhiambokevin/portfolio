from .base import *

# use this if setting up on Windows 10 with GDAL installed from OSGeo4W using defaults
if os.name == 'nt':
    import platform
    OSGEO4W = r"C:\OSGeo4W"
    if '64' in platform.architecture()[0]:
        OSGEO4W += ""
    assert os.path.isdir(OSGEO4W), "Directory does not exist: " + OSGEO4W
    os.environ['OSGEO4W_ROOT'] = OSGEO4W
    os.environ['GDAL_DATA'] = OSGEO4W + r"\share\gdal"
    os.environ['PROJ_LIB'] = OSGEO4W + r"\share\proj"
    os.environ['PATH'] = OSGEO4W + r"\bin;" + os.environ['PATH']

DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1','localhost', 'backend', '0.0.0.0']

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