from django.db import models

# Create your models here.

class Log(models.Model):
    item = models.CharField(max_length=50)
    killer = models.CharField(max_length=50)
    victim = models.CharField(max_length=50)
    message = models.CharField(max_length=250)
    success = models.BooleanField()
    distance = models.IntegerField(default=0)
    date = models.DateField()

class Blog(models.Model):
    user = models.CharField(max_length=50)
    date = models.DateField()
    text = models.TextField()

class MsgTemplate(models.Model):
    template = models.CharField(max_length=250)
    for_success = models.BooleanField()
    frequency = models.IntegerField(default=0)