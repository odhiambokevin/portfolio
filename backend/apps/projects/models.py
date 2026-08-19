"""model for projects app"""
from django.db import models

class Project(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=100)
    image = models.ImageField(default="/default_photo.png",upload_to='project_photo/', null=True, db_column='image')
    stack = models.TextField()
    url = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Projects"
        verbose_name_plural = "Projects"
        db_table = "portfolio_projects"

    def __str__(self):
        return f"{self.title}"
