const tabSignIn = document.getElementById('tabSignIn');
const tabSignUp = document.getElementById('tabSignUp');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const authError = document.getElementById('authError');

function showError(message) {
  authError.textContent = message;
}

tabSignIn.addEventListener('click', () => {
  tabSignIn.classList.add('active');
  tabSignUp.classList.remove('active');
  signInForm.style.display = 'grid';
  signUpForm.style.display = 'none';
  showError('');
});

tabSignUp.addEventListener('click', () => {
  tabSignUp.classList.add('active');
  tabSignIn.classList.remove('active');
  signUpForm.style.display = 'grid';
  signInForm.style.display = 'none';
  showError('');
});

signInForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  showError('');
  const email = document.getElementById('siEmail').value.trim();
  const password = document.getElementById('siPassword').value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) {
      showError(data.error || 'Unable to sign in.');
      return;
    }
    window.location.href = '/';
  } catch (err) {
    showError('Unable to reach the server. Please try again.');
  }
});

signUpForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  showError('');
  const name = document.getElementById('suName').value.trim();
  const email = document.getElementById('suEmail').value.trim();
  const password = document.getElementById('suPassword').value;

  try {
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    if (!response.ok) {
      showError(data.error || 'Unable to create account.');
      return;
    }
    window.location.href = '/';
  } catch (err) {
    showError('Unable to reach the server. Please try again.');
  }
});
