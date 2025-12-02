# app/models/user_model.py
from typing import Optional
from pydantic import BaseModel, EmailStr

class UserDoc(BaseModel):
    _id: Optional[str] = None
    email: EmailStr
    name: Optional[str] = None
    role: str = "patient"   # patient | doctor | admin
