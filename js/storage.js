/**
 * storage.js — LocalStorage helpers (multi-subject, per-user)
 * Key format: sq_{username}_{subject}_{key}  or  sq_{username}_global_{key}
 */

// ── Current logged-in user ──────────────────────────────────
const Auth = {
  getUser:     () => { try { return JSON.parse(localStorage.getItem('sq_current_user')); } catch { return null; } },
  setUser:     (u) => localStorage.setItem('sq_current_user', JSON.stringify(u)),
  clearUser:   () => { localStorage.removeItem('sq_current_user'); localStorage.removeItem('sq_session_username'); },
  getUsername: () => { try { return JSON.parse(localStorage.getItem('sq_current_user'))?.username || null; } catch { return null; } },
  isLoggedIn:  () => !!Auth.getUsername(),
  logout:      () => { Auth.clearUser(); location.href = 'login.html'; },
};

// ── Session version check — kicks users on new deploy ───────
// DISABLED: users keep their session across deploys
const _API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:8000' : '';

/*
async function checkSessionVersion() {
  if (!Auth.isLoggedIn()) return;
  try {
    const res = await fetch(_API_BASE + '/api/session-version', { signal: AbortSignal.timeout(6000) });
    if (!res.ok) return;
    const { version } = await res.json();
    const stored = localStorage.getItem('sq_session_version');
    if (stored !== version) {
      Auth.clearUser();
      localStorage.setItem('sq_session_version', version);
      location.href = 'login.html?kicked=1';
    }
  } catch { }
}
checkSessionVersion();
*/

// ── Heartbeat — sends "I'm online" ping every 30s ───────────
function startHeartbeat() {
  const username = Auth.getUsername();
  if (!username) return;
  const page = location.pathname.split('/').pop() || 'dashboard.html';
  const send = () => fetch(_API_BASE + '/api/heartbeat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, page }),
    keepalive: true,
  }).catch(() => {});
  send(); // immediate first ping
  return setInterval(send, 30000);
}

// Start heartbeat if logged in
if (Auth.isLoggedIn()) startHeartbeat();

// ── Clear legacy pq_* keys (old progress not tied to any user) ──
function clearLegacyKeys() {
  const toDelete = Object.keys(localStorage).filter(k => k.startsWith('pq_'));
  toDelete.forEach(k => localStorage.removeItem(k));
}

// ── Guard: redirect to login if not authenticated ───────────
function requireAuth() {
  if (!Auth.isLoggedIn()) {
    location.href = 'login.html';
    return false;
  }
  return true;
}

const S = {
  // Per-user, per-subject storage prefix
  _prefix(subj) {
    const uname = Auth.getUsername() || 'guest';
    return subj ? `sq_${uname}_${subj}_` : `sq_${uname}_global_`;
  },

  // Per-subject storage
  get: (k, subj) => {
    try { return JSON.parse(localStorage.getItem(S._prefix(subj) + k)); }
    catch { return null; }
  },
  set: (k, v, subj) => {
    localStorage.setItem(S._prefix(subj) + k, JSON.stringify(v));
  },
  del: (k, subj) => {
    localStorage.removeItem(S._prefix(subj) + k);
  },
  clearSubject: (subj) => {
    const prefix = S._prefix(subj);
    Object.keys(localStorage)
      .filter(k => k.startsWith(prefix))
      .forEach(k => localStorage.removeItem(k));
  },
  clearAll: () => {
    const uname = Auth.getUsername() || 'guest';
    const prefix = `sq_${uname}_`;
    Object.keys(localStorage)
      .filter(k => k.startsWith(prefix))
      .forEach(k => localStorage.removeItem(k));
  },

  // Legacy shim — физика была без subject (pq_ prefix)
  legacyGet: (k) => {
    try { return JSON.parse(localStorage.getItem('pq_' + k)); }
    catch { return null; }
  }
};

// ── Subject registry ──────────────────────────────────────────
// Добавляй новые предметы сюда
const SUBJECTS = {
  physics: {
    id:    'physics',
    name:  'Physics',
    short: 'PHY1',
    color: '--pk',
    icon:  'atom',
    desc:  'Mechanics, Fluid Dynamics, Thermodynamics',
    topics: {
      mechanics:  { name: 'Mechanics',       color: '--pk2' },
      fluids:     { name: 'Fluid Dynamics',  color: '--cy'  },
      thermo:     { name: 'Thermodynamics',  color: '--am'  },
    }
  },
  mathanalysis: {
    id:    'mathanalysis',
    name:  'Math Analysis 2',
    short: 'MA2',
    color: '--gr',
    icon:  'function',
    desc:  'Multiple integrals, series, vector calculus, Fourier',
    topics: {
      integrals: { name: 'Multiple Integrals', color: '--gr'  },
      series:    { name: 'Series & Sequences', color: '--cy'  },
      vector:    { name: 'Vector Calculus',    color: '--pk2' },
      extrema:   { name: 'Extrema & Optim.',  color: '--am'  },
      fourier:   { name: 'Fourier Series',     color: '--vi2' },
    }
  },
  linalg: {
    id:    'linalg',
    name:  'Linear Algebra 2',
    short: 'LA2',
    color: '--cy',
    icon:  'matrix',
    desc:  'SVD, LU, QR, Cholesky, interpolation, splines',
    topics: {
      svd:           { name: 'SVD (Singular Values)',      color: '--cy'  },
      lu:            { name: 'LU Decomposition',           color: '--pk2' },
      cholesky:      { name: 'Cholesky Decomposition',     color: '--am'  },
      qr:            { name: 'QR Decomposition',           color: '--gr'  },
      interpolation: { name: 'Interpolation & Splines',    color: '--vi2' },
      matrices:      { name: 'Matrix Properties & Rank',   color: '--pk'  },
      eigenvalues:   { name: 'Eigenvalues 🆕',             color: '--cy'  },
      powermethod:   { name: 'Power Method 🆕',            color: '--gr'  },
    }
  },
  drawing: {
    id:    'drawing',
    name:  'Engineering Drawing',
    short: 'DRW',
    color: '--am',
    icon:  'ruler',
    desc:  'Threaded connections, projections, tolerances',
    topics: {
      threads:     { name: 'Threaded Connections', color: '--am'  },
      projections: { name: 'Projections',          color: '--cy'  },
      tolerances:  { name: 'Tolerances & Fits',    color: '--pk2' },
    }
  },
  fundamental: {
    id:    'fundamental',
    name:  'Fundamental Strength of Materials',
    short: 'FSM',
    color: '--vi2',
    icon:  'beam',
    desc:  'Material properties, stress & strain, structural analysis',
    topics: {
      material:   { name: 'Material Properties',  color: '--vi2' },
      stress:     { name: 'Stress & Strain',       color: '--pk2' },
      structural: { name: 'Structural Analysis',   color: '--cy'  },
      internal:   { name: 'Internal Actions',      color: '--am'  },
      safety:     { name: 'Stress & Safety Factor',color: '--gr'  },
    }
  },
  linalg1: {
    id:    'linalg1',
    name:  'Linear Algebra 1',
    short: 'LA1',
    color: '--pk',
    icon:  'matrix',
    desc:  'Matrices, Determinants, Inverse Matrix, Systems of Equations, Eigenvalues',
    topics: {
      matmul:      { name: 'Matrix Multiplication', color: '--pk'  },
      inverse:     { name: 'Inverse Matrix',        color: '--cy'  },
      determinants:{ name: 'Determinants',          color: '--am'  },
      systems:     { name: 'Systems of Equations',  color: '--gr'  },
      properties:  { name: 'Matrix Properties',     color: '--vi2' },
      eigenvalues: { name: 'Eigenvalues',           color: '--pk2' },
      vectorspaces:{ name: 'Vector Spaces',         color: '--cy'  },
    }
  }
};

// ── Physics topic ID map (legacy) ────────────────────────────
const TOPIC_IDS = {
  mechanics: [79,95,146,147,161,181,40,44,45,81,54,1,2,5,108,82,
              13,85,86,170,39,129,130,41,42,43,98,99,131,132,133,
              21,29,37,50,91,92,106,110,134,135,145,149,150,151,160,167,174,185,
              3,4,10,19,20,22,23,30,33,34,48,52,53,61,72,77,142,143,144,173,
              68,179,111,190,122,183,103,123,69,127],
  fluids:    [35,38,51,66,70,105,107,191,62,88,15,117,94,97,64,136,137],
  thermo:    [47,168,93,49,55,175,176,96,24,65,71,76,89,109,115,180,184,
              182,141,16,18,28,154,169,186,63,32,101,194,187,58,59,60,74,75,
              80,87,90,121,128,138,139,148,153,155,156,162,166,171,172,104,
              11,12,67,83,114,113,116,124,152,177,178,188,17,125,
              6,7,8,9,14,26,27,31,36,46,56,57,73,78,84,100,102,112,
              118,119,120,126,140,157,158,163,164,165,189,192,193]
};

// ── Math Analysis 2 topic ID map ─────────────────────────────
// IDs 1–9:    exam 22.01.2026
// IDs 101–110: exam 23.01.2025
// IDs 201–209: exam 09.06.2025
// IDs 301+:   exam 2014–2022  (see js/mathanalysis_questions.js)
const MA2_TOPIC_IDS = {
  integrals: [1, 109, 204, 208],
  series:    [2, 4, 8, 101, 104, 201, 203, 209],
  vector:    [3, 6, 103, 108, 202, 206],
  extrema:   [5, 7, 102, 105, 106, 110, 207],
  fourier:   [9, 107, 205],
};

// ── Linear Algebra 2 topic ID map ────────────────────────────
// IDs 1001–1049 (see js/linalg2_questions.js)
const LA2_TOPIC_IDS = {
  svd:           [1001, 1004, 1012, 1015, 1016, 1020, 1022, 1026, 1033, 1038],
  lu:            [1006, 1011, 1014, 1025, 1027, 1028, 1040, 1041, 1051, 1053, 1054, 1055, 1057, 1058],
  cholesky:      [1003, 1013, 1019, 1031, 1032, 1034, 1036, 1037, 1052, 1056, 1059],
  qr:            [1010, 1044, 1048],
  interpolation: [1002, 1005, 1007, 1008, 1009, 1017, 1018, 1021, 1023, 1024, 1029, 1030, 1035, 1039, 1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1079],
  matrices:      [1001, 1004, 1012, 1015, 1016, 1020, 1022, 1033, 1038, 1072, 1073, 1074, 1075],
  eigenvalues:   [1046, 1047],
  powermethod:   [1042, 1043, 1045, 1049, 1050],
  floatingpoint: [1076, 1077, 1078],
};

// ── Fundamental Strength of Materials topic ID map ───────────
// IDs 5001–5099 (see js/fundamental_questions.js)
const FUNDAMENTAL_TOPIC_IDS = {
  material:   [5001, 5003],
  stress:     [5002],
  structural: [5004],
  internal:   [5005],
  safety:     [5006],
};

// ── Linear Algebra 1 topic ID map ────────────────────────────
// IDs 2001–2099 (see js/linalg1_questions.js)
const LA1_TOPIC_IDS = {
  matmul:       [2001, 2002, 2003],
  inverse:      [2004, 2005],
  determinants: [2006, 2007, 2008, 2009],
  systems:      [2010, 2011, 2012, 2013],
  properties:   [2014, 2015, 2016, 2017, 2018, 2019],
  eigenvalues:  [2020, 2021, 2022],
  vectorspaces: [2023, 2024],
};

// ── Math Analysis 2 questions → см. js/mathanalysis_questions.js ──
// window.MA2_QUESTIONS задаётся там. Здесь объявляем заглушку только если файл ещё не загружен.
if (typeof window.MA2_QUESTIONS === 'undefined') window.MA2_QUESTIONS = [];

// ── Helper: get progress stats for a subject ─────────────────
function getSubjectStats(subjId) {
  const results  = S.get('results',  subjId) || [];
  const mistakes = S.get('mistakes', subjId) || [];
  const correct  = S.get('correct_ids', subjId) || [];

  const total   = results.length;
  const scores  = results.map(r => r.pct || Math.round(r.score / r.total * 100));
  const best    = scores.length ? Math.max(...scores) : 0;
  const avg     = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0;

  return { results, mistakes, correct, total, best, avg };
}


// ── Mobile sidebar hamburger (injected on all pages with sidebar) ──
(function initMobileSidebar() {
  document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.querySelector('.sidebar');
    const topbar  = document.querySelector('.topbar');
    if (!sidebar || !topbar) return;

    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    const appLayout = document.querySelector('.app-layout');
    (appLayout || document.body).appendChild(overlay);

    const btn = document.createElement('button');
    btn.className = 'hamburger';
    btn.setAttribute('aria-label', 'Меню');
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="6"  x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>`;

    const topbarLeft = topbar.querySelector('.topbar-left');
    if (topbarLeft) {
      topbarLeft.insertBefore(btn, topbarLeft.firstChild);
    } else {
      topbar.insertBefore(btn, topbar.firstChild);
    }

    function openSidebar()  { sidebar.classList.add('open'); overlay.classList.add('show'); }
    function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('show'); }

    btn.addEventListener('click', () =>
      sidebar.classList.contains('open') ? closeSidebar() : openSidebar()
    );
    overlay.addEventListener('click',      closeSidebar);
    overlay.addEventListener('touchstart', closeSidebar, { passive: true });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeSidebar(); });
    sidebar.querySelectorAll('.nav-item').forEach(a => a.addEventListener('click', closeSidebar));
  });
})();
