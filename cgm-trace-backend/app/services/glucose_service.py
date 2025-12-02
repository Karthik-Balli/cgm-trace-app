# app/services/glucose_service.py
from app.config.db import db
from typing import List, Dict, Any, Optional
from datetime import datetime
import math
import numpy as np

COL = "glucose"

async def insert_glucose_bulk(user_id: str, points: List[Dict[str, Any]]) -> int:
    """
    points: list of {"timestamp": datetime, "glucose_value": float}
    """
    if not points:
        return 0
    docs = []
    for p in points:
        docs.append({
            "user_id": user_id,
            "timestamp": p["timestamp"],
            "glucose_value": float(p["glucose_value"])
        })
    res = await db["glucose"].insert_many(docs)
    return len(res.inserted_ids)

async def fetch_points(user_id: str, start: Optional[datetime] = None, end: Optional[datetime] = None, limit: int = 2000):
    query = {"user_id": user_id}
    if start and end:
        query["timestamp"] = {"$gte": start, "$lte": end}
    elif start:
        query["timestamp"] = {"$gte": start}
    elif end:
        query["timestamp"] = {"$lte": end}
    cursor = db["glucose"].find(query).sort("timestamp", 1).limit(limit)
    return await cursor.to_list(length=limit)
