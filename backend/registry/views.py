from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import LogSerializer, BlogSerializer, InfoSerializer
from .models import Info, Log, Blog
import json

@api_view(['GET'])
def log_data(request):
    logs = Log.objects.order_by("date")
    serializer = LogSerializer(logs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def info_data(request):
    infos = Info.objects.order_by("date")
    serializer = InfoSerializer(infos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def blog_data(request):
    blogs = Blog.objects.order_by("date")
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def unread_log_data(request):
    logs = Log.objects.filter(date__gt=request.user.prev_login).order_by("date")
    serializer = LogSerializer(logs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def stats_data(request):
    statsData = []
    return Response(statsData)