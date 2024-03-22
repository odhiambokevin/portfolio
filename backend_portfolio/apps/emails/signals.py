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
    message = f"Message from {instance.name}, {instance.email}. \n {instance.message}"
    send_mail(instance.subject,message, settings.DEFAULT_FROM_EMAIL,settings.ADMINS)

# @receiver(post_save, sender=Feedback)
# def log_entry(sender, instance, created, **kwargs):
#    logger.info(f"{instance.name} sent an email")

#   def save(self,*args, **kwargs):
#         message = f"Message from {self.name}, {self.email}. \n {self.message}"
#         send_mail(
#             self.subject,
#             message,
#             settings.DEFAULT_FROM_EMAIL,
#             settings.ADMINS
#         )
#         super(Feedback, self).save(*args, **kwargs)

  