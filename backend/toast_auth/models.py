from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    #username = models.CharField(max_length=50, unique=True)
    #password = models.CharField(max_length=50)
    #unread_logs = models.JSONField(default=list)
    #unvoted_bans = models.JSONField(default=list)
    prev_login = models.DateTimeField(null=True)
