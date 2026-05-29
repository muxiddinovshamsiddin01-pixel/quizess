/**
 * dashboard_main.js — Main dashboard
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Auth guard + show user name
  const user = Auth.getUser();
  if (!user?.username) { location.href = 'login.html'; return; }

  const topbarUser = document.getElementById('topbarUser');
  if (topbarUser) topbarUser.textContent = user.display_name || user.username;

  // Render local data immediately (fast)
  updateStreak(user);
  renderOverallProgress();
  renderStats();
  renderSubjects();
  renderRecent();

  // Then load fresh data from backend
  try {
    const [freshUser, results] = await Promise.all([
      API.getUser(user.username),
      API.getResults(user.username, 10),
    ]);
    // Update stored user with fresh streak/points
    Auth.setUser({ ...freshUser });
    updateStreak(freshUser);
    renderRecentFromBackend(results);
  } catch(e) {
    // Backend offline — local data is fine
    console.warn('Dashboard backend load failed:', e.message);
  }
});

// ── Streak ──────────────────────────────────────────────────
function updateStreak(user) {
  let streakVal = 0;
  if (user && user.streak_current !== undefined) {
    // Data from backend
    streakVal = user.streak_current || 0;
  } else {
    // Fallback to localStorage
    const streak = S.get('streak', null) || S.legacyGet('streak') || { current: 0 };
    streakVal = streak.current || 0;
  }
  const el = document.getElementById('streakVal');
  if (el) el.textContent = streakVal;
}

// ── Overall progress card (across all subjects) ─────────────
function renderOverallProgress() {
  const card = document.getElementById('overallCard');
  const colorMap = { '--pk':'#c850f0','--cy':'#00d4ff','--am':'#f59e0b','--gr':'#10b981' };

  const rows = Object.values(SUBJECTS).map(subj => {
    const st  = getSubjectStats(subj.id);
    const hex = colorMap[subj.color] || '#c850f0';
    const IDS_MAP2 = { physics: TOPIC_IDS, linalg: LA2_TOPIC_IDS, mathanalysis: MA2_TOPIC_IDS };
    const hasQuestionBank2 = !!IDS_MAP2[subj.id];

    let pct = 0, doneText = '';
    if (hasQuestionBank2) {
      const correct = new Set(S.get('correct_ids', subj.id) || []);
      const allIds  = [...new Set(Object.values(IDS_MAP2[subj.id]).flat())];
      const total   = allIds.length;
      const done    = allIds.filter(id => correct.has(id)).length;
      pct      = total > 0 ? Math.round(done / total * 100) : 0;
      doneText = `${done} / ${total} вопросов`;
    } else {
      pct      = st.best || 0;
      doneText = st.total > 0 ? `${st.total} попыт${st.total===1?'ка':'ок'} · лучший ${st.best||0}%` : 'нет попыток';
    }

    return { subj, hex, pct, doneText, hasQuestionBank: hasQuestionBank2, avg: st.avg, best: st.best };
  });

  // Compute aggregate overall %
  const withPct = rows.filter(r => r.hasQuestionBank || r.best);
  const overallPct = withPct.length
    ? Math.round(withPct.reduce((s, r) => s + r.pct, 0) / withPct.length)
    : 0;

  card.innerHTML = `
    <div class="overall-header">
      <div>
        <div class="overall-title">Общий прогресс</div>
        <div style="font-size:12px;color:var(--text3);margin-top:2px;font-family:'JetBrains Mono',monospace">по всем предметам</div>
      </div>
      <div class="overall-big-pct" style="color:var(--pk)">${overallPct}%</div>
    </div>

    <div class="overall-master-bar" style="margin:14px 0 18px">
      <div class="prog-bar" style="height:7px;border-radius:100px">
        <div class="prog-fill" style="width:0%;background:linear-gradient(90deg,var(--pk),var(--cy));transition:width 1s ease" data-target="${overallPct}"></div>
      </div>
    </div>

    <div class="overall-subjects">
      ${rows.map(r => `
        <div class="overall-row">
          <div class="overall-row-name" style="color:${r.hex}">
            <span class="overall-dot" style="background:${r.hex}"></span>
            ${r.subj.name}
          </div>
          <div class="overall-row-right">
            <span class="overall-row-detail">${r.doneText}</span>
            <span class="overall-row-pct" style="color:${r.hex}">${r.pct > 0 ? r.pct+'%' : '—'}</span>
          </div>
          <div class="prog-bar overall-prog" style="grid-column:1/-1">
            <div class="prog-fill" style="width:0%;background:${r.hex}" data-target="${r.pct}"></div>
          </div>
        </div>`).join('')}
    </div>`;

  setTimeout(() => {
    card.querySelectorAll('.prog-fill[data-target]').forEach(b => {
      b.style.width = b.dataset.target + '%';
    });
  }, 150);
}

// ── Stats row (4 cards in grid) ──────────────────────────────
function renderStats() {
  let totalAttempts = 0, totalMistakes = 0, bestScore = 0, totalAvg = 0, avgCount = 0;

  Object.keys(SUBJECTS).forEach(id => {
    const st = getSubjectStats(id);
    totalAttempts += st.total;
    totalMistakes += st.mistakes.length;
    if (st.best > bestScore) bestScore = st.best;
    if (st.avg) { totalAvg += st.avg; avgCount++; }
  });
  const avgAll = avgCount ? Math.round(totalAvg / avgCount) : 0;

  document.getElementById('statsGrid').innerHTML = `
    <div class="stat-card accent">
      <div class="stat-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
      </div>
      <div class="stat-val">${bestScore ? bestScore+'%' : '—'}</div>
      <div class="stat-label">Лучший результат</div>
      <div class="stat-sub">по всем предметам</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
      </div>
      <div class="stat-val">${totalAttempts}</div>
      <div class="stat-label">Попыток всего</div>
      <div class="stat-sub">все предметы</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10M18 20V4M6 20v-6"/></svg>
      </div>
      <div class="stat-val">${avgAll ? avgAll+'%' : '—'}</div>
      <div class="stat-label">Средний балл</div>
      <div class="stat-sub">по всем попыткам</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9L9 15M9 9l6 6"/></svg>
      </div>
      <div class="stat-val">${totalMistakes}</div>
      <div class="stat-label">Ошибок всего</div>
      <div class="stat-sub">на повторение</div>
    </div>`;
}

// ── Subject cards ─────────────────────────────────────────────
function renderSubjects() {
  const grid = document.getElementById('subjectsGrid');
  const colorMap = { '--pk':'#c850f0','--cy':'#00d4ff','--am':'#f59e0b','--gr':'#10b981' };

  grid.innerHTML = Object.values(SUBJECTS).map(subj => {
    const st  = getSubjectStats(subj.id);
    const hex = colorMap[subj.color] || '#c850f0';
    // Determine which subjects have question banks with correct_ids tracking
    const IDS_MAP = { physics: TOPIC_IDS, linalg: LA2_TOPIC_IDS, mathanalysis: MA2_TOPIC_IDS };
    const hasQuestionBank = !!IDS_MAP[subj.id];

    let progressHtml = '';
    if (hasQuestionBank) {
      const correct = new Set(S.get('correct_ids', subj.id) || []);
      const allIds  = Object.values(IDS_MAP[subj.id]).flat();
      const uniqueIds = [...new Set(allIds)];
      const total   = uniqueIds.length;
      const done    = uniqueIds.filter(id => correct.has(id)).length;
      const pct     = total > 0 ? Math.round(done / total * 100) : 0;
      progressHtml = `
        <div style="margin-top:10px">
          <div style="display:flex;justify-content:space-between;margin-bottom:5px">
            <span style="font-size:11px;color:var(--text3);font-family:'JetBrains Mono',monospace">ИЗУЧЕНО</span>
            <span style="font-size:11px;font-weight:700;color:${hex};font-family:'JetBrains Mono',monospace">${pct}%</span>
          </div>
          <div class="prog-bar">
            <div class="prog-fill" style="width:${pct}%;background:${hex};transition:width 1s ease"></div>
          </div>
          <div style="font-size:11px;color:var(--text3);margin-top:4px;font-family:'JetBrains Mono',monospace">${done}/${total} вопросов правильно</div>
        </div>`;
    } else {
      const pct = st.best || 0;
      progressHtml = st.total > 0 ? `
        <div style="margin-top:10px">
          <div style="display:flex;justify-content:space-between;margin-bottom:5px">
            <span style="font-size:11px;color:var(--text3);font-family:'JetBrains Mono',monospace">ЛУЧШИЙ</span>
            <span style="font-size:11px;font-weight:700;color:${hex};font-family:'JetBrains Mono',monospace">${pct}%</span>
          </div>
          <div class="prog-bar">
            <div class="prog-fill" style="width:${pct}%;background:${hex};transition:width 1s ease"></div>
          </div>
          <div style="font-size:11px;color:var(--text3);margin-top:4px;font-family:'JetBrains Mono',monospace">${st.total} попыт${st.total===1?'ка':'ок'} · средний ${st.avg||0}%</div>
        </div>` : `
        <div style="margin-top:10px;font-size:11px;color:${hex}88;font-family:'JetBrains Mono',monospace;letter-spacing:.5px">
          ⏳ ОЖИДАЕТ МАТЕРИАЛЫ
        </div>`;
    }

    const attText = st.total === 0 ? 'нет попыток' : `${st.total} попыт${st.total===1?'ка':'ок'}`;
    const bestText = st.best ? ` · лучший ${st.best}%` : '';

    return `
    <a class="subject-card" href="subject.html?s=${subj.id}" style="--subj-color:${hex}">
      <div class="subject-card-header">
        <div class="subject-icon" style="background:${hex}18;border-color:${hex}33">
          ${getSubjectIcon(subj.icon, hex)}
        </div>
        <div class="subject-badge" style="color:${hex};border-color:${hex}33;background:${hex}12">${subj.short}</div>
      </div>
      <div class="subject-name">${subj.name}</div>
      <div class="subject-desc">${subj.desc}</div>
      <div class="subject-footer">
        <div class="subject-stats-row">
          <span class="subject-stat" style="color:var(--text3)">${attText}${bestText}</span>
        </div>
        ${progressHtml}
      </div>
    </a>`;
  }).join('');
}

// ── Recent activity ───────────────────────────────────────────
function renderRecent() {
  const wrap = document.getElementById('recentWrap');
  let all = [];
  const colorMap = { '--pk':'#c850f0','--cy':'#00d4ff','--am':'#f59e0b','--gr':'#10b981' };

  Object.values(SUBJECTS).forEach(subj => {
    const res = S.get('results', subj.id) || [];
    res.forEach(r => all.push({ ...r, subjName: subj.name, hex: colorMap[subj.color] || '#c850f0' }));
  });

  all.sort((a,b) => (b.date||0) - (a.date||0));
  all = all.slice(0, 8);

  if (!all.length) {
    wrap.innerHTML = `<div class="h-empty" style="padding:24px;background:var(--surf);border:1px solid var(--border);border-radius:var(--r);text-align:center">
      Нет истории. Пройди первый квиз!
    </div>`;
    return;
  }

  wrap.innerHTML = `<div class="recent-grid">${all.map(r => {
    const pct   = r.pct || Math.round((r.score/r.total)*100);
    const color = pct>=80?'var(--gr)':pct>=60?'var(--am)':'var(--re)';
    return `
    <div class="recent-item">
      <div class="recent-subj" style="color:${r.hex}">${r.subjName}</div>
      <div class="recent-score" style="color:${color}">${pct}%</div>
      <div class="recent-detail">${r.score}/${r.total} · ${new Date(r.date).toLocaleDateString('ru')}</div>
      <div class="h-bar" style="width:100%"><div class="h-bar-fill" style="width:${pct}%;background:${color}"></div></div>
    </div>`;
  }).join('')}</div>`;
}

function showAllHistory() { alert('История — скоро!'); }
function confirmResetAll() {
  if (confirm('⚠️ Сбросить весь прогресс?')) { S.clearAll(); location.reload(); }
}

// ── Render recent activity from backend results ────────────
function renderRecentFromBackend(results) {
  if (!results || !results.length) return;
  const wrap = document.getElementById('recentWrap');
  if (!wrap) return;

  const colorMap = { physics:'#c850f0', linalg:'#00d4ff', drawing:'#f59e0b', mathanalysis:'#10b981' };
  const nameMap  = { physics:'Physics', linalg:'Linear Algebra 2', drawing:'Engineering Drawing', mathanalysis:'Math Analysis 2' };

  const items = results.slice(0, 8);
  wrap.innerHTML = `<div class="recent-grid">${items.map(r => {
    const pct   = r.pct || 0;
    const color = pct>=80?'var(--gr)':pct>=60?'var(--am)':'var(--re)';
    const hex   = colorMap[r.subject] || '#c850f0';
    const name  = nameMap[r.subject] || r.subject;
    const date  = new Date(r.played_at).toLocaleDateString('ru');
    return `
    <div class="recent-item">
      <div class="recent-subj" style="color:${hex}">${name}</div>
      <div class="recent-score" style="color:${color}">${pct}%</div>
      <div class="recent-detail">${r.score}/${r.total} · ${date}</div>
      <div class="h-bar" style="width:100%"><div class="h-bar-fill" style="width:${pct}%;background:${color}"></div></div>
    </div>`;
  }).join('')}</div>`;
}

function getSubjectIcon(name, color) {
  const icons = {
    atom:     `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
    matrix:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>`,
    pencil:   `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    function: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="22" height="22"><path d="M3 12c0-4.97 4.03-9 9-9s9 4.03 9 9-4.03 9-9 9"/><path d="M3 12h18M12 3c-2.5 3-4 6-4 9s1.5 6 4 9M12 3c2.5 3 4 6 4 9s-1.5 6-4 9"/></svg>`,
  };
  return icons[name] || icons.atom;
}
