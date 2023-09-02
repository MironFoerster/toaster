from django.db import models
from state.models import Item, KillVerb

# Create your models here.

class Log(models.Model):
    item = models.ForeignKey(Item, on_delete=models.PROTECT)
    killername = models.CharField(max_length=50, default="")
    victimname = models.CharField(max_length=50, default="")
    verb = models.ForeignKey(KillVerb, on_delete=models.PROTECT)
    surrender = models.BooleanField(default=False)
    distance = models.IntegerField(default=0)
    date = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.killername} x {self.victimname} ({self.item.name})"

class Info(models.Model):
    title = models.CharField(max_length=200, default="", null=True)
    message = models.TextField(default="", null=True)
    date = models.DateField(auto_now=True)

    def __str__(self):
        return f"{self.title}"


class Blog(models.Model):
    username = models.CharField(max_length=200, default="")
    date = models.DateField()
    title = models.CharField(max_length=200, default="Title")
    text = models.TextField()
    log = models.ForeignKey(Log, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f"{self.title} by {self.username}"

class Comment(models.Model):
    on = models.ForeignKey(Log, default=None, on_delete=models.CASCADE)
    on = models.ForeignKey(Blog, default=None, on_delete=models.CASCADE)
    text = models.TextField(max_length=200)
    emote = models.CharField(max_length=1)
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.emote}"


class MsgTemplate(models.Model):
    template = models.CharField(max_length=250)
    for_success = models.BooleanField()
    frequency = models.IntegerField(default=0)