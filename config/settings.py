import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    APP_NAME = os.getenv("APP_NAME", "AI Monk Interview App")
    PORT = int(os.getenv("PORT", 5000))
    DEBUG = os.getenv("FLASK_ENV", "development") == "development"
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-only-change-this-in-production")
    DATABASE_PATH = os.getenv("DATABASE_PATH", "data/app.db")
