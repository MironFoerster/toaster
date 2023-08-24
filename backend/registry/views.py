from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import LogSerializer, BlogSerializer
from .models import Log, Blog

@api_view(['GET'])
def log_data(request):
    logs = Log.objects.all().order_by("date")
    serializer = LogSerializer(logs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def blog_data(request):
    blogs = Blog.objects.all().order_by("date")
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)