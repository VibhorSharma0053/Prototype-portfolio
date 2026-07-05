"""FastAPI application entry-point."""

import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from config.database import shutdown_db, startup_db
from config.settings import settings
from routes.auth import router as auth_router
from routes.contacts import router as contacts_router
from routes.prototypes import router as prototypes_router
from routes.uploads import router as uploads_router

# Ensure upload directories exist before StaticFiles mount validates them.
os.makedirs(os.path.join(settings.UPLOAD_DIR, "thumbnails"), exist_ok=True)
os.makedirs(os.path.join(settings.UPLOAD_DIR, "gallery"), exist_ok=True)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage startup / shutdown lifecycle events."""
    # Connect to MongoDB.
    await startup_db()

    yield

    # --- Shutdown ---
    await shutdown_db()


app = FastAPI(
    title="Vibhor Sharma Portfolio API",
    version="1.0.0",
    lifespan=lifespan,
)

# ---------------------------------------------------------------------------
# Middleware
# ---------------------------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Static files – serve uploaded assets
# ---------------------------------------------------------------------------

app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# ---------------------------------------------------------------------------
# Routers
# ---------------------------------------------------------------------------

app.include_router(auth_router, prefix="/api")
app.include_router(prototypes_router, prefix="/api")
app.include_router(contacts_router, prefix="/api")
app.include_router(uploads_router, prefix="/api")


@app.get("/")
async def root():
    """Health-check endpoint."""
    return {"message": "Vibhor Sharma Portfolio API", "status": "running"}
