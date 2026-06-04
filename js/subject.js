/**
 * subject.js — Subject page logic
 */

let subjectId    = '';
let subjectData  = null;
let selectedMode = 'all';
let selectedCount = 20;

// Subjects that have questions ready
const SUBJECTS_WITH_QUESTIONS = ['physics', 'mathanalysis', 'linalg', 'drawing', 'fundamental'];

document.addEventListener('DOMContentLoaded', () => {
  subjectId   = new URLSearchParams(location.search).get('s') || 'physics';
  subjectData = SUBJECTS[subjectId];
  if (!subjectData) { location.href = 'dashboard.html'; return; }

  document.querySelectorAll('.sidebar .nav-item[href*="subject.html"]').forEach(a => {
    if (a.href.includes('s=' + subjectId)) a.classList.add('active');
  });

  renderHeader();
  renderStats();
  renderTopics();
  renderHistory();
  renderModes();
  renderQuestionBrowser();
});

// ── Header ──────────────────────────────────────────────────
function renderHeader() {
  document.title = subjectData.name + ' — StudyQuiz';
  document.getElementById('subjectTitle').textContent = subjectData.name;
  document.getElementById('subjectBadge').textContent = subjectData.short;
}

// ── Stats cards ─────────────────────────────────────────────
function renderStats() {
  const st  = getSubjectStats(subjectId);
  const grid = document.getElementById('statsGrid');

  grid.innerHTML = `
    <div class="stat-card accent">
      <div class="stat-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
      </div>
      <div class="stat-val">${st.best ? st.best + '%' : '—'}</div>
      <div class="stat-label">Best Score</div>
      <div class="stat-sub">${st.best ? 'personal record' : 'no data'}</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
      </div>
      <div class="stat-val">${st.total}</div>
      <div class="stat-label">Attempts</div>
      <div class="stat-sub">${st.total === 0 ? 'take your first!' : 'for this subject'}</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10M18 20V4M6 20v-6"/></svg>
      </div>
      <div class="stat-val">${st.avg ? st.avg + '%' : '—'}</div>
      <div class="stat-label">Average Score</div>
      <div class="stat-sub">across all attempts</div>
    </div>
    <div class="stat-card">
      <div class="stat-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9L9 15M9 9l6 6"/></svg>
      </div>
      <div class="stat-val">${st.mistakes.length}</div>
      <div class="stat-label">Mistakes</div>
      <div class="stat-sub">to review</div>
    </div>`;
}

// ── Topics progress ──────────────────────────────────────────
function renderTopics() {
  const el     = document.getElementById('topicList');
  const topics = subjectData.topics;

  if (!topics || !Object.keys(topics).length) {
    el.innerHTML = '<div class="h-empty">Topics will appear once materials are loaded</div>';
    return;
  }

  const correct    = S.get('correct_ids', subjectId) || [];
  const correctSet = new Set(correct);

  const getIds = (slug) => {
    if (subjectId === 'physics')      return TOPIC_IDS[slug] || [];
    if (subjectId === 'mathanalysis') return MA2_TOPIC_IDS[slug] || [];
    if (subjectId === 'linalg')       return LA2_TOPIC_IDS[slug] || [];
    if (subjectId === 'fundamental')  return FUNDAMENTAL_TOPIC_IDS[slug] || [];
    return [];
  };

  const colorVars = ['--pk2','--cy','--am','--gr','--vi2'];
  const fills     = ['prog-fill-pk','prog-fill-cy','prog-fill-am','prog-fill-gr'];

  el.innerHTML = Object.entries(topics).map(([slug, t], i) => {
    const ids   = getIds(slug);
    const done  = ids.filter(id => correctSet.has(id)).length;
    const total = ids.length;
    const pct   = total > 0 ? Math.round(done / total * 100) : 0;
    const colorVar = colorVars[i % colorVars.length];
    const fillCls  = fills[i % fills.length];

    return `
    <div class="topic-row">
      <div class="topic-head">
        <div class="topic-name" style="color:var(${colorVar})">
          <span style="width:8px;height:8px;border-radius:50%;background:var(${colorVar});display:inline-block;flex-shrink:0"></span>
          ${t.name}
        </div>
        <div class="topic-pct">${total > 0 ? pct + '%' : '—'}</div>
      </div>
      <div class="prog-bar"><div class="prog-fill ${fillCls}" style="width:0%" data-target="${pct}"></div></div>
      <div class="topic-detail">${total > 0 ? `${done} / ${total} questions correct` : 'Questions not loaded yet'}</div>
    </div>`;
  }).join('');

  setTimeout(() => {
    el.querySelectorAll('.prog-fill[data-target]').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
    });
  }, 150);
}

// ── History ──────────────────────────────────────────────────
function renderHistory() {
  const el = document.getElementById('historyList');
  const results = (S.get('results', subjectId) || []).slice().reverse().slice(0, 8);

  if (!results.length) {
    el.innerHTML = `<div class="h-empty">No history yet.<br>Take your first quiz!</div>`;
    return;
  }

  const modeNames = {
    all:'All questions', mistakes:'Mistakes',
    mechanics:'Mechanics', fluids:'Fluids',
    thermo:'Thermo', random:'Quick round',
    integrals:'Integrals', series:'Series',
    vector:'Vector', extrema:'Extrema', fourier:'Fourier',
    svd:'SVD', lu:'LU Decomposition', cholesky:'Cholesky',
    qr:'QR Decomposition', interpolation:'Interpolation & Splines',
    matrices:'Matrix Properties',
    exam_2026:'Exam 2026', exam_2025:'Exam 2025',
    exam_2025_june:'Exam Jun 2025',
  };

  el.innerHTML = results.map((r, i) => {
    const pct   = r.pct || Math.round(r.score / r.total * 100);
    const color = pct >= 80 ? 'var(--gr)' : pct >= 60 ? 'var(--am)' : 'var(--re)';
    return `
    <div class="history-item">
      <div class="h-rank">${i + 1}</div>
      <div class="h-info">
        <div class="h-score" style="color:${color}">
          ${pct}% <span style="font-size:11px;color:var(--text3)">(${r.score}/${r.total})</span>
        </div>
        <div class="h-meta">${modeNames[r.mode] || r.mode} · ${new Date(r.date).toLocaleDateString('en')}</div>
      </div>
      <div class="h-bar"><div class="h-bar-fill" style="width:${pct}%"></div></div>
    </div>`;
  }).join('');
}

// ── Mode cards ───────────────────────────────────────────────
function renderModes() {
  const hasQuestions = SUBJECTS_WITH_QUESTIONS.includes(subjectId);
  const comingSoon   = document.getElementById('comingSoon');
  const btnStart     = document.getElementById('btnStart');
  const grid         = document.getElementById('modeGrid');

  if (!hasQuestions) {
    comingSoon.style.display = 'flex';
    btnStart.style.display   = 'none';
    grid.style.display       = 'none';
    return;
  }

  btnStart.style.display = 'flex';
  const mistakes = S.get('mistakes', subjectId) || [];

  if (subjectId === 'physics') {
    renderPhysicsModes(grid, mistakes);
  } else if (subjectId === 'mathanalysis') {
    renderMA2Modes(grid, mistakes);
  } else if (subjectId === 'linalg') {
    renderLA2Modes(grid, mistakes);
  } else if (subjectId === 'drawing') {
    renderDrawingModes(grid, mistakes);
  } else if (subjectId === 'fundamental') {
    renderFundamentalModes(grid, mistakes);
  }
}

function renderPhysicsModes(grid, mistakes) {
  const all = window.QUESTIONS_DATA || [];
  const correctIds = new Set(S.get('correct_ids', 'physics') || []);
  const mistakeSet = new Set(S.get('mistakes', 'physics') || []);
  const unseen = all.filter(q => !correctIds.has(q.id) && !mistakeSet.has(q.id));

  grid.innerHTML = `
    <div class="mode-card selected" data-mode="all" onclick="selectMode(this,'all')">
      <span class="mode-badge">194</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
      </div>
      <div class="mode-name">All questions</div>
      <div class="mode-desc">Full random order</div>
    </div>
    <div class="mode-section-label">Practice</div>
    <div class="mode-card ${mistakes.length === 0 ? 'disabled' : ''}" data-mode="mistakes" onclick="selectMode(this,'mistakes')">
      <span class="mode-badge">${mistakes.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 7 23 1 17 1"/><path d="M1 11V9a10 10 0 0 1 18.8-4.7L23 7"/><polyline points="1 17 1 23 7 23"/><path d="M23 13v2a10 10 0 0 1-18.8 4.6L1 17"/></svg>
      </div>
      <div class="mode-name">Mistakes only</div>
      <div class="mode-desc">Review your weak spots</div>
    </div>
    <div class="mode-card ${unseen.length === 0 ? 'disabled' : ''}" data-mode="unseen" onclick="selectMode(this,'unseen')">
      <span class="mode-badge" style="background:var(--cy)22;color:var(--cy)">${unseen.length}</span>
      <div class="mode-icon-wrap" style="color:var(--cy)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <div class="mode-name" style="color:var(--cy)">Unseen</div>
      <div class="mode-desc">Continue where you left off</div>
    </div>
    <div class="mode-card" data-mode="random" onclick="selectMode(this,'random')">
      <span class="mode-badge" id="cntRandom">20</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      </div>
      <div class="mode-name">Quick round</div>
      <div class="mode-desc">N random questions</div>
    </div>
    <div class="mode-section-label">By topic</div>
    <div class="mode-card" data-mode="mechanics" onclick="selectMode(this,'mechanics')">
      <span class="mode-badge">${TOPIC_IDS.mechanics.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </div>
      <div class="mode-name">Mechanics</div>
      <div class="mode-desc">Momentum, rotation, oscillations</div>
    </div>
    <div class="mode-card" data-mode="fluids" onclick="selectMode(this,'fluids')">
      <span class="mode-badge">${TOPIC_IDS.fluids.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></svg>
      </div>
      <div class="mode-name">Fluid Dynamics</div>
      <div class="mode-desc">Hydrodynamics, viscosity</div>
    </div>
    <div class="mode-card" data-mode="thermo" onclick="selectMode(this,'thermo')">
      <span class="mode-badge">${TOPIC_IDS.thermo.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"/></svg>
      </div>
      <div class="mode-name">Thermodynamics</div>
      <div class="mode-desc">Heat, gases, Carnot cycle</div>
    </div>`;
}

function renderMA2Modes(grid, mistakes) {
  const total = MA2_QUESTIONS.length;
  const exam2026 = MA2_QUESTIONS.filter(q => q.exam === '22.01.2026').length;
  const exam2025 = MA2_QUESTIONS.filter(q => q.exam === '23.01.2025').length;
  const exam2025june = MA2_QUESTIONS.filter(q => q.exam === '09.06.2025').length;
  const all = MA2_QUESTIONS;
  const correctIds = new Set(S.get('correct_ids', 'mathanalysis') || []);
  const mistakeSet = new Set(S.get('mistakes', 'mathanalysis') || []);
  const unseen = all.filter(q => !correctIds.has(q.id) && !mistakeSet.has(q.id));
  grid.innerHTML = `
    <div class="mode-card selected" data-mode="all" onclick="selectMode(this,'all')">
      <span class="mode-badge">${total}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
      </div>
      <div class="mode-name">All questions</div>
      <div class="mode-desc">All ${total} questions · all exams</div>
    </div>
    <div class="mode-section-label">Exams</div>
    <div class="mode-card" data-mode="exam_2026" onclick="selectMode(this,'exam_2026')">
      <span class="mode-badge new-badge">${exam2026} 🆕</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      </div>
      <div class="mode-name">Exam 22.01.2026 🆕</div>
      <div class="mode-desc">${exam2026} questions</div>
    </div>
    <div class="mode-card" data-mode="exam_2025" onclick="selectMode(this,'exam_2025')">
      <span class="mode-badge">${exam2025}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      </div>
      <div class="mode-name">Exam 23.01.2025</div>
      <div class="mode-desc">${exam2025} questions</div>
    </div>
    <div class="mode-card" data-mode="exam_2025_june" onclick="selectMode(this,'exam_2025_june')">
      <span class="mode-badge">${exam2025june}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      </div>
      <div class="mode-name">Exam 09.06.2025</div>
      <div class="mode-desc">${exam2025june} questions</div>
    </div>
    <div class="mode-section-label">Practice</div>
    <div class="mode-card ${mistakes.length === 0 ? 'disabled' : ''}" data-mode="mistakes" onclick="selectMode(this,'mistakes')">
      <span class="mode-badge">${mistakes.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 7 23 1 17 1"/><path d="M1 11V9a10 10 0 0 1 18.8-4.7L23 7"/><polyline points="1 17 1 23 7 23"/><path d="M23 13v2a10 10 0 0 1-18.8 4.6L1 17"/></svg>
      </div>
      <div class="mode-name">Mistakes only</div>
      <div class="mode-desc">Review your weak spots</div>
    </div>
    <div class="mode-card ${unseen.length === 0 ? 'disabled' : ''}" data-mode="unseen" onclick="selectMode(this,'unseen')">
      <span class="mode-badge" style="background:var(--cy)22;color:var(--cy)">${unseen.length}</span>
      <div class="mode-icon-wrap" style="color:var(--cy)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <div class="mode-name" style="color:var(--cy)">Unseen</div>
      <div class="mode-desc">Continue where you left off</div>
    </div>
    <div class="mode-section-label">By topic</div>
    <div class="mode-card" data-mode="integrals" onclick="selectMode(this,'integrals')">
      <span class="mode-badge">${MA2_TOPIC_IDS.integrals.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3c-1 2-1 4 0 8s0 6-1 8"/><path d="M16 3c1 2 1 4 0 8s0 6 1 8"/></svg>
      </div>
      <div class="mode-name">Multiple Integrals</div>
      <div class="mode-desc">Multiple and line integrals</div>
    </div>
    <div class="mode-card" data-mode="series" onclick="selectMode(this,'series')">
      <span class="mode-badge">${MA2_TOPIC_IDS.series.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
      </div>
      <div class="mode-name">Series & Sequences</div>
      <div class="mode-desc">Series, convergence, expansions</div>
    </div>
    <div class="mode-card" data-mode="vector" onclick="selectMode(this,'vector')">
      <span class="mode-badge">${MA2_TOPIC_IDS.vector.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </div>
      <div class="mode-name">Vector Calculus</div>
      <div class="mode-desc">Divergence, curl, theorems</div>
    </div>
    <div class="mode-card" data-mode="extrema" onclick="selectMode(this,'extrema')">
      <span class="mode-badge">${MA2_TOPIC_IDS.extrema.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
      </div>
      <div class="mode-name">Extrema & Taylor</div>
      <div class="mode-desc">Extrema, derivatives, tangent planes</div>
    </div>
    <div class="mode-card" data-mode="fourier" onclick="selectMode(this,'fourier')">
      <span class="mode-badge">${MA2_TOPIC_IDS.fourier.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12 Q6 4 10 12 Q14 20 18 12 Q22 4 24 12"/></svg>
      </div>
      <div class="mode-name">Fourier Series</div>
      <div class="mode-desc">Fourier series, convergence</div>
    </div>
    <div class="mode-card" data-mode="random" onclick="selectMode(this,'random')">
      <span class="mode-badge" id="cntRandom">5</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      </div>
      <div class="mode-name">Quick round</div>
      <div class="mode-desc">N random questions</div>
    </div>`;
  selectedCount = 5;
}

// ── Mode / count controls ────────────────────────────────────
function selectMode(el, mode) {
  if (el.classList.contains('disabled')) return;
  document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedMode = mode;
  document.getElementById('countRow').style.display = mode === 'random' ? 'flex' : 'none';
}

function setCount(n) {
  selectedCount = n;
  document.querySelectorAll('.count-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.trim() == n);
  });
  const custom = document.getElementById('countCustom');
  if (custom) custom.value = n;
  const cnt = document.getElementById('cntRandom');
  if (cnt) cnt.textContent = n;
}

function setCountCustom(v) {
  const n = Math.max(1, Math.min(999, parseInt(v) || 5));
  selectedCount = n;
  document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
  const cnt = document.getElementById('cntRandom');
  if (cnt) cnt.textContent = n;
}

// ── Start quiz ───────────────────────────────────────────────
function startQuiz() {
  const seed  = Date.now();
  const count = selectedMode === 'random' ? selectedCount : 'all';
  location.href = `quiz.html?subject=${subjectId}&seed=${seed}&mode=${selectedMode}&count=${count}`;
}

function confirmResetSubject() {
  if (confirm(`⚠️ Reset progress for "${subjectData.name}"?`)) {
    S.clearSubject(subjectId);
    location.reload();
  }
}

// ── LA2 Mode cards ───────────────────────────────────────────
function renderLA2Modes(grid, mistakes) {
  const all = window.LA2_QUESTIONS || [];
  const total = all.length;
  const correctIds = new Set(S.get('correct_ids', 'linalg') || []);
  const mistakeSet = new Set(S.get('mistakes', 'linalg') || []);
  const unseen = all.filter(q => !correctIds.has(q.id) && !mistakeSet.has(q.id));
  grid.innerHTML = `
    <div class="mode-card selected" data-mode="all" onclick="selectMode(this,'all')">
      <span class="mode-badge">${total}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
      </div>
      <div class="mode-name">All questions</div>
      <div class="mode-desc">All ${total} questions · all topics</div>
    </div>
    <div class="mode-section-label">Practice</div>
    <div class="mode-card ${mistakes.length === 0 ? 'disabled' : ''}" data-mode="mistakes" onclick="selectMode(this,'mistakes')">
      <span class="mode-badge">${mistakes.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 7 23 1 17 1"/><path d="M1 11V9a10 10 0 0 1 18.8-4.7L23 7"/><polyline points="1 17 1 23 7 23"/><path d="M23 13v2a10 10 0 0 1-18.8 4.6L1 17"/></svg>
      </div>
      <div class="mode-name">Mistakes only</div>
      <div class="mode-desc">Review your weak spots</div>
    </div>
    <div class="mode-card ${unseen.length === 0 ? 'disabled' : ''}" data-mode="unseen" onclick="selectMode(this,'unseen')">
      <span class="mode-badge" style="background:var(--cy)22;color:var(--cy)">${unseen.length}</span>
      <div class="mode-icon-wrap" style="color:var(--cy)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <div class="mode-name" style="color:var(--cy)">Unseen</div>
      <div class="mode-desc">Continue where you left off</div>
    </div>
    <div class="mode-card" data-mode="random" onclick="selectMode(this,'random')">
      <span class="mode-badge" id="cntRandom">10</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      </div>
      <div class="mode-name">Quick round</div>
      <div class="mode-desc">N random questions</div>
    </div>
    ${(() => { const newQs = all.filter(q => q.isNew); return newQs.length > 0 ? `
    <div class="mode-card" data-mode="new_questions" onclick="selectMode(this,'new_questions')" style="border-color:var(--am)44">
      <span class="mode-badge" style="background:var(--am)22;color:var(--am)">${newQs.length} 🆕</span>
      <div class="mode-icon-wrap" style="color:var(--am)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
      <div class="mode-name" style="color:var(--am)">New questions 🆕</div>
      <div class="mode-desc">${newQs.length} fresh questions</div>
    </div>` : ''; })()}
    <div class="mode-section-label">By topic</div>
    <div class="mode-card" data-mode="svd" onclick="selectMode(this,'svd')">
      <span class="mode-badge">${LA2_TOPIC_IDS.svd.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>
      </div>
      <div class="mode-name">SVD</div>
      <div class="mode-desc">Singular values, rank, dimensions</div>
    </div>
    <div class="mode-card" data-mode="lu" onclick="selectMode(this,'lu')">
      <span class="mode-badge">${LA2_TOPIC_IDS.lu.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/></svg>
      </div>
      <div class="mode-name">LU Decomposition</div>
      <div class="mode-desc">LU, PA=LU, solving systems</div>
    </div>
    <div class="mode-card" data-mode="cholesky" onclick="selectMode(this,'cholesky')">
      <span class="mode-badge">${LA2_TOPIC_IDS.cholesky.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      </div>
      <div class="mode-name">Cholesky</div>
      <div class="mode-desc">SPD matrices, det(A), chol(A)</div>
    </div>
    <div class="mode-card" data-mode="qr" onclick="selectMode(this,'qr')">
      <span class="mode-badge">${LA2_TOPIC_IDS.qr.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
      </div>
      <div class="mode-name">QR Decomposition</div>
      <div class="mode-desc">Orthogonal matrices, qr(A)</div>
    </div>
    <div class="mode-card" data-mode="interpolation" onclick="selectMode(this,'interpolation')">
      <span class="mode-badge">${LA2_TOPIC_IDS.interpolation.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3c0 0 4 4 5 9s4 9 13 9"/><circle cx="8" cy="8" r="1" fill="currentColor"/><circle cx="16" cy="16" r="1" fill="currentColor"/></svg>
      </div>
      <div class="mode-name">Interpolation & Splines</div>
      <div class="mode-desc">polyfit, spline, MATLAB commands</div>
    </div>
    <div class="mode-card" data-mode="matrices" onclick="selectMode(this,'matrices')">
      <span class="mode-badge">${LA2_TOPIC_IDS.matrices.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="2" y1="8" x2="22" y2="8"/><line x1="2" y1="14" x2="22" y2="14"/><line x1="8" y1="2" x2="8" y2="22"/><line x1="14" y1="2" x2="14" y2="22"/></svg>
      </div>
      <div class="mode-name">Matrix Properties</div>
      <div class="mode-desc">Rank, invertibility, structure</div>
    </div>
    <div class="mode-card" data-mode="eigenvalues" onclick="selectMode(this,'eigenvalues')">
      <span class="mode-badge new-badge">${LA2_TOPIC_IDS.eigenvalues.length} 🆕</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>
      </div>
      <div class="mode-name">Eigenvalues 🆕</div>
      <div class="mode-desc">Spectral radius, eig(A), norms</div>
    </div>
    <div class="mode-card" data-mode="powermethod" onclick="selectMode(this,'powermethod')">
      <span class="mode-badge new-badge">${LA2_TOPIC_IDS.powermethod.length} 🆕</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
      </div>
      <div class="mode-name">Power Method 🆕</div>
      <div class="mode-desc">Power iteration, inverse iteration</div>
    </div>
    <div class="mode-card" data-mode="floatingpoint" onclick="selectMode(this,'floatingpoint')">
      <span class="mode-badge new-badge">${LA2_TOPIC_IDS.floatingpoint.length} 🆕</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
      </div>
      <div class="mode-name">Floating Point 🆕</div>
      <div class="mode-desc">Normalization, rounding, cancellation</div>
    </div>`;
}

// ── Drawing Mode cards ────────────────────────────────────────
function renderDrawingModes(grid, mistakes) {
  const all   = window.DRAWING_QUESTIONS || [];
  const total = all.length;
  const correctIds = new Set(S.get('correct_ids', 'drawing') || []);
  const mistakeSet = new Set(S.get('mistakes', 'drawing') || []);
  const unseen = all.filter(q => !correctIds.has(q.id) && !mistakeSet.has(q.id));

  const threads     = all.filter(q => q.topic === 'Threaded Connections').length;
  const projections = all.filter(q => q.topic === 'Projections').length;
  const tolerances  = all.filter(q => q.topic === 'Tolerances').length;

  grid.innerHTML = `
    <div class="mode-card selected" data-mode="all" onclick="selectMode(this,'all')">
      <span class="mode-badge">${total}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
      </div>
      <div class="mode-name">All questions</div>
      <div class="mode-desc">All ${total} questions · all topics</div>
    </div>
    <div class="mode-section-label">Practice</div>
    <div class="mode-card ${mistakes.length === 0 ? 'disabled' : ''}" data-mode="mistakes" onclick="selectMode(this,'mistakes')">
      <span class="mode-badge">${mistakes.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 7 23 1 17 1"/><path d="M1 11V9a10 10 0 0 1 18.8-4.7L23 7"/><polyline points="1 17 1 23 7 23"/><path d="M23 13v2a10 10 0 0 1-18.8 4.6L1 17"/></svg>
      </div>
      <div class="mode-name">Mistakes only</div>
      <div class="mode-desc">Review your weak spots</div>
    </div>
    <div class="mode-card ${unseen.length === 0 ? 'disabled' : ''}" data-mode="unseen" onclick="selectMode(this,'unseen')">
      <span class="mode-badge" style="background:var(--cy)22;color:var(--cy)">${unseen.length}</span>
      <div class="mode-icon-wrap" style="color:var(--cy)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <div class="mode-name" style="color:var(--cy)">Unseen</div>
      <div class="mode-desc">Continue where you left off</div>
    </div>
    <div class="mode-card" data-mode="random" onclick="selectMode(this,'random')">
      <span class="mode-badge" id="cntRandom">5</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      </div>
      <div class="mode-name">Quick round</div>
      <div class="mode-desc">N random questions</div>
    </div>
    <div class="mode-section-label">By topic</div>
    ${threads > 0 ? `
    <div class="mode-card" data-mode="threads" onclick="selectMode(this,'threads')">
      <span class="mode-badge">${threads}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      </div>
      <div class="mode-name">Threaded Connections</div>
      <div class="mode-desc">Bolts, screws, studs</div>
    </div>` : ''}
    ${projections > 0 ? `
    <div class="mode-card" data-mode="projections" onclick="selectMode(this,'projections')">
      <span class="mode-badge">${projections}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
      </div>
      <div class="mode-name">Projections</div>
      <div class="mode-desc">Views, sections, cross-sections</div>
    </div>` : ''}
    ${tolerances > 0 ? `
    <div class="mode-card" data-mode="tolerances" onclick="selectMode(this,'tolerances')">
      <span class="mode-badge">${tolerances}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10M18 20V4M6 20v-6"/></svg>
      </div>
      <div class="mode-name">Tolerances & Fits</div>
      <div class="mode-desc">Fits, tolerances, deviations</div>
    </div>` : ''}`;
  selectedCount = 5;
}


// ── Fundamental Strength of Materials Mode cards ─────────────
function renderFundamentalModes(grid, mistakes) {
  const all   = window.FUNDAMENTAL_QUESTIONS || [];
  const total = all.length;
  const correctIds = new Set(S.get('correct_ids', 'fundamental') || []);
  const mistakeSet = new Set(S.get('mistakes', 'fundamental') || []);
  const unseen = all.filter(q => !correctIds.has(q.id) && !mistakeSet.has(q.id));

  const mcq  = all.filter(q => !q.type || q.type !== 'open').length;
  const open = all.filter(q => q.type === 'open').length;

  grid.innerHTML = `
    <div class="mode-card selected" data-mode="all" onclick="selectMode(this,'all')">
      <span class="mode-badge">${total}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
      </div>
      <div class="mode-name">All questions</div>
      <div class="mode-desc">All ${total} questions · MCQ + Open</div>
    </div>
    <div class="mode-section-label">Practice</div>
    <div class="mode-card ${mistakes.length === 0 ? 'disabled' : ''}" data-mode="mistakes" onclick="selectMode(this,'mistakes')">
      <span class="mode-badge">${mistakes.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 7 23 1 17 1"/><path d="M1 11V9a10 10 0 0 1 18.8-4.7L23 7"/><polyline points="1 17 1 23 7 23"/><path d="M23 13v2a10 10 0 0 1-18.8 4.6L1 17"/></svg>
      </div>
      <div class="mode-name">Mistakes only</div>
      <div class="mode-desc">Review your weak spots</div>
    </div>
    <div class="mode-card ${unseen.length === 0 ? 'disabled' : ''}" data-mode="unseen" onclick="selectMode(this,'unseen')">
      <span class="mode-badge" style="background:var(--cy)22;color:var(--cy)">${unseen.length}</span>
      <div class="mode-icon-wrap" style="color:var(--cy)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <div class="mode-name" style="color:var(--cy)">Unseen</div>
      <div class="mode-desc">Continue where you left off</div>
    </div>
    <div class="mode-card" data-mode="random" onclick="selectMode(this,'random')">
      <span class="mode-badge" id="cntRandom">3</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      </div>
      <div class="mode-name">Quick round</div>
      <div class="mode-desc">N random questions</div>
    </div>
    <div class="mode-section-label">By topic</div>
    <div class="mode-card" data-mode="material" onclick="selectMode(this,'material')">
      <span class="mode-badge">${FUNDAMENTAL_TOPIC_IDS.material.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
      </div>
      <div class="mode-name">Material Properties</div>
      <div class="mode-desc">Homogeneity, Poisson coefficient</div>
    </div>
    <div class="mode-card" data-mode="stress" onclick="selectMode(this,'stress')">
      <span class="mode-badge">${FUNDAMENTAL_TOPIC_IDS.stress.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20"/></svg>
      </div>
      <div class="mode-name">Stress & Strain</div>
      <div class="mode-desc">Shear stress, normal stress</div>
    </div>
    <div class="mode-card" data-mode="structural" onclick="selectMode(this,'structural')">
      <span class="mode-badge">${FUNDAMENTAL_TOPIC_IDS.structural.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><path d="M3 6l9 6 9-6"/></svg>
      </div>
      <div class="mode-name">Structural Analysis</div>
      <div class="mode-desc">Beam reactions, supports</div>
    </div>
    <div class="mode-card" data-mode="internal" onclick="selectMode(this,'internal')">
      <span class="mode-badge">${FUNDAMENTAL_TOPIC_IDS.internal.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
      </div>
      <div class="mode-name">Internal Actions</div>
      <div class="mode-desc">Bending moment, shear, normal, torque</div>
    </div>
    <div class="mode-card" data-mode="safety" onclick="selectMode(this,'safety')">
      <span class="mode-badge">${FUNDAMENTAL_TOPIC_IDS.safety.length}</span>
      <div class="mode-icon-wrap">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <div class="mode-name">Stress & Safety Factor</div>
      <div class="mode-desc">Von Mises, safety factor, UTS</div>
    </div>`;
  selectedCount = 3;
}

// ══════════════════════════════════════════════════════════════
// QUESTION BROWSER — быстрый переход к нужному вопросу по ID
// Работает для всех предметов
// ══════════════════════════════════════════════════════════════

function _getQuestionsForSubject(sid) {
  if (sid === 'physics')      return window.QUESTIONS_DATA || [];
  if (sid === 'linalg')       return window.LA2_QUESTIONS || [];
  if (sid === 'mathanalysis') return (typeof MA2_QUESTIONS !== 'undefined') ? MA2_QUESTIONS : [];
  if (sid === 'drawing')      return window.DRAWING_QUESTIONS || [];
  if (sid === 'fundamental')  return window.FUNDAMENTAL_QUESTIONS || [];
  return [];
}

function renderQuestionBrowser() {
  const container = document.getElementById('questionBrowserWrap');
  if (!container) return;

  const all = _getQuestionsForSubject(subjectId);
  if (!all.length) { container.style.display = 'none'; return; }

  const correctSet = new Set(S.get('correct_ids', subjectId) || []);
  const mistakeSet = new Set(S.get('mistakes',    subjectId) || []);

  window._qbAll      = all;
  window._qbCorrect  = correctSet;
  window._qbMistakes = mistakeSet;
  window._qbStatus   = 'all';

  container.innerHTML = `
    <div class="section-title" style="margin-bottom:16px">
      Go to question
      <span style="font-size:11px;font-weight:400;color:var(--text3);margin-left:8px;font-family:'JetBrains Mono',monospace">${all.length} questions</span>
    </div>
    <div class="qbrowser-panel">
      <div class="qbrowser-toolbar">
        <div class="qbrowser-search-wrap">
          <svg class="qbrowser-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" class="qbrowser-search" id="qbrowserSearch"
            placeholder="Search by ID or question topic..."
            oninput="filterQuestions(this.value)">
        </div>
        <div class="qbrowser-filters">
          <button class="qbf-btn active" onclick="filterQByStatus(this,'all')">All</button>
          <button class="qbf-btn qbf-ok"  onclick="filterQByStatus(this,'correct')">✓ Correct</button>
          <button class="qbf-btn qbf-err" onclick="filterQByStatus(this,'wrong')">✗ Mistakes</button>
          <button class="qbf-btn qbf-new" onclick="filterQByStatus(this,'unseen')">◌ New</button>
        </div>
      </div>
      <div class="qbrowser-list" id="qbrowserList"></div>
    </div>`;

  _renderQBrowserList('');
}

function _renderQBrowserList(search) {
  const el = document.getElementById('qbrowserList');
  if (!el) return;

  const searchLo = (search || '').toLowerCase();
  const status   = window._qbStatus || 'all';

  let items = window._qbAll || [];

  // Filter by status
  if (status === 'correct') {
    items = items.filter(q => window._qbCorrect.has(q.id));
  } else if (status === 'wrong') {
    items = items.filter(q => window._qbMistakes.has(q.id));
  } else if (status === 'unseen') {
    items = items.filter(q => !window._qbCorrect.has(q.id) && !window._qbMistakes.has(q.id));
  }

  // Фильтр по тексту
  if (searchLo) {
    items = items.filter(q => {
      const raw = (q.q || q.question || '').toLowerCase();
      const topic = (q.topic || '').toLowerCase();
      return String(q.id).includes(searchLo) || raw.includes(searchLo) || topic.includes(searchLo);
    });
  }

  if (!items.length) {
    el.innerHTML = '<div class="qb-empty">Вопросов не найдено</div>';
    return;
  }

  el.innerHTML = items.map(q => {
    const isCorrect = window._qbCorrect.has(q.id);
    const isMistake = window._qbMistakes.has(q.id);

    let statusBadge;
    if (isCorrect) {
      statusBadge = '<span class="qb-status qb-ok">✓</span>';
    } else if (isMistake) {
      statusBadge = '<span class="qb-status qb-err">✗</span>';
    } else {
      statusBadge = '<span class="qb-status qb-new">◌</span>';
    }

    // Чистим текст вопроса от тегов
    const rawText = (q.q || q.question || '')
      .replace(/\[formula\][\s\S]*?\[\/formula\]/g, '[формула]')
      .replace(/!\[.*?\]\(.*?\)/g, '[рис]')
      .replace(/\[num\](.*?)\[\/num\]/g, '$1')
      .replace(/\[icon\].*?\[\/icon\]/g, '')
      .replace(/\*\*/g, '').replace(/\*/g, '')
      .replace(/\n/g, ' ').trim();
    const preview = rawText.length > 100 ? rawText.slice(0, 100) + '…' : rawText;

    return `
    <div class="qb-item" onclick="goToQuestion(${q.id})" title="Перейти к вопросу #${q.id}">
      <div class="qb-item-left">
        ${statusBadge}
        <div class="qb-id">#${q.id}</div>
        <div class="qb-content">
          <div class="qb-topic">${q.topic || ''}</div>
          <div class="qb-preview">${preview}</div>
        </div>
      </div>
      <div class="qb-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </div>
    </div>`;
  }).join('');
}

function filterQuestions(val) {
  _renderQBrowserList(val);
}

function filterQByStatus(btn, status) {
  document.querySelectorAll('.qbf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  window._qbStatus = status;
  const searchVal = (document.getElementById('qbrowserSearch') || {}).value || '';
  _renderQBrowserList(searchVal);
}

function goToQuestion(id) {
  window.location.href = `quiz.html?mode=all&noShuffle=1&startAt=${id}&subject=${subjectId}`;
}
