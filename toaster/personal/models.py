from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Item(models.Model):
    name = models.CharField(max_length=50)
    frequency = models.IntegerField(default=0)


class Quest(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    killer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="killer_quests")
    victim = models.ForeignKey(User, on_delete=models.CASCADE, related_name="victim_quests")


class PendingBan(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    note = models.TextField(default="Keine Begründung.")
    pro = models.IntegerField(default=0)
    con = models.IntegerField(default=0)
