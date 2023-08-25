from rest_framework import serializers
from .models import Quest, PendingBan

class QuestSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Quest
        fields = '__all__'

class PendingBanSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = PendingBan
        fields = '__all__'