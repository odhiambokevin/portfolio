"""model for blogs app"""
from django import forms
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.contrib.postgres.fields import ArrayField #specific to postgres
from django.utils import timezone
from django.utils.text import slugify
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.models import DraftStateMixin, RevisionMixin

class Category(models.TextChoices):
    """codeBaseValue = 'databaseValue','adminDisplayValue"""
    Engineering = "engineering", "engineering"
    GIS = "gis", "gis"
    Database = "database", "database"
    Backend = "backend", "backend"
    Analytics = "analytics", "analytics"
    General = "general", "general"


class BlogQuerySet(models.QuerySet):
    def published(self):
        """posts that are live/published in wagtail, this is what the public api serves"""
        return self.filter(live=True)

class Blog(DraftStateMixin, RevisionMixin, models.Model):
    """
    DraftStateMixin adds draft/publish so unfinished posts never reach the api
    RevisionMixin keeps a revision history in the wagtail admin
    `body` holds the raw markdown/mdx text which frontend renders it with next-mdx-remote
    """
    id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=100)
    intro = models.TextField()
    credit = models.CharField(max_length=100,null=True, blank=True)
    author = models.CharField(max_length=100, default='kevin')
    # when slug is blank it gets generated from title in clean()
    slug = models.SlugField(max_length=200, unique=True,blank=True,verbose_name='Slug Field')
    body = models.TextField()
    image = models.ImageField(default="media/blog_images/default.png",upload_to='blog_images/',blank=True, null=True, db_column='image')
    posted_on = models.DateTimeField(default=timezone.now) #now editable so imported posts can keep their original date
    read = models.PositiveIntegerField(default=4)
    tags = ArrayField(models.CharField(max_length=50),default=list,blank=True,)
    category = models.CharField(choices=Category.choices,default=Category.General,max_length=100,blank=True, null=True,db_column='category')
    
    
    _revisions = GenericRelation("wagtailcore.Revision", related_query_name="blog")

    objects = BlogQuerySet.as_manager()

    #what the editor sees in the wagtail admin
    panels = [
        FieldPanel("title"),
        FieldPanel("slug", help_text="used in the url. gnerated from title when empty"),
        FieldPanel("intro"),
        FieldPanel(
            "body",
            help_text="markdown / mdx. tip: use import markdown in the menu to create posts from .md files.",
            widget=forms.Textarea(attrs={
                "rows": 32,
                "spellcheck": "false",
                "style": "font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 0.9rem; line-height: 1.55; tab-size: 2;",
            }),
        ),
        MultiFieldPanel(
            [
                FieldPanel("category"),
                FieldPanel("tags", help_text="comma separated, e.g. django, gis, postgres"),
                FieldPanel("read", help_text="Estimated reading time in minutes"),
            ],
            heading="Classification",
        ),
        MultiFieldPanel(
            [
                FieldPanel("author"),
                FieldPanel("credit"),
                FieldPanel("posted_on"),
            ],
            heading="Attribution",
        ),
        FieldPanel("image"),
    ]

    class Meta:
        ordering = ['-posted_on',]
        verbose_name = "Blog"
        verbose_name_plural = "Blogs"
        db_table = "portfolio_blogs"

    def __str__(self):
        return f"{self.title}"
    
    def clean(self):
        """runs inside full_clean(): build a unique slug from the title when none was given"""
        super().clean()
        if not self.slug and self.title:
            self.slug = self.generate_unique_slug(self.title)

    def generate_unique_slug(self, text):
        base = slugify(text)[:180] or "post"
        slug, n = base, 2
        while Blog.objects.filter(slug=slug).exclude(pk=self.pk).exists():
            slug = f"{base}-{n}"
            n += 1
        return slug
