from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    last_login = models.DateTimeField(default=timezone.datetime(2023, 9, 1, 0, 0, 0, 0))
    prev_login = models.DateTimeField(default=timezone.datetime(2023, 9, 1, 0, 0, 0, 0))
