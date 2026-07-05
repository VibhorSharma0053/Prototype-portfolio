"""Authentication routes – login and token verification."""

from fastapi import APIRouter, Depends, HTTPException, status

from config.database import get_database
from middleware.auth_middleware import get_current_user
from models.user import TokenResponse, UserLogin
from services.auth_service import create_token, verify_password

router = APIRouter(tags=["auth"])


@router.post("/login", response_model=TokenResponse)
async def login(body: UserLogin):
    """Authenticate an admin user and return a JWT."""
    db = get_database()
    user = await db.users.find_one({"username": body.username})

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    if not verify_password(body.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )

    token = create_token(str(user["_id"]), user["username"])

    return TokenResponse(
        token=token,
        user={"id": str(user["_id"]), "username": user["username"]},
    )


@router.get("/verify")
async def verify(current_user: dict = Depends(get_current_user)):
    """Return the current authenticated user's info."""
    return {
        "authenticated": True,
        "user": {
            "id": current_user["sub"],
            "username": current_user["username"],
        },
    }
