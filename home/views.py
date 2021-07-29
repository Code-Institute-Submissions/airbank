from django.shortcuts import render

# Create your views here.


def index(request):
    """ View to home page"""
    return render(request, "home/index.html")
