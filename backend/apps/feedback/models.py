"""model for feedback app"""
from django.db import models
from django.core.mail import send_mail

class Feedback(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(verbose_name='Email Address')
    subject = models.CharField(max_length=100)
    message = models.TextField()
    posted_on = models.DateTimeField(auto_now_add=True)
 
    class Meta:
        ordering = ['-posted_on',]
        verbose_name = "Feedback"
        verbose_name_plural = "Feedback"
        db_table = "portfolio_feedback"

    def __str__(self):
        return f"{self.name} on {self.posted_on}"
