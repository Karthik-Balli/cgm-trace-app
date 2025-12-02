# app/schemas/glucose_schema.py
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class GlucosePoint(BaseModel):
    timestamp: datetime
    glucose_value: float

class GlucoseBulkIn(BaseModel):
    user_id: str
    points: List[GlucosePoint]

class GlucoseInsertResult(BaseModel):
    inserted_count: int
