from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from toast_auth.serializers import UserSerializer
from .serializers import LogSerializer, BlogSerializer, InfoSerializer
from .models import Info, Log, Blog
from toast_auth.models import User
from django.db.models import Sum


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def log_data(request):
    logs = Log.objects.all()
    serializer = LogSerializer(logs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def info_data(request):
    infos = Info.objects.all()
    serializer = InfoSerializer(infos, many=True)
    print(serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def blog_data(request):
    blogs = Blog.objects.order_by("-date")
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def new_blog(request):
    blog = Blog.objects.create(username=request.user.username,
                               #title=request.data["title"],
                               text=request.data["text"])
    serializer = BlogSerializer(blog, many=False)
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
    
    for name, stat in statsData.items():
        stat["personal_values"] = []

    users = User.objects.all().exclude(is_staff=True)
    logs = Log.objects.all()

    for user in users:
        statsData["kills"]["personal_values"].append({
            "username": user.username,
            "value": logs.filter(killername=user.username).filter(surrender=False).count()
        })
        statsData["deaths"]["personal_values"].append({
            "username": user.username,
            "value": logs.filter(victimname=user.username).filter(surrender=False).count()
        })
        statsData["surrenders"]["personal_values"].append({
            "username": user.username,
            "value": logs.filter(killername=user.username).filter(surrender=True).count()
        })
        statsData["blocks"]["personal_values"].append({
            "username": user.username,
            "value": logs.filter(victimname=user.username).filter(surrender=True).count()
        })
        statsData["distance"]["personal_values"].append({
            "username": user.username,
            "value": logs.filter(killername=user.username).filter(surrender=False).aggregate(Sum('distance'))["distance__sum"] or 0
        })
        statsData["score"]["personal_values"].append({
            "username": user.username,
            "value": statsData["kills"]["personal_values"][-1]["value"] - statsData["deaths"]["personal_values"][-1]["value"]
        })
    
    for name, stat in statsData.items():
        stat["max_value"] = max(stat["personal_values"], key=lambda dict: dict["value"])["value"]
        if name == "score":
            stat["min_value"] = min(stat["personal_values"], key=lambda dict: dict["value"])["value"]
            stat["personal_values"] = reversed(sorted(stat["personal_values"], key=lambda user: user["value"] + stat["min_value"] if user["value"] > 0 else -user["value"] if user["value"] > 0 else 0))
            return Response(statsData)

        stat["personal_values"] = reversed(sorted(stat["personal_values"], key=lambda user: user["value"]))
        
    
    return Response(statsData)
