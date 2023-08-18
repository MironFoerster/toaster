from django.urls import path
from . import views

app_name = "info"

urlpatterns = [
    path("", views.display, name="display"),
    path("logdata/", views.log_data, name="logdata"),
]
