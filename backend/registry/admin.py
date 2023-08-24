from django.contrib import admin
from .models import Log, Blog, Comment, MsgTemplate

admin.site.register(Log)
admin.site.register(Blog)
admin.site.register(Comment)
admin.site.register(MsgTemplate)