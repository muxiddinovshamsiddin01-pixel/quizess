/**
 * leaderboard.js — with clickable player profile modal
 */

const SUBJECT_META = {
  physics:       { name: 'Physics',        icon: '⚛️',  color: '#c850f0' },
  mathanalysis:  { name: 'Math Analysis 2', icon: '∫',   color: '#10b981' },
  linalg:        { name: 'Linear Algebra 2',icon: '⬡',   color: '#00d4ff' },
  drawing:       { name: 'Eng. Drawing',    icon: '📐',  color: '#f59e0b' },
  fundamental:   { name: 'Fund. Strength',  icon: '🔩',  color: '#8b5cf6' },
};

async function checkBackend() {
  try {
    const res = await fetch(
      (window.location.hostname === 'localhost' ? 'http://localhost:8000' : '') + '/api/ping',
      { signal: AbortSignal.timeout(5000) }
    );
    return res.ok;
  } catch { return false; }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Close modal on Escape
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePlayerModal(); });

  const online = await checkBackend();
  if (!online) {
    document.getElementById('offlineBanner2').style.display = 'block';
    document.getElementById('lbTable').innerHTML =
      '<div style="padding:40px;text-align:center;color:var(--text3)">Start backend/start.bat and refresh the page</div>';
    return;
  }
  await loadLeaderboard();
});

async function loadLeaderboard() {
  document.getElementById('lbTable').innerHTML =
    '<div style="padding:40px;text-align:center;color:var(--text3)">Loading...</div>';
  try {
    const myUsername = Auth.getUsername();
    const [rows, myRank] = await Promise.all([
      API.getLeaderboard(50),
      myUsername ? API.getUserRank(myUsername).catch(() => null) : Promise.resolve(null),
    ]);

    if (!rows || rows.length === 0) {
      document.getElementById('lbTable').innerHTML =
        '<div style="padding:48px;text-align:center;color:var(--text3)">No registered players yet.<br><span style="font-size:13px;margin-top:8px;display:block">Take the first quiz — you\'ll be first!</span></div>';
      document.getElementById('podiumRow').style.display = 'none';
      return;
    }

    if (myRank && myUsername) {
      const me = rows.find(r => r.username === myUsername);
      document.getElementById('myRankCard').style.display = 'flex';
      document.getElementById('myRankNum').textContent = '#' + myRank.rank;
      document.getElementById('myRankPts').textContent = (me?.total_points || 0).toLocaleString('en') + ' pts';
    }

    renderPodium(rows.slice(0, 3));
    renderTable(rows, myUsername);
  } catch (e) {
    document.getElementById('lbTable').innerHTML =
      `<div style="padding:24px;color:var(--re);text-align:center">Load error: ${e.message}</div>`;
  }
}

function renderPodium(top) {
  const el = document.getElementById('podiumRow');
  if (!top.length) { el.style.display = 'none'; return; }
  el.style.display = '';
  const order   = [top[1], top[0], top[2]].filter(Boolean);
  const classes = top[1] ? ['p2', 'p1', 'p3'] : ['p1'];
  const medals  = top[1] ? ['🥈', '🥇', '🥉'] : ['🥇'];
  el.innerHTML = order.map((u, i) => {
    const initials = (u.display_name || u.username).slice(0, 2).toUpperCase();
    const color    = u.avatar_color || '#c850f0';
    return `
    <div class="podium-item ${classes[i]}" onclick="openPlayerModal('${u.username}')" style="cursor:pointer">
      <div class="podium-avatar" style="background:${color}22;border-color:${color};color:${color}">${initials}</div>
      <div class="podium-name">${u.display_name || u.username}</div>
      <div class="podium-pts">${(u.total_points || 0).toLocaleString('ru')} ⭐</div>
      <div class="podium-stand">${medals[i]}</div>
    </div>`;
  }).join('');
}

function renderTable(rows, myUsername) {
  const el = document.getElementById('lbTable');
  if (!rows.length) {
    el.innerHTML = '<div style="padding:32px;text-align:center;color:var(--text3)">No players</div>';
    return;
  }
  el.innerHTML = rows.map(u => {
    const isMe     = u.username === myUsername;
    const initials = (u.display_name || u.username).slice(0, 2).toUpperCase();
    const color    = u.avatar_color || '#c850f0';
    const rankCls  = u.rank <= 3 ? `r${u.rank}` : '';
    return `
    <div class="lb-row ${isMe ? 'me' : ''}" onclick="openPlayerModal('${u.username}')" style="cursor:pointer">
      <div class="lb-rank ${rankCls}">${u.rank <= 3 ? ['🥇', '🥈', '🥉'][u.rank - 1] : '#' + u.rank}</div>
      <div class="lb-player">
        <div class="lb-avatar" style="background:${color}22;border:1.5px solid ${color};color:${color}">${initials}</div>
        <div>
          <div class="lb-pname">${u.display_name || u.username}${isMe ? ' <span style="font-size:10px;color:var(--pk)">(you)</span>' : ''}</div>
          <div class="lb-uname">@${u.username}</div>
        </div>
      </div>
      <div class="lb-pts">${(u.total_points || 0).toLocaleString('ru')}</div>
      <div class="lb-num">${u.total_quizzes || 0}</div>
      <div class="lb-num">${u.avg_pct ? (+u.avg_pct).toFixed(0) + '%' : '—'}</div>
      <div class="lb-streak">🔥 ${u.streak_current || 0}</div>
      <div class="lb-ach">🏅 ${u.achievements_count || 0}</div>
    </div>`;
  }).join('');
}

// ── Player profile modal ─────────────────────────────────────

async function openPlayerModal(username) {
  const modal   = document.getElementById('playerModal');
  const content = document.getElementById('playerModalContent');
  if (!modal || !content) return;

  // Show modal with loading state
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  content.innerHTML = `
    <div style="padding:48px;text-align:center;color:var(--text3)">
      <div style="font-size:32px;margin-bottom:14px;animation:pulse 1.2s ease-in-out infinite">⏳</div>
      Loading profile...
    </div>`;

  try {
    const stats = await API.getUserStats(username);
    content.innerHTML = buildModalHTML(stats);
  } catch (e) {
    content.innerHTML = `<div style="padding:32px;text-align:center;color:var(--re)">Failed to load: ${e.message}</div>`;
  }
}

function closePlayerModal() {
  const modal = document.getElementById('playerModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

function buildModalHTML(s) {
  const color    = s.avatar_color || '#c850f0';
  const initials = (s.display_name || s.username).slice(0, 2).toUpperCase();
  const subjects = Object.keys(SUBJECT_META);
  const totalSubjects = subjects.length;
  const activeSubs = subjects.filter(k => s.subject_stats && s.subject_stats[k]);

  // Subject bars
  const subjectRows = subjects.map(key => {
    const meta = SUBJECT_META[key];
    const data = s.subject_stats && s.subject_stats[key];
    if (!data) {
      return `
        <div class="pm-subject-row pm-subject-empty">
          <span class="pm-subject-icon">${meta.icon}</span>
          <span class="pm-subject-name">${meta.name}</span>
          <span class="pm-subject-badge" style="color:var(--text3);font-size:11px">not started</span>
        </div>`;
    }
    const avg  = Math.round(data.avg_pct || 0);
    const best = data.best_pct || 0;
    const bar  = Math.min(100, avg);
    return `
      <div class="pm-subject-row">
        <span class="pm-subject-icon">${meta.icon}</span>
        <div class="pm-subject-info">
          <div class="pm-subject-top">
            <span class="pm-subject-name">${meta.name}</span>
            <span class="pm-subject-badge">${data.quizzes} quiz${data.quizzes > 1 ? 'zes' : ''} · best ${best}%</span>
          </div>
          <div class="pm-subject-bar-bg">
            <div class="pm-subject-bar-fill" style="width:${bar}%;background:${meta.color}"></div>
          </div>
        </div>
        <span class="pm-subject-avg" style="color:${meta.color}">${avg}%</span>
      </div>`;
  }).join('');

  // Recent results
  const recentRows = (s.recent_results || []).map(r => {
    const c = r.pct >= 80 ? 'var(--gr)' : r.pct >= 55 ? 'var(--am)' : 'var(--re)';
    const meta = SUBJECT_META[r.subject] || { icon: '📝', name: r.subject };
    const d = new Date(r.played_at).toLocaleDateString('en', { day: '2-digit', month: 'short' });
    return `
      <div class="pm-recent-row">
        <span>${meta.icon} ${meta.name}</span>
        <span style="color:var(--text3);font-size:11px">${r.mode} · ${d}</span>
        <span style="color:${c};font-weight:600">${r.pct}%</span>
      </div>`;
  }).join('');

  return `
    <div class="pm-header">
      <button class="pm-close" onclick="closePlayerModal()">✕</button>
      <div class="pm-avatar" style="background:${color}22;border:2px solid ${color};color:${color}">${initials}</div>
      <div class="pm-name">${s.display_name || s.username}</div>
      <div class="pm-username">@${s.username}</div>
    </div>

    <div class="pm-stats-grid">
      <div class="pm-stat">
        <div class="pm-stat-val" style="color:var(--am)">${(s.total_points || 0).toLocaleString('en')}</div>
        <div class="pm-stat-key">⭐ points</div>
      </div>
      <div class="pm-stat">
        <div class="pm-stat-val">${activeSubs.length} / ${totalSubjects}</div>
        <div class="pm-stat-key">📚 subjects</div>
      </div>
      <div class="pm-stat">
        <div class="pm-stat-val" style="color:var(--cy)">🔥 ${s.streak_current || 0}</div>
        <div class="pm-stat-key">streak</div>
      </div>
      <div class="pm-stat">
        <div class="pm-stat-val">🏅 ${s.achievements || 0}</div>
        <div class="pm-stat-key">achievements</div>
      </div>
    </div>

    <div class="pm-section-title">Subject Progress</div>
    <div class="pm-subjects">${subjectRows}</div>

    ${recentRows ? `
    <div class="pm-section-title" style="margin-top:20px">Recent Activity</div>
    <div class="pm-recent">${recentRows}</div>` : ''}
  `;
}
