from django.contrib import admin
from .models import Item, KillVerb, Quest, PendingBan

admin.site.register(Item)
admin.site.register(KillVerb)
admin.site.register(Quest)
admin.site.register(PendingBan)