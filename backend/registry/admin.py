from django.contrib import admin
from .models import Info, Log, Blog, Comment, MsgTemplate

admin.site.register(Log)
admin.site.register(Info)
admin.site.register(Blog)
admin.site.register(Comment)
admin.site.register(MsgTemplate)