"""Pydantic models for the Prototype resource."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class PrototypeCreate(BaseModel):
    """Payload for creating a new prototype."""

    title: str
    businessName: str
    category: str
    description: str
    technologies: list[str] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list)
    previewURL: Optional[str] = None
    githubURL: Optional[str] = None
    liveURL: Optional[str] = None
    featured: bool = False
    status: str = "draft"


class PrototypeUpdate(BaseModel):
    """Payload for updating a prototype – every field is optional."""

    title: Optional[str] = None
    businessName: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    technologies: Optional[list[str]] = None
    tags: Optional[list[str]] = None
    previewURL: Optional[str] = None
    githubURL: Optional[str] = None
    liveURL: Optional[str] = None
    featured: Optional[bool] = None
    status: Optional[str] = None
    thumbnail: Optional[str] = None
    gallery: Optional[list[str]] = None


class PrototypeResponse(BaseModel):
    """Serialised prototype returned to the client."""

    id: str
    title: str
    businessName: str
    category: str
    description: str
    technologies: list[str] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list)
    slug: str
    thumbnail: Optional[str] = None
    gallery: list[str] = Field(default_factory=list)
    previewURL: Optional[str] = None
    githubURL: Optional[str] = None
    liveURL: Optional[str] = None
    featured: bool = False
    status: str = "draft"
    createdAt: datetime
    updatedAt: datetime
