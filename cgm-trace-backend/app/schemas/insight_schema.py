# app/schemas/insight_schema.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class InsightRequest(BaseModel):
    user_id: str
    start: Optional[datetime] = None
    end: Optional[datetime] = None
    lower_bound: Optional[float] = 70.0
    upper_bound: Optional[float] = 180.0

class InsightResponse(BaseModel):
    user_id: str
    start: Optional[datetime]
    end: Optional[datetime]
    avg_glucose: Optional[float]
    min_glucose: Optional[float]
    max_glucose: Optional[float]
    time_in_range_pct: Optional[float]
    total_points: int
    highs_count: int
    lows_count: int
