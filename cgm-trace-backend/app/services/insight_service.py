# app/services/insight_service.py
from typing import Optional, Dict, Any
from datetime import datetime
from app.config.db import db
import math

async def compute_insights(
    user_id: str,
    start: Optional[datetime] = None,
    end: Optional[datetime] = None,
    lower_bound: float = 70.0,
    upper_bound: float = 180.0
) -> Dict[str, Any]:
    match = {"user_id": user_id}
    if start and end:
        match["timestamp"] = {"$gte": start, "$lte": end}
    elif start:
        match["timestamp"] = {"$gte": start}
    elif end:
        match["timestamp"] = {"$lte": end}

    pipeline = [
        {"$match": match},
        {"$project": {"glucose_value": 1, "timestamp": 1}},
        {"$group": {
            "_id": None,
            "count": {"$sum": 1},
            "sum": {"$sum": "$glucose_value"},
            "min": {"$min": "$glucose_value"},
            "max": {"$max": "$glucose_value"}
        }}
    ]
    agg = await db["glucose"].aggregate(pipeline).to_list(length=1)
    if not agg:
        return {
            "user_id": user_id,
            "start": start,
            "end": end,
            "avg_glucose": None,
            "min_glucose": None,
            "max_glucose": None,
            "time_in_range_pct": None,
            "total_points": 0,
            "highs_count": 0,
            "lows_count": 0
        }
    stats = agg[0]
    total = int(stats.get("count", 0))
    avg = stats["sum"] / total if total > 0 else None
    mini = stats.get("min")
    maxi = stats.get("max")

    pipeline_counts = [
        {"$match": match},
        {"$group": {
            "_id": None,
            "highs": {"$sum": {"$cond": [{"$gt": ["$glucose_value", upper_bound]}, 1, 0]}},
            "lows": {"$sum": {"$cond": [{"$lt": ["$glucose_value", lower_bound]}, 1, 0]}},
            "in_range": {"$sum": {"$cond": [
                {"$and": [{"$gte": ["$glucose_value", lower_bound]}, {"$lte": ["$glucose_value", upper_bound]}]},
                1,
                0
            ]}}
        }}
    ]
    counts_res = await db["glucose"].aggregate(pipeline_counts).to_list(length=1)
    highs = lows = in_range = 0
    time_in_range_pct = None
    if counts_res:
        counts = counts_res[0]
        highs = int(counts.get("highs", 0))
        lows = int(counts.get("lows", 0))
        in_range = int(counts.get("in_range", 0))
        time_in_range_pct = (in_range / total * 100.0) if total > 0 else None

    return {
        "user_id": user_id,
        "start": start,
        "end": end,
        "avg_glucose": round(avg, 2) if avg is not None else None,
        "min_glucose": mini,
        "max_glucose": maxi,
        "time_in_range_pct": round(time_in_range_pct, 2) if time_in_range_pct is not None else None,
        "total_points": total,
        "highs_count": highs,
        "lows_count": lows
    }
