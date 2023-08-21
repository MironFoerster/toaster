from django.db import models
from toast_auth.models import User
# Create your models here.


class Item(models.Model):
    name = models.CharField(max_length=50)
    frequency = models.IntegerField(default=1)


class Quest(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    killer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="killer_quests")
    victim = models.ForeignKey(User, on_delete=models.CASCADE, related_name="victim_quests")


class PendingBan(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    note = models.TextField(default="Keine Begründung.")
    voted = models.JSONField()
    pro = models.IntegerField(default=0)
    con = models.IntegerField(default=0)
    ntr = models.IntegerField(default=0)
