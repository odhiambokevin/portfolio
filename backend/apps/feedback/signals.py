import logging
from .models import Feedback
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings

logger = logging.getLogger(__name__)

@receiver(post_save, sender=Feedback)
def send_feedback_email(sender, instance, created, **kwargs):
  if created:
    message = f"Message from my Portfolio website sent by {instance.name}, Email: {instance.email}. \nMessage: {instance.message}"
    send_mail(instance.subject,message, settings.DEFAULT_FROM_EMAIL,settings.ADMINS)