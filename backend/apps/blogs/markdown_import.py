"""
turn an uploaded markdown / mdx file into values for the Blog model

optional supported front matter placed at the very top of the file:

    ---
    title: My post
    intro: One or two sentences shown on the blog list      # also: description, excerpt, summary
    slug: my-post
    category: backend                                        # engineering|gis|database|backend|analytics|general
    tags: [django, gis]                                      # or "django, gis"
    author: kevin
    credit: Photo by someone
    date: 2026-10-06                                         # also: posted_on, published
    read: 5                                                  # minutes, calculated from the word count when missing
    ---

anything missing is worked out from the file itself ie first `# heading` > title, first paragraph > intro,
file name > slug).
cover image is not read from the file and should be uploaded in the wagtail editor.
"""
import math
import re
from datetime import date, datetime, time

import yaml
from django.utils import timezone
from django.utils.dateparse import parse_date, parse_datetime
from django.utils.text import slugify

from .models import Category

MAX_FILE_BYTES = 1_000_000  # 1MB of text is sufficient for a blog post
WORDS_PER_MINUTE = 200

FRONT_MATTER_RE = re.compile(r"\A---[ \t]*\n(?:(.*?)\n)?---[ \t]*(?:\n|\Z)", re.DOTALL)
H1_RE = re.compile(r"^#[ \t]+(.+?)[ \t#]*$", re.MULTILINE)

INTRO_KEYS = ("intro", "description", "excerpt", "summary", "subtitle")
DATE_KEYS = ("posted_on", "date", "published", "published_at")
READ_KEYS = ("read", "read_time", "reading_time")


class MarkdownImportError(ValueError):
    """the file cannot be turned into a blog post, the message is shown to the editor"""


def _first(meta, keys):
    for key in keys:
        if meta.get(key) not in (None, ""):
            return meta[key]
    return None


def _to_datetime(value):
    if isinstance(value, datetime):
        dt = value
    elif isinstance(value, date):
        dt = datetime.combine(value, time(9, 0))
    else:
        text = str(value).strip()
        dt = parse_datetime(text)
        if dt is None:
            d = parse_date(text)
            if d is None:
                raise MarkdownImportError(f"could not understand the date '{text}' (use YYYY-MM-DD)")
            dt = datetime.combine(d, time(9, 0))
    if timezone.is_naive(dt):
        dt = timezone.make_aware(dt)
    return dt


def _to_tags(value):
    if value is None:
        return []
    if isinstance(value, str):
        value = value.split(",")
    tags, seen = [], set()
    for tag in value:
        tag = str(tag).strip()
        if tag and tag.lower() not in seen:
            seen.add(tag.lower())
            tags.append(tag[:50])
    return tags


def _intro_from_body(body):
    """first plain paragraph of the body, trimmed to ~220 characters"""
    skip = ("#", "import ", "export ", "<", "```", "~~~", "!", "-", "*", "+", ">", "|", "---", "{")
    for block in re.split(r"\n\s*\n", body):
        block = block.strip()
        if not block or block.startswith(skip) or re.match(r"\d+\.\s", block):
            continue
        text = re.sub(r"!?\[([^\]]*)\]\([^)]*\)", r"\1", block)  # [text](url) -> text
        text = re.sub(r"[`*_~]", "", text)
        text = re.sub(r"\s+", " ", text).strip()
        if len(text) > 220:
            text = text[:220].rsplit(" ", 1)[0].rstrip(",.;:") + "..."
        return text
    return ""


def parse_markdown(raw, filename=""):
    """
    returns (fields, warnings)
      fields   -> dict of Blog model fields
      warnings -> list of friendly strings about things we had to guess or ignore
    """
    warnings = []

    if isinstance(raw, bytes):
        if len(raw) > MAX_FILE_BYTES:
            raise MarkdownImportError("file is larger than 1 MB")
        try:
            text = raw.decode("utf-8-sig")
        except UnicodeDecodeError as exc:
            raise MarkdownImportError("file is not valid UTF-8 text") from exc
    else:
        text = raw
    text = text.replace("\r\n", "\n").replace("\r", "\n")

    meta, body = {}, text
    match = FRONT_MATTER_RE.match(text)
    if match:
        try:
            meta = yaml.safe_load(match.group(1) or "") or {}
        except yaml.YAMLError as exc:
            raise MarkdownImportError(f"the front matter (--- block) is not valid YAML: {exc}") from exc
        if not isinstance(meta, dict):
            raise MarkdownImportError("the front matter (--- block) must be key: value pairs")
        body = text[match.end():]
    meta = {str(k).strip().lower(): v for k, v in meta.items()}
    body = body.strip()
    if not body:
        raise MarkdownImportError("the file has no content after the front matter")

    stem = re.sub(r"\.(md|mdx|markdown|txt)$", "", filename or "", flags=re.IGNORECASE)

    # title: front matter -> first "# heading" (removed from the body so it is not shown twice) -> file name
    title = meta.get("title")
    if not title:
        h1 = H1_RE.search(body)
        if h1 and body[:h1.start()].strip() == "":
            title = h1.group(1).strip()
            body = body[h1.end():].lstrip("\n")
        elif stem:
            title = re.sub(r"[-_]+", " ", stem).strip().title()
            warnings.append("no title found, used the file name")
    if not title:
        raise MarkdownImportError("no title found (add `title:` to the front matter or start the file with `# Title`)")
    title = str(title).strip()

    intro = _first(meta, INTRO_KEYS)
    if intro:
        intro = str(intro).strip()
    else:
        intro = _intro_from_body(body)
        warnings.append("no intro in the front matter, used the first paragraph")
    if not intro:
        intro = title

    slug = slugify(str(meta.get("slug") or "")) or slugify(title) or slugify(stem)
    if not slug:
        raise MarkdownImportError("could not build a slug, add `slug:` to the front matter")

    fields = {
        "title": title,
        "intro": intro,
        "slug": slug[:200],
        "body": body,
        "tags": _to_tags(meta.get("tags")),
    }

    category = str(meta.get("category") or "").strip().lower()
    if category:
        if category in Category.values:
            fields["category"] = category
        else:
            fields["category"] = Category.General
            warnings.append(f"unknown category '{category}', used 'general' (allowed: {', '.join(Category.values)})")

    if meta.get("author"):
        fields["author"] = str(meta["author"]).strip()[:100]
    if meta.get("credit"):
        fields["credit"] = str(meta["credit"]).strip()[:100]

    when = _first(meta, DATE_KEYS)
    if when is not None:
        fields["posted_on"] = _to_datetime(when)

    read = _first(meta, READ_KEYS)
    try:
        fields["read"] = max(1, int(read)) if read is not None else max(1, math.ceil(len(re.findall(r"\w+", body)) / WORDS_PER_MINUTE))
    except (TypeError, ValueError):
        raise MarkdownImportError(f"`read` must be a number of minutes, got '{read}'")

    if meta.get("image") or meta.get("cover"):
        warnings.append("images in front matter are ignored, upload the cover image in the editor")

    return fields, warnings
