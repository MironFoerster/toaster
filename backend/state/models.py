from django.db import models
from django.conf import settings
from toast_auth.models import User

class Item(models.Model):
    name = models.CharField(max_length=200)
    prep = models.CharField(max_length=50, default="", null=True)
    frequency = models.IntegerField(default=0) # 0 for not yet approved
    ban_state = models.CharField(default="unbanned", max_length=50) # unbanned, banning, banned
    
    def __str__(self):
        return f"{self.name} ({self.frequency})"




class KillVerb(models.Model):
    zu = models.CharField(max_length=200, default="zu töten")
    ge = models.CharField(max_length=200, default="getötet")
    imp = models.CharField(max_length=200, default="töte")
    frequency = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.imp} ({self.frequency})"


class Quest(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    killer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="killer_quests")
    victim = models.ForeignKey(User, on_delete=models.CASCADE, related_name="victim_quests")
    verb = models.ForeignKey(KillVerb, on_delete=models.SET_NULL, null=True)
    state = models.CharField(default="unopened", max_length=50)
    distance = models.IntegerField(null=True)

    def __str__(self):
        if settings.DEBUG:
            return f"{self.killer.username} {self.verb.imp} {self.victim.username} ({self.item.name})"
        else:
            return f"Quest ({self.id})"



class PendingBan(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    note = models.TextField(default="Keine Begründung.")
    ban = models.IntegerField(default=1)
    keep = models.IntegerField(default=0)
    users_voted = models.ManyToManyField(User)

    def __str__(self):
        return f"{self.item} ({self.ban}, {self.keep})"