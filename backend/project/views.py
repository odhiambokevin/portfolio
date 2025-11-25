"""view for root path /"""
from django.shortcuts import render

def home(request):
     return render(request, 'index.html')