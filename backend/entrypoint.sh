#!/bin/sh

# Get correct settings environment variable
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
python ./manage.py migrate

# Run the application.
gunicorn 'backend.wsgi' --bind=0.0.0.0:8000
