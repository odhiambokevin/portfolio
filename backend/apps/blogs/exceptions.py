"""exceptions for blogs app"""
from rest_framework.exceptions import APIException

class BlogNotFound(APIException):
    status_code = 404
    default_detail = "Requested blog does not exist"
