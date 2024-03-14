"""Pagination for feedback app"""
from rest_framework.pagination import PageNumberPagination

class FeedbackPagination(PageNumberPagination):
    page_size = 100