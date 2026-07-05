"""Async MongoDB connection management using pymongo.AsyncMongoClient."""

from pymongo import AsyncMongoClient
from pymongo.asynchronous.database import AsyncDatabase

from config.settings import settings

_client: AsyncMongoClient | None = None
_database: AsyncDatabase | None = None


async def startup_db() -> None:
    """Initialise the AsyncMongoClient and pin the database reference."""
    global _client, _database
    _client = AsyncMongoClient(settings.MONGODB_URL)
    _database = _client[settings.DB_NAME]

    # Ensure required collections exist (idempotent).
    existing = await _database.list_collection_names()
    for name in ("prototypes", "contacts", "users"):
        if name not in existing:
            await _database.create_collection(name)


async def shutdown_db() -> None:
    """Close the MongoDB connection pool."""
    global _client, _database
    if _client is not None:
        _client.close()
        _client = None
        _database = None


def get_database() -> AsyncDatabase:
    """Return the current database handle.

    Must be called after startup_db().
    """
    if _database is None:
        raise RuntimeError("Database not initialised – call startup_db() first")
    return _database
