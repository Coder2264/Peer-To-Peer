from django.contrib.auth.models import User
from rest_framework import serializers
from .models import File, FileRating

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password","ip_address"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ['id', 'name', 'description', 'created_at', 'author', 'size', 'type', 'path']
        read_only_fields = ['id', 'created_at']

    def create(self, validated_data):
        # Directly save metadata without processing file content
        return super().create(validated_data)

    def update(self, instance, validated_data):
        # Update fields present in the request
        for key, value in validated_data.items():
            setattr(instance, key, value)
        instance.save()
        return instance
    
class FileRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileRating
        fields = ['id', 'file', 'user', 'rating', 'comment']