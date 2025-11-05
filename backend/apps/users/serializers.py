"""Serializers for users app"""
from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """the OneToOne User-Profile relationship allows us to access the Profile fields using source='' """
    gender = serializers.CharField(source="profile.gender")
    station = serializers.CharField(source="profile.station")
    photo = serializers.ImageField(source="profile.photo")
    designation = serializers.CharField(source="profile.designation")
    first_name = serializers.SerializerMethodField()
    last_name = serializers.SerializerMethodField()
   
    class Meta:
        model = User
        fields = ["id","username","email","first_name","last_name","designation","gender","station","photo"]

    def get_first_name(self, obj):
        return obj.first_name.title()

    def get_last_name(self, obj):
        return obj.last_name.title()

    def to_representation(self, instance):
        representation = super(UserSerializer, self).to_representation(instance)
        if instance.is_superuser:
            representation["admin"] = True
        return representation


class CreateUserSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ["id", "username", "first_name","last_name","password", "email"]
