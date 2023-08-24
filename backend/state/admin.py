from django.contrib import admin
from .models import Item, Quest, PendingBan

admin.site.register(Item)
admin.site.register(Quest)
admin.site.register(PendingBan)