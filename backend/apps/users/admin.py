"""admin settings for users app"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import User

class UserAdmin(BaseUserAdmin):
    ordering = ["email"]
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    """Fields to be displayed"""
    list_display = ["pkid","email","username","is_staff","is_active"]
    readonly_fields = ["date_created","date_modified","last_login"]
    list_display_links = ["email"]
    list_filter = ["is_staff", "is_active", "username"]
    
    """sections as seen in the 'add' or 'change' user froms
    """
    fieldsets = [
        (
            "Login Credentials",
            {"fields": ["email","password"]}
        ),
        (
            "Personal Information",
            {"fields": ["username", "first_name", "last_name"]}
        ),
        (
            "Permissions and Groups",
            {"fields": ["is_active","is_staff","is_superuser","user_permissions"]}
        ),
        (
            "Important Dates",
            {"fields": ["date_created","date_modified","last_login"]}
        ),

    ]
    add_fieldsets = (
        (
            (
                None,
                {
                    "classes": ["wide"],
                    "fields": ["email","password1","password2","is_staff","is_active"]
                }
            )
        ),
    )
    search_fields = ["email", "username", "first_name", "last_name"]

admin.site.register(User, UserAdmin)