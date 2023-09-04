from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import LogSerializer, BlogSerializer, InfoSerializer
from .models import Info, Log, Blog
from toast_auth.models import User
from django.db.models import Sum


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def log_data(request):
    logs = Log.objects.order_by("date")
    serializer = LogSerializer(logs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def info_data(request):
    infos = Info.objects.order_by("date")
    serializer = InfoSerializer(infos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
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

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def stats_data(request):
    statsData = {
        "kills": {
            "title": "Lizenz zum Töten",
            "type": "bar",
            "unit": "Kills"},
        "deaths": {
            "title": "Tot, aber beschenkt",
            "type": "bar",
            "unit": "Tode"},
        "surrenders": {
            "title": "Aufgaben mag ich (nicht)",
            "type": "bar",
            "unit": "Aufgaben"},
        "blocks": {
            "title": "Unerreichbar",
            "type": "bar",
            "unit": "Blocks"},
        "distance": {
            "title": "Weltenbummler*in",
            "type": "bar",
            "unit": "km"},
        "score": {
            "title": "Geben ist seliger als nehmen",
            "type": "bar",
            "unit": "Punkte"}
        }
    
    for name, stat in statsData:
        stat["personal_values"] = []

    users = User.objects.all() 
    logs = Log.objects.all()

    for user in users:
        statsData["kills"]["personal_values"].append({
            "username": user.username,
            "value": logs.filter(killer=user.username).filter(surrender=False).count()
        })
        statsData["deaths"]["personal_values"].append({
            "username": user.username,
            "value": logs.filter(victim=user.username).filter(surrender=False).count()
        })
        statsData["surrenders"]["personal_values"].append({
            "username": user.username,
            "value": logs.filter(killer=user.username).filter(surrender=True).count()
        })
        statsData["blocks"]["personal_values"].append({
            "username": user.username,
            "value": logs.filter(victim=user.username).filter(surrender=True).count()
        })
        statsData["distance"]["personal_values"].append({
            "username": user.username,
            "value": logs.filter(killer=user.username).filter(surrender=False).aggregate(Sum('distance'))["distance__sum"]
        })
        statsData["score"]["personal_values"].append({
            "username": user.username,
            "value": statsData["kills"]["personal_values"][-1] - statsData["deaths"]["personal_values"][-1]
        })
    
    for name, stat in statsData:
        stat["max_value"] = max(stat["personal_values"].values())

        if name == "score":
            stat["min_value"] = min(stat["personal_values"].values())
