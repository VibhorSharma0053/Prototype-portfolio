"""Prototype CRUD routes."""

from datetime import datetime, timezone

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, status

from config.database import get_database
from middleware.auth_middleware import get_current_user
from models.prototype import PrototypeCreate, PrototypeResponse, PrototypeUpdate
from utils.slug import generate_slug

router = APIRouter(tags=["prototypes"])


def _doc_to_response(doc: dict) -> PrototypeResponse:
    """Map a MongoDB document to a PrototypeResponse."""
    return PrototypeResponse(
        id=str(doc["_id"]),
        title=doc["title"],
        businessName=doc["businessName"],
        category=doc["category"],
        description=doc["description"],
        technologies=doc.get("technologies", []),
        tags=doc.get("tags", []),
        slug=doc["slug"],
        thumbnail=doc.get("thumbnail"),
        gallery=doc.get("gallery", []),
        previewURL=doc.get("previewURL"),
        githubURL=doc.get("githubURL"),
        liveURL=doc.get("liveURL"),
        featured=doc.get("featured", False),
        status=doc.get("status", "draft"),
        createdAt=doc["createdAt"],
        updatedAt=doc["updatedAt"],
    )


# ---------------------------------------------------------------------------
# Public endpoints
# ---------------------------------------------------------------------------


@router.get("/prototypes", response_model=list[PrototypeResponse])
async def list_prototypes(
    q: str | None = Query(None, description="Search term"),
    category: str | None = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
):
    """List published prototypes with optional search and filtering."""
    db = get_database()
    query: dict = {"status": "published"}

    if category:
        query["category"] = category

    if q:
        search_regex = {"$regex": q, "$options": "i"}
        query["$or"] = [
            {"title": search_regex},
            {"businessName": search_regex},
            {"tags": search_regex},
            {"technologies": search_regex},
        ]

    skip = (page - 1) * limit
    cursor = db.prototypes.find(query).sort("createdAt", -1).skip(skip).limit(limit)
    docs = await cursor.to_list()
    return [_doc_to_response(d) for d in docs]


@router.get("/prototypes/featured", response_model=list[PrototypeResponse])
async def list_featured():
    """List published prototypes marked as featured."""
    db = get_database()
    cursor = db.prototypes.find({"status": "published", "featured": True}).sort("createdAt", -1)
    docs = await cursor.to_list()
    return [_doc_to_response(d) for d in docs]


@router.get("/prototypes/{slug}", response_model=PrototypeResponse)
async def get_prototype(slug: str):
    """Get a single prototype by its slug."""
    db = get_database()
    doc = await db.prototypes.find_one({"slug": slug})
    if doc is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Prototype not found")
    return _doc_to_response(doc)


# ---------------------------------------------------------------------------
# Protected endpoints
# ---------------------------------------------------------------------------


@router.post("/prototypes", response_model=PrototypeResponse, status_code=status.HTTP_201_CREATED)
async def create_prototype(
    body: PrototypeCreate,
    _current_user: dict = Depends(get_current_user),
):
    """Create a new prototype (admin only)."""
    db = get_database()
    now = datetime.now(timezone.utc)
    slug = generate_slug(body.title)

    # Ensure the slug is unique by appending a counter if needed.
    base_slug = slug
    counter = 1
    while await db.prototypes.find_one({"slug": slug}):
        slug = f"{base_slug}-{counter}"
        counter += 1

    doc = {
        **body.model_dump(),
        "slug": slug,
        "thumbnail": None,
        "gallery": [],
        "createdAt": now,
        "updatedAt": now,
    }
    result = await db.prototypes.insert_one(doc)
    doc["_id"] = result.inserted_id
    return _doc_to_response(doc)


@router.put("/prototypes/{id}", response_model=PrototypeResponse)
async def update_prototype(
    id: str,
    body: PrototypeUpdate,
    _current_user: dict = Depends(get_current_user),
):
    """Update an existing prototype (admin only)."""
    db = get_database()

    try:
        oid = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid ID format")

    updates = body.model_dump(exclude_none=True)
    if not updates:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No fields to update")

    # Re-generate slug when title changes.
    if "title" in updates:
        new_slug = generate_slug(updates["title"])
        base_slug = new_slug
        counter = 1
        while True:
            existing = await db.prototypes.find_one({"slug": new_slug, "_id": {"$ne": oid}})
            if existing is None:
                break
            new_slug = f"{base_slug}-{counter}"
            counter += 1
        updates["slug"] = new_slug

    updates["updatedAt"] = datetime.now(timezone.utc)

    result = await db.prototypes.find_one_and_update(
        {"_id": oid},
        {"$set": updates},
        return_document=True,
    )
    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Prototype not found")
    return _doc_to_response(result)


@router.delete("/prototypes/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_prototype(
    id: str,
    _current_user: dict = Depends(get_current_user),
):
    """Delete a prototype (admin only)."""
    db = get_database()

    try:
        oid = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid ID format")

    result = await db.prototypes.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Prototype not found")
