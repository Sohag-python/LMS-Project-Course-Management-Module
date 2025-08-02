from rest_framework import viewsets, permissions
from .models import Category, Instructor, Course
from .serializers import CategorySerializer, InstructorSerializer, CourseSerializer
from rest_framework.permissions import IsAdminUser

class AdminOnlyPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]

class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer
    permission_classes = [IsAdminUser]

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdminUser]

    def get_queryset(self):
        queryset = Course.objects.all()
        category_id = self.request.query_params.get('category')
        instructor_id = self.request.query_params.get('instructor')
        if category_id:
            queryset = queryset.filter(category__id=category_id)
        if instructor_id:
            queryset = queryset.filter(instructors__id=instructor_id)
        return queryset.distinct()
