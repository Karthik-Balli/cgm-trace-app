# app/utils/jwt_security.py
from fastapi import Depends, HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from app.config.settings import settings
import os

security = HTTPBearer()  # Authorization: Bearer <token>

def _load_public_key():
    path = settings.JWT_PUBLIC_KEY_PATH
    if not os.path.exists(path):
        # Not a fatal error during development — return None
        return None
    with open(path, "r") as f:
        return f.read()

PUBLIC_KEY = _load_public_key()

def verify_jwt_token(token: str):
    if PUBLIC_KEY is None:
        # In development allow bypass? Better to raise error.
        raise HTTPException(status_code=401, detail="Public key not configured.")
    try:
        payload = jwt.decode(token, PUBLIC_KEY, algorithms=[settings.JWT_ALGO])
        return payload
    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"Token verification failed: {str(e)}")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    payload = verify_jwt_token(token)
    # standard claim mapping: sub or user_id
    user_id = payload.get("sub") or payload.get("id") or payload.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token: missing user id")
    # You can fetch user from DB here if needed. For now return payload
    return {"id": user_id, **payload}
