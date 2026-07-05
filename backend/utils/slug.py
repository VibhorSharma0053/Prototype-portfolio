"""Slug generation utility."""

import re


def generate_slug(text: str) -> str:
    """Convert *text* into a URL-safe slug.

    Steps:
      1. Lower-case the string.
      2. Replace any run of non-alphanumeric characters with a single hyphen.
      3. Strip leading / trailing hyphens.
    """
    slug = text.lower()
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    slug = slug.strip("-")
    return slug
