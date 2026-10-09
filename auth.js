// auth.js - Main Account Manager
document.addEventListener('DOMContentLoaded', () => {
  initAuthUI();
});

function getSession() {
  return JSON.parse(localStorage.getItem('collab_user_session'));
}

function initAuthUI() {
  const session = getSession();
  const navActions = document.getElementById('nav-actions');

  // Update Navigation Bar if it exists on the current page
  if (navActions) {
    // Determine path depth relative to root
    const depth = navActions.getAttribute('data-depth') || '1';
    const rootPath = depth === '2' ? '../../' : '../';

    if (session && session.isLoggedIn) {
      navActions.innerHTML = `
        <span class="user-email">${session.email}</span>
        <a href="${rootPath}settings/" class="btn btn-secondary">Settings</a>
        <button class="btn btn-secondary" onclick="handleLogout('${rootPath}')">Log Out</button>
      `;
    } else {
      navActions.innerHTML = `
        <a href="${rootPath}organisation/login/" class="btn btn-secondary">Login</a>
        <a href="${rootPath}organisation/register/" class="btn btn-primary">Register</a>
      `;
    }
  }
}

// Global Auth Handlers
window.handleLogin = function(email, accountType, redirectPath) {
  const session = {
    isLoggedIn: true,
    email: email,
    type: accountType, // 'organisation' or 'personal'
    token: 'token-' + Date.now()
  };
  localStorage.setItem('collab_user_session', JSON.stringify(session));
  window.location.href = redirectPath;
};

window.handleLogout = function(rootPath) {
  localStorage.removeItem('collab_user_session');
  window.location.href = rootPath + 'home/';
};
