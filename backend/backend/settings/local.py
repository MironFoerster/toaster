from .base import *

ALLOWED_HOSTS = ["127.0.0.1", 'localhost']
SECRET_KEY = '4hd498h3045zrdjfu786rjrlnvcp237b'
DEBUG = True
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

CORS_ALLOWED_ORIGINS = [
    'http://localhost:4200',
]