import json
import os
from pathlib import Path
from typing import Dict, List, Optional

try:
    import openai
except ImportError:
    openai = None


class MonkAI:
    def __init__(self, prompts_path: Path):
        self.prompts_path = Path(prompts_path)
        self.prompts = self._load_prompts()
        self.api_key = os.getenv('OPENAI_API_KEY')

        if self.api_key and openai:
            openai.api_key = self.api_key

    def _load_prompts(self) -> Dict:
        with open(self.prompts_path, 'r', encoding='utf-8') as file:
            return json.load(file)

    def _fallback_reply(self, user_message: str, history: List[Dict]) -> str:
        message = user_message.lower()
        personality = self.prompts.get('personality', {})
        interview_themes = self.prompts.get('interview_themes', ['mindfulness', 'clarity'])
        responses = self.prompts.get('responses', {})

        if any(word in message for word in ['hello', 'hi', 'namaste', 'hey']):
            return responses.get('greeting', 'Namaste. How may I support you today?')

        if any(word in message for word in ['stress', 'anxious', 'nervous', 'fear']):
            return responses.get('stress', 'When stress rises, shorten the answer and slow the breath.')

        if any(word in message for word in ['career', 'job', 'future', 'goal']):
            return responses.get('career', 'Your career path is like a river. What direction calls to you?')

        if any(word in message for word in ['strength', 'weakness', 'introduce', 'yourself']):
            return responses.get('interview', 'Tell your story honestly, not as a list, but as a path forward.')

        recent_context = ' '.join(item['content'] for item in history[-4:]) if history else ''
        return (
            f"{personality.get('opening', 'I am here to listen and reflect with you.')} "
            f"I hear you saying: '{user_message}'. "
            f"Take one calm breath. Let us reflect through {interview_themes[0]} and {interview_themes[1]}. "
            f"From your recent sharing, I notice: {recent_context[-180:] if recent_context else 'you are just beginning this session'}. "
            f"What would a grounded, honest answer sound like if you spoke with clarity rather than pressure?"
        )

    def generate_reply(self, user_message: str, history: List[Dict]) -> str:
        if self.api_key and openai:
            try:
                system_prompt = self.prompts.get('system_prompt') or self.prompts.get('personality', {}).get('opening', '')
                messages = []

                if system_prompt:
                    messages.append({'role': 'system', 'content': system_prompt})

                for item in history:
                    role = 'assistant' if item['role'] == 'monk' else 'user'
                    messages.append({'role': role, 'content': item['content']})

                messages.append({'role': 'user', 'content': user_message})

                response = openai.ChatCompletion.create(
                    model=self.prompts.get('model', 'gpt-3.5-turbo'),
                    messages=messages,
                    temperature=float(self.prompts.get('temperature', 0.7)),
                    max_tokens=int(self.prompts.get('max_tokens', 500))
                )

                return response.choices[0].message.content.strip()
            except Exception:
                return self._fallback_reply(user_message, history)

        return self._fallback_reply(user_message, history)
