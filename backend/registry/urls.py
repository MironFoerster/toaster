from django.urls import path
from . import views

app_name = "registry"

urlpatterns = [
    path('logdata/', views.log_data, name='logdata'),
    path('blogdata/', views.blog_data, name='blogdata'),
]
