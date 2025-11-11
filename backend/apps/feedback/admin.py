"""admin settings for feedback app"""
from django.contrib import admin
from .models import Feedback

class FeedbackAdmin(admin.ModelAdmin):
	"""Fields to be displayed"""
	list_display = ('id','name', 'email', 'subject', 'posted_on')
	list_filter = ('email', 'posted_on')
	search_fields = ('posted_on',)
	list_display_links = ('name',)

	
admin.site.register(Feedback, FeedbackAdmin)