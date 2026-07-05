"""File-storage abstraction with a local-disk implementation."""

import os
import uuid
from abc import ABC, abstractmethod

import aiofiles

from config.settings import settings


class StorageService(ABC):
    """Abstract base for file-storage backends."""

    @abstractmethod
    async def save_file(self, file_content: bytes, original_filename: str, file_type: str) -> str:
        """Persist *file_content* and return the relative file path."""

    @abstractmethod
    async def delete_file(self, file_path: str) -> bool:
        """Delete the file at *file_path*. Return True on success."""

    @abstractmethod
    def get_file_url(self, file_path: str) -> str:
        """Return a URL-friendly path for the stored file."""


class LocalStorageService(StorageService):
    """Store files on the local filesystem under ``UPLOAD_DIR``."""

    def __init__(self) -> None:
        self.upload_dir = settings.UPLOAD_DIR

    async def save_file(self, file_content: bytes, original_filename: str, file_type: str) -> str:
        """Save to ``uploads/{file_type}/{uuid}.{ext}``."""
        ext = original_filename.rsplit(".", 1)[-1] if "." in original_filename else "bin"
        unique_name = f"{uuid.uuid4().hex}.{ext}"
        target_dir = os.path.join(self.upload_dir, file_type)
        os.makedirs(target_dir, exist_ok=True)

        full_path = os.path.join(target_dir, unique_name)
        async with aiofiles.open(full_path, "wb") as f:
            await f.write(file_content)

        # Return the relative path used for URL resolution.
        return f"/uploads/{file_type}/{unique_name}"

    async def delete_file(self, file_path: str) -> bool:
        """Delete file from disk. *file_path* is the relative ``/uploads/…`` path."""
        # Strip leading slash so os.path.join works correctly.
        relative = file_path.lstrip("/")
        full_path = os.path.join(".", relative)
        if os.path.isfile(full_path):
            os.remove(full_path)
            return True
        return False

    def get_file_url(self, file_path: str) -> str:
        """Return the file path as-is (served via StaticFiles mount)."""
        return file_path


# Module-level singleton for convenience.
storage = LocalStorageService()
