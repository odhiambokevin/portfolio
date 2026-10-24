"""wagtail admin view: bulk create / update blog posts from .md and .mdx files"""
from dataclasses import dataclass, field

from django import forms
from django.contrib.admin.utils import quote
from django.core.exceptions import PermissionDenied, ValidationError
from django.db import transaction
from django.shortcuts import render
from django.urls import NoReverseMatch, reverse

from .markdown_import import MarkdownImportError, parse_markdown
from .models import Blog

EDIT_URL_NAME = "wagtailsnippets_blogs_blog:edit"  # wagtail's default url name for the Blog snippet


class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True


class MultipleFileField(forms.FileField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("widget", MultipleFileInput(attrs={"accept": ".md,.mdx,.markdown,.txt"}))
        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        clean_one = super().clean
        if isinstance(data, (list, tuple)):
            return [clean_one(item, initial) for item in data]
        return [clean_one(data, initial)]


class MarkdownImportForm(forms.Form):
    files = MultipleFileField(label="Markdown files", help_text="Select one or more .md / .mdx files.")
    publish_now = forms.BooleanField(
        required=False,
        label="Publish immediately",
        help_text="Leave unticked to create drafts you can review in the editor first.",
    )
    overwrite = forms.BooleanField(
        required=False,
        label="Update posts that already exist",
        help_text="Matched by slug. Without this, files whose slug already exists are skipped.",
    )


@dataclass
class ImportResult:
    filename: str
    status: str  # created | updated | skipped | failed
    title: str = ""
    slug: str = ""
    notes: list = field(default_factory=list)
    edit_url: str = ""


def _edit_url(blog):
    try:
        return reverse(EDIT_URL_NAME, args=[quote(blog.pk)])
    except NoReverseMatch:
        return ""


def _import_one(uploaded, user, publish_now, overwrite):
    result = ImportResult(filename=uploaded.name, status="failed")
    try:
        fields, warnings = parse_markdown(uploaded.read(), uploaded.name)
    except MarkdownImportError as exc:
        result.notes.append(str(exc))
        return result

    result.title, result.slug, result.notes = fields["title"], fields["slug"], list(warnings)

    existing = Blog.objects.filter(slug=fields["slug"]).first()
    if existing and not overwrite:
        result.status = "skipped"
        result.notes.append("a post with this slug already exists (tick 'Update posts that already exist' to replace its content)")
        result.edit_url = _edit_url(existing)
        return result

    blog = existing or Blog(live=False)
    for name, value in fields.items():
        setattr(blog, name, value)

    try:
        with transaction.atomic():
            if existing is None:
                blog.full_clean()
                blog.save()
            revision = blog.save_revision(user=user)  # saved as a draft revision (full_clean runs inside)
            if publish_now:
                revision.publish(user=user)
    except ValidationError as exc:
        result.notes.extend(exc.messages)
        return result

    result.status = "updated" if existing else "created"
    result.edit_url = _edit_url(blog)
    if not publish_now:
        result.notes.append("saved as a draft" if existing is None or not blog.live else "draft changes saved, the live version is unchanged")
    return result


def import_markdown_view(request):
    if not (request.user.has_perm("blogs.add_blog") and request.user.has_perm("blogs.change_blog")):
        raise PermissionDenied

    can_publish = request.user.has_perm("blogs.publish_blog")
    results = None

    if request.method == "POST":
        form = MarkdownImportForm(request.POST, request.FILES)
        if form.is_valid():
            publish_now = form.cleaned_data["publish_now"] and can_publish
            results = [
                _import_one(f, request.user, publish_now, form.cleaned_data["overwrite"])
                for f in form.cleaned_data["files"]
            ]
            if form.cleaned_data["publish_now"] and not can_publish:
                results[0].notes.append("you do not have permission to publish, everything was saved as drafts")
            form = MarkdownImportForm()
    else:
        form = MarkdownImportForm()

    return render(request, "blogs/admin/import_markdown.html", {"form": form, "results": results, "can_publish": can_publish})
