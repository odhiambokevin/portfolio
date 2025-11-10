from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView,TokenVerifyView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema

class CustomTokenObtainPairView(TokenObtainPairView):
    @swagger_auto_schema(
            operation_summary='Login for a user',
            operation_description='Returns an access and refresh token'
    )
    def post(self,request,*args,**kwargs):
        response = super().post(request,*args,**kwargs)

        """get the access and refresh token from the body of the response"""
        if response.status_code == 200:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')

            """set the access and refresh tokens in the cookies. Here we are overiding the default behavior of the view"""
            response.set_cookie(
                'access', # the name of the cookie
                access_token, # the value of the cookie
                max_age=settings.AUTH_COOKIE_ACCESS_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
            response.set_cookie(
                'refresh', # the name of the cookie
                refresh_token, # the value of the cookie
                max_age=settings.AUTH_COOKIE_REFRESH_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )

        return response
    
class CustomTokenRefreshView(TokenRefreshView):
     @swagger_auto_schema(
            operation_summary='Request a new access token when current expires',
            operation_description='A new access token is generated'
    )
     def post(self,request,*args,**kwargs):
        refresh_token = request.COOKIES.get('refresh') # we retrieve the refresh token set in the cookies in line 33

        if refresh_token:
            request.data['refresh'] = refresh_token # setting the refresh token in the payload to be sent on the post request

        response = super().post(request,*args,**kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access') # the new access token value

            """set the new access token value in the cookie"""
            response.set_cookie(
                'access',
                access_token, # the new value of the cookie
                max_age=settings.AUTH_COOKIE_ACCESS_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )

        return response

class CustomTokenVerifyView(TokenVerifyView):
    @swagger_auto_schema(
            operation_summary='Verify the current logged in user',
            operation_description='Checks whether the access token is valid'
    )
    def post(self,request,*args,**kwargs):
        access_token = request.COOKIES.get('access')

        if access_token:
            request.data['token'] = access_token

        return super().post(request,*args,**kwargs) # sending the access token to the view to verify if it is valid
    
class LogoutView(APIView):
    @swagger_auto_schema(
            operation_summary='Logout user',
            operation_description='Removes both the access and refresh token'
    )
    def post(self,request,*args,**kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('access', path=settings.AUTH_COOKIE_PATH, samesite='None')
        response.delete_cookie('refresh', path=settings.AUTH_COOKIE_PATH, samesite='None')

        return response
