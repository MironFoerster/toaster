from django.urls import path
from . import views

app_name = "state"

urlpatterns = [
    path('questdata/', views.quests_data, name='questsdata'),
    path('bandata/', views.ban_data, name='bandata'),
    path('killvaldata/', views.killval_data, name='killvaldata'),

    path('newitem/', views.new_item, name='newitem'),
    path('openedquestsubmit/', views.killval_data, name='openedquestsubmit'),
]
