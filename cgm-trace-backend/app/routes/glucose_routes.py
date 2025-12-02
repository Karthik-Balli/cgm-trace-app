# app/routes/glucose_routes.py
from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from fastapi.responses import JSONResponse
from app.utils.csv_parser import parse_csv_bytes
from app.services.glucose_service import insert_glucose_bulk, fetch_points
from app.utils.jwt_security import get_current_user
from typing import Optional
from datetime import datetime

router = APIRouter()

@router.post("/upload")
async def upload_csv(
    file: UploadFile = File(...),
    start_date: Optional[str] = Form(None),
    end_date: Optional[str] = Form(None),
    user=Depends(get_current_user)
):
    """
    Upload CSV, parse and insert into MongoDB for the logged-in user.
    """
    content = await file.read()
    try:
        df = await parse_csv_bytes(content, start=start_date, end=end_date)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"CSV parse error: {str(e)}")
    # map to documents
    points = []
    for _, row in df.iterrows():
        points.append({
            "timestamp": row["DisplayDtTm"].to_pydatetime() if hasattr(row["DisplayDtTm"], "to_pydatetime") else row["DisplayDtTm"],
            "glucose_value": float(row["Glucose Value"])
        })
    inserted = await insert_glucose_bulk(user["id"], points)
    return {"inserted_count": inserted}

@router.get("/points")
async def get_points(user=Depends(get_current_user), limit: int = 2000, start: Optional[datetime] = None, end: Optional[datetime] = None):
    pts = await fetch_points(user_id=user["id"], start=start, end=end, limit=limit)
    return {"points_count": len(pts), "points": pts}
