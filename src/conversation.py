import json
from datetime import datetime
from pathlib import Path
from typing import List, Dict


class ConversationManager:
    def __init__(self, storage_dir: Path):
        self.storage_dir = Path(storage_dir)
        self.storage_dir.mkdir(parents=True, exist_ok=True)

    def _file_path(self, session_id: str) -> Path:
        safe_id = ''.join(ch for ch in session_id if ch.isalnum() or ch in ('-', '_')) or 'default'
        return self.storage_dir / f'{safe_id}.json'

    def get_history(self, session_id: str) -> List[Dict]:
        path = self._file_path(session_id)
        if not path.exists():
            return []
        with open(path, 'r', encoding='utf-8') as file:
            return json.load(file)

    def add_message(self, session_id: str, role: str, content: str) -> None:
        history = self.get_history(session_id)
        history.append({
            'role': role,
            'content': content,
            'timestamp': datetime.utcnow().isoformat() + 'Z'
        })
        with open(self._file_path(session_id), 'w', encoding='utf-8') as file:
            json.dump(history, file, indent=2, ensure_ascii=False)

    def clear_history(self, session_id: str) -> None:
        path = self._file_path(session_id)
        if path.exists():
            path.unlink()
