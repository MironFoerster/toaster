from django.urls import path
from . import views

app_name = "state"

urlpatterns = [
    path('newitem/', views.new_item, name='newitem'),
    path('questdata/', views.quests_data, name='questsdata'),
    path('bandata/', views.ban_data, name='bandata'),
    path('killvaldata/', views.killval_data, name='killvaldata'),
]
