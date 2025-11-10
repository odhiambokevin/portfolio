"""Managers customization for users app"""

from django.contrib.auth.base_user import BaseUserManager
from django.core.exceptions import ValidationError
from django.core.validators import validate_email

class CustomUserManager(BaseUserManager):
    def email_validator(self, email):
        try:
            validate_email(email)
        except ValidationError:
            raise ValueError("Provide a valid email address")

    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError("Provide a username")
        if email:
            #normalize the domain part of the email so that name@GMAIL.COM becomes name@gmail.com
            email = self.normalize_email(email)
            
            # email.lower() below accounts for Django case sensitivity for email fields
            email = email.lower()
            self.email_validator(email)
        else:
            raise ValueError("Provide a valid email address")

        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True")

        if not password:
            raise ValueError("Superuser must have a password")

        if email:
            #normalize the domain part of the email
            email = self.normalize_email(email)
            # email.lower() below accounts for Django case sensitivity for email fields
            email = email.lower()
            self.email_validator(email)
        else:
            raise ValueError("Provide a valid email address")

        user = self.create_user(username, email, password, **extra_fields)
        user.save(using=self._db)
        return user
