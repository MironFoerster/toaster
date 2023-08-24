from django.contrib import admin
from django.urls import path, include
from toast_auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', auth_views.login, name='login'),
    path('testtoken/', auth_views.test_token, name='testtoken'),
    path('registry/', include('registry.urls')),
    path('state/', include('state.urls')),
]
