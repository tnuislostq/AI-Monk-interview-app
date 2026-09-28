from flask import Flask, render_template, request, jsonify, session, redirect, url_for
from pathlib import Path
from functools import wraps
import sys

ROOT = Path(__file__).resolve().parent.parent

if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from src.monk_ai import MonkAI
from src.auth import UserStore
from config.settings import Settings

app = Flask(
    __name__,
    template_folder=str(ROOT / 'templates'),
    static_folder=str(ROOT / 'static')
)
app.config.from_object(Settings)

monk_ai = MonkAI(ROOT / 'config' / 'prompts.json')
user_store = UserStore(ROOT / Settings.DATABASE_PATH)


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get('user_id'):
            if request.path.startswith('/api/'):
                return jsonify({'error': 'Not signed in.'}), 401
            return redirect(url_for('login_page'))
        return view(*args, **kwargs)
    return wrapped


# ---------- Page routes ----------

@app.route('/')
def index():
    if not session.get('user_id'):
        return redirect(url_for('login_page'))
    return render_template('index.html', app_name=Settings.APP_NAME, user_name=session.get('user_name'))


@app.route('/login')
def login_page():
    if session.get('user_id'):
        return redirect(url_for('index'))
    return render_template('login.html', app_name=Settings.APP_NAME)


# ---------- Auth API ----------

@app.post('/api/signup')
def signup():
    payload = request.get_json(silent=True) or {}
    name = (payload.get('name') or '').strip()
    email = (payload.get('email') or '').strip()
    password = payload.get('password') or ''

    if not name or not email or not password:
        return jsonify({'error': 'Name, email, and password are all required.'}), 400
    if len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters.'}), 400

    user_id = user_store.create_user(name, email, password)
    if user_id is None:
        return jsonify({'error': 'An account with that email already exists.'}), 409

    session['user_id'] = user_id
    session['user_name'] = name
    conversation_id = user_store.create_conversation(user_id, "New conversation")
    return jsonify({'message': 'Account created.', 'conversation_id': conversation_id})


@app.post('/api/login')
def login():
    payload = request.get_json(silent=True) or {}
    email = (payload.get('email') or '').strip()
    password = payload.get('password') or ''

    user = user_store.verify_user(email, password)
    if not user:
        return jsonify({'error': 'Incorrect email or password.'}), 401

    session['user_id'] = user['id']
    session['user_name'] = user['name']
    return jsonify({'message': 'Signed in.'})


@app.post('/api/logout')
def logout():
    session.clear()
    return jsonify({'message': 'Signed out.'})


# ---------- Conversation API ----------

@app.get('/api/conversations')
@login_required
def list_conversations():
    conversations = user_store.list_conversations(session['user_id'])
    return jsonify({'conversations': conversations})


@app.post('/api/conversations')
@login_required
def new_conversation():
    conversation_id = user_store.create_conversation(session['user_id'], "New conversation")
    return jsonify({'conversation_id': conversation_id})


@app.get('/api/conversations/<int:conversation_id>')
@login_required
def get_conversation(conversation_id):
    convo = user_store.get_conversation(conversation_id, session['user_id'])
    if not convo:
        return jsonify({'error': 'Conversation not found.'}), 404
    messages = user_store.get_messages(conversation_id)
    return jsonify({'conversation': convo, 'messages': messages})


@app.delete('/api/conversations/<int:conversation_id>')
@login_required
def delete_conversation(conversation_id):
    convo = user_store.get_conversation(conversation_id, session['user_id'])
    if not convo:
        return jsonify({'error': 'Conversation not found.'}), 404
    user_store.delete_conversation(conversation_id, session['user_id'])
    return jsonify({'message': 'Conversation deleted.'})


@app.post('/api/chat')
@login_required
def chat():
    payload = request.get_json(silent=True) or {}
    user_message = (payload.get('message') or '').strip()
    conversation_id = payload.get('conversation_id')

    if not user_message:
        return jsonify({'error': 'Message is required.'}), 400
    if not conversation_id:
        return jsonify({'error': 'conversation_id is required.'}), 400

    convo = user_store.get_conversation(conversation_id, session['user_id'])
    if not convo:
        return jsonify({'error': 'Conversation not found.'}), 404

    user_store.add_message(conversation_id, 'user', user_message)
    history = user_store.get_messages(conversation_id)
    monk_reply = monk_ai.generate_reply(user_message, history)
    timestamp = user_store.add_message(conversation_id, 'monk', monk_reply)

    # Auto-title the conversation from the first user message
    if convo['title'] == 'New conversation':
        short_title = user_message[:40] + ('...' if len(user_message) > 40 else '')
        user_store.rename_conversation(conversation_id, session['user_id'], short_title)

    return jsonify({
        'reply': monk_reply,
        'timestamp': timestamp,
        'conversation_id': conversation_id
    })


if __name__ == '__main__':
    app.run(debug=Settings.DEBUG, host='0.0.0.0', port=Settings.PORT)
