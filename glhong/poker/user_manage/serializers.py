from rest_framework import serializers
from user_manage.models import Users


# class UserSerializer(serializers.Serializer):
#     id = serializers.IntegerField(read_only=True)
#     email = serializers.CharField(required=True, max_length=12)
#     password = serializers.CharField(required=True, max_length=12)
#
#     def create(self, validated_data):
#         return User.objects.create(**validated_data)

class UserSerializer(serializers.Serializer):
    user_id = serializers.CharField(min_length=4,
                                    max_length=20,
                                    required=True)
    user_password = serializers.CharField(min_length=4,
                                          max_length=20)

    def create(self, validated_data):
        return Users.objects.create(**validated_data)
