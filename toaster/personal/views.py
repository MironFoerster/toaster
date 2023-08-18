from django.shortcuts import render, redirect
from .models import Quest, Item
from django.contrib.auth.models import User
from django.http import JsonResponse
import random
from django.contrib.auth import authenticate, login, logout


# Create your views here.
def profile(request):
    pass

def new_item(request):
    item_name = request.POST["item_name"]
    Item.objects.create(item_name=item_name)

def quests(request):
    return render(request, "personal\quests.html")

def quests_data(request):
    quests = Quest.objects.filter(killer=request.user)
    while quests.count() < 3:
        rand_item = random.choices(Item.objects.all(), [1/item["frequency"] for item in Item.objects.values("frequency")], k=1)[0]
        rand_item.frequency += 1
        print("+++++")
        rand_item.save()
        print(quests)
        already_victim_names = [quest.victim.username for quest in quests]
        print(request.user.username)
        print(User.objects.exclude(username__in=already_victim_names).exclude(username=request.user.username).values())
        victim_user = random.choice(User.objects.exclude(username__in=already_victim_names).exclude(username=request.user.username))
        Quest.objects.create(item=rand_item, killer=request.user, victim=victim_user)
        quests = Quest.objects.filter(killer=request.user)

    return JsonResponse(list(quests.values()), safe=False)

def login_user(request):
    if request.method == "POST":
        print("post")
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            print("login")
            login(request, user)
            return redirect("personal:quests")
        else:
            print("back")
            return render(request, "personal\login.html")
    else:
        return render(request, "personal\login.html")

def logout_user(request):
    logout(request, request.user)

