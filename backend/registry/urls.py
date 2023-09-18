from django.urls import path
from . import views

app_name = "registry"

urlpatterns = [
    path('logdata/', views.log_data),
    path('infodata/', views.info_data),
    path('blogdata/', views.blog_data),
    path('unreadlogdata/', views.unread_log_data),
    path('statsdata/', views.stats_data),
    path('newblog/', views.new_blog),
]
