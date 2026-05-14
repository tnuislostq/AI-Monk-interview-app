import json
from pathlib import Path
from typing import List, Dict


class MonkAI:
    def __init__(self, prompts_path: Path):
        self.prompts_path = Path(prompts_path)
        self.prompts = self._load_prompts()

    def _load_prompts(self) -> Dict:
        with open(self.prompts_path, 'r', encoding='utf-8') as file:
            return json.load(file)

    def generate_reply(self, user_message: str, history: List[Dict]) -> str:
        message = user_message.lower()
        personality = self.prompts['personality']
        interview_themes = self.prompts['interview_themes']

        if any(word in message for word in ['hello', 'hi', 'namaste', 'hey']):
            return self.prompts['responses']['greeting']

        if any(word in message for word in ['stress', 'anxious', 'nervous', 'fear']):
            return self.prompts['responses']['stress']

        if any(word in message for word in ['career', 'job', 'future', 'goal']):
            return self.prompts['responses']['career']

        if any(word in message for word in ['strength', 'weakness', 'introduce', 'yourself']):
            return self.prompts['responses']['interview']

        recent_context = ' '.join(item['content'] for item in history[-4:]) if history else ''
        return (
            f"{personality['opening']} I hear you saying: '{user_message}'. "
            f"Take one calm breath. Let us reflect through {interview_themes[0]} and {interview_themes[1]}. "
            f"From your recent sharing, I notice: {recent_context[-180:] if recent_context else 'you are just beginning this session'}. "
            f"What would a grounded, honest answer sound like if you spoke with clarity rather than pressure?"
        )
