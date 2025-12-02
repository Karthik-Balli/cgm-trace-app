# app/config/settings.py
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env")
    MONGO_URI: str = "mongodb://localhost:27017"
    DB_NAME: str = "cgm_trace_db"
    PORT: int = 8000
    JWT_PUBLIC_KEY_PATH: str = "./keys/public.pem"
    JWT_ALGO: str = "RS256"

settings = Settings()
