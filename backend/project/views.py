"""view for root path ie /"""
from django.shortcuts import render

def home(request):
     return render(request, 'index.html')