from rest_framework import serializers
from .models import Log, Blog

class LogSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Log
        fields = ['is_info', 'info_title', 'info_test', 'item', 'killer', 'victim', 'message', 'success', 'distance', 'date']

class BlogSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Blog
        fields = ['user', 'date', 'text']