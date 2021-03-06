from django.forms import CharField
from rest_framework import serializers
from .models import Profile



class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username")
    first_name = serializers.CharField(source="user.first_name")
    last_name = serializers.CharField(source="user.last_name")
    email = serializers.EmailField(source="user.email")
    full_name = serializers.SerializerMethodField(read_only=True)
    gender = serializers.CharField(source="profile.gender")
    station = serializers.CharField(source="profile.station")
    is_wcontrol = serializers.BooleanField(source="profile.is_wcontrol")
    photo = serializers.ImageField(source="profile.photo")
    
    
    class Meta:
        model = Profile
        fields = ['id','username','email','first_name','last_name','full_name','gender','station','is_manager','is_wcontrol','photo']

    def get_full_name(self, obj):
        first_name = obj.user.first_name.title()
        last_name = obj.user.last_name.title()
        return f"{first_name} {last_name}"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.is_wmanager:
            representation["is_wmanager"] = True
        return representation

class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['station','is_wcontrol','is_wmanager','photo']
