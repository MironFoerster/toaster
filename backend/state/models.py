from django.db import models
from toast_auth.models import User

class Item(models.Model):
    name = models.CharField(max_length=200)
    prep = models.CharField(max_length=50, default="")
    frequency = models.IntegerField(default=1)


class KillVerb(models.Model):
    pastpart = models.CharField(max_length=200)
    imperative = models.CharField(max_length=200)

class Quest(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    killer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="killer_quests")
    victim = models.ForeignKey(User, on_delete=models.CASCADE, related_name="victim_quests")
    pending_valid = models.BooleanField(default=False)
    verb = models.ForeignKey(KillVerb, on_delete=models.SET_NULL, null=True)


class PendingBan(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    note = models.TextField(default="Keine Begründung.")
    pro = models.IntegerField(default=0)
    con = models.IntegerField(default=0)
