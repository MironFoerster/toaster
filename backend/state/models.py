from django.db import models
from toast_auth.models import User

class Item(models.Model):
    name = models.CharField(max_length=200)
    prep = models.CharField(max_length=50, default="")
    frequency = models.IntegerField(default=1)
    banned = models.BooleanField(default=False)


class KillVerb(models.Model):
    zu = models.CharField(max_length=200, default="zu töten")
    ge = models.CharField(max_length=200, default="getötet")
    imp = models.CharField(max_length=200, default="töte")
    frequency = models.IntegerField(default=1)


class Quest(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    killer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="killer_quests")
    victim = models.ForeignKey(User, on_delete=models.CASCADE, related_name="victim_quests")
    pending_valid = models.BooleanField(default=False)
    distance = models.IntegerField(null=True)
    verb = models.ForeignKey(KillVerb, on_delete=models.SET_NULL, null=True)


class PendingBan(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    note = models.TextField(default="Keine Begründung.")
    pro = models.IntegerField(default=0)
    con = models.IntegerField(default=0)
    users_voted = models.ManyToManyField(User)
