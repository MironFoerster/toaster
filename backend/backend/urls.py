from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from toast_auth import views as auth_views
import debug_toolbar

urlpatterns = [
    path('__debug__/', include(debug_toolbar.urls)),
    path('admin/', admin.site.urls),
    path('auth/login/', auth_views.login),
    path('userdata/', auth_views.user_data),
    path('testtoken/', auth_views.test_token),
    path('registry/', include('registry.urls')),
    path('state/', include('state.urls')),
    
]