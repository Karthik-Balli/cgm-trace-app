# app/routes/auth_routes.py
from fastapi import APIRouter, Depends
from app.utils.jwt_security import get_current_user

router = APIRouter()

@router.get("/whoami")
async def whoami(user=Depends(get_current_user)):
    # returns token payload (for testing RS256 integration)
    return {"user": user}
