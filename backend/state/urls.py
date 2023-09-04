from django.urls import path
from . import views

app_name = "state"

urlpatterns = [
    path('questdata/', views.quests_data),
    path('bandata/', views.ban_data),
    path('killvaldata/', views.killval_data),
    path('newitem/', views.new_item),
    path('setquestopened/', views.set_quest_opened),
    path('surrenderquest/', views.surrender_quest),
    path('requestkillval/', views.request_kill_val),
    
    path('validatekill/', views.validate_kill),
    path('voteban/', views.vote_ban),
]
