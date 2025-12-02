# main.py
import uvicorn
from fastapi import FastAPI
from app.routes.glucose_routes import router as glucose_router
from app.routes.insights_routes import router as insights_router
from app.routes.ml_routes import router as ml_router
from app.routes.auth_routes import router as auth_router
from app.config.db import startup_indexes
from app.config.settings import settings

app = FastAPI(title="CGM Trace API", version="0.1.0")

app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(glucose_router, prefix="/glucose", tags=["Glucose"])
app.include_router(insights_router, prefix="/insights", tags=["Insights"])
app.include_router(ml_router, prefix="/ml", tags=["ML"])

@app.on_event("startup")
async def on_startup():
    # create DB indexes asynchronously
    startup_indexes()

@app.get("/")
def root():
    return {"message": "CGM Trace API — Ready"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=int(settings.PORT), reload=True)
