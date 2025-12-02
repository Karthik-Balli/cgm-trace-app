Quick instructions and changelog.

# CGM Trace Backend — README

## Overview
FastAPI backend for CGM Trace. MongoDB (Motor) stores time-series glucose points. RS256 JWT verification via `app/utils/jwt_security.py`.

## Run locally
1. Create .env with MONGO_URI, DB_NAME, JWT_PUBLIC_KEY_PATH
2. Install deps:


pip install -r requirements.txt

3. Start:


uvicorn main:app --reload --port 8000


## Endpoints (auth-protected)
- GET `/` → health
- GET `/auth/whoami` → verify JWT (for testing)
- POST `/glucose/upload` → upload CSV (form file)
- GET `/glucose/points` → fetch points
- GET `/insights/summary` → aggregated metrics
- GET `/ml/recommend` → recommender

## Notes
- JWT public key must be available at path configured in `.env`
- For dev/testing you can turn off JWT verification in `jwt_security.py` but **don't** in production