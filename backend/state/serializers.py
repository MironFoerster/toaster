from rest_framework import serializers
from .models import Quest, PendingBan

class QuestSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Quest
        fields = ['item', 'killer', 'victim']

class PendingBanSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = PendingBan
        fields = ['item', 'note', 'pro', 'con']