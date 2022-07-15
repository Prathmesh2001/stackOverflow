from .models import *
from attr import fields
from django.forms import ValidationError
from rest_framework import serializers


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


# class QuestionCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Question
#         fields = ['username', '']


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email', 'password', 'dob']
        extra_kwarg = {
            'password':{'write_only':True}
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)



class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'password')

class UserViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'dob']



