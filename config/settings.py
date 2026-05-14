import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Application settings
APP_NAME = 'AI Monk Interview App'
DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'
PORT = int(os.getenv('PORT', 5000))

# Database/Storage settings
DATA_DIR = BASE_DIR / 'data'
DATA_DIR.mkdir(exist_ok=True)

# Configuration
CONFIG_DIR = BASE_DIR / 'config'
PROMPTS_FILE = CONFIG_DIR / 'prompts.json'
