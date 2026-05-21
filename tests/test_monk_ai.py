from pathlib import Path
from src.monk_ai import MonkAI

def test_greeting_reply_contains_guidance():
    monk = MonkAI(Path('config/prompts.json'))
    reply = monk.generate_reply('Hello monk', [])
    assert 'Welcome' in reply or 'seeker' in reply or 'Namaste' in reply
