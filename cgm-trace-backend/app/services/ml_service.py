# app/services/ml_service.py
import numpy as np
import pandas as pd
from typing import Dict, Any, List
from datetime import datetime

GLU_KEY = "glucose_value"

async def rule_based_predict(points: List[Dict[str, Any]], lookback: int = 6) -> Dict[str, Any]:
    """
    points: list of dicts sorted ascending by timestamp: {"timestamp":..., "glucose_value": ...}
    """
    if not points or len(points) < lookback:
        return {"risk": "low", "score": 0.05, "advice": "Insufficient data."}

    vals = [float(p["glucose_value"]) for p in points[-lookback:]]
    diffs = np.diff(vals)
    avg_slope = float(np.mean(diffs))

    latest = vals[-1]

    if avg_slope < -2.0 and latest < 90:
        return {"risk": "high", "score": 0.9, "advice": "Rapid fall detected. Consider fast carbs & retest in 15 min."}
    if avg_slope < -1.0:
        return {"risk": "medium", "score": 0.45, "advice": "Downward trend. Monitor closely."}
    if avg_slope > 2.0 and latest > 180:
        return {"risk": "high", "score": 0.85, "advice": "Rapid rise detected. Consider action per care plan."}
    if avg_slope > 1.0:
        return {"risk": "medium", "score": 0.4, "advice": "Rising glucose. Observe."}
    return {"risk": "low", "score": 0.1, "advice": "Stable readings."}

async def ml_model_predict(points: List[Dict[str, Any]]) -> Dict[str, Any]:
    # Placeholder to load a model and run inference
    # e.g. load sklearn model with joblib.load and call predict_proba(features)
    return {"risk": "low", "score": 0.2, "advice": "ML model not yet trained."}
