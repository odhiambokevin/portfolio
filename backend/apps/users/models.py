import uuid
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from .managers import CustomUserManager


class User(AbstractBaseUser, PermissionsMixin):
    pkid = models.BigAutoField(primary_key=True, editable=False, db_column='pkid')
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True,db_column='id')
    username = models.CharField(verbose_name="Username", max_length=25, unique=True, db_column='username')
    first_name = models.CharField(verbose_name="First Name", max_length=25, db_column='first_name')
    last_name = models.CharField(verbose_name="Last Name", max_length=25, db_column='last_name')
    email = models.EmailField(verbose_name="Email Address", unique=True, db_column='email')
    is_staff = models.BooleanField(default=False, db_column='is_staff')
    is_active = models.BooleanField(default=False, db_column='is_active')
    date_created = models.DateTimeField(auto_now_add=True, db_column='date_created')
    date_modified = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    # required when creating a new user
    REQUIRED_FIELDS = ["username","first_name","last_name"]

    # make use of custom user manager
    objects = CustomUserManager()

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"
        db_table = "users"

    def __str__(self):
        return self.username

    @property
    def get_full_name(self):
        return f"{self.first_name.title()} {self.last_name.title()}"