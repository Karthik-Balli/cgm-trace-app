# app/routes/ml_routes.py
from fastapi import APIRouter, Depends, Query, HTTPException
from typing import Optional
from datetime import datetime
from app.utils.jwt_security import get_current_user
from app.services.glucose_service import fetch_points
from app.services.ml_service import rule_based_predict, ml_model_predict

router = APIRouter()

@router.get("/recommend")
async def recommend(user=Depends(get_current_user), method: str = Query("rule"), lookback: int = Query(6)):
    # fetch last lookback*maybe multiple points to ensure
    points = await fetch_points(user_id=user["id"], limit=max(500, lookback*10))
    if not points:
        raise HTTPException(status_code=400, detail="No glucose points found")
    if method == "rule":
        res = await rule_based_predict(points, lookback=lookback)
    elif method == "ml":
        res = await ml_model_predict(points)
    else:
        raise HTTPException(status_code=400, detail="Unknown method")
    return res
