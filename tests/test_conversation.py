from pathlib import Path
from src.conversation import ConversationManager

def test_add_and_clear_message(tmp_path: Path):
    manager = ConversationManager(tmp_path)
    manager.add_message('demo', 'user', 'test message')

    history = manager.get_history('demo')
    assert len(history) == 1
    assert history[0]['content'] == 'test message'

    manager.clear_history('demo')
    assert manager.get_history('demo') == []


def test_message_timestamp_is_utc_z_suffix(tmp_path: Path):
    manager = ConversationManager(tmp_path)
    manager.add_message('demo', 'user', 'hello')

    history = manager.get_history('demo')
    assert len(history) == 1
    assert history[0]['timestamp'].endswith('Z')
    assert 'T' in history[0]['timestamp']
