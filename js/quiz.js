/**
 * quiz.js — Quiz page logic for Physics Quiz
 * Requires: storage.js loaded before this file
 * Questions data exposed as: window.QUESTIONS_DATA
 * KaTeX loaded via CDN in HTML for math rendering
 */

// ── State ──
let questions  = [];
let current    = 0;
let correct    = 0;
let wrong      = 0;
let answered   = false;
let mistakeIds = [];
let qParams    = {};
let katexReady = false;
let _answeredWithFlag = false; // true если юзер нажал кнопку Flag
let _chosenIdx = -1; // индекс выбранного варианта ответа
window._quizStartTime = Date.now();

// ── Points state ──
let sessionPoints = 0;       // очки за текущую сессию
let _questionStartTime = 0;  // время начала текущего вопроса
let _courseAlreadyDone = false; // курс уже пройден — очки не начисляются

// История ответов для кнопки «Назад»
// answeredHistory[i] = { answered, chosenIdx, wasFlag, correct, wrong, mistakeIds: [...] }
let answeredHistory = [];

// ── KaTeX / questions dual-gate init ──
window._quizReady = function() {
  katexReady = true;
  window._katexReady = true;
  if (typeof tryInitQuiz === 'function') {
    tryInitQuiz();
  } else {
    initQuiz();
  }
};

function initQuiz() {
  qParams = getParams();
  _courseAlreadyDone = isCourseCompleted(qParams.subject);
  buildQuestions();
  renderQuestion();
  bindKeyboard();
  updatePrevBtn();
  // Показываем счётчик очков в хедере
  updatePointsDisplay();
  // Перехватываем браузерную кнопку «назад»
  history.pushState({ quizActive: true }, '');
  window.addEventListener('popstate', _onBrowserBack);
}

// ── Проверка: все вопросы предмета отвечены правильно ──
function isCourseCompleted(subject) {
  const all = window.QUESTIONS_DATA || [];
  if (all.length === 0) return false;
  const correctIds = new Set(S.get('correct_ids', subject) || []);
  const mistakes   = S.get('mistakes', subject) || [];
  // Курс пройден: все ID есть в correct_ids И ни одного в mistakes
  return all.every(q => correctIds.has(q.id)) && mistakes.length === 0;
}

// ── Начислить очки за вопрос ──
function awardPoints(isCorrect, isFlag, isMistakesMode) {
  if (_courseAlreadyDone) return 0;
  if (!isCorrect) return 0;

  const elapsed = (Date.now() - _questionStartTime) / 1000;
  const fast    = elapsed < 10;

  let pts;
  if (isFlag) {
    // Флаг — правильный ответ на некорректный вопрос
    pts = 5;
  } else if (isMistakesMode) {
    pts = fast ? 10 : 7;
  } else {
    pts = fast ? 15 : 10;
  }

  sessionPoints += pts;
  updatePointsDisplay();
  showPointsFlash(pts);
  return pts;
}

// ── Обновить счётчик очков в хедере ──
function updatePointsDisplay() {
  const el = document.getElementById('livePoints');
  if (!el) return;
  if (_courseAlreadyDone) {
    el.textContent = '🏆 done';
    el.title = 'Курс уже пройден — очки не начисляются';
    el.style.opacity = '0.5';
  } else {
    el.textContent = sessionPoints + ' ⭐';
  }
}

// ── Flash-анимация "+10 ⭐" ──
function showPointsFlash(pts) {
  if (pts <= 0) return;
  const flash = document.createElement('div');
  flash.className = 'points-flash';
  flash.textContent = '+' + pts + ' ⭐';
  document.body.appendChild(flash);
  // Анимация через CSS — удаляем через 1.4 сек
  setTimeout(() => flash.remove(), 1400);
}

// ── Normalise question field names ──
function qText(q)    { return q.q        || q.question    || ''; }
function qOpts(q)    { return q.opts     || q.options     || []; }
function qExp(q)     { return q.exp      || q.explanation || ''; }
function qCorrect(q) { return typeof q.correct === 'number' ? q.correct : 0; }

// ── Safe HTML escape ──
function escHtml(s) {
  return String(s || '')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Helper: set element property via callback ──
function setEl(id, fn) {
  const el = document.getElementById(id);
  if (el) fn(el);
}

// Copy-to-clipboard for code blocks
window._copyCode = function(btn) {
  const pre  = btn.closest('.md-pre');
  const code = pre ? pre.querySelector('code') : null;
  if (!code) return;
  navigator.clipboard.writeText(code.innerText).then(() => {
    btn.textContent = '✓';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
  });
};

// ── Physics formula renderer — делает ASCII-формулы красивее ──
// Принимает сырую строку (не экранированную), возвращает HTML
function physicsFormulaRender(raw) {
  // Токенизируем формулу: разбиваем на части и рендерим каждую
  // Порядок важен: сначала длинные паттерны, потом короткие

  const tokens = [];

  // Рабочая копия — будем откусывать с начала
  let s = raw.trim();

  // Регулярки для токенов (порядок важен!)
  const rules = [
    // Дроби вида (числитель)/(знаменатель) → красивая CSS-дробь
    { re: /^\(([^)]+)\)\/\(([^)]+)\)/, type: 'frac' },
    // Дроби вида слово/слово (простые)
    { re: /^([A-Za-zА-Яа-яΑ-Ωα-ω0-9_.²³⁴⁵⁶⁷⁸⁹⁰¹]+)\/([A-Za-zА-Яа-яΑ-Ωα-ω0-9_.²³⁴⁵⁶⁷⁸⁹⁰¹]+)/, type: 'frac' },
    // sqrt(arg)
    { re: /^sqrt\(([^)]+)\)/, type: 'sqrt' },
    // Числа с единицами: 3.96 m/s, 9.8 m/s²
    { re: /^(\d+(?:[.,]\d+)?(?:[eE][+-]?\d+)?)\s*(m\/s[²]?|kg\/m³|rad\/s[²]?|N\.m|J\/kg|m\/s²|km\/h|g\/mol|mol|kg|Pa|J|W|Hz|rad|N\.m|N|K|m|s|g)\b/, type: 'numunit' },
    // Числа: 3.14, 1.5e5, 10⁵
    { re: /^(\d+(?:[.,]\d+)?(?:[eE][+-]?\d+)?(?:[²³⁴⁵⁶⁷⁸⁹⁰¹]*)?)/, type: 'num' },
    // Единицы измерения отдельно
    { re: /^(m\/s²|m\/s|kg·m\/s|kg·m²|rad\/s²|rad\/s|N·m|m²|s⁻²|s⁻¹|kg|Pa|J\/K|J|W|Hz|rad|N|m|s|K)\b/, type: 'unit' },
    // Функции
    { re: /^(sin|cos|tan|ln|log|exp)(?=\()/, type: 'fn' },
    // Греческие из текста
    { re: /^(alpha|beta|gamma|delta|theta|lambda|mu|pi|omega|Omega|sigma|phi|tau|rho)\b/, type: 'greek' },
    // Операторы
    { re: /^(<=?>|->|<-|≈|≠|≤|≥|·|×|±|∞|∑|∫|∆|∂)/, type: 'op' },
    // Знак равенства
    { re: /^=/, type: 'eq' },
    // Тильда-приближение
    { re: /^~/, type: 'op', val: '~' },
    // Переменные (одна заглавная или строчная буква, с подстрочным)
    { re: /^([A-Za-zА-Яа-яΑ-Ωα-ω][₀₁₂₃₄₅₆₇₈₉]?[²³⁴⁵⁶⁷⁸⁹⁰¹]?)/, type: 'var' },
    // Скобки и прочие символы
    { re: /^([(){}\[\]+\-*\/^,;: .])/, type: 'punc' },
    // Остаток
    { re: /^(.)/, type: 'other' },
  ];

  const greekMap = {
    alpha:'α', beta:'β', gamma:'γ', delta:'δ', theta:'θ',
    lambda:'λ', mu:'μ', pi:'π', omega:'ω', Omega:'Ω',
    sigma:'σ', phi:'φ', tau:'τ', rho:'ρ'
  };

  function esc(t) {
    return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function renderInner(inner) {
    // Рекурсивно рендерим содержимое (числитель/знаменатель дроби)
    return physicsFormulaRender(inner);
  }

  let html = '';
  let safety = 0;

  while (s.length > 0 && safety++ < 2000) {
    let matched = false;
    for (const rule of rules) {
      const m = s.match(rule.re);
      if (!m) continue;

      const full = m[0];
      if (rule.type === 'frac') {
        const num = m[1], den = m[2];
        html += `<span class="pf-frac"><span class="pf-num-f">${renderInner(num)}</span><span class="pf-den-f">${renderInner(den)}</span></span>`;
      } else if (rule.type === 'sqrt') {
        html += `<span class="pf-fn">√</span><span class="pf-sqrt-arg">${renderInner(m[1])}</span>`;
      } else if (rule.type === 'numunit') {
        html += `<span class="pf-num">${esc(m[1])}</span><span class="pf-unit"> ${esc(m[2])}</span>`;
      } else if (rule.type === 'num') {
        html += `<span class="pf-num">${esc(full)}</span>`;
      } else if (rule.type === 'unit') {
        html += `<span class="pf-unit">${esc(full)}</span>`;
      } else if (rule.type === 'fn') {
        html += `<span class="pf-fn">${esc(full)}</span>`;
      } else if (rule.type === 'greek') {
        html += `<span class="pf-greek">${greekMap[full] || full}</span>`;
      } else if (rule.type === 'op') {
        const val = rule.val || full;
        html += `<span class="pf-op">${esc(val)}</span>`;
      } else if (rule.type === 'eq') {
        html += `<span class="pf-eq">=</span>`;
      } else if (rule.type === 'var') {
        html += `<span class="pf-var">${esc(full)}</span>`;
      } else {
        html += esc(full);
      }

      s = s.slice(full.length);
      matched = true;
      break;
    }
    if (!matched) { html += esc(s[0]); s = s.slice(1); }
  }

  return html;
}

// ── Markdown renderer for plain text segments ──
function applyMarkdown(text) {
  if (!text) return '';

  const imgPlaceholders = [];
  let s = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
    const idx = imgPlaceholders.length;
    const isSm   = alt.includes('|sm');
    const isFull = alt.includes('|full');
    const cleanAlt = alt.replace(/\|(sm|full)/g, '').trim();
    const cls = isSm ? ' class="img-sm"' : isFull ? ' class="img-full"' : '';
    imgPlaceholders.push(`<img src="${src}" alt="${cleanAlt}"${cls} style="display:block;border-radius:6px;margin:8px 0;">`);
    return '\x01IMG' + idx + '\x01';
  });

  // ── Block-level [formula] — если формула на отдельной строке или единственное содержимое строки
  // ^\s*\[formula\]...[/formula]\s*$  →  красивый блок
  const formulaBlocks = [];
  s = s.replace(/^[ \t]*\[formula\]([\s\S]*?)\[\/formula\][ \t]*$/gm, (_, inner) => {
    const idx = formulaBlocks.length;
    formulaBlocks.push(inner.trim());
    return '\x01FBLOCK' + idx + '\x01';
  });

  s = escHtml(s);

  // [num]...[/num] — numbers / values in amber
  s = s.replace(/\[num\]([\s\S]*?)\[\/num\]/g, '<span class="md-num">$1</span>');

  // [formula]...[/formula] — всё остальное (инлайн) — тоже прогоняем через physicsFormulaRender
  s = s.replace(/\[formula\]([\s\S]*?)\[\/formula\]/g, (_, inner) => {
    // inner уже экранирован, нужно разэкранировать
    const decoded = inner
      .replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"');
    return `<span class="md-formula-inline">${physicsFormulaRender(decoded)}</span>`;
  });

  // [icon]name[/icon] — inline SVG icon from Icons library
  s = s.replace(/\[icon\]([a-zA-Z]+)\[\/icon\]/g, (_, name) => {
    const svg = (typeof Icons !== 'undefined') && Icons[name] ? Icons[name] : '';
    return svg ? `<span class="md-icon">${svg}</span>` : '';
  });

  // Fenced code blocks ```...```
  s = s.replace(/```([\s\S]*?)```/g, (_, code) => {
    const id = 'cb_' + Math.random().toString(36).slice(2);
    return `<div class="md-pre" id="${id}"><button class="md-copy-btn" onclick="_copyCode(this)">Copy</button><pre><code>${code.trim()}</code></pre></div>`;
  });

  // Inline code `...`
  const inlineCodes = [];
  s = s.replace(/`([^`\n]+)`/g, (_, inner) => {
    const idx = inlineCodes.length;
    inlineCodes.push(inner);
    return '\x01IC' + idx + '\x01';
  });

  // Bold **...**
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic *...*
  s = s.replace(/(^|[^*])\*([^*\n]+?)\*([^*]|$)/g, '$1<em>$2</em>$3');

  // Restore inline code
  s = s.replace(/\x01IC(\d+)\x01/g, (_, i) => '<code class="md-code">' + inlineCodes[+i] + '</code>');

  // Restore image placeholders
  s = s.replace(/\x01IMG(\d+)\x01/g, (_, i) => imgPlaceholders[+i]);

  // Restore block formulas — красивый блок
  s = s.replace(/\x01FBLOCK(\d+)\x01/g, (_, i) => {
    const raw = formulaBlocks[+i];
    // Преобразуем символы в unicode-представление
    const display = physicsFormulaRender(raw);
    return `<div class="phys-formula-block">${display}</div>`;
  });

  // Double newlines → paragraph gap
  s = s.replace(/\n\n+/g, '\x00PARA\x00');

  // Newlines → <br>
  s = s.replace(/\n/g, '<br>');

  // Paragraph gaps
  s = s.replace(/\x00PARA\x00/g, '<div class="md-para-gap"></div>');

  return s;
}

// ── Render text with Markdown + LaTeX ──
function renderText(raw) {
  if (!raw) return '';
  const str = String(raw);

  const CODE_PLACEHOLDER = '\x00CODE\x00';
  const codeBlocks = [];
  const withoutCode = str.replace(/```([\s\S]*?)```/g, (match, code) => {
    const id = codeBlocks.length;
    codeBlocks.push(code.trim());
    return CODE_PLACEHOLDER + id + CODE_PLACEHOLDER;
  });

  const segments = [];
  let i = 0;
  let plainStart = 0;
  const s = withoutCode;

  while (i < s.length) {
    if (s.startsWith(CODE_PLACEHOLDER, i)) {
      if (i > plainStart) segments.push({ type: 'plain', content: s.slice(plainStart, i) });
      const end = s.indexOf(CODE_PLACEHOLDER, i + CODE_PLACEHOLDER.length);
      if (end !== -1) {
        const idx = parseInt(s.slice(i + CODE_PLACEHOLDER.length, end));
        segments.push({ type: 'code', content: codeBlocks[idx] });
        i = end + CODE_PLACEHOLDER.length;
        plainStart = i;
      } else { i++; }
      continue;
    }
    if (s[i] === '$' && s[i+1] === '$') {
      if (i > plainStart) segments.push({ type: 'plain', content: s.slice(plainStart, i) });
      const end = s.indexOf('$$', i + 2);
      if (end !== -1) {
        segments.push({ type: 'mathblock', content: s.slice(i + 2, end).trim() });
        i = end + 2; plainStart = i;
      } else { i++; }
      continue;
    }
    if (s[i] === '$') {
      if (i > plainStart) segments.push({ type: 'plain', content: s.slice(plainStart, i) });
      const end = s.indexOf('$', i + 1);
      if (end !== -1) {
        segments.push({ type: 'math', content: s.slice(i + 1, end).trim() });
        i = end + 1; plainStart = i;
      } else { i++; }
      continue;
    }
    i++;
  }
  if (plainStart < s.length) segments.push({ type: 'plain', content: s.slice(plainStart) });

  return segments.map(seg => {
    if (seg.type === 'code') {
      return `<div class="md-pre"><button class="md-copy-btn" onclick="_copyCode(this)">Copy</button><pre><code>${escHtml(seg.content)}</code></pre></div>`;
    }
    if (seg.type === 'mathblock') {
      try { return katex.renderToString(seg.content, { displayMode: true, throwOnError: false, output: 'html' }); }
      catch (e) { return `<code class="md-code">${escHtml(seg.content)}</code>`; }
    }
    if (seg.type === 'math') {
      try { return katex.renderToString(seg.content, { displayMode: false, throwOnError: false, output: 'html' }); }
      catch (e) { return `<code class="md-code">${escHtml(seg.content)}</code>`; }
    }
    return applyMarkdown(seg.content);
  }).join('');
}

// ── URL params ──
function getParams() {
  const p = new URLSearchParams(location.search);
  return {
    seed:      parseInt(p.get('seed'))  || Date.now(),
    mode:      p.get('mode')            || 'all',
    count:     p.get('count')           || 'all',
    subject:   p.get('subject')         || 'physics',
    startAt:   p.get('startAt')   ? parseInt(p.get('startAt'))  : null,
    noShuffle: p.get('noShuffle') === '1',
  };
}

// ── Seeded shuffle ──
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}
function shuffle(arr, seed) {
  const a   = [...arr];
  const rng = seededRandom(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Build question set ──
function buildQuestions() {
  const all    = window.QUESTIONS_DATA || [];
  const mode   = qParams.mode;
  const stored = S.get('mistakes', qParams.subject) || [];

  let pool = [];
  if (mode === 'all') {
    pool = [...all];
  } else if (mode === 'mistakes') {
    pool = all.filter(q => stored.includes(q.id));
  } else if (mode === 'unseen') {
    const correctIds = new Set(S.get('correct_ids', qParams.subject) || []);
    const mistakeIds2 = new Set(S.get('mistakes', qParams.subject) || []);
    pool = all.filter(q => !correctIds.has(q.id) && !mistakeIds2.has(q.id));
  } else if (qParams.subject === 'physics') {
    if      (mode === 'mechanics') pool = all.filter(q => TOPIC_IDS.mechanics.includes(q.id));
    else if (mode === 'fluids')    pool = all.filter(q => TOPIC_IDS.fluids.includes(q.id));
    else if (mode === 'thermo')    pool = all.filter(q => TOPIC_IDS.thermo.includes(q.id));
    else                           pool = [...all];
  } else if (qParams.subject === 'mathanalysis') {
    const topicIds = MA2_TOPIC_IDS[mode];
    if      (mode === 'exam_2026')      pool = all.filter(q => q.exam === '22.01.2026');
    else if (mode === 'exam_2025')      pool = all.filter(q => q.exam === '23.01.2025');
    else if (mode === 'exam_2025_june') pool = all.filter(q => q.exam === '09.06.2025');
    else if (mode === 'exam_2014_2022') pool = all.filter(q => q.exam === '2014-2022');
    else if (mode === 'exam_2022_2024') pool = all.filter(q => q.exam === '2022-2024');
    else if (topicIds)                  pool = all.filter(q => topicIds.includes(q.id));
    else                                pool = [...all];
  } else if (qParams.subject === 'linalg') {
    const topicIds = LA2_TOPIC_IDS[mode];
    if      (mode === 'new_questions') pool = all.filter(q => q.isNew);
    else if (topicIds)                 pool = all.filter(q => topicIds.includes(q.id));
    else                               pool = [...all];
  } else if (qParams.subject === 'fundamental') {
    const topicIds = FUNDAMENTAL_TOPIC_IDS[mode];
    if (topicIds) pool = all.filter(q => topicIds.includes(q.id));
    else          pool = [...all];
  } else {
    pool = [...all];
  }

  // noShuffle=1 → сортируем по ID (для перехода к конкретному вопросу)
  if (qParams.noShuffle) {
    pool = pool.slice().sort((a, b) => (a.id || 0) - (b.id || 0));
  } else {
    pool = shuffle(pool, qParams.seed);
  }

  if (mode === 'random' && qParams.count !== 'all' && !qParams.startAt) {
    const n = parseInt(qParams.count) || 20;
    pool = pool.slice(0, n);
  }

  // ── Shuffle answer options (keep correct answer tracking) ──
  questions = pool.map(q => {
    const opts = qOpts(q);
    if (!opts || opts.length < 2) return q;

    // Build indexed array, shuffle, then remap correct index
    const indexed = opts.map((opt, i) => ({ opt, i }));
    // Fisher-Yates with seeded rng per question
    const rng = seededRandom(qParams.seed ^ (q.id * 2654435761));
    for (let i = indexed.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
    }

    const shuffledOpts    = indexed.map(x => x.opt);
    const newCorrectIndex = indexed.findIndex(x => x.i === (typeof q.correct === 'number' ? q.correct : 0));

    // Also remap closestAnswer if present (flagged questions)
    let newClosest = q.closestAnswer;
    if (typeof q.closestAnswer === 'number') {
      newClosest = indexed.findIndex(x => x.i === q.closestAnswer);
    }

    return {
      ...q,
      opts:          shuffledOpts,
      options:       shuffledOpts,   // normalise both field names
      correct:       newCorrectIndex,
      closestAnswer: newClosest,
    };
  });

  // startAt=<id> → переходим к нужному вопросу
  if (qParams.startAt != null) {
    const idx = questions.findIndex(q => q.id === qParams.startAt);
    if (idx > 0) current = idx;
  }
}

// ── Render question ──
function renderQuestion() {
  if (questions.length === 0) {
    const area = document.getElementById('questionArea');
    if (area) area.innerHTML = '<div style="padding:60px 20px;text-align:center;color:var(--text2);font-size:15px;">No questions for this mode.</div>';
    return;
  }
  if (current >= questions.length) { showDone(); return; }

  answered = false;
  _answeredWithFlag = false;
  _questionStartTime = Date.now();
  const q   = questions[current];
  const idx = current + 1;
  const tot = questions.length;

  const pct = Math.round((idx - 1) / tot * 100);
  setEl('progFill',  el => el.style.width = pct + '%');
  setEl('progLabel', el => el.textContent  = `Question ${idx} / ${tot}`);
  setEl('progOk',    el => el.textContent  = correct);
  setEl('progErr',   el => el.textContent  = wrong);
  setEl('bstatOk',   el => el.textContent  = correct);
  setEl('bstatErr',  el => el.textContent  = wrong);
  setEl('btnNext',   el => el.disabled     = true);

  // Topic label
  let topicName;
  if (qParams.subject === 'mathanalysis') {
    const ma2Names = {
      integrals: 'Multiple Integrals', series: 'Series & Sequences',
      vector: 'Vector Calculus', extrema: 'Extrema & Optim.', fourier: 'Fourier Series',
    };
    topicName = ma2Names[q.topic] || q.topic || 'Math Analysis 2';
  } else if (qParams.subject === 'linalg') {
    const la2Names = {
      'SVD': 'SVD', 'LU decomposition': 'LU', 'QR decomposition': 'QR',
      'Cholesky': 'Cholesky', 'Splines': 'Splines',
      'Polynomial interpolation': 'Poly. Interp.',
    };
    topicName = la2Names[q.topic] || q.topic || 'Lin. Algebra 2';
  } else if (qParams.subject === 'drawing') {
    topicName = q.topic || 'Engineering Drawing';
  } else if (qParams.subject === 'fundamental') {
    topicName = q.topic || 'Fund. Strength of Materials';
  } else {
    topicName =
      TOPIC_IDS.mechanics.includes(q.id) ? 'Mechanics' :
      TOPIC_IDS.fluids.includes(q.id)    ? 'Fluid Dynamics' :
      'Thermodynamics';
  }

  const optLetters = ['A','B','C','D','E','F'];
  const opts = qOpts(q);
  const optsHtml = opts.map((opt, i) => {
    if (opt && typeof opt === 'object' && opt.img) {
      const label = escHtml(opt.label || optLetters[i]);
      return `
    <button class="opt-btn opt-img-btn" onclick="answer(${i})">
      <span class="opt-letter">${optLetters[i]}</span>
      <div class="opt-img-wrap">
        <img src="${escHtml(opt.img)}" alt="${label}" class="opt-img" loading="lazy"
             onerror="this.style.opacity='.3';this.alt='Image not found: ${escHtml(opt.img)}'">
      </div>
    </button>`;
    }
    const rendered = renderText(opt);
    const hasCode  = rendered.includes('md-pre');
    if (hasCode) {
      return `
    <div class="opt-btn opt-has-code" onclick="answer(${i})" role="button" tabindex="0">
      <span class="opt-letter">${optLetters[i]}</span>
      <div class="opt-text">${rendered}</div>
    </div>`;
    }
    return `
    <button class="opt-btn" onclick="answer(${i})">
      <span class="opt-letter">${optLetters[i]}</span>
      <span class="opt-text">${rendered}</span>
    </button>`;
  }).join('');

  const area = document.getElementById('questionArea');
  if (!area) return;

  area.style.opacity   = '';
  area.style.transform = '';

  const hasImgOpts   = opts.some(o => o && typeof o === 'object' && o.img);
  const hasInlineImg = /!\[.*?\]\(.*?\)/.test(qText(q));
  const isOpen       = q.type === 'open';
  const quizPage = document.querySelector('.quiz-page');
  if (quizPage) quizPage.classList.toggle('img-quiz-mode', hasImgOpts || hasInlineImg || isOpen);

  if (isOpen) {
    area.innerHTML = `
      <div class="question-card">
        <div class="q-meta">
          <span class="q-num">Q${q.id}</span>
          <span class="q-topic">${topicName}</span>
          <span class="q-open-badge">✍️ Open</span>
        </div>
        <div class="q-text">${renderText(qText(q))}</div>
      </div>
      <div class="open-answer-wrap">
        <div class="md-toolbar" id="mdToolbar">
          <button class="md-tb-btn" data-action="bold"      title="Bold (Ctrl+B)"><b>B</b></button>
          <button class="md-tb-btn" data-action="italic"    title="Italic (Ctrl+I)"><i>I</i></button>
          <div class="md-tb-sep"></div>
          <button class="md-tb-btn" data-action="ul"        title="Bullet list">&#8226;&#8212;</button>
          <button class="md-tb-btn" data-action="ol"        title="Numbered list">1.</button>
          <div class="md-tb-sep"></div>
          <button class="md-tb-btn" data-action="h2"        title="Heading">H</button>
          <button class="md-tb-btn" data-action="code"      title="Inline code"><code style="font-size:11px">{ }</code></button>
        </div>
        <textarea id="openAnswerTA" class="open-answer-ta" placeholder="Write your answer here…"></textarea>
        <div class="open-answer-footer">
          <button class="open-submit-btn" id="openSubmitBtn" onclick="submitOpen()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><polyline points="20 6 9 17 4 12"/></svg>
            Submit answer
          </button>
          <button class="open-ai-btn" id="openAiBtn" onclick="reopenAiModal()" style="display:none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 6v6l4 2"/><path d="M22 6l-3 3-3-3"/></svg>
            View AI Review
          </button>
          <button class="open-retry-btn" id="openRetryBtn" onclick="retryOpenAnswer()" style="display:none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" width="15" height="15"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Try Again
          </button>
        </div>
        <p class="open-notice">📝 This is an open question — your answer is saved but does not affect your score.</p>
      </div>`;

    // Toolbar keyboard shortcuts
    document.getElementById('openAnswerTA').addEventListener('keydown', handleMdShortcut);
    // Toolbar button clicks
    document.getElementById('mdToolbar').addEventListener('mousedown', e => {
      e.preventDefault(); // don't lose focus from textarea
      const btn = e.target.closest('[data-action]');
      if (btn) applyMdAction(btn.dataset.action);
    });
    return;
  }

  area.innerHTML = `
    <div class="question-card">
      <div class="q-meta">
        <span class="q-num">Q${q.id}</span>
        <span class="q-topic">${topicName}</span>
        ${q.exam ? `<span class="q-exam-badge"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="11" height="11"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>${q.exam}</span>` : ''}
      </div>
      <div class="q-text">${renderText(qText(q))}</div>
      <button class="hint-btn" id="hintBtn" onclick="openHintPanel()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
        Explanation
      </button>
      <button class="flag-btn" id="flagBtn" onclick="answerFlag()">🚩 Flag</button>
    </div>
    <div class="options" id="optsGrid">
      ${optsHtml}
    </div>`;

  // Adaptive scroll: if rendered content overflows the fixed-height container — enable page scroll
  requestAnimationFrame(() => {
    if (!quizPage) return;
    // Skip if already in img-quiz-mode (it handles its own scroll)
    if (quizPage.classList.contains('img-quiz-mode')) return;
    const viewH = window.innerHeight;
    const headerH = document.querySelector('.progress-header')?.offsetHeight || 62;
    const bottomH = document.querySelector('.bottom-bar')?.offsetHeight || 72;
    const available = viewH - headerH - bottomH;
    const contentH = area.scrollHeight;
    quizPage.classList.toggle('overflow-scroll', contentH > available - 8);
    // Scroll back to top on new question
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
}

// ── Answer handler ──
function answer(i) {
  if (answered) return;
  answered = true;
  _chosenIdx = i;

  const q    = questions[current];
  const corr = qCorrect(q);
  // Если вопрос flagged — любой выбор A/B/C/D это НЕПРАВИЛЬНО (правильный = флаг)
  const isOk = q.flagged ? false : (i === corr);

  if (isOk) { correct++; } else { wrong++; mistakeIds.push(q.id); }

  // Начисляем очки сразу
  awardPoints(isOk, false, qParams.mode === 'mistakes');

  // Update stats displays
  setEl('progOk',  el => el.textContent = correct);
  setEl('progErr', el => el.textContent = wrong);
  setEl('bstatOk', el => el.textContent = correct);
  setEl('bstatErr',el => el.textContent = wrong);

  // Colour option buttons
  const grid = document.getElementById('optsGrid');
  if (grid) {
    const btns = grid.querySelectorAll('.opt-btn, .opt-has-code');
    btns.forEach((btn, idx) => {
      if (q.flagged) {
        // Некорректный вопрос: ближайший — янтарный, выбранный — красный, остальные — серые
        if (q.closestAnswer !== undefined && idx === q.closestAnswer) {
          btn.classList.add('closest-answer');
        } else if (idx === i) {
          btn.classList.add('wrong');
        } else {
          btn.classList.add('neutral-after');
        }
      } else {
        // Обычный вопрос
        if (idx === corr) {
          btn.classList.add('correct');
        } else if (idx === i && !isOk) {
          btn.classList.add('wrong');
        } else {
          btn.classList.add('neutral-after');
        }
      }
      btn.classList.add('disabled');
      btn.style.pointerEvents = 'none';
    });
  }

  // Кнопка флага: на flagged вопросе — зелёная (правильный ответ был тут), иначе — серая
  const flagBtn = document.getElementById('flagBtn');
  if (flagBtn) {
    if (q.flagged) {
      flagBtn.classList.add('flag-btn--correct');
    } else {
      flagBtn.classList.add('flag-btn--neutral');
    }
    flagBtn.disabled = true;
    flagBtn.style.pointerEvents = 'none';
  }

  // Enable Next button
  setEl('btnNext', el => el.disabled = false);

  // Activate hint button
  const hintBtn = document.getElementById('hintBtn');
  if (hintBtn) hintBtn.classList.add('active');
}

// ── Flag handler (incorrectly composed question) ──
function answerFlag() {
  if (answered) return;
  answered = true;
  _answeredWithFlag = true;
  _chosenIdx = -1; // флаг — не вариант из сетки

  const q = questions[current];

  if (q.flagged) {
    // ✅ Флаг — правильный ответ
    correct++;
    awardPoints(true, true, qParams.mode === 'mistakes');
    setEl('progOk',  el => el.textContent = correct);
    setEl('bstatOk', el => el.textContent = correct);

    // Варианты: ближайший янтарный, остальные серые
    const grid = document.getElementById('optsGrid');
    if (grid) {
      grid.querySelectorAll('.opt-btn, .opt-has-code').forEach((btn, idx) => {
        btn.classList.add(q.closestAnswer !== undefined && idx === q.closestAnswer ? 'closest-answer' : 'neutral-after', 'disabled');
        btn.style.pointerEvents = 'none';
      });
    }

    // Кнопка флага — зелёная (как правильный ответ)
    if (flagBtn) { flagBtn.classList.add('flag-btn--correct'); flagBtn.disabled = true; flagBtn.style.pointerEvents = 'none'; }

  } else {
    // ❌ Флаг — ошибочный выбор
    wrong++;
    mistakeIds.push(q.id);
    setEl('progErr', el => el.textContent = wrong);
    setEl('bstatErr',el => el.textContent = wrong);

    // Правильный вариант — зелёный, остальные серые
    const grid = document.getElementById('optsGrid');
    if (grid) {
      grid.querySelectorAll('.opt-btn, .opt-has-code').forEach((btn, idx) => {
        btn.classList.add(idx === qCorrect(q) ? 'correct' : 'neutral-after', 'disabled');
        btn.style.pointerEvents = 'none';
      });
    }

    // Кнопка флага — серая (как неправильный нейтральный вариант)
    if (flagBtn) { flagBtn.classList.add('flag-btn--neutral'); flagBtn.disabled = true; flagBtn.style.pointerEvents = 'none'; }
  }

  // Next + объяснение активны
  setEl('btnNext', el => el.disabled = false);
  const hintBtn = document.getElementById('hintBtn');
  if (hintBtn) hintBtn.classList.add('active');
  setTimeout(() => openHintPanel(), 300);
}

// ── Open hint / explanation panel ──
function openHintPanel() {
  if (current >= questions.length) return;
  const q    = questions[current];
  const corr = qCorrect(q);
  const opts = qOpts(q);
  const letters = ['A','B','C','D','E','F'];

  const wrap = document.getElementById('fbModalWrap');
  const body = document.getElementById('fbPanelBody');
  const title = document.getElementById('fbPanelTitle');
  const label = document.getElementById('fbCorrectLabel');
  if (!wrap || !body) return;

  const isAnswered = answered;
  if (title) title.textContent = isAnswered ? 'Explanation' : 'Hint';

  if (label) {
    if (!isAnswered) {
      label.innerHTML = '';
    } else if (q.flagged && _answeredWithFlag) {
      const cl = q.closestAnswer !== undefined ? ` (closest option: ${letters[q.closestAnswer]})` : '';
      label.innerHTML = `<span style="color:#e53935;">🚩 Correct answer — Red Flag${cl}</span>`;
    } else if (q.flagged && !_answeredWithFlag) {
      const cl = q.closestAnswer !== undefined ? ` Closest option: (${letters[q.closestAnswer]})` : '';
      label.innerHTML = `<span style="color:#e53935;">🚩 Correct answer — Red Flag.${cl}</span>`;
    } else if (!q.flagged && _answeredWithFlag) {
      label.innerHTML = `<span style="color:#e57373;">🚩 Flag chosen incorrectly — the question is valid</span><br><span style="color:var(--gr);margin-top:4px;display:inline-block;">✓ Correct answer: (${letters[corr]})</span>`;
    } else {
      label.innerHTML = `<span style="color:var(--gr)">✓ Correct answer: (${letters[corr]})</span>`;
    }
  }

  body.innerHTML = renderText(qExp(q));
  wrap.classList.add('show');
}

function closeHintPanel() {
  const wrap = document.getElementById('fbModalWrap');
  if (wrap) wrap.classList.remove('show');
}

// ── AI Review Modal ──
let _aiReviewOnClose = null;
let _aiLastVerdict   = null;   // 'correct' | 'incorrect' | 'partial'

// Parse verdict keyword from raw AI response text
// The Gemini prompt always produces "**Evaluation:** correct / partially correct / incorrect"
function _parseVerdict(text) {
  if (!text) return 'incorrect';
  const t = text.toLowerCase();

  // Primary: look inside the Evaluation section (first 300 chars is usually enough)
  const evalMatch = t.match(/\*\*evaluation[^*]*\*\*[:\s]*([\s\S]{0,200})/);
  if (evalMatch) {
    const evalSection = evalMatch[1];
    if (/\bpartially correct\b|\bpartial\b/.test(evalSection)) return 'partial';
    if (/\bincorrect\b/.test(evalSection))                      return 'incorrect';
    if (/\bcorrect\b/.test(evalSection))                        return 'correct';
  }

  // Fallback: scan whole text
  if (/\bpartially correct\b|\bpartial\b/.test(t)) return 'partial';
  if (/\bincorrect\b/.test(t))                     return 'incorrect';
  if (/\bcorrect\b/.test(t))                       return 'correct';
  return 'incorrect';
}

function openAiReviewModal(question, userAnswer, referenceAnswer, topic, onClose) {
  const modal    = document.getElementById('aiReviewModal');
  const body     = document.getElementById('aiReviewBody');
  const gotItBtn = document.getElementById('aiGotItBtn');
  if (!modal || !body) return;
  _aiReviewOnClose = onClose || null;
  _aiLastVerdict   = null;

  body.innerHTML = `
    <div class="ai-loading">
      <div class="ai-spinner"></div>
      <span>Checking your answer…</span>
    </div>`;
  modal.classList.add('show');

  // Disable "Got it" while loading
  if (gotItBtn) { gotItBtn.disabled = true; gotItBtn.classList.add('btn-disabled'); }

  const cleanQ   = question.replace(/<[^>]+>/g, '').replace(/!\[.*?\]\(.*?\)/g, '').trim();
  const cleanRef = (referenceAnswer || '').replace(/<[^>]+>/g, '').trim();

  geminiCheckAnswer(cleanQ, userAnswer, cleanRef, topic)
    .then(aiText => {
      // Parse verdict BEFORE rendering so we have it ready
      _aiLastVerdict = _parseVerdict(aiText);

      // Highlight verdict at top of modal body
      const verdictHtml = _aiLastVerdict === 'correct'
        ? `<div class="ai-verdict ai-verdict--correct">✅ Correct</div>`
        : _aiLastVerdict === 'partial'
          ? `<div class="ai-verdict ai-verdict--partial">🟡 Partially correct</div>`
          : `<div class="ai-verdict ai-verdict--incorrect">❌ Incorrect</div>`;

      body.innerHTML = verdictHtml + renderAiText(aiText);

      // Fire the callback immediately with verdict (updates score counters)
      if (_aiReviewOnClose) {
        _aiReviewOnClose(_aiLastVerdict);
        _aiReviewOnClose = null;
      }

      // Re-enable "Got it"
      if (gotItBtn) { gotItBtn.disabled = false; gotItBtn.classList.remove('btn-disabled'); }

      // Show "Try Again" only for incorrect answers
      const retryBtn = document.getElementById('aiRetryBtn');
      if (retryBtn) {
        retryBtn.style.display = (_aiLastVerdict === 'incorrect') ? 'flex' : 'none';
      }
    })
    .catch(err => {
      _aiLastVerdict = 'incorrect';
      // Don't show raw error — show a friendly notice + reference answer
      const refHtml = referenceAnswer
        ? `<div class="ai-ref-answer" style="margin-top:12px">
             <div class="ai-ref-label">REFERENCE ANSWER:</div>
             <div>${renderText(referenceAnswer)}</div>
           </div>`
        : '';
      body.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;padding:12px 16px;
          background:rgba(251,191,36,.08);border:1px solid rgba(251,191,36,.2);
          border-radius:10px;margin-bottom:4px;">
          <span style="font-size:20px">⚠️</span>
          <span style="font-size:13px;color:var(--am)">AI review is temporarily unavailable. Compare your answer with the reference below.</span>
        </div>
        ${refHtml}`;
      if (_aiReviewOnClose) {
        _aiReviewOnClose('incorrect');
        _aiReviewOnClose = null;
      }
      if (gotItBtn) { gotItBtn.disabled = false; gotItBtn.classList.remove('btn-disabled'); }
    });
}

function closeAiReviewModal() {
  const modal = document.getElementById('aiReviewModal');
  if (modal) modal.classList.remove('show');
  const retryBtn = document.getElementById('aiRetryBtn');
  if (retryBtn) retryBtn.style.display = 'none';
  // Callback already fired in openAiReviewModal; only fire here if still pending (e.g. user closed early)
  if (_aiReviewOnClose) {
    _aiReviewOnClose(_aiLastVerdict || 'incorrect');
    _aiReviewOnClose = null;
  }
}

// ── Retry open answer — unlock textarea for resubmission ──
function retryOpenAnswer() {
  // Close modal
  const modal = document.getElementById('aiReviewModal');
  if (modal) modal.classList.remove('show');
  const retryBtn = document.getElementById('aiRetryBtn');
  if (retryBtn) retryBtn.style.display = 'none';
  // Don't fire onClose callback (user is retrying, not done)
  _aiReviewOnClose = null;

  // Roll back the score counted for this open question
  if (answered) {
    answered = false;
    correct  = Math.max(0, correct - 1);
    setEl('progOk',  el => el.textContent = correct);
    setEl('bstatOk', el => el.textContent = correct);
    setEl('btnNext', el => el.disabled = true);
  }

  // Re-enable textarea + submit button, hide "View AI Review", show submit again
  const ta    = document.getElementById('openAnswerTA');
  const btn   = document.getElementById('openSubmitBtn');
  const aiBtn = document.getElementById('openAiBtn');
  const openRetry = document.getElementById('openRetryBtn');
  if (ta)    { ta.disabled = false; ta.style.opacity = '1'; ta.value = ''; ta.focus(); }
  if (btn)   { btn.disabled = false; btn.style.opacity = '1'; btn.style.display = 'flex'; }
  if (aiBtn) { aiBtn.style.display = 'none'; }
  if (openRetry) { openRetry.style.display = 'none'; }
}

// Reopen modal showing cached AI result (no new API call)
function reopenAiModal() {
  const modal = document.getElementById('aiReviewModal');
  if (modal) modal.classList.add('show');
}

// ── Markdown toolbar helpers ──────────────────────────────────
function applyMdAction(action) {
  const ta = document.getElementById('openAnswerTA');
  if (!ta) return;
  const start = ta.selectionStart;
  const end   = ta.selectionEnd;
  const sel   = ta.value.slice(start, end);
  const before = ta.value.slice(0, start);
  const after  = ta.value.slice(end);

  let insert = '', cursorOffset = 0;

  if (action === 'bold') {
    insert = `**${sel || 'bold text'}**`;
    cursorOffset = sel ? insert.length : 2;
  } else if (action === 'italic') {
    insert = `*${sel || 'italic text'}*`;
    cursorOffset = sel ? insert.length : 1;
  } else if (action === 'code') {
    insert = `\`${sel || 'code'}\``;
    cursorOffset = sel ? insert.length : 1;
  } else if (action === 'h2') {
    // Apply to current line
    const lineStart = before.lastIndexOf('\n') + 1;
    const lineText  = ta.value.slice(lineStart, end);
    const newLine   = lineText.startsWith('## ') ? lineText.slice(3) : `## ${lineText}`;
    ta.setRangeText(newLine, lineStart, end, 'end');
    ta.focus();
    return;
  } else if (action === 'ul') {
    // Prefix each selected line with "- "
    const lines = (sel || 'list item').split('\n').map(l =>
      l.startsWith('- ') ? l.slice(2) : `- ${l}`
    ).join('\n');
    insert = lines;
    cursorOffset = insert.length;
  } else if (action === 'ol') {
    const lines = (sel || 'list item').split('\n').map((l, i) => {
      const clean = l.replace(/^\d+\.\s/, '');
      return `${i + 1}. ${clean}`;
    }).join('\n');
    insert = lines;
    cursorOffset = insert.length;
  }

  ta.setRangeText(insert, start, end, 'end');
  ta.selectionStart = start + cursorOffset;
  ta.selectionEnd   = start + cursorOffset;
  ta.focus();
}

function handleMdShortcut(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'b') { e.preventDefault(); applyMdAction('bold'); }
  if ((e.ctrlKey || e.metaKey) && e.key === 'i') { e.preventDefault(); applyMdAction('italic'); }
}

// Renders Gemini markdown text (bold, bullets, sections) to styled HTML
function renderAiText(text) {
  if (!text) return '';
  const lines = text.split('\n');
  let html = '';
  let inList = false;

  function closelist() {
    if (inList) { html += '</ul>'; inList = false; }
  }

  function esc(s) {
    return String(s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function applyInline(s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/(?<![*])\*([^*\n]+?)\*(?![*])/g, '<em>$1</em>');
  }

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();

    if (!trimmed) {
      closelist();
      html += '<div class="ai-gap"></div>';
      continue;
    }

    // Bullet line: starts with - or •
    if (/^[-•]\s+/.test(trimmed)) {
      if (!inList) { html += '<ul class="ai-list">'; inList = true; }
      const content = applyInline(trimmed.replace(/^[-•]\s+/, ''));
      html += `<li>${content}</li>`;
      continue;
    }

    closelist();

    // Section header: **Word(s):** possibly followed by text on same line
    const sectionMatch = trimmed.match(/^\*\*([^*]+?:)\*\*\s*(.*)/);
    if (sectionMatch) {
      const label = esc(sectionMatch[1]);  // e.g. "Evaluation:"
      const rest  = sectionMatch[2] ? applyInline(sectionMatch[2]) : '';
      if (rest) {
        // Header + inline text → header block then paragraph
        html += `<div class="ai-section"><strong>${label}</strong></div>`;
        html += `<p class="ai-p">${rest}</p>`;
      } else {
        html += `<div class="ai-section"><strong>${label}</strong></div>`;
      }
      continue;
    }

    // Regular paragraph
    html += `<p class="ai-p">${applyInline(trimmed)}</p>`;
  }

  closelist();
  return html;
}

// ── Submit open answer ──
function submitOpen() {
  if (answered) return;
  const ta       = document.getElementById('openAnswerTA');
  const btn      = document.getElementById('openSubmitBtn');
  const retryBtn = document.getElementById('openRetryBtn');
  const val      = ta ? ta.value.trim() : '';

  // Mark answered but DON'T count correct/wrong yet — wait for AI verdict
  answered = true;
  setEl('btnNext', el => el.disabled = true); // keep locked until AI decides

  // Disable textarea + submit while AI checks
  if (ta)       { ta.disabled = true; ta.style.opacity = '0.55'; }
  if (btn)      { btn.disabled = true; btn.style.opacity = '0.45'; }
  if (retryBtn) { retryBtn.style.display = 'none'; }

  // Open AI modal; callback receives verdict
  const q = questions[current];
  openAiReviewModal(qText(q), val, qExp(q), q.topic, (verdict) => {
    // verdict: 'correct' | 'incorrect' | 'partial'
    const isCorrect = verdict === 'correct' || verdict === 'partial';
    if (isCorrect) {
      correct++;
      // Очки за открытый вопрос: partial = 5, correct = 10
      const openPts = verdict === 'partial' ? 5 : 10;
      if (!_courseAlreadyDone) {
        sessionPoints += openPts;
        updatePointsDisplay();
        showPointsFlash(openPts);
      }
      setEl('progOk',  el => el.textContent = correct);
      setEl('bstatOk', el => el.textContent = correct);
    } else {
      wrong++;
      mistakeIds.push(q.id);
      setEl('progErr', el => el.textContent = wrong);
      setEl('bstatErr',el => el.textContent = wrong);
    }
    // Now unlock Next button
    setEl('btnNext', el => el.disabled = false);

    // Show "View AI Review" button
    const aiBtn = document.getElementById('openAiBtn');
    if (aiBtn) aiBtn.style.display = 'flex';
  });
}

// ── Next question ──
function nextQuestion() {
  if (!answered) return;
  // Сохраняем состояние текущего вопроса в историю
  answeredHistory[current] = {
    answered: true,
    chosenIdx: _chosenIdx,
    wasFlag: _answeredWithFlag,
    correct: correct,
    wrong: wrong,
    mistakeIds: [...mistakeIds],
  };
  // Сбрасываем состояние для следующего вопроса
  _chosenIdx = -1;
  _answeredWithFlag = false;
  answered = false;
  // Reset adaptive scroll class before rendering next question
  const quizPage = document.querySelector('.quiz-page');
  if (quizPage) quizPage.classList.remove('overflow-scroll');
  current++;
  if (current >= questions.length) {
    showDone();
  } else {
    // Если следующий вопрос уже был отвечен (возвращались назад) — восстанавливаем состояние
    const nextSnap = answeredHistory[current];
    if (nextSnap) {
      correct    = nextSnap.correct;
      wrong      = nextSnap.wrong;
      mistakeIds = [...nextSnap.mistakeIds];
    }
    renderQuestion();
    if (nextSnap && nextSnap.answered) {
      restoreAnswerState(nextSnap);
    }
    updatePrevBtn();
  }
}

// ── Previous question (только просмотр) ──
function prevQuestion() {
  if (current <= 0) return;
  // Сохраняем снапшот текущего вопроса если он уже отвечен
  if (answered) {
    answeredHistory[current] = {
      answered: true,
      chosenIdx: _chosenIdx,
      wasFlag: _answeredWithFlag,
      correct: correct,
      wrong: wrong,
      mistakeIds: [...mistakeIds],
    };
  }
  current--;
  // Восстанавливаем счётчики из снапшота предыдущего вопроса
  const prevSnap = answeredHistory[current];
  if (prevSnap) {
    correct   = prevSnap.correct;
    wrong     = prevSnap.wrong;
    mistakeIds = [...prevSnap.mistakeIds];
  }
  const quizPage = document.querySelector('.quiz-page');
  if (quizPage) quizPage.classList.remove('overflow-scroll');
  // Сбрасываем answered перед рендером (restoreAnswerState установит обратно если нужно)
  answered = false;
  _chosenIdx = -1;
  _answeredWithFlag = false;
  renderQuestion();
  // Восстанавливаем состояние ответа для этого вопроса
  const snap = answeredHistory[current];
  if (snap && snap.answered) {
    restoreAnswerState(snap);
  }
  updatePrevBtn();
}

// Обновить видимость кнопки «Назад на вопрос»
function updatePrevBtn() {
  const btn = document.getElementById('btnPrev');
  if (btn) btn.classList.toggle('visible', current > 0);
}

// Восстановить визуальное состояние ответа из снапшота
function restoreAnswerState(snap) {
  answered = true;
  _answeredWithFlag = snap.wasFlag;
  _chosenIdx = snap.chosenIdx !== undefined ? snap.chosenIdx : -1;

  const q    = questions[current];
  const corr = qCorrect(q);
  const grid = document.getElementById('optsGrid');

  if (grid) {
    const btns = grid.querySelectorAll('.opt-btn, .opt-has-code');
    btns.forEach((btn, idx) => {
      if (q.flagged) {
        // Некорректный вопрос
        if (q.closestAnswer !== undefined && idx === q.closestAnswer) {
          btn.classList.add('closest-answer');
        } else if (idx === _chosenIdx && _chosenIdx !== -1) {
          btn.classList.add('wrong');
        } else {
          btn.classList.add('neutral-after');
        }
      } else {
        // Обычный вопрос — показываем и правильный И выбранный варианты
        if (idx === corr) {
          btn.classList.add('correct');
        } else if (idx === _chosenIdx && _chosenIdx !== -1 && _chosenIdx !== corr) {
          btn.classList.add('wrong');
        } else {
          btn.classList.add('neutral-after');
        }
      }
      btn.classList.add('disabled');
      btn.style.pointerEvents = 'none';
    });
  }

  // Кнопка флага
  const flagBtn = document.getElementById('flagBtn');
  if (flagBtn) {
    if (snap.wasFlag && q.flagged) {
      flagBtn.classList.add('flag-btn--correct');
    } else {
      flagBtn.classList.add('flag-btn--neutral');
    }
    flagBtn.disabled = true;
    flagBtn.style.pointerEvents = 'none';
  }

  // Hint кнопка активна
  const hintBtn = document.getElementById('hintBtn');
  if (hintBtn) hintBtn.classList.add('active');

  // Кнопка Next активна, кнопка Prev видна
  setEl('btnNext', el => el.disabled = false);
  updatePrevBtn();
}

// ── Restart ──
function restart() {
  qParams.seed = Date.now();
  current  = 0;
  correct  = 0;
  wrong    = 0;
  answered = false;
  mistakeIds = [];
  answeredHistory = [];
  _chosenIdx = -1;
  _answeredWithFlag = false;
  sessionPoints = 0;
  _questionStartTime = 0;
  _courseAlreadyDone = isCourseCompleted(qParams.subject);
  window._quizStartTime = Date.now();

  const done = document.getElementById('doneScreen');
  if (done) done.style.display = 'none';
  const area = document.getElementById('questionArea');
  if (area) area.style.display = '';
  const bottomBar = document.getElementById('bottomBar');
  if (bottomBar) bottomBar.style.display = '';

  buildQuestions();
  renderQuestion();
  setEl('btnNext', el => el.disabled = true);
  updatePrevBtn();
}

// ── Retry mistakes ──
function retryMistakes() {
  S.set('mistakes', mistakeIds, qParams.subject);
  const url = new URL(location.href);
  url.searchParams.set('mode', 'mistakes');
  url.searchParams.set('seed', Date.now());
  location.href = url.toString();
}

// ── Go back (с предупреждением если квиз не завершён) ──
let _exitTargetUrl = null;

function goBack() {
  // Если квиз уже завершён — просто уходим
  const doneScreen = document.getElementById('doneScreen');
  if (doneScreen && doneScreen.style.display === 'block') {
    _doGoBack();
    return;
  }
  // Если ни один вопрос не был отвечен — тоже просто уходим
  if (current === 0 && !answered) {
    _doGoBack();
    return;
  }
  // Иначе — показываем предупреждение
  _exitTargetUrl = null; // будет определён при confirmExit
  const modal = document.getElementById('exitConfirmModal');
  if (modal) {
    modal.style.display = 'flex';
  } else {
    _doGoBack();
  }
}

function closeExitModal() {
  const modal = document.getElementById('exitConfirmModal');
  if (modal) modal.style.display = 'none';
  _exitTargetUrl = null;
}

function confirmExit() {
  // Сохраняем прогресс перед выходом
  _saveProgressOnExit();
  closeExitModal();
  _doGoBack();
}

function _saveProgressOnExit() {
  // Сохраняем ошибки
  const prevMistakes = S.get('mistakes', qParams.subject) || [];
  const answeredIds  = questions.slice(0, current).map(q => q.id);
  const newMistakes  = [...new Set([
    ...prevMistakes.filter(id => !answeredIds.includes(id)),
    ...mistakeIds
  ])];
  S.set('mistakes', newMistakes, qParams.subject);

  // Сохраняем правильно отвеченные в этой сессии
  const prevCorrect = S.get('correct_ids', qParams.subject) || [];
  const sessionCorrect = questions.slice(0, current)
    .filter(q => !mistakeIds.includes(q.id))
    .map(q => q.id);
  const newCorrect = [...new Set([...prevCorrect, ...sessionCorrect])];
  S.set('correct_ids', newCorrect, qParams.subject);

  // Если был прогресс — отправляем частичный результат в backend
  if (current > 0 && typeof submitQuizResult === 'function') {
    const total = current; // только отвеченные
    const pct = total > 0 ? Math.round(correct / total * 100) : 0;
    const time = Math.round((Date.now() - window._quizStartTime) / 1000);
    submitQuizResult({
      subject: qParams.subject,
      mode: qParams.mode + '_partial',
      score: correct,
      total,
      pct,
      time_seconds: time
    });
  }
}

function _doGoBack() {
  window.removeEventListener('popstate', _onBrowserBack);
  // Всегда используем location.href — history.back() снова триггерит popstate
  location.href = 'subject.html?s=' + (qParams.subject || 'physics');
}

// Перехват браузерной кнопки «назад»
function _onBrowserBack(e) {
  // Если квиз завершён — уходим через location.href
  const doneScreen = document.getElementById('doneScreen');
  if (doneScreen && doneScreen.style.display === 'block') {
    window.removeEventListener('popstate', _onBrowserBack);
    location.href = 'subject.html?s=' + (qParams.subject || 'physics');
    return;
  }
  // Всегда возвращаем барьер обратно в историю
  history.pushState({ quizActive: true }, '');
  // Если ни одного ответа за всю сессию — уходим без модалки
  if (answeredHistory.length === 0 && !answered) {
    window.removeEventListener('popstate', _onBrowserBack);
    location.href = 'subject.html?s=' + (qParams.subject || 'physics');
    return;
  }
  // Показываем модалку
  const modal = document.getElementById('exitConfirmModal');
  if (modal) {
    modal.style.display = 'flex';
  } else {
    _doGoBack();
  }
}

// ── Show done screen ──
function showDone() {
  const total = questions.length;
  const pct   = total ? Math.round(correct / total * 100) : 0;
  const time  = Math.round((Date.now() - window._quizStartTime) / 1000);
  const timeStr = time >= 60
    ? `${Math.floor(time/60)}m ${time % 60}s`
    : `${time}s`;

  // Save persistent mistakes
  const prevMistakes = S.get('mistakes', qParams.subject) || [];
  const newMistakes  = [...new Set([...prevMistakes.filter(id => !questions.map(q=>q.id).includes(id)), ...mistakeIds])];
  S.set('mistakes', newMistakes, qParams.subject);

  // Save correctly answered question IDs
  const prevCorrect = S.get('correct_ids', qParams.subject) || [];
  const sessionCorrect = questions.filter(q => !mistakeIds.includes(q.id)).map(q => q.id);
  const newCorrect = [...new Set([...prevCorrect, ...sessionCorrect])];
  S.set('correct_ids', newCorrect, qParams.subject);

  // Save result
  const results = S.get('results', qParams.subject) || [];
  results.push({ date: new Date().toISOString(), score: correct, total, pct, mode: qParams.mode, time });
  if (results.length > 50) results.shift();
  S.set('results', results, qParams.subject);

  // Submit to backend
  // Считаем финальные очки: per_question_pts + бонус за результат + участие
  let finalPoints = sessionPoints;
  if (!_courseAlreadyDone) {
    const completionBonus = pct === 100 ? 50 : pct >= 90 ? 25 : pct >= 75 ? 10 : 0;
    const participationPts = 10;
    finalPoints = sessionPoints + completionBonus + participationPts;
  }

  // Проверяем завершение курса ПОСЛЕ сохранения correct_ids/mistakes
  const courseJustCompleted = !_courseAlreadyDone && isCourseCompleted(qParams.subject);

  if (typeof submitQuizResult === 'function') {
    // Передаём pre-calculated points через mode-суффикс чтобы backend их принял
    // (backend пересчитает по своей формуле — итог близкий)
    submitQuizResult({
      subject: qParams.subject,
      mode: qParams.mode,
      score: correct,
      total,
      pct,
      time_seconds: time,
      points_override: _courseAlreadyDone ? 0 : undefined,
    });
  }

  // Hide question area, show done screen
  const area = document.getElementById('questionArea');
  if (area) area.style.display = 'none';
  const bottomBar = document.getElementById('bottomBar');
  if (bottomBar) bottomBar.style.display = 'none';

  const done = document.getElementById('doneScreen');
  if (!done) return;
  done.style.display = 'block';

  // Grade + emoji
  let grade, emoji, gradeColor;
  if (pct === 100) { grade = 'S  PERFECT'; emoji = '🏆'; gradeColor = '#fbbf24'; }
  else if (pct >= 90) { grade = 'A+  Excellent'; emoji = '🎉'; gradeColor = '#34d399'; }
  else if (pct >= 80) { grade = 'A  Great job'; emoji = '😎'; gradeColor = '#34d399'; }
  else if (pct >= 70) { grade = 'B  Good'; emoji = '👍'; gradeColor = '#60a5fa'; }
  else if (pct >= 55) { grade = 'C  Acceptable'; emoji = '📚'; gradeColor = '#fbbf24'; }
  else if (pct >= 40) { grade = 'D  Needs work'; emoji = '😅'; gradeColor = '#f97316'; }
  else               { grade = 'F  Keep trying'; emoji = '💪'; gradeColor = '#f87171'; }

  setEl('doneEmoji',   el => el.textContent = emoji);
  setEl('doneTitle',   el => el.textContent = pct === 100 ? 'Perfect Score!' : pct >= 70 ? 'Quiz Complete!' : 'Quiz Finished');
  setEl('doneSub',     el => el.textContent = `${qParams.mode} mode · ${timeStr}`);
  setEl('doneCorrect', el => el.textContent = correct);
  setEl('doneWrong',   el => el.textContent = wrong);
  setEl('doneTotal',   el => el.textContent = total);
  setEl('doneTime',    el => el.textContent = timeStr);
  setEl('doneScore',   el => {
    el.textContent = pct + '%';
    el.style.color = pct >= 70 ? 'var(--gr)' : pct >= 40 ? 'var(--am)' : 'var(--re)';
  });
  setEl('doneGrade', el => {
    el.textContent = grade;
    el.style.color = gradeColor;
    el.style.borderColor = gradeColor + '55';
    el.style.background  = gradeColor + '15';
  });

  // Animate ring
  const ring = document.getElementById('ringFill');
  if (ring) {
    const circumference = 326.7;
    const offset = circumference - (pct / 100) * circumference;
    const ringColor = pct >= 70 ? 'var(--gr)' : pct >= 40 ? 'var(--am)' : 'var(--re)';
    ring.style.stroke = ringColor;
    setTimeout(() => {
      ring.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)';
      ring.style.strokeDashoffset = offset;
    }, 100);
  }

  // Retry mistakes button
  const retryBtn = document.getElementById('retryMistakesBtn');
  if (retryBtn) {
    if (mistakeIds.length > 0) {
      retryBtn.style.display = 'flex';
      const badge = document.getElementById('mistakesCountBadge');
      if (badge) badge.textContent = mistakeIds.length;
    } else {
      retryBtn.style.display = 'none';
    }
  }

  // Mistakes list — скрыто, кнопка Retry Mistakes уже показывает счётчик
  const sec = document.getElementById('mistakesSection');
  if (sec) sec.innerHTML = '';

  // ── Очки и статус курса на done-экране ──
  const pointsEl = document.getElementById('donePoints');
  if (pointsEl) {
    if (_courseAlreadyDone) {
      pointsEl.innerHTML = `<span style="color:var(--text3);font-size:13px">🏆 Курс уже пройден — очки не начисляются</span>`;
    } else if (courseJustCompleted) {
      pointsEl.innerHTML = `
        <div style="text-align:center;margin-top:8px;">
          <div style="font-size:22px;font-weight:700;color:var(--am)">+${finalPoints} ⭐</div>
          <div style="font-size:12px;color:var(--text3);margin-top:2px">заработано за этот квиз</div>
          <div style="margin-top:10px;padding:10px 16px;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.3);border-radius:10px;font-size:13px;color:var(--am)">
            🎓 Курс пройден полностью! Следующие попытки не дают очков.
          </div>
        </div>`;
    } else {
      pointsEl.innerHTML = `
        <div style="text-align:center;margin-top:8px;">
          <div style="font-size:22px;font-weight:700;color:var(--pk2)">+${finalPoints} ⭐</div>
          <div style="font-size:12px;color:var(--text3);margin-top:2px">заработано за этот квиз</div>
        </div>`;
    }
  }
}

// ── Keyboard bindings ──
function bindKeyboard() {
  document.addEventListener('keydown', (e) => {
    // Close modal
    if (e.key === 'Escape') { closeHintPanel(); return; }

    // Open explanation
    if (e.key === 'e' || e.key === 'E') { openHintPanel(); return; }

    // Previous question (стрелка влево)
    if (e.key === 'ArrowLeft' && current > 0) {
      e.preventDefault();
      prevQuestion();
      return;
    }

    // Next question (Enter or Space when answered)
    if ((e.key === 'Enter' || e.key === ' ') && answered) {
      e.preventDefault();
      nextQuestion();
      return;
    }

    // Answer with number keys 1-4
    if (!answered && ['1','2','3','4'].includes(e.key)) {
      const i = parseInt(e.key) - 1;
      if (i < qOpts(questions[current] || {}).length) answer(i);
      return;
    }

    // Answer with letter keys A-D
    if (!answered) {
      const map = { a:0, b:1, c:2, d:3 };
      const k = e.key.toLowerCase();
      if (k in map) {
        const i = map[k];
        if (i < qOpts(questions[current] || {}).length) answer(i);
      }
    }
  });
}
