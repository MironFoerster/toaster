from rest_framework import serializers
from .models import Item, Quest, PendingBan, KillVerb
from toast_auth.serializers import UserSerializer

class ItemSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Item
        fields = ['name', 'prep']
    
class KillVerbSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = KillVerb
        fields = ['zu', 'ge', 'imp']

class QuestSerializer(serializers.ModelSerializer):
    item = ItemSerializer()
    killer = UserSerializer()
    victim = UserSerializer()
    verb = KillVerbSerializer()

    class Meta(object):
        model = Quest
        fields = '__all__'

class PendingBanSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = PendingBan
        fields = '__all__'
