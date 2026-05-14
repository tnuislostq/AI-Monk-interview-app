from flask import Flask, render_template, request, jsonify
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent.parent

if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from src.conversation import ConversationManager
from src.monk_ai import MonkAI
from config.settings import Settings

app = Flask(
    __name__,
    template_folder=str(ROOT / 'templates'),
    static_folder=str(ROOT / 'static')
)
app.config.from_object(Settings)

conversation_manager = ConversationManager(ROOT / 'data' / 'conversations')
monk_ai = MonkAI(ROOT / 'config' / 'prompts.json')


@app.route('/')
def index():
    return render_template('index.html', app_name=Settings.APP_NAME)


@app.post('/api/chat')
def chat():
    payload = request.get_json(silent=True) or {}
    user_message = (payload.get('message') or '').strip()
    session_id = (payload.get('session_id') or 'default').strip()

    if not user_message:
        return jsonify({'error': 'Message is required.'}), 400

    conversation_manager.add_message(session_id, 'user', user_message)
    history = conversation_manager.get_history(session_id)
    monk_reply = monk_ai.generate_reply(user_message, history)
    conversation_manager.add_message(session_id, 'monk', monk_reply)

    return jsonify({
        'reply': monk_reply,
        'session_id': session_id,
        'history': conversation_manager.get_history(session_id)
    })


@app.get('/api/history/<session_id>')
def history(session_id):
    return jsonify({'session_id': session_id, 'history': conversation_manager.get_history(session_id)})


@app.post('/api/reset')
def reset():
    payload = request.get_json(silent=True) or {}
    session_id = (payload.get('session_id') or 'default').strip()
    conversation_manager.clear_history(session_id)
    return jsonify({'message': 'Conversation reset.', 'session_id': session_id})


if __name__ == '__main__':
    app.run(debug=Settings.DEBUG, host='0.0.0.0', port=Settings.PORT)