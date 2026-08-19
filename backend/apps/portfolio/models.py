"""model for portfolio app"""
from django.db import models

class Portfolio(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=100)
    image = models.ImageField(default="/default_photo.png",upload_to='portfolio_photo/', null=True, db_column='image')
    url = models.CharField(max_length=100)
  
    class Meta:
        verbose_name = "Skills"
        verbose_name_plural = "Skills"
        db_table = "portfolio_portfolio"

    def __str__(self):
        return f"{self.title}"
