"""model for skills app"""
from django.db import models

class Skill(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=100)
    description = models.TextField()
    image = models.ImageField(default="/default_photo.png",upload_to='skill_photo/', null=True, db_column='image')
 
    class Meta:
        verbose_name = "Skills"
        verbose_name_plural = "Skills"
        db_table = "portfolio_skills"

    def __str__(self):
        return f"{self.title}"
