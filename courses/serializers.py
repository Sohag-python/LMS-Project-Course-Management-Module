from rest_framework import serializers
from .models import Category, Instructor, Course
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']

class InstructorSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='user', write_only=True
    )

    class Meta:
        model = Instructor
        fields = ['id', 'user', 'user_id']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

class CourseSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )
    instructors = InstructorSerializer(many=True, read_only=True)
    instructor_ids = serializers.PrimaryKeyRelatedField(
        queryset=Instructor.objects.all(), many=True, source='instructors', write_only=True
    )

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'category', 'category_id', 'instructors', 'instructor_ids']
