"""model for blogs app"""
from django.db import models

class Blog(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=200, unique=True, verbose_name='Slug Field')
    author = models.CharField(max_length=100)
    content = models.TextField()
    image = models.ImageField(default="/default_photo.png",upload_to='blog_photo/', null=True, db_column='image')
    posted_on = models.DateTimeField(auto_now_add=True)
 
    class Meta:
        ordering = ['-posted_on',]
        verbose_name = "Blog"
        verbose_name_plural = "Blogs"
        db_table = "portfolio_blogs"

    def __str__(self):
        return f"{self.title}"
