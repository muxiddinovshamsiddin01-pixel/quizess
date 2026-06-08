/**
 * api.js — Backend API client
 * FastAPI backend at localhost:8000
 * NOTE: Auth object is defined in storage.js (loaded before this file)
 */

const API_BASE    = window.location.hostname === 'localhost' ? 'http://localhost:8000' : '';
const API_TIMEOUT = 10000;

// ── Fetch wrapper ────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), API_TIMEOUT);
  try {
    const res = await fetch(API_BASE + path, {
      ...options,
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
    clearTimeout(tid);
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: res.statusText }));
      throw new Error(err.detail || 'API error');
    }
    return await res.json();
  } catch (e) {
    clearTimeout(tid);
    if (e.name === 'AbortError') throw new Error('Backend unavailable — run: python backend/main.py');
    throw e;
  }
}

// ── API methods ──────────────────────────────────────────────
const API = {
  createUser:      (username, display_name) =>
    apiFetch('/api/users', { method: 'POST', body: JSON.stringify({ username, display_name }) }),
  getUser:         (username) => apiFetch(`/api/users/${username}`),
  getUserStats:    (username) => apiFetch(`/api/users/${username}/stats`),
  updateUser:      (username, data) =>
    apiFetch(`/api/users/${username}`, { method: 'PATCH', body: JSON.stringify(data) }),
  submitResult:    (data) =>
    apiFetch('/api/results', { method: 'POST', body: JSON.stringify(data) }),
  getResults:      (username, limit = 20) =>
    apiFetch(`/api/results/${username}?limit=${limit}`),
  getAchievements: (username) => apiFetch(`/api/achievements/${username}`),
  getLeaderboard:  (limit = 30) => apiFetch(`/api/leaderboard?limit=${limit}`),
  getUserRank:     (username) => apiFetch(`/api/leaderboard/${username}/rank`),
};

// ── Points toast ─────────────────────────────────────────────
async function showPointsToast(points, newAchievements = []) {
  if (!points) return;
  const t = document.createElement('div');
  t.className = 'points-toast';
  t.style.cssText = `
    position:fixed;bottom:90px;right:24px;z-index:9999;
    background:var(--surf);border:1px solid var(--border);
    border-radius:var(--r);padding:14px 20px;
    box-shadow:0 8px 32px rgba(0,0,0,.4);
    animation:slideIn .3s ease;text-align:center;min-width:140px;`;
  let achHtml = '';
  if (newAchievements?.length) {
    achHtml = `<div style="margin-top:8px;font-size:12px;color:var(--pk2)">${newAchievements.map(a => a.icon + ' ' + a.title).join(', ')}</div>`;
  }
  t.innerHTML = `
    <div style="font-size:22px;font-weight:800;color:var(--pk2)">+${points} ⭐</div>
    <div style="font-size:11px;color:var(--text3);margin-top:2px">points earned</div>
    ${achHtml}`;
  document.body.appendChild(t);
  setTimeout(() => { t.style.transition = 'opacity .4s'; t.style.opacity = '0'; setTimeout(() => t.remove(), 400); }, 3500);
}

// ── Submit quiz result ───────────────────────────────────────
async function submitQuizResult({ subject, mode, score, total, pct, time_seconds, points_override }) {
  const username = Auth.getUsername();
  if (!username) return null;
  try {
    const body = { username, subject, mode, score, total, pct, time_seconds };
    if (points_override !== undefined) body.points_override = points_override;
    const res = await API.submitResult(body);
    if (res?.points_earned) showPointsToast(res.points_earned, res.new_achievements);
    return res;
  } catch (e) {
    console.warn('Backend submit failed:', e.message);
    return null;
  }
}

// ── Gemini AI open-answer checker ────────────────────────────
async function geminiCheckAnswer(question, userAnswer, referenceAnswer, topic) {
  const data = await apiFetch('/api/ai/check-answer', {
    method: 'POST',
    body: JSON.stringify({
      question,
      user_answer:      userAnswer      || '',
      reference_answer: referenceAnswer || '',
      topic:            topic           || '',
    }),
  });
  return data.result;
}
