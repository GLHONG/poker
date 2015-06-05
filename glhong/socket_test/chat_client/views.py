from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.template.loader import get_template


def chat(request):
    template = get_template('index.html')
    return HttpResponse(template.render())