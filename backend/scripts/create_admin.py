"""Standalone script to create an admin user in MongoDB.

Usage:
    python -m scripts.create_admin
"""

import sys
from getpass import getpass
from pathlib import Path

# Ensure the project root is on sys.path so we can import settings.
_root = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(_root))

from dotenv import load_dotenv

load_dotenv(_root / ".env")

import bcrypt
from pymongo import MongoClient

from config.settings import settings


def main() -> None:
    """Prompt for credentials and insert an admin user."""
    print("=== Create Admin User ===\n")

    username = input("Username: ").strip()
    if not username:
        print("Error: username cannot be empty.")
        sys.exit(1)

    password = getpass("Password: ")
    if not password:
        print("Error: password cannot be empty.")
        sys.exit(1)

    confirm = getpass("Confirm password: ")
    if password != confirm:
        print("Error: passwords do not match.")
        sys.exit(1)

    # Hash the password.
    hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    # Connect synchronously (this script is not async).
    client: MongoClient = MongoClient(settings.MONGODB_URL)
    db = client[settings.DB_NAME]

    # Check for duplicate username.
    if db.users.find_one({"username": username}):
        print(f"Error: user '{username}' already exists.")
        sys.exit(1)

    db.users.insert_one({"username": username, "password": hashed})
    print(f"\n✔ Admin user '{username}' created successfully.")

    client.close()


if __name__ == "__main__":
    main()
