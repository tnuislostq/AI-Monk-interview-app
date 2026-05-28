const state = {
  sessionId: localStorage.getItem('aiMonkSessionId') || `session-${Math.random().toString(36).slice(2, 10)}`,
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
};
localStorage.setItem('aiMonkSessionId', state.sessionId);

document.documentElement.setAttribute('data-theme', state.theme);
const chatContainer = document.getElementById('chatContainer');
const form = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const statusText = document.getElementById('statusText');
const sessionLabel = document.getElementById('sessionLabel');
const resetButton = document.getElementById('resetButton');
const themeButton = document.getElementById('themeButton');
sessionLabel.textContent = state.sessionId;

function setStatus(message) {
  statusText.textContent = message;
}

function formatTime(value) {
  return new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function appendMessage(role, content, timestamp = new Date().toISOString()) {
  const article = document.createElement('article');
  article.className = `message ${role}`;
  article.innerHTML = `
    <div class="meta">
      <span>${role === 'user' ? 'You' : 'AI Monk'}</span>
      <time datetime="${timestamp}">${formatTime(timestamp)}</time>
    </div>
    <p></p>
  `;
  article.querySelector('p').textContent = content;
  chatContainer.appendChild(article);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function renderHistory(history) {
  if (!history || history.length === 0) {
    return false;
  }

  chatContainer.innerHTML = '';
  history.forEach((item) => {
    appendMessage(item.role, item.content, item.timestamp);
  });
  return true;
}

async function loadHistory() {
  setStatus('Restoring your conversation...');

  try {
    const response = await fetch(`/api/history/${encodeURIComponent(state.sessionId)}`);
    const data = await response.json();

    if (response.ok && renderHistory(data.history)) {
      setStatus('Session restored. Continue your practice.');
      return;
    }
  } catch (err) {
    console.warn('History load failed', err);
  }

  appendMessage('monk', 'Welcome. I am your AI Monk. Ask me to practice interview answers, calm nerves, or refine your story.');
  setStatus('Ready for reflection.');
}

async function sendMessage(message) {
  setStatus('The monk is reflecting...');

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, session_id: state.sessionId })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Unable to get response.');
  }

  return data.reply;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();
  if (!message) return;

  appendMessage('user', message);
  messageInput.value = '';

  try {
    const reply = await sendMessage(message);
    appendMessage('monk', reply);
    setStatus('Ready for the next answer.');
  } catch (error) {
    appendMessage('monk', error.message);
    setStatus('Something interrupted the reflection.');
  }
});

resetButton.addEventListener('click', async () => {
  await fetch('/api/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: state.sessionId })
  });

  chatContainer.innerHTML = '';
  appendMessage('monk', 'A fresh silence has begun. Share a new interview concern when you are ready.');
  setStatus('Conversation cleared.');
});

themeButton.addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  themeButton.textContent = state.theme === 'dark' ? 'Light mode' : 'Dark mode';
});

loadHistory();
