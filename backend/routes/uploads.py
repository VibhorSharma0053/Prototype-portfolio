"""File-upload routes."""

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, status

from middleware.auth_middleware import get_current_user
from services.storage_service import storage

router = APIRouter(tags=["uploads"])

ALLOWED_TYPES = {"thumbnail", "gallery"}


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    type: str = Form(..., description="Either 'thumbnail' or 'gallery'"),
    _current_user: dict = Depends(get_current_user),
):
    """Upload a file to the local storage (admin only).

    Accepts a multipart form with ``file`` and ``type`` fields.
    Returns the relative URL path of the saved file.
    """
    if type not in ALLOWED_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid type '{type}'. Must be one of: {', '.join(ALLOWED_TYPES)}",
        )

    try:
        content = await file.read()
        file_path = await storage.save_file(content, file.filename or "upload.bin", type)
        return {"filePath": file_path}
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Upload failed: {exc}",
        )


@router.delete("/upload/{filename}")
async def delete_file(
    filename: str,
    _current_user: dict = Depends(get_current_user),
):
    """Delete an uploaded file by filename (admin only).

    The *filename* is the UUID-based name (e.g. ``abcd1234.png``).
    The server searches both ``thumbnail`` and ``gallery`` directories.
    """
    # Try both directories.
    for subdir in ALLOWED_TYPES:
        path = f"/uploads/{subdir}/{filename}"
        if await storage.delete_file(path):
            return {"deleted": True, "filePath": path}

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="File not found",
    )
