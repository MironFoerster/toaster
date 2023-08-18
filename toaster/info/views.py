from django.shortcuts import render
from django.http import JsonResponse
from .models import Log, Blog

# Create your views here.
def display(request):
    return render(request, "info/index.html", context={"key": "value"})


def log_data(request):
    logdata = Log.objects.order_by("date").values()
    print(Log.objects.values())
    print(list(Log.objects.values()))
    return JsonResponse(list(logdata), safe=False)


def blog_data(request):
    blogdata = Blog.objects.order_by("date").values()
    return JsonResponse(list(blogdata), safe=False)