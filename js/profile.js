/**
 * profile.js — Profile page logic
 * Auth guard is in storage.js (requireAuth called in HTML)
 */

let currentUser = null;

document.addEventListener('DOMContentLoaded', async () => {
  const user = Auth.getUser();
  if (!user?.username) { location.href = 'login.html'; return; }

  // Hide login gate, show content immediately
  const gate = document.getElementById('loginGate');
  if (gate) gate.style.display = 'none';
  document.getElementById('profileContent').style.display = 'block';

  // Show skeleton data from localStorage while API loads
  renderHeroLocal(user);

  // Try to load from backend
  try {
    const online = await checkBackend();
    if (!online) {
      const banner = document.getElementById('offlineBanner');
      if (banner) banner.style.display = 'block';
      renderStatsLocal(user);
      return;
    }
    await loadProfile(user.username);
  } catch(e) {
    const banner = document.getElementById('offlineBanner');
    if (banner) banner.style.display = 'block';
    renderStatsLocal(user);
  }
});

// Render from localStorage data instantly (no flicker)
function renderHeroLocal(user) {
  const name     = (user.display_name || user.username || 'User').trim();
  const initials = name.length >= 2 ? name.slice(0, 2).toUpperCase() : name.toUpperCase();
  const color    = user.avatar_color || '#c850f0';
  const av = document.getElementById('profileAvatar');
  if (av) {
    av.textContent  = initials;
    av.style.background  = color + '22';
    av.style.borderColor = color;
    av.style.color       = color;
  }
  const nameEl = document.getElementById('profileName');
  const userEl = document.getElementById('profileUsername');
  if (nameEl) nameEl.textContent = user.display_name || user.username;
  if (userEl) userEl.textContent = '@' + user.username;
}

function renderStatsLocal(user) {
  setEl('statPoints',     (user.total_points || 0).toLocaleString('en'));
  setEl('statBestStreak', user.streak_best || 0);
  setEl('statQuizzes',    '—');
  setEl('statAvg',        '—');
  setEl('statAchCount',   '—');
}

function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

async function loadProfile(username) {
  try {
    const [user, results, achievements, rankData] = await Promise.all([
      API.getUser(username),
      API.getResults(username, 50),
      API.getAchievements(username),
      API.getUserRank ? API.getUserRank(username).catch(() => ({ rank: '—' })) : Promise.resolve({ rank: '—' }),
    ]);
    currentUser = user;
    // Update stored user with fresh data
    Auth.setUser({ ...user });
    renderHero(user, rankData.rank);
    renderStats(user, results);
    renderAchievements(achievements);
    renderHistory(results);
  } catch (e) {
    console.error('Profile load error:', e);
    renderHeroLocal(Auth.getUser());
    renderStatsLocal(Auth.getUser());
    setEl('achievementsGrid', '');
    setEl('profileHistory', '');
  }
}

function renderHero(user, rank) {
  const name     = (user.display_name || user.username || 'User').trim();
  const initials = name.length >= 2 ? name.slice(0, 2).toUpperCase() : name.toUpperCase();
  const color    = user.avatar_color || '#c850f0';

  const av = document.getElementById('profileAvatar');
  if (av) {
    av.textContent       = initials;
    av.style.background  = color + '22';
    av.style.borderColor = color;
    av.style.color       = color;
  }

  setEl('profileName',     user.display_name || user.username);
  setEl('profileUsername', '@' + user.username);

  const rankChip = document.getElementById('metaRank');
  if (rankChip) rankChip.querySelector('span').textContent = rank ? '#' + rank : '—';

  const streak = user.streak_current || 0;
  const streakChip = document.getElementById('metaStreak');
  if (streakChip) {
    const label = streak === 1 ? 'day' : 'days';
    streakChip.querySelector('span').textContent = streak + ' ' + label;
  }

  const joinedChip = document.getElementById('metaJoined');
  if (joinedChip && user.created_at) {
    joinedChip.querySelector('span').textContent =
      new Date(user.created_at).toLocaleDateString('en', { month: 'short', year: 'numeric' });
  }
}

function renderStats(user, results) {
  setEl('statPoints',     (user.total_points || 0).toLocaleString('en'));
  setEl('statQuizzes',    results.length);
  setEl('statBestStreak', user.streak_best || 0);
  const avg = results.length
    ? Math.round(results.reduce((s, r) => s + r.pct, 0) / results.length)
    : null;
  setEl('statAvg', avg !== null ? avg + '%' : '—');
}

function renderAchievements(achievements) {
  const earned = achievements.filter(a => a.earned).length;
  setEl('achProgress',  `${earned} / ${achievements.length}`);
  setEl('statAchCount', earned);

  const grid = document.getElementById('achievementsGrid');
  if (!grid) return;

  if (!achievements.length) {
    grid.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text3)">No achievements yet</div>';
    return;
  }

  grid.innerHTML = achievements.map(a => `
    <div class="ach-item ${a.earned ? 'earned' : 'locked'}">
      <div class="ach-icon">${a.icon}</div>
      <div class="ach-info">
        <div class="ach-title">${a.title}</div>
        <div class="ach-desc">${a.desc}</div>
        ${a.earned
          ? `<div class="ach-date">${new Date(a.earned_at).toLocaleDateString('en', { day: '2-digit', month: 'short', year: 'numeric' })}</div>`
          : `<div class="ach-pts">+${a.points} ⭐</div>`}
      </div>
    </div>`).join('');
}

function renderHistory(results) {
  const el = document.getElementById('profileHistory');
  setEl('historyCount', results.length + ' quizzes');
  if (!el) return;

  if (!results.length) {
    el.innerHTML = '<div style="padding:24px;text-align:center;color:var(--text3)">No quizzes yet — take your first one! 🚀</div>';
    return;
  }

  const subjectColor = {
    physics: '#c850f0', linalg: '#00d4ff',
    drawing: '#f59e0b', mathanalysis: '#10b981'
  };

  el.innerHTML = results.map(r => {
    const pctColor = r.pct >= 80 ? 'var(--gr)' : r.pct >= 60 ? 'var(--am)' : 'var(--re)';
    const sc       = subjectColor[r.subject] || 'var(--pk)';
    const date     = new Date(r.played_at).toLocaleDateString('en', { day: '2-digit', month: 'short' });
    return `
    <div class="hist-item">
      <div class="hist-pct" style="color:${pctColor}">${r.pct}%</div>
      <div class="hist-info">
        <div class="hist-subj" style="color:${sc}">${r.subject}</div>
        <div class="hist-meta">${r.mode} · ${date}</div>
      </div>
      <div class="hist-pts">+${r.points_earned} ⭐</div>
      <div class="hist-bar">
        <div class="hist-bar-fill" style="width:${r.pct}%;background:${pctColor}"></div>
      </div>
    </div>`;
  }).join('');
}

// ── Edit profile modal ─────────────────────────────────────────
const AVATAR_COLORS = [
  '#c850f0','#00d4ff','#10b981','#f59e0b',
  '#ef4444','#8b5cf6','#06b6d4','#f97316',
  '#84cc16','#ec4899',
];

function showEditModal() {
  currentUser = currentUser || Auth.getUser();
  if (!currentUser) return;
  const nameInput = document.getElementById('editName');
  if (nameInput) nameInput.value = currentUser.display_name || '';
  const picker = document.getElementById('colorPicker');
  if (picker) {
    picker.innerHTML = AVATAR_COLORS.map(c => `
      <div class="color-swatch ${c === (currentUser.avatar_color || '#c850f0') ? 'selected' : ''}"
           style="background:${c}" onclick="selectColor('${c}',this)"></div>`).join('');
  }
  const modal = document.getElementById('editModal');
  if (modal) modal.style.display = 'flex';
}

function hideEditModal() {
  const modal = document.getElementById('editModal');
  if (modal) modal.style.display = 'none';
}

function selectColor(c, el) {
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
}

async function saveProfile() {
  const name  = document.getElementById('editName')?.value.trim() || '';
  const swatch = document.querySelector('.color-swatch.selected');
  const color = swatch ? swatch.style.background : (currentUser?.avatar_color || '#c850f0');

  try {
    const updated = await API.updateUser(currentUser.username, {
      display_name: name,
      avatar_color: color,
    });
    Auth.setUser({ ...updated });
    currentUser = updated;
    renderHero(updated, document.getElementById('metaRank')?.querySelector('span')?.textContent?.replace('#','') || '—');
    hideEditModal();
  } catch (e) {
    alert('Save error: ' + e.message);
  }
}

function doLogout() {
  Auth.logout();
}

// ── API helpers (if not defined in api.js) ─────────────────────
async function checkBackend() {
  try {
    const r = await fetch('http://localhost:8000/', { signal: AbortSignal.timeout(3000) });
    return r.ok;
  } catch { return false; }
}
