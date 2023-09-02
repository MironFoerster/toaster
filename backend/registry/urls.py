from django.urls import path
from . import views

app_name = "registry"

urlpatterns = [
    path('logdata/', views.log_data, name='logdata'),
    path('infodata/', views.info_data, name='infodata'),
    path('blogdata/', views.blog_data, name='blogdata'),
    path('unreadlogdata/', views.unread_log_data, name='unreadlogdata'),
    path('statsdata/', views.stats_data, name='statsdata'),
]
