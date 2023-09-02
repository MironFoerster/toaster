from rest_framework import serializers
from .models import Log, Blog, Info

class LogSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Log
        fields = '__all__'

class InfoSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Info
        fields = '__all__'

class BlogSerializer(serializers.ModelSerializer):
    log = LogSerializer()
    class Meta(object):
        model = Blog
        fields = '__all__'