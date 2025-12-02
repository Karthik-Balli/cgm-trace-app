# app/routes/insights_routes.py
from fastapi import APIRouter, Depends, Query
from typing import Optional
from datetime import datetime
from app.utils.jwt_security import get_current_user
from app.services.insight_service import compute_insights

router = APIRouter()

@router.get("/summary")
async def summary(
    user=Depends(get_current_user),
    start: Optional[datetime] = Query(None),
    end: Optional[datetime] = Query(None),
    lower_bound: float = Query(70.0),
    upper_bound: float = Query(180.0)
):
    result = await compute_insights(user_id=user["id"], start=start, end=end, lower_bound=lower_bound, upper_bound=upper_bound)
    return result
