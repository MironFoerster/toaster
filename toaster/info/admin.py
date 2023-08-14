from django.contrib import admin

from .models import Log, Blog, MsgTemplate

admin.site.register(Log)
admin.site.register(Blog)
admin.site.register(MsgTemplate)