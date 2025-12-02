# app/config/db.py
import motor.motor_asyncio
import asyncio
from app.config.settings import settings

client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGO_URI)
db = client[settings.DB_NAME]

async def ensure_indexes():
    # glucose: compound index for queries by user + timestamp
    await db["glucose"].create_index([("user_id", 1), ("timestamp", -1)], background=True)
    # user email index (unique) may be created by Auth service
    await db["users"].create_index("email", unique=True, background=True)

def startup_indexes(loop=None):
    if loop is None:
        loop = asyncio.get_event_loop()
    loop.create_task(ensure_indexes())
