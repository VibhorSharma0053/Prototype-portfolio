"""Contact-form routes."""

from datetime import datetime, timezone

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, status

from config.database import get_database
from middleware.auth_middleware import get_current_user
from models.contact import ContactCreate, ContactResponse

router = APIRouter(tags=["contacts"])


def _doc_to_response(doc: dict) -> ContactResponse:
    """Map a MongoDB document to a ContactResponse."""
    return ContactResponse(
        id=str(doc["_id"]),
        name=doc["name"],
        email=doc["email"],
        phone=doc.get("phone"),
        businessType=doc.get("businessType"),
        message=doc["message"],
        read=doc.get("read", False),
        createdAt=doc["createdAt"],
    )


# ---------------------------------------------------------------------------
# Public
# ---------------------------------------------------------------------------


@router.post("/contact", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact(body: ContactCreate):
    """Submit a contact-form message (public)."""
    db = get_database()
    doc = {
        **body.model_dump(),
        "read": False,
        "createdAt": datetime.now(timezone.utc),
    }
    result = await db.contacts.insert_one(doc)
    doc["_id"] = result.inserted_id
    return _doc_to_response(doc)


# ---------------------------------------------------------------------------
# Protected
# ---------------------------------------------------------------------------


@router.get("/messages", response_model=list[ContactResponse])
async def list_messages(_current_user: dict = Depends(get_current_user)):
    """List all contact messages (admin only)."""
    db = get_database()
    cursor = db.contacts.find().sort("createdAt", -1)
    docs = await cursor.to_list()
    return [_doc_to_response(d) for d in docs]


@router.delete("/messages/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_message(id: str, _current_user: dict = Depends(get_current_user)):
    """Delete a contact message (admin only)."""
    db = get_database()

    try:
        oid = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid ID format")

    result = await db.contacts.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
