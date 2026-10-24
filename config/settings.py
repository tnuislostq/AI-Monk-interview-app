import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    APP_NAME = os.getenv("APP_NAME", "ZenMonk® — AI Interview Mentor")
    PORT = int(os.getenv("PORT", 5000))
    DEBUG = os.getenv("FLASK_ENV", "development") == "development"
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
