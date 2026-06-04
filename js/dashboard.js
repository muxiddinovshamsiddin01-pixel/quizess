/**
 * dashboard.js — Dashboard logic for Physics Quiz
 */

// ── State ──
let selectedMode  = 'all';
let selectedCount = 20;

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  renderIcons();
  updateStreak();
  updateStats();
  updateTopics();
  updateHistory();
  updateMistakesMode();
});

// ── Inject icons into placeholders ──
function renderIcons() {
  document.querySelectorAll('[data-icon]').forEach(el => {
    const name = el.dataset.icon;
    if (Icons[name]) el.innerHTML = Icons[name];
  });
}

// ── Streak ──
function updateStreak() {
  const streak = S.get('streak') || { current: 0, best: 0, lastDate: null };
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (streak.lastDate && streak.lastDate !== today && streak.lastDate !== yesterday) {
    streak.current = 0;
    S.set('streak', streak);
  }

  const n = streak.current;
  const dayWord = n === 1 ? 'day' : 'days';
  document.getElementById('streakNum').innerHTML =
    `<span class="highlight">${n}</span> ${dayWord}`;

  document.getElementById('streakMsg').textContent =
    n === 0     ? 'Start today — take your first quiz!' :
    n >= 7      ? 'On fire! Keep it up 🔥' :
                  'Great streak! Keep going every day';

  document.getElementById('streakBest').textContent = streak.best;
}

// ── Stats ──
function updateStats() {
  const results  = S.get('results')  || [];
  const mistakes = S.get('mistakes') || [];

  document.getElementById('statMistakes').textContent = mistakes.length;
  if (results.length === 0) return;

  const scores  = results.map(r => Math.round(r.score / r.total * 100));
  const best    = Math.max(...scores);
  const avg     = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  const bestR   = results[scores.indexOf(best)];

  document.getElementById('statBest').textContent    = best + '%';
  document.getElementById('statBestSub').textContent =
    `${bestR.score}/${bestR.total} · ${new Date(bestR.date).toLocaleDateString('en')}`;

  document.getElementById('statAttempts').textContent    = results.length;
  document.getElementById('statAttemptsSub').textContent =
    results.length === 1
      ? 'first attempt!'
      : `last: ${new Date(results[results.length - 1].date).toLocaleDateString('en')}`;

  document.getElementById('statAvg').textContent    = avg + '%';
  document.getElementById('statAvgSub').textContent =
    `over ${results.length} attempt${results.length === 1 ? '' : 's'}`;
}

// ── Topic progress ──
function updateTopics() {
  const correct    = S.get('correct_ids') || [];
  const correctSet = new Set(correct);

  const topics = [
    { key: 'Mech',  ids: TOPIC_IDS.mechanics, total: TOPIC_IDS.mechanics.length },
    { key: 'Fluid', ids: TOPIC_IDS.fluids,    total: TOPIC_IDS.fluids.length    },
    { key: 'Thermo',ids: TOPIC_IDS.thermo,    total: TOPIC_IDS.thermo.length    },
  ];

  topics.forEach(t => {
    const done = t.ids.filter(id => correctSet.has(id)).length;
    const pct  = t.total > 0 ? Math.round(done / t.total * 100) : 0;

    const pctEl = document.getElementById('pct'  + t.key);
    const barEl = document.getElementById('bar'  + t.key);
    const detEl = document.getElementById('det'  + t.key);

    if (pctEl) pctEl.textContent = pct + '%';
    if (barEl) setTimeout(() => { barEl.style.width = pct + '%'; }, 200);
    if (detEl) detEl.textContent = `${done} / ${t.total} correct`;
  });
}

// ── History ──
function updateHistory() {
  const results = (S.get('results') || []).slice().reverse().slice(0, 6);
  const el = document.getElementById('historyList');
  if (!el) return;

  if (results.length === 0) {
    el.innerHTML = `<div class="h-empty">No history.<br>Take your first quiz!</div>`;
    return;
  }

  const modeNames = {
    all: 'All questions', mistakes: 'Mistakes',
    mechanics: 'Mechanics', fluids: 'Fluids',
    thermo: 'Thermo', random: 'Random'
  };

  el.innerHTML = results.map((r, i) => {
    const pct   = Math.round(r.score / r.total * 100);
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

// ── Mistakes mode ──
function updateMistakesMode() {
  const mistakes = S.get('mistakes') || [];
  const cnt  = mistakes.length;
  const el   = document.getElementById('cntMistakes');
  const card = document.getElementById('modeCardMistakes');
  if (el)   el.textContent = cnt;
  if (card) {
    if (cnt > 0) {
      card.classList.remove('disabled');
    } else {
      card.classList.add('disabled');
      if (selectedMode === 'mistakes') {
        selectMode(document.querySelector('[data-mode="all"]'), 'all');
      }
    }
  }
}

// ── Mode selection ──
function selectMode(el, mode) {
  document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  selectedMode = mode;
  const countRow = document.getElementById('countRow');
  if (countRow) countRow.style.display = mode === 'random' ? 'flex' : 'none';
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
  const n = Math.max(5, Math.min(188, parseInt(v) || 20));
  selectedCount = n;
  document.querySelectorAll('.count-btn').forEach(b => b.classList.remove('active'));
  const cnt = document.getElementById('cntRandom');
  if (cnt) cnt.textContent = n;
}

// ── Start quiz ──
function startQuiz() {
  const seed  = Date.now();
  const count = selectedMode === 'random' ? selectedCount : 'all';
  window.location.href = `quiz.html?seed=${seed}&mode=${selectedMode}&count=${count}`;
}

// ── Reset ──
function confirmReset() {
  if (confirm('⚠️ Reset all progress? This cannot be undone.')) {
    S.clear();
    location.reload();
  }
}
