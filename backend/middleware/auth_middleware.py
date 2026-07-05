"""FastAPI dependency for JWT-based authentication."""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from services.auth_service import verify_token

_bearer_scheme = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(_bearer_scheme),
) -> dict:
    """Extract and verify the Bearer token.

    Returns the decoded JWT payload (contains ``sub`` and ``username``).
    Raises 401 if the token is missing, expired, or invalid.
    """
    try:
        payload = verify_token(credentials.credentials)
        return payload
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
