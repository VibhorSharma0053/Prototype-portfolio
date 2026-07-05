"""Pydantic models for authentication."""

from pydantic import BaseModel


class UserLogin(BaseModel):
    """Credentials for admin login."""

    username: str
    password: str


class TokenResponse(BaseModel):
    """JWT token returned after successful login."""

    token: str
    user: dict
