"""Pydantic models for the Contact resource."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class ContactCreate(BaseModel):
    """Payload for submitting a contact form."""

    name: str
    email: EmailStr
    phone: Optional[str] = None
    businessType: Optional[str] = None
    message: str


class ContactResponse(BaseModel):
    """Serialised contact message returned to the client."""

    id: str
    name: str
    email: str
    phone: Optional[str] = None
    businessType: Optional[str] = None
    message: str
    read: bool = False
    createdAt: datetime
