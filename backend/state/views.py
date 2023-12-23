import math
from rest_framework.decorators import api_view
from rest_framework.response import Response

from registry.models import Info
from .serializers import QuestSerializer, PendingBanSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Item
from toast_auth.models import User


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def new_item(request):
    Item.objects.create(name = request.data['name'], prep = request.data['prep'])
    return Response("added Item")

from .models import Quest, Item, PendingBan, KillVerb
from registry.models import Log
import random

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def quests_data(request):
    quests = Quest.objects.all().filter(killer=request.user)

    while quests.count() < 3:
        unbanned_items = Item.objects.exclude(ban_state='banned').exclude(frequency=0)
        rand_item = random.choices(unbanned_items, [1/item["frequency"] for item in unbanned_items.values("frequency")], k=1)[0]
        rand_verb = random.choices(KillVerb.objects.all(), [1/verb["frequency"] for verb in KillVerb.objects.values("frequency")], k=1)[0]
        rand_item.frequency += 1
        rand_item.save()
        rand_verb.frequency += 1
        rand_verb.save()
        already_victim_names = [quest.victim.username for quest in quests]
        victim_user = random.choice(User.objects.exclude(username__in=already_victim_names).exclude(username=request.user.username).exclude(is_staff=True))
        Quest.objects.create(item=rand_item, killer=request.user, victim=victim_user, verb=rand_verb)
        quests = Quest.objects.filter(killer=request.user)
    
    serializer = QuestSerializer(quests, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def ban_data(request):
    bans = PendingBan.objects.exclude(users_voted=request.user)
    serializer = PendingBanSerializer(bans, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def killval_data(request):
    quests = Quest.objects.filter(victim=request.user).filter(state="validating")
    serializer = QuestSerializer(quests, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def validate_kill(request):
    quest = Quest.objects.get(id=request.data['quest_id'])
    if (request.data['valid']):
        new_log = Log.objects.create(item=quest.item,
                                     killername=quest.killer.username,
                                     victimname=quest.victim.username,
                                     surrender=False,
                                     distance=quest.distance,
                                     verb = quest.verb)
        new_log.save()
        quest.delete()
        return Response("kill validated")
    else:
        quest.state = "active"
        quest.save()
        return Response("kill prevented")

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def initiate_ban(request):
    ban_item = Item.objects.get(id=request.data["item_id"])
    if PendingBan.objects.filter(item=ban_item).exists() or ban_item.ban_state == 'banned':
        return Response("already banning or banned")
    else:
        ban = PendingBan.objects.create(item=ban_item,
                                        note=request.data["note"])
        ban.users_voted.add(request.user)

        ban_item.ban_state = 'banning'
        ban_item.save()

        return Response("initiated ban")

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def vote_ban(request):
    ban = PendingBan.objects.get(id=request.data['ban_id'])
    if not ban.users_voted.filter(id=request.user.id).exists():
        if request.data['ban']:
            ban.ban += 1
        else:
            ban.keep += 1

        ban.users_voted.add(request.user)
        ban.save()

        # Check if complete
        majority = math.ceil(User.objects.all().exclude(is_staff=True).count() / 2)

        if ban.ban >= majority:
            ban.item.ban_state = 'banned'
            ban.item.save()

            new_info = Info.objects.create(type="ban",
                                           title=f"{ban.item.name} gebannt",
                                           message=f"{ban.item.name} wurde mit einem {ban.keep}:{ban.ban} gebannt")
            new_info.save()
            ban.delete()
        elif ban.keep > majority:
            ban.item.ban_state = ''
            ban.item.save()

            new_info = Info.objects.create(type="ban",
                                           title=f"{ban.item.name} nicht gebannt",
                                           message=f"Der Bann von {ban.item.name} wurde mit einem {ban.ban}:{ban.keep} verhindert")
            new_info.save()
            ban.delete()

        return Response("voted")
    else:
        return Response("failed to vote")
    

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def set_quest_opened(request):
    quest = Quest.objects.filter(killer=request.user).get(id=request.data['quest_id'])
    quest.state = "active"
    quest.save()
    return Response("quest opened")
    
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def surrender_quest(request):
    quest = Quest.objects.get(id=request.data['quest_id'])

    if not quest.item.ban_state == 'banned':
        new_log = Log.objects.create(item=quest.item,
                                    killername=quest.killer.username,
                                    victimname=quest.victim.username,
                                    surrender = True,
                                    verb = quest.verb)
        new_log.save()
    quest.delete()
    return Response("surrendered")

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def request_kill_val(request):
    quest = Quest.objects.get(id=request.data['quest_id'])
    quest.state = "validating"
    quest.distance = request.data['distance']
    quest.save()
    return Response("validating kill")
