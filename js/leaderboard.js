/**
 * leaderboard.js
 */

// ── Check if backend is reachable ────────────────────────────
async function checkBackend() {
  try {
    const res = await fetch((window.location.hostname === 'localhost' ? 'http://localhost:8000' : '') + '/api/ping', { signal: AbortSignal.timeout(5000) });
    return res.ok;
  } catch {
    return false;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const online = await checkBackend();
  if (!online) {
    document.getElementById('offlineBanner2').style.display = 'block';
    document.getElementById('lbTable').innerHTML =
      '<div style="padding:40px;text-align:center;color:var(--text3)">Запусти backend/start.bat и обнови страницу</div>';
    return;
  }
  await loadLeaderboard();
});

async function loadLeaderboard() {
  // Показываем спиннер
  document.getElementById('lbTable').innerHTML =
    '<div style="padding:40px;text-align:center;color:var(--text3)">Загрузка...</div>';

  try {
    const myUsername = Auth.getUsername();
    const [rows, myRank] = await Promise.all([
      API.getLeaderboard(50),
      myUsername ? API.getUserRank(myUsername).catch(() => null) : Promise.resolve(null),
    ]);

    if (!rows || rows.length === 0) {
      document.getElementById('lbTable').innerHTML =
        '<div style="padding:48px;text-align:center;color:var(--text3)">Пока нет зарегистрированных игроков.<br><span style="font-size:13px;margin-top:8px;display:block">Пройди первый квиз — и ты окажешься первым!</span></div>';
      document.getElementById('podiumRow').style.display = 'none';
      return;
    }

    if (myRank && myUsername) {
      const me = rows.find(r => r.username === myUsername);
      document.getElementById('myRankCard').style.display = 'flex';
      document.getElementById('myRankNum').textContent = '#' + myRank.rank;
      document.getElementById('myRankPts').textContent = (me?.total_points || 0).toLocaleString('ru') + ' очков';
    }

    renderPodium(rows.slice(0, 3));
    renderTable(rows, myUsername);
  } catch (e) {
    document.getElementById('lbTable').innerHTML =
      `<div style="padding:24px;color:var(--re);text-align:center">Ошибка загрузки: ${e.message}</div>`;
  }
}

function renderPodium(top) {
  const el = document.getElementById('podiumRow');
  if (!top.length) { el.style.display = 'none'; return; }
  el.style.display = '';

  // Visual order: 2nd, 1st, 3rd
  const order   = [top[1], top[0], top[2]].filter(Boolean);
  const classes = top[1] ? ['p2', 'p1', 'p3'] : ['p1'];
  const medals  = top[1] ? ['🥈', '🥇', '🥉'] : ['🥇'];

  el.innerHTML = order.map((u, i) => {
    const initials = (u.display_name || u.username).slice(0, 2).toUpperCase();
    const color = u.avatar_color || '#c850f0';
    return `
    <div class="podium-item ${classes[i]}">
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
    el.innerHTML = '<div style="padding:32px;text-align:center;color:var(--text3)">Нет игроков</div>';
    return;
  }
  el.innerHTML = rows.map(u => {
    const isMe     = u.username === myUsername;
    const initials = (u.display_name || u.username).slice(0, 2).toUpperCase();
    const color    = u.avatar_color || '#c850f0';
    const rankCls  = u.rank <= 3 ? `r${u.rank}` : '';
    return `
    <div class="lb-row ${isMe ? 'me' : ''}">
      <div class="lb-rank ${rankCls}">${u.rank <= 3 ? ['🥇', '🥈', '🥉'][u.rank - 1] : '#' + u.rank}</div>
      <div class="lb-player">
        <div class="lb-avatar" style="background:${color}22;border:1.5px solid ${color};color:${color}">${initials}</div>
        <div>
          <div class="lb-pname">${u.display_name || u.username}${isMe ? ' <span style="font-size:10px;color:var(--pk)">(ты)</span>' : ''}</div>
          <div class="lb-uname">@${u.username}</div>
        </div>
      </div>
      <div class="lb-pts">${(u.total_points || 0).toLocaleString('ru')}</div>
      <div class="lb-num">${u.total_quizzes || 0}</div>
      <div class="lb-num">${u.avg_pct ? u.avg_pct.toFixed(0) + '%' : '—'}</div>
      <div class="lb-streak">🔥 ${u.streak_current || 0}</div>
      <div class="lb-ach">🏅 ${u.achievements_count || 0}</div>
    </div>`;
  }).join('');
}
