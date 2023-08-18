from django.urls import path
from . import views

app_name = "personal"

urlpatterns = [
    path("", views.profile, name="profile"),
    path("login/", views.login_user, name="login"),
    path("questsdata/", views.quests_data, name="questsdata"),
    path("quests/", views.quests, name="quests"),
]