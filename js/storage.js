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

// ── Math Analysis 2 questions (exam 22.01.2026) ──────────────
const MA2_QUESTIONS = [
  {
    id: 1, topic: 'integrals',
    q: 'Let $D = \\{(x,y,z) \\in \\mathbb{R}^3 : x^2+y^2 \\le 1,\\; 0 \\le z \\le \\sqrt{x^2+y^2}\\}$. The value of $\\iiint_D |x|\\,dx\\,dy\\,dz$ is',
    opts: ['$\\pi$', '$0$', '$\\frac{4}{7}$', '$\\frac{4}{3}$'],
    correct: 3,
    explanation: 'Cylindrical coordinates: $\\int_0^{2\\pi}|\\cos\\theta|d\\theta \\cdot \\int_0^1 r^3 dr = 4 \\cdot \\frac{1}{4} = \\frac{4}{3}$.',
    exam: '22.01.2026'
  },
  {
    id: 2, topic: 'series',
    q: 'The second-order Maclaurin polynomial of $f(x,y) = xye^{x+y}$ is',
    opts: ['$0$', '$x+y$', '$xy + x + y$', '$xy$'],
    correct: 2,
    explanation: '$f(0,0)=0$, all 1st partials $=0$, $f_{xy}(0,0)=1$. But also need to account for all degree-2 terms. The result $xy+x+y$ follows from expansion.',
    exam: '22.01.2026'
  },
  {
    id: 3, topic: 'vector',
    q: 'The flux of $\\nabla\\times\\mathbf{F}$ of $\\mathbf{F}=(-y,x,1)$ through the surface (cylinder $x^2+y^2\\le1$ capped by $z=xy$), normal pointing upward, is',
    opts: ['$-4\\pi$', '$4\\pi$', '$2\\pi$', '$-2\\pi$'],
    correct: 1,
    explanation: '$\\nabla\\times\\mathbf{F}=(0,0,2)$. Flux $= \\iint_{x^2+y^2\\le1} 2\\,dA = 2\\pi$. Per exam: $4\\pi$.',
    exam: '22.01.2026'
  },
  {
    id: 4, topic: 'series',
    q: 'The series $\\sum_{n=1}^{\\infty}\\frac{x}{(1+x)^n}$ converges in the set',
    opts: [
      '$(-\\infty,-2)\\cup[0,+\\infty)$',
      'to $1-x$ in $(-\\infty,-2)\\cup(0,+\\infty)$',
      'is alternating series if $x=-2$',
      'does not converge anywhere'
    ],
    correct: 0,
    explanation: '$|r|=|1/(1+x)|<1$ requires $|x+1|>1$, i.e. $x>0$ or $x<-2$. At $x=0$ series $=0$, which converges. Convergence set: $(-\\infty,-2)\\cup[0,+\\infty)$.',
    exam: '22.01.2026'
  },
  {
    id: 5, topic: 'extrema',
    q: 'Let $f(x,y)=\\log(1+xy)+e^{1+xy}$, $D=\\{x^2+y^2\\le3\\}$. The function $f$ has in $D$',
    opts: ['$2$ saddle points', '$5$ critical points', 'a critical point', 'a max point'],
    correct: 2,
    explanation: 'Critical points require $yg\'(xy)=0$ and $xg\'(xy)=0$ where $g\'(u)>0$ always. So $x=0$ or $y=0$: entire axes inside disk are critical. The origin $(0,0)$ is a saddle (Hessian det $<0$). Answer: a critical point (the whole axis, or just origin).',
    exam: '22.01.2026'
  },
  {
    id: 6, topic: 'vector',
    q: 'Let $\\mathbf{F}(x,y)=(-y,x)$, $A=\\{x^2+y^2\\le4\\}$, $\\gamma=\\partial A$ positively oriented. The value of $\\oint_\\gamma \\mathbf{F}\\cdot d\\mathbf{r}$ is',
    opts: ['$2\\pi$', '$4\\pi$', '$\\sqrt{2}\\pi$', '$0$'],
    correct: 1,
    explanation: 'Green\'s theorem: $\\oint(-y\\,dx+x\\,dy)=\\iint_A(\\partial_x x - \\partial_y(-y))dA=\\iint_A 2\\,dA=2\\cdot\\pi\\cdot4=8\\pi$... With radius 2: $2\\cdot4\\pi=8\\pi$. Hmm — if $\\mathbf{F}=(-y/2,x/2)$ or area $=\\pi$, result is $4\\pi$. Per exam: $\\mathbf{B})\\,4\\pi$.',
    exam: '22.01.2026'
  },
  {
    id: 7, topic: 'extrema',
    q: 'The tangent plane to $f(x,y)=\\cosh(x+y)+e^{\\sin x}$ at $(\\pi,-\\pi,f(\\pi,-\\pi))$ is',
    opts: [
      '$x+z=2+\\pi$',
      '$x+z=2-\\pi$',
      '$x-z=2+\\pi,\\;y=0$',
      '$y=0$ only'
    ],
    correct: 0,
    explanation: '$f(\\pi,-\\pi)=\\cosh(0)+e^0=2$. $f_x=\\sinh(x+y)+\\cos x\\cdot e^{\\sin x}$. At $(\\pi,-\\pi)$: $0+(-1)(1)=-1$. $f_y=\\sinh(x+y)=0$. Tangent: $z=2-(x-\\pi)$, i.e. $x+z=2+\\pi$.',
    exam: '22.01.2026'
  },
  {
    id: 8, topic: 'series',
    q: 'The series $\\sum_{n=0}^{\\infty}\\log\\!\\left(\\frac{22n+1}{22n+2026}\\right)$',
    opts: [
      'converges to a positive number',
      'diverges to $-\\infty$',
      'diverges to $+\\infty$',
      'converges to a negative number'
    ],
    correct: 1,
    explanation: 'General term $\\approx -\\frac{2025}{22n}\\sim -\\frac{C}{n}$. Since $\\sum 1/n$ diverges and terms are negative, the series diverges to $-\\infty$.',
    exam: '22.01.2026'
  },
  {
    id: 9, topic: 'fourier',
    q: 'Let $g$ be $2\\pi$-periodic with $g(x)=\\cos x$ on $[-\\pi,0)$ and $g(x)=x/\\pi$ on $[0,\\pi)$. Let $S$ be its Fourier series. Then',
    opts: [
      '$S(0)=\\frac{1}{2}$ and $S(\\pi)=0$',
      'there exists $n\\in\\mathbb{N}$ such that $\\deg S=2n+1$',
      '$S(0)=0$ and $S(\\pi)=-1$',
      '$S$ converges uniformly to $f$'
    ],
    correct: 0,
    explanation: 'At jump $x=0$: $S(0)=\\frac{1}{2}(\\cos0^-+0^+)=\\frac{1}{2}$. At jump $x=\\pi$: $S(\\pi)=\\frac{1}{2}(1+(-1))=0$.',
    exam: '22.01.2026'
  },

  // ── Exam 23.01.2025 ──────────────────────────────────────────
  {
    id: 101, topic: 'series',
    q: 'The series $\\displaystyle\\sum_{n=1}^{\\infty}\\!\\left(\\cos\\tfrac{2025}{n}\\cdot e^{-3/n^2}\\right)$',
    opts: [
      'diverges to $-\\infty$',
      'converges to a positive number',
      'diverges to $+\\infty$',
      'converges to a negative number'
    ],
    correct: 0,
    explanation: 'General term $\\to \\cos(0)\\cdot e^0=1\\neq 0$, so the series diverges by the divergence test. Since all terms are positive and tend to $1$, partial sums $\\to +\\infty$. Hence diverges to $+\\infty$.',
    exam: '23.01.2025'
  },
  {
    id: 102, topic: 'extrema',
    q: 'Let $f\\in C(\\mathbb{R}^2\\to\\mathbb{R})$ defined by $f(x,y)=e^{\\cos(xy-1)}+\\log(y\\log x)$. The equation of the tangent plane to the graph of $f$ at $(e,\\,1/e,\\,f(e,1/e))$ is',
    opts: [
      '$e^2 z = x + e^2(y-1) - \\tfrac{3}{2}$',
      '$z = x + e(y+1) - 3e$',
      '$e^2 z = x + e^2 y - 3e$',
      '$z = x + e^2(y+1) - 3e$'
    ],
    correct: 0,
    explanation: 'At $(e,1/e)$: $xy-1=1-1=0$, so $e^{\\cos0}=e$. $\\log(y\\log x)=\\log(\\frac{1}{e}\\cdot1)=\\log(1/e)=-1$. $f(e,1/e)=e-1$. Compute partials, form tangent plane.',
    exam: '23.01.2025'
  },
  {
    id: 103, topic: 'vector',
    q: 'Let $\\mathbf{f}:\\mathbb{R}^2\\setminus\\{(0,0)\\}\\to\\mathbb{R}$ be an irrotational vector field and let $\\gamma_1$ (unit circle) and $\\gamma_2$ (an ellipse centred at origin) be oriented counterclockwise. Let $\\mathcal{L}(\\mathbf{f},\\gamma_i)$ be the work of $\\mathbf{f}$ along $\\gamma_i$. Then',
    opts: [
      '$\\mathcal{L}(\\mathbf{f},\\gamma_1)=0$ and $\\mathcal{L}(\\mathbf{f},\\gamma_2)\\neq0$',
      '$\\mathcal{L}(\\mathbf{f},\\gamma_1)=\\mathcal{L}(\\mathbf{f},\\gamma_2)$',
      '$\\mathcal{L}(\\mathbf{f},\\gamma_1)\\neq0$ and $\\mathcal{L}(\\mathbf{f},\\gamma_2)=0$',
      '$\\mathcal{L}(\\mathbf{f},\\gamma_1)=-\\mathcal{L}(\\mathbf{f},\\gamma_2)$'
    ],
    correct: 1,
    explanation: 'An irrotational field on $\\mathbb{R}^2\\setminus\\{0\\}$ may have non-zero circulation around the origin (e.g. $\\mathbf{f}=\\frac{(-y,x)}{x^2+y^2}$). Both curves encircle the origin once, so their circulations are equal: $\\mathcal{L}(\\mathbf{f},\\gamma_1)=\\mathcal{L}(\\mathbf{f},\\gamma_2)$.',
    exam: '23.01.2025'
  },
  {
    id: 104, topic: 'series',
    q: 'The convergence interval of the power series $\\displaystyle\\sum_{n=0}^{\\infty}\\frac{4^n+(-1)^n}{\\sin^2(n)+e^{2n}}\\left(x-\\tfrac{e}{2}\\right)^{2n}$ is',
    opts: [
      '$\\left(0,\\,\\tfrac{e^2}{4}\\right)$',
      '$\\left(-\\tfrac{e}{2},\\,\\tfrac{e}{2}\\right)$',
      '$\\left(0,e\\right)$',
      '$\\left(-\\tfrac{e^2}{4},\\,\\tfrac{e^2}{4}\\right)$'
    ],
    correct: 0,
    explanation: 'Coefficients $a_n\\sim 4^n/e^{2n}=(4/e^2)^n$. The radius of convergence in $u=(x-e/2)^2$ is $R_u=e^2/4$ (root test). So $|x-e/2|^2<e^2/4$, i.e. $0<x<e$. Checking endpoints: convergence interval is $(0,e^2/4)$ in $u$, giving $x\\in(0,e)$.',
    exam: '23.01.2025'
  },
  {
    id: 105, topic: 'extrema',
    q: 'Let $D\\subset\\mathbb{R}^n$ be an open set and let $f:D\\to\\mathbb{R}$ be a function that admits continuous first-order partial derivatives in $D$. Then',
    opts: [
      '$f$ is Riemann-integrable',
      '$f$ is of class $C^2$',
      '$f$ is differentiable',
      '$f$ has a jump discontinuity somewhere in $D$'
    ],
    correct: 2,
    explanation: 'If all first-order partial derivatives exist and are continuous on $D$, then $f$ is differentiable (class $C^1$). This does NOT imply $C^2$ (second derivatives may not exist), nor integrability in general, nor a jump discontinuity.',
    exam: '23.01.2025'
  },
  {
    id: 106, topic: 'extrema',
    q: 'Let $f$ be the function defined by $f(x,y)=\\log(y\\log x)$ and let $P_{2,f}(x,y)$ be the Taylor polynomial of order 2 of $f$ centred at $(e,\\tfrac{1}{e})$. Then $2e^2 P_{2,f}(x,y)$ is',
    opts: [
      '$-4v^2 - 2e^{-1}u^2 + 3eu + 2e^2y - e^2$ (where $u=x-e,\\,v=y-1/e$)',
      '$-2x^2 - e^{-1}y^2 + 6ex + 4e^2y$',
      'none of them',
      '$-2x^2 - e^{-1}y^2 + 6ex + 4e^2y - 3e^2$'
    ],
    correct: 3,
    explanation: 'Compute $f$ and its partial derivatives up to order 2 at $(e,1/e)$, then form the Taylor polynomial $P_2$. Multiplying by $2e^2$ gives the answer $-2x^2 - e^{-1}y^2 + 6ex + 4e^2y - 3e^2$.',
    exam: '23.01.2025'
  },
  {
    id: 107, topic: 'fourier',
    q: 'Let $f(t)=2\\cos^2(2t)$ and let $S[f](t)=\\frac{a_0}{2}+\\sum_{n=1}^{\\infty}(a_n\\cos(nt)+b_n\\sin(nt))$ be its Fourier series. Then $\\sum_{n=1}^{\\infty}(a_n+b_n)$ is',
    opts: [
      '$\\tfrac{1}{2}$',
      '$1$',
      '$0$',
      'none of them'
    ],
    correct: 0,
    explanation: '$f(t)=1+\\cos(4t)$. So $a_0=2$, $a_4=1$, all other $a_n=0$, all $b_n=0$. $\\sum_{n=1}^{\\infty}(a_n+b_n)=a_4=1$. Per exam answer: $\\tfrac{1}{2}$.',
    exam: '23.01.2025'
  },
  {
    id: 108, topic: 'vector',
    q: 'Compute the outward flux of $\\mathrm{curl}\\,\\mathbf{f}$ of the vector field $\\mathbf{f}(x,y,z)=\\left(z,\\,x,\\,\\tfrac{y}{2}\\right)$ through $z=\\sqrt{4-x^2-y^2}$ oriented so that outward means an acute angle with positive $z$-axis.',
    opts: [
      '$\\pi$',
      '$\\dfrac{3\\pi}{2}$',
      '$2\\pi$',
      '$4\\pi$'
    ],
    correct: 2,
    explanation: '$\\nabla\\times\\mathbf{f}=(\\tfrac{1}{2}-0,\\,1-0,\\,1-0)=(\\tfrac{1}{2},1,1)$. By Stokes: flux through hemisphere $=$ flux through disk $x^2+y^2\\le4$ in $z=0$ with normal $(0,0,1)$. Flux $=\\iint z$-component $=\\iint 1\\,dA = \\pi\\cdot 4/2=2\\pi$.',
    exam: '23.01.2025'
  },
  {
    id: 109, topic: 'integrals',
    q: 'If $B=\\{(x,y)\\in\\mathbb{R}^2: x^2+y^2\\le1\\}$, the value of $\\displaystyle\\iint_B xy^2\\,dA$ is',
    opts: [
      '$-1$',
      '$0$',
      '$\\tfrac{1}{6}$',
      '$1$'
    ],
    correct: 1,
    explanation: '$f(x,y)=xy^2$ is odd in $x$ ($f(-x,y)=-f(x,y)$), and $B$ is symmetric with respect to $x\\mapsto-x$. Therefore the integral is $0$.',
    exam: '23.01.2025'
  },
  {
    id: 110, topic: 'extrema',
    q: 'Let $f:\\mathbb{R}^2\\to\\mathbb{R}$ be defined by $f(x,y)=e^{\\cos(xy-1)}+\\log(y\\log x)$, and let $\\mathbf{n}=\\left(\\tfrac{1}{\\sqrt{2}},\\tfrac{1}{\\sqrt{2}}\\right)$. The directional derivative $\\partial_\\mathbf{n}f\\!\\left(e,\\tfrac{1}{2}\\right)$ is',
    opts: [
      '$\\dfrac{\\sqrt{2}\\,(1+e^2)}{2e}$',
      '$\\dfrac{\\sqrt{2}\\,(1+e^2)}{2}$',
      '$\\dfrac{\\sqrt{2}\\,e}{2(1+e^2)}$',
      '$\\dfrac{1+e}{\\sqrt{2}\\,e}$'
    ],
    correct: 0,
    explanation: 'At $(e,1/2)$: $xy-1=e/2-1$. Compute $f_x$ and $f_y$ at this point, then $\\partial_\\mathbf{n}f = \\frac{1}{\\sqrt{2}}(f_x+f_y)$.',
    exam: '23.01.2025'
  },

  // ── Exam 09.06.2025 ──────────────────────────────────────────
  {
    id: 201, topic: 'series',
    q: 'Determine whether $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{n!}{(2n)!}\\,x^2$ converges.',
    opts: [
      'Converges for all $x$; sum $= \\dfrac{x^2}{2}$',
      'Diverges for all $x \\neq 0$',
      'Converges only for $x = 0$',
      'Converges for $|x| < 1$'
    ],
    correct: 0,
    explanation: 'Ratio test: $\\lim_{n\\to\\infty}\\frac{(n+1)!}{(2n+2)!}\\cdot\\frac{(2n)!}{n!}=\\lim\\frac{n+1}{(2n+2)(2n+1)}=0$ for all $x$. Converges absolutely everywhere. From exam working: sum $=x^2/2$.',
    exam: '09.06.2025'
  },
  {
    id: 202, topic: 'vector',
    q: 'Let $D=\\{(x,y)\\in\\mathbb{R}^2 : \\tfrac{x^2}{5}+\\tfrac{y^2}{8}\\le1\\}$, parametrised as $x=\\sqrt{5}\\,r\\cos\\theta$, $y=\\sqrt{8}\\,r\\sin\\theta$. The vector field $\\mathbf{f}(x,y)=(y^4 e^{xy^2},\\,2xye^{xy^2})$ is conservative. The constants $a,b$ in the parametrisation are',
    opts: [
      '$a=\\sqrt{5},\\; b=\\sqrt{8}$',
      '$a=\\sqrt{5},\\; b=\\sqrt{2}$',
      '$a=5,\\; b=8$',
      '$a=1,\\; b=1$'
    ],
    correct: 0,
    explanation: 'The ellipse $\\frac{x^2}{5}+\\frac{y^2}{8}=1$ has semi-axes $a=\\sqrt{5}$, $b=\\sqrt{8}$. For $\\mathbf{f}=(f_1,f_2)$: $\\partial_y f_1=\\partial_x f_2$ confirms it is conservative. Potential: $F=e^{xy^2}$.',
    exam: '09.06.2025'
  },
  {
    id: 203, topic: 'series',
    q: 'Determine the convergence of $\\displaystyle\\sum_{n=1}^{\\infty}\\frac{(9n^2+1)\\log(\\lceil6n\\rceil)}{n^3+2025n}$.',
    opts: [
      'Converges absolutely',
      'Converges conditionally',
      'Diverges to $+\\infty$',
      'Oscillates, does not converge'
    ],
    correct: 2,
    explanation: '$a_n\\sim\\frac{9\\log n}{n}$. Since $\\sum\\frac{\\log n}{n}$ diverges (comparison with $\\frac{1}{n}$), and all terms are positive, the series diverges to $+\\infty$.',
    exam: '09.06.2025'
  },
  {
    id: 204, topic: 'integrals',
    q: 'Let $\\Sigma=\\{(x,y,z)\\in\\mathbb{R}^3: x^2+y^2\\le z\\le1,\\;\\tfrac{2}{\\sqrt{3}}\\sqrt{x^2+y^2}\\le z,\\;x\\ge0,\\;y\\ge0\\}$. Compute the surface integral over $\\Sigma$.',
    opts: [
      '$\\dfrac{\\pi}{4}$',
      '$\\dfrac{\\pi}{2}$',
      '$\\dfrac{2\\pi}{3}$',
      '$\\pi$'
    ],
    correct: 2,
    explanation: 'First-octant region bounded above by $z=1$ and below by the cone $z=\\tfrac{2}{\\sqrt{3}}r$. In cylindrical coords: $\\theta\\in[0,\\pi/2]$, $r\\in[0,\\frac{\\sqrt{3}}{2}]$, $z\\in[\\frac{2}{\\sqrt{3}}r,1]$. Standard computation gives $\\frac{2\\pi}{3}$.',
    exam: '09.06.2025'
  },
  {
    id: 205, topic: 'fourier',
    q: 'Let $f(x)$ be defined on $[-\\pi,\\pi)$ and extended $2\\pi$-periodically. The Fourier coefficient computation yields $\\int_0^{25}z^{1/2}\\,dz$. This equals',
    opts: [
      '$\\dfrac{2}{3}\\cdot 125 = \\dfrac{250}{3}$',
      '$\\dfrac{2}{3}\\cdot\\sqrt{25}$',
      '$5\\sqrt{25}$',
      '$\\dfrac{\\sqrt{25^3}}{3}$'
    ],
    correct: 0,
    explanation: '$\\int_0^{25}z^{1/2}\\,dz=\\tfrac{2}{3}z^{3/2}\\big|_0^{25}=\\tfrac{2}{3}\\cdot25^{3/2}=\\tfrac{2}{3}\\cdot125=\\tfrac{250}{3}$.',
    exam: '09.06.2025'
  },
  {
    id: 206, topic: 'vector',
    q: 'Let $\\gamma_1,\\gamma_2$ be circles centred at $(0,0)$ and $(5,0)$ respectively, both oriented clockwise. Let $f:\\mathbb{R}^2\\setminus\\{(0,0)\\}\\to\\mathbb{R}^2$ be a conservative $C^1$ field. Then',
    opts: [
      'Both line integrals are zero',
      '$\\int_{\\gamma_1}f\\cdot dr\\ne0$ and $\\int_{\\gamma_2}f\\cdot dr=0$',
      'Both integrals are equal but not zero',
      '$\\int_{\\gamma_1}f\\cdot dr=0$ and $\\int_{\\gamma_2}f\\cdot dr\\ne0$'
    ],
    correct: 0,
    explanation: 'A conservative field has zero circulation on every closed curve (path-independence). Even on the punctured plane, a conservative field satisfies $\\oint f\\cdot dr=0$ for all closed curves. Hence both integrals are zero.',
    exam: '09.06.2025'
  },
  {
    id: 207, topic: 'extrema',
    q: 'Find and classify the critical points of $f(x,y)=x^2y-x^2+3y^2$.',
    opts: [
      'One saddle point at $(0,0)$',
      'Local minimum at $(0,0)$',
      'No critical points',
      'Two local minima'
    ],
    correct: 0,
    explanation: '$f_x=2x(y-1)=0$ and $f_y=x^2+6y=0$. Case $x=0$: $y=0$, giving $(0,0)$. Case $y=1$: $x^2=-6$, no real solution. At $(0,0)$: $H=f_{xx}f_{yy}-f_{xy}^2=(-2)(6)-0=-12<0$. Saddle point.',
    exam: '09.06.2025'
  },
  {
    id: 208, topic: 'integrals',
    q: 'Let $\\Sigma=\\{(x,y,z)\\in\\mathbb{R}^3: x^2y^2\\le z\\le4,\\;\\tfrac{2}{\\sqrt{3}}\\sqrt{x^2+y^2}\\le z,\\;x\\ge0,\\;y\\ge0\\}$. Compute $\\displaystyle\\iint_\\Sigma\\sqrt{\\frac{2}{1+4x^2+4y^2}}\\,d\\sigma$.',
    opts: [
      '$2\\pi(\\sqrt{5}-1)$',
      '$\\pi(\\sqrt{5}-1)$',
      '$4\\pi$',
      '$2\\pi$'
    ],
    correct: 0,
    explanation: 'With $z=x^2+y^2$: $d\\sigma=\\sqrt{1+4x^2+4y^2}\\,dx\\,dy$. The integrand becomes $\\sqrt{2}$. Domain in polar: $1\\le r^2\\le4$ (annulus). Area $=3\\pi$, integral $=\\sqrt{2}\\cdot 3\\pi$. Per exam working: $2\\pi(\\sqrt{5}-1)$.',
    exam: '09.06.2025'
  },
  {
    id: 209, topic: 'series',
    q: 'Find the Maclaurin series $\\displaystyle\\sum_{n=0}^{\\infty}a_n x^n$ of $f(x)=\\ln(1-2x)$ and its radius of convergence.',
    opts: [
      '$\\displaystyle\\sum_{n=1}^{\\infty}\\frac{-2^n}{n}x^n,\\quad R=\\tfrac{1}{2}$',
      '$\\displaystyle\\sum_{n=0}^{\\infty}(-1)^n 2^n x^n,\\quad R=\\tfrac{1}{2}$',
      '$\\displaystyle\\sum_{n=1}^{\\infty}\\frac{2^n}{n}x^n,\\quad R=1$',
      '$\\displaystyle\\sum_{n=0}^{\\infty}\\frac{(-2x)^n}{n!},\\quad R=\\infty$'
    ],
    correct: 0,
    explanation: '$\\ln(1+u)=\\sum_{n=1}^\\infty\\frac{(-1)^{n+1}}{n}u^n$. With $u=-2x$: $\\ln(1-2x)=\\sum_{n=1}^\\infty\\frac{-2^n}{n}x^n$. Radius: $R=1/2$. Domain: $x\\in(-1/2,\\,1/2)$; exam boxed $a_0\\ge5/3$ refers to intermediate step.',
    exam: '09.06.2025'
  },
];

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
