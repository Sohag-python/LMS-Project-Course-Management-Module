from rest_framework import routers
from django.urls import path, include
from .views import CategoryViewSet, InstructorViewSet, CourseViewSet

router = routers.DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('instructors', InstructorViewSet)
router.register('courses', CourseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
