const state = {
  conversationId: null,
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
};

document.documentElement.setAttribute('data-theme', state.theme);

const chatContainer = document.getElementById('chatContainer');
const form = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const statusText = document.getElementById('statusText');
const conversationTitle = document.getElementById('conversationTitle');
const resetButton = document.getElementById('resetButton');
const themeButton = document.getElementById('themeButton');
const newChatButton = document.getElementById('newChatButton');
const logoutButton = document.getElementById('logoutButton');
const historyList = document.getElementById('historyList');
const historyEmpty = document.getElementById('historyEmpty');

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

// --- Sidebar: conversation history list ---

async function loadConversationList(selectId = null) {
  try {
    const response = await fetch('/api/conversations');
    if (response.status === 401) {
      window.location.href = '/login';
      return;
    }
    const data = await response.json();
    renderConversationList(data.conversations || [], selectId);
  } catch (err) {
    console.warn('Failed to load conversation list', err);
  }
}

function renderConversationList(conversations, selectId) {
  historyList.querySelectorAll('.history-item').forEach((el) => el.remove());
  historyEmpty.style.display = conversations.length ? 'none' : 'block';

  conversations.forEach((convo) => {
    const item = document.createElement('div');
    item.className = 'history-item' + (convo.id === (selectId ?? state.conversationId) ? ' active' : '');
    item.dataset.id = convo.id;

    const titleSpan = document.createElement('span');
    titleSpan.className = 'history-item-title';
    titleSpan.textContent = convo.title;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'history-item-delete';
    deleteBtn.type = 'button';
    deleteBtn.setAttribute('aria-label', 'Delete conversation');
    deleteBtn.textContent = '\u00d7';
    deleteBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteConversation(convo.id);
    });

    item.appendChild(titleSpan);
    item.appendChild(deleteBtn);
    item.addEventListener('click', () => openConversation(convo.id));
    historyList.appendChild(item);
  });
}

async function deleteConversation(conversationId) {
  const wasActive = conversationId === state.conversationId;
  await fetch(`/api/conversations/${conversationId}`, { method: 'DELETE' });

  if (wasActive) {
    await startNewConversation(false);
  }
  await loadConversationList(state.conversationId);
}

async function openConversation(conversationId) {
  setStatus('Restoring your conversation...');
  try {
    const response = await fetch(`/api/conversations/${conversationId}`);
    if (response.status === 401) {
      window.location.href = '/login';
      return;
    }
    const data = await response.json();
    if (!response.ok) {
      setStatus(data.error || 'Could not load that conversation.');
      return;
    }

    state.conversationId = conversationId;
    conversationTitle.textContent = data.conversation.title;
    chatContainer.innerHTML = '';

    if (data.messages.length === 0) {
      appendMessage('monk', 'Welcome. I am your AI Monk. Ask me to practice interview answers, calm nerves, or refine your story.');
    } else {
      data.messages.forEach((item) => appendMessage(item.role, item.content, item.timestamp));
    }

    setStatus('Ready for reflection.');
    await loadConversationList(conversationId);
  } catch (err) {
    setStatus('Something went wrong while loading this conversation.');
  }
}

async function startNewConversation(refreshList = true) {
  try {
    const response = await fetch('/api/conversations', { method: 'POST' });
    if (response.status === 401) {
      window.location.href = '/login';
      return;
    }
    const data = await response.json();
    state.conversationId = data.conversation_id;
    conversationTitle.textContent = 'New conversation';
    chatContainer.innerHTML = '';
    appendMessage('monk', 'Welcome. I am your AI Monk. Ask me to practice interview answers, calm nerves, or refine your story.');
    setStatus('Ready for reflection.');
    if (refreshList) await loadConversationList(state.conversationId);
  } catch (err) {
    setStatus('Could not start a new conversation.');
  }
}

// --- Sending messages ---

async function sendMessage(message) {
  setStatus('The monk is reflecting...');

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, conversation_id: state.conversationId })
  });

  if (response.status === 401) {
    window.location.href = '/login';
    return null;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Unable to get response.');
  }

  return data.reply;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();
  if (!message || !state.conversationId) return;

  appendMessage('user', message);
  messageInput.value = '';

  try {
    const reply = await sendMessage(message);
    if (reply === null) return;
    appendMessage('monk', reply);
    setStatus('Ready for the next answer.');
    await loadConversationList(state.conversationId);
    const activeTitle = document.querySelector('.history-item.active .history-item-title');
    if (activeTitle) conversationTitle.textContent = activeTitle.textContent;
  } catch (error) {
    appendMessage('monk', error.message);
    setStatus('Something interrupted the reflection.');
  }
});

resetButton.addEventListener('click', async () => {
  if (!state.conversationId) return;
  await fetch(`/api/conversations/${state.conversationId}`, { method: 'DELETE' });
  await startNewConversation();
});

newChatButton.addEventListener('click', () => startNewConversation());

logoutButton.addEventListener('click', async () => {
  await fetch('/api/logout', { method: 'POST' });
  window.location.href = '/login';
});

themeButton.addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  themeButton.textContent = state.theme === 'dark' ? 'Light mode' : 'Dark mode';
});

themeButton.textContent = state.theme === 'dark' ? 'Light mode' : 'Dark mode';

messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    form.requestSubmit();
  }
});

// --- Boot ---
(async function init() {
  const response = await fetch('/api/conversations');
  if (response.status === 401) {
    window.location.href = '/login';
    return;
  }
  const data = await response.json();
  const conversations = data.conversations || [];

  if (conversations.length === 0) {
    await startNewConversation();
  } else {
    renderConversationList(conversations, conversations[0].id);
    await openConversation(conversations[0].id);
  }
})();
