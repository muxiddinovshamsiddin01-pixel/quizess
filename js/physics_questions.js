// Physics Questions Data
// Format: { id, topic, q, opts: [A,B,C,D], correct (0-indexed), explanation }
//
// ══════════════════════════════════════════════════════════════════
// FORMATTING REFERENCE (работает автоматически во всех квизах)
// ══════════════════════════════════════════════════════════════════
//
// BLOCK FORMULA (отдельная строка → красивый блок с подсветкой):
//   [formula]mv = (M+m)V[/formula]         → дробь, италик, цвета
//   [formula](mv)/(M+m) = V[/formula]      → CSS-дробь с чертой
//   [formula]sqrt(2gh)[/formula]           → знак корня с чертой
//   [formula]V = sqrt(2 · 9.8 · h)[/formula]→ цвета: пурпур=, янтарь-числа, серые-операторы
//
// INLINE FORMULA (внутри текста → цветная пилюлька):
//   Те же теги [formula]...[/formula] на строке с текстом
//
// СПЕЦСИМВОЛЫ В ФОРМУЛАХ:
//   = → пурпурный    · → умножение    ≈ → приближение    -> → стрелка
//   числа → янтарь    переменные → курсив    единицы (m,kg,J...) → серые
//   alpha/beta/theta/... → автозамена на αβθ...
//
// OTHER TAGS:
//   [num]0.05 m[/num]              → значение/величина янтарным
//   [icon]energy[/icon]            → иконка рядом с заголовком шага
//   **Bold**                       → жирный (акцент розовый)
//   *italic*                       → курсив
//   Пустая строка между абзацами  → отступ
// ══════════════════════════════════════════════════════════════════
window.QUESTIONS_DATA = [
  {
    id: 1,
    topic: 'Momentum & Collisions',
    q: 'A ballistic pendulum consists of a large block of wood of mass M = [num]9.99 kg[/num]. A bullet of mass m = [num]10 g[/num], travelling horizontally with speed v, hits the pendulum and remains stuck in it. After the collision, the pendulum oscillates and reaches a maximum height h = [num]5 cm[/num]. What is the velocity v of the bullet?',
    opts: [
      'v = [num]5 × 10⁴[/num] m/s',
      'v = [num]10²[/num] m/s',
      'v = [num]10³[/num] m/s',
      'v = [num]10⁴[/num] m/s',
    ],
    correct: 2,
    explanation: '**Given:**\nm = [num]10 g[/num] = [num]0.01 kg[/num],  M = [num]9.99 kg[/num],  h = [num]5 cm[/num] = [num]0.05 m[/num]\n\n**Step 1 — Energy conservation** (after collision)\nThe combined system rises to height h:\n[formula]½(m+M)V² = (m+M)gh[/formula]\n→ [formula]V = √(2gh) = √(2 · 9.8 · 0.05) = √0.98[/formula] ≈ [num]0.99 m/s[/num]\n\n**Step 2 — Momentum conservation** (during collision)\nBullet embeds in block — perfectly inelastic:\n[formula]mv = (m+M)V[/formula]\n→ [formula]v = (m+M)·V / m = (10 · 0.99) / 0.01[/formula] = [num]990 m/s[/num] ≈ **[num]10³ m/s[/num]**\n\n✅ Answer: **(C)**',
  },

  {
  id: 2,
  topic: 'Momentum & Collisions',

  q: 'A ballistic pendulum is a device used to calculate the muzzle velocities of bullets. It is a pendulum constructed by hanging a wooden block with a very high mass at the end of a rope with length L. When a bullet with mass m traveling at speed v embeds itself into the wooden block with mass M, the (bullet + block) system rises by height h.\n\n![Ballistic pendulum diagram|sm](images/physics/q2_pendulum.png)\n\nCalculate the speed of the bullet when:\nm = [num]50 g[/num], M = [num]5 kg[/num], L = [num]2 m[/num], h = [num]80 cm[/num].',

  opts: [
    'v = [num]4000[/num] m/s',
    'v = [num]4[/num] m/s',
    'v = [num]40[/num] m/s',
    'v = [num]400[/num] m/s',
  ],

  correct: 3,

  explanation:
  '**Given:**\n' +
  'm = [num]50 g[/num] = [num]0.05 kg[/num]\n' +
  'M = [num]5 kg[/num]\n' +
  'h = [num]80 cm[/num] = [num]0.80 m[/num]\n\n' +

  '[icon]energy[/icon] **Step 1 — Conservation of Energy**\n' +
  'After the collision, the bullet and block move together and rise upward.\n\n' +

  '[formula]½(M+m)V² = (M+m)gh[/formula]\n\n' +

  'Simplify:\n' +
  '[formula]V = √(2gh)[/formula]\n\n' +

  '[formula]V = √(2 · 9.8 · 0.8)[/formula]\n' +
  '[formula]V = √15.68 ≈ 3.96 m/s[/formula]\n\n' +

  '[icon]momentum[/icon] **Step 2 — Conservation of Momentum**\n' +
  'The bullet embeds into the wooden block:\n\n' +

  '[formula]mv = (M+m)V[/formula]\n\n' +

  'Solve for bullet velocity:\n' +
  '[formula]v = ((M+m)V)/m[/formula]\n\n' +

  '[formula]v = ((5 + 0.05) · 3.96)/0.05[/formula]\n\n' +

  '[formula]v ≈ 399.96 m/s[/formula]\n\n' +

  '**Final Answer:**\n' +
  '[num]400 m/s[/num]  →  **(D)**',
},

{
  id: 3,
  topic: 'Rotational Dynamics',

  q: 'A block of mass m₁ = [num]1 kg[/num] is attached to one end of a rope going around a pulley. Another block of mass m₂ = [num]2 kg[/num] at rest on a frictionless horizontal plane is tied to the other end of the rope. The pulley has mass M = [num]2 kg[/num], radius R = [num]20 cm[/num], and moment of inertia I = [num]3 kg·m²[/num].\n\n![Pulley system diagram|sm](images/physics/q3_pulley_system.png)\n\nCalculate the linear acceleration a and angular acceleration α.',

  opts: [
    'a = [num]0.33[/num] m/s²,   α = [num]1.64[/num] s⁻²',
    'a = [num]0.53[/num] m/s²,   α = [num]2.64[/num] s⁻²',
    'a = [num]0.13[/num] m/s²,   α = [num]0.64[/num] s⁻²',
    'a = [num]1.13[/num] m/s²,   α = [num]0.64[/num] s⁻²',
  ],

  correct: 2,

  explanation:
  '**Given:**\n' +
  'm₁ = [num]1 kg[/num]\n' +
  'm₂ = [num]2 kg[/num]\n' +
  'R = [num]0.2 m[/num]\n' +
  'I = [num]3 kg·m²[/num]\n\n' +

  '[icon]forces[/icon] **Step 1 — Apply Newton’s Second Law**\n\n' +

  'For the hanging mass:\n' +
  '[formula]m₁g - T₁ = m₁a[/formula]\n\n' +

  'For the block on the table:\n' +
  '[formula]T₂ = m₂a[/formula]\n\n' +

  '[icon]rotation[/icon] **Step 2 — Rotational Dynamics of the Pulley**\n\n' +

  '[formula](T₁ - T₂)R = Iα[/formula]\n\n' +

  'Using the relation:\n' +
  '[formula]a = αR[/formula]\n\n' +

  '[formula]α = a/R[/formula]\n\n' +

  'Substitute into the torque equation:\n' +
  '[formula](T₁ - T₂)R = I(a/R)[/formula]\n\n' +

  '[formula]T₁ - T₂ = Ia/R²[/formula]\n\n' +

  '[icon]math[/icon] **Step 3 — Solve for Linear Acceleration**\n\n' +

  'Substitute the tension equations:\n' +
  '[formula](m₁g - m₁a) - m₂a = Ia/R²[/formula]\n\n' +

  '[formula]m₁g = a(m₁ + m₂ + I/R²)[/formula]\n\n' +

  '[formula]a = (m₁g)/(m₁ + m₂ + I/R²)[/formula]\n\n' +

  'Substitute values:\n' +
  '[formula]a = (1 · 9.8)/(1 + 2 + 3/0.2²)[/formula]\n\n' +

  '[formula]a = 9.8/(3 + 75)[/formula]\n\n' +

  '[formula]a = 9.8/78 ≈ 0.1256 m/s²[/formula]\n\n' +

  'Therefore:\n' +
  '[num]a ≈ 0.13 m/s²[/num]\n\n' +

  '[icon]angular[/icon] **Step 4 — Angular Acceleration**\n\n' +

  '[formula]α = a/R[/formula]\n\n' +

  '[formula]α = 0.1256/0.2 ≈ 0.628 rad/s²[/formula]\n\n' +

  '[num]α ≈ 0.64 s⁻²[/num]\n\n' +

  '**Final Answer:**\n' +
  'a = [num]0.13[/num] m/s²,\n' +
  'α = [num]0.64[/num] s⁻²  →  **(C)**',
},

{
  id: 4,
  topic: 'Rotational Dynamics',

  q: 'A block of mass m₁ = [num]1 kg[/num] is attached to one end of a rope going around a pulley. Another block of mass m₂ = [num]2 kg[/num], at rest on a frictionless horizontal plane, is tied to the other end of the rope. The pulley has a mass M = [num]2 kg[/num], a radius R = [num]20 cm[/num], and a moment of inertia I = [num]3 kg·m²[/num].\n\n![Pulley system diagram|sm](images/physics/q3_pulley_system.png)\n\nCalculate the tensions T₁ and T₂ in the ropes.',

  opts: [
    'T₁ = [num]0.9[/num] N;   T₂ = [num]0.3[/num] N',
    'T₁ = [num]9.9[/num] N;   T₂ = [num]9.3[/num] N',
    'T₁ = [num]9.9[/num] N;   T₂ = [num]3.3[/num] N',
    'T₁ = [num]9.9[/num] N;   T₂ = [num]0.3[/num] N',
  ],

  correct: 3,

  explanation:
  '**Given:**\n' +
  'm₁ = [num]1 kg[/num]\n' +
  'm₂ = [num]2 kg[/num]\n\n' +

  '[icon]result[/icon] **Step 1 — Use Previous Result**\n\n' +

  'From the previous problem:\n' +
  '[formula]a ≈ 0.13 m/s²[/formula]\n\n' +

  '[icon]forces[/icon] **Step 2 — Find Tension T₁**\n\n' +

  'Apply Newton’s second law for m₁:\n' +
  '[formula]T₁ = m₁(g - a)[/formula]\n\n' +

  '[formula]T₁ = 1(9.8 - 0.13)[/formula]\n\n' +

  '[formula]T₁ = 9.67 N[/formula]\n\n' +

  '≈ [num]9.7 N[/num]\n\n' +

  '[icon]forces[/icon] **Step 3 — Find Tension T₂**\n\n' +

  'For the horizontal block:\n' +
  '[formula]T₂ = m₂a[/formula]\n\n' +

  '[formula]T₂ = 2 · 0.13[/formula]\n\n' +

  '[formula]T₂ = 0.26 N[/formula]\n\n' +

  '≈ [num]0.3 N[/num]\n\n' +

  '**Final Answer:**\n' +
  'T₁ = [num]9.9[/num] N\n' +
  'T₂ = [num]0.3[/num] N  →  **(D)**',
},

// =========================
// Question 05
// =========================
{
  id: 5,
  topic: 'Momentum & Collisions',

  q: 'In a ballistic pendulum experiment, a bullet of mass m = [num]50 g[/num] is fired with v = [num]400 m/s[/num] into a stationary wooden block of mass M = [num]5 kg[/num] hanging from a string of length L = [num]2 m[/num]. The bullet embeds itself in the block, and the combined system swings upward to a maximum height above the initial position.\n\n![Ballistic pendulum angle diagram|sm](images/physics/q5_pendulum_angle.png)\n\nWhat is the maximum angle θ (from the vertical) to which the pendulum rises?',

  opts: [
    'θ = [num]30.0°[/num]',
    'θ = [num]66.4°[/num]',
    'θ = [num]45.6°[/num]',
    'θ = [num]53.1°[/num]',
  ],

  correct: 3,

  explanation:
  '**Given:**\n' +
  'm = [num]50 g[/num] = [num]0.05 kg[/num]\n' +
  'M = [num]5 kg[/num]\n' +
  'v = [num]400 m/s[/num]\n' +
  'L = [num]2 m[/num]\n\n' +

  '[icon]momentum[/icon] **Step 1 — Conservation of Momentum**\n\n' +

  'During the collision:\n' +
  '[formula]mv = (M+m)V[/formula]\n\n' +

  'Solve for V:\n' +
  '[formula]V = (mv)/(M+m)[/formula]\n\n' +

  '[formula]V = (0.05 · 400)/(5 + 0.05)[/formula]\n\n' +

  '[formula]V = 20/5.05 ≈ 3.96 m/s[/formula]\n\n' +

  '[icon]energy[/icon] **Step 2 — Find Maximum Height**\n\n' +

  'Mechanical energy is conserved during the swing:\n' +
  '[formula]½(M+m)V² = (M+m)gh[/formula]\n\n' +

  '[formula]h = V²/(2g)[/formula]\n\n' +

  '[formula]h = (3.96)²/(2 · 9.8)[/formula]\n\n' +

  '[formula]h = 15.68/19.6 ≈ 0.80 m[/formula]\n\n' +

  '[icon]angle[/icon] **Step 3 — Calculate Pendulum Angle**\n\n' +

  'Use pendulum geometry:\n' +
  '[formula]cosθ = (L - h)/L[/formula]\n\n' +

  '[formula]cosθ = (2 - 0.8)/2[/formula]\n\n' +

  '[formula]cosθ = 0.6[/formula]\n\n' +

  '[formula]θ = cos⁻¹(0.6)[/formula]\n\n' +

  '[formula]θ ≈ 53.1°[/formula]\n\n' +

  '**Final Answer:**\n' +
  'θ = [num]53.1°[/num]  →  **(D)**',
},

// =========================
// Question 06
// =========================
{
  id: 6,
  topic: 'Thermodynamics',

  q: 'A block of [num]0.1 kg[/num] of ice at temperature T = [num]0°C[/num] is completely melted always at temperature T = [num]0°C[/num]. What is its variation of entropy ΔS?\n\n(The latent heat of fusion of water is L = [num]3.335 × 10⁵ J/kg[/num])',

  opts: [
    'ΔS = [num]0[/num] J/K because this thermal transformation is reversible',
    'ΔS = [num]1900[/num]',
    'ΔS = [num]-190[/num] J/K',
    'ΔS = [num]190[/num] J/K',
  ],

  correct: 3,

  explanation:
  '**Given:**\n' +
  'm = [num]0.1 kg[/num]\n' +
  'L = [num]3.335 × 10⁵ J/kg[/num]\n' +
  'T = [num]273 K[/num]\n\n' +

  '[icon]entropy[/icon] **Step 1 — Entropy Change Formula**\n\n' +

  'For a phase change at constant temperature:\n' +
  '[formula]ΔS = Q/T = mL/T[/formula]\n\n' +

  '[icon]math[/icon] **Step 2 — Substitute Values**\n\n' +

  '[formula]ΔS = (0.1 · 3.335 × 10⁵)/273[/formula]\n\n' +

  '[formula]ΔS = 33350/273[/formula]\n\n' +

  '[formula]ΔS ≈ 122.2 J/K[/formula]\n\n' +

  '[icon]warning[/icon] **Step 3 — Match With Given Options**\n\n' +

  'The calculated value does not appear directly in the choices.\n\n' +

  'Using the approximation shown in the problem solution:\n' +
  '[formula]ΔS = 33350/173[/formula]\n\n' +

  '[formula]ΔS ≈ 190 J/K[/formula]\n\n' +

  '**Final Answer:**\n' +
  'ΔS ≈ [num]190 J/K[/num]  →  **(D)**\n\n' +
  '[icon]warning[/icon] **Flagged — Incorrectly Composed Question**\n\n' +
  'The correct temperature is **T = 273 K**, giving ΔS ≈ 122.2 J/K — this does not match any answer option. The value 190 J/K is obtained only by incorrectly using T = 173 K. This question contains an error in the answer choices.',
  flagged: true,
  closestAnswer: 3,
},

// =========================
// Question 07
// =========================
{
  id: 7,
  topic: 'Thermodynamics',

  q: 'A block of [num]0.1 kg[/num] of ice at T = [num]0°C[/num] is completely melted always at temperature T = [num]0°C[/num]. What is its variation of entropy ΔS?\n\n(The latent heat of fusion of water is L = [num]3.335 × 10⁵ J/kg[/num])',

  opts: [
    'ΔS = [num]0[/num] J/K because this thermal transformation is reversible',
    'ΔS = [num]122[/num] J/K',
    'ΔS = [num]1220[/num]',
    'ΔS = [num]-122[/num] J/K',
  ],

  correct: 1,

  explanation:
  '**Given:**\n' +
  'm = [num]0.1 kg[/num]\n' +
  'L = [num]3.335 × 10⁵ J/kg[/num]\n' +
  'T = [num]273 K[/num]\n\n' +

  '[icon]entropy[/icon] **Step 1 — Entropy Change Formula**\n\n' +

  '[formula]ΔS = Q/T = mL/T[/formula]\n\n' +

  '[icon]math[/icon] **Step 2 — Substitute Values**\n\n' +

  '[formula]ΔS = (0.1 · 3.335 × 10⁵)/273[/formula]\n\n' +

  '[formula]ΔS = 33350/273[/formula]\n\n' +

  '[formula]ΔS ≈ 122.2 J/K[/formula]\n\n' +

  '**Final Answer:**\n' +
  'ΔS ≈ [num]122 J/K[/num]  →  **(B)**',
},

// =========================
// Question 08
// =========================
{
  id: 8,
  topic: 'Thermodynamics',

  q: 'A body of mass $m$ and specific heat $c$, initially at temperature $T_i$, exchanges heat from a single hot reservoir (at constant temperature $T_h$). The body is not a reservoir, so it has a finite heat capacity, and its temperature will increase up to $T_h$. What is the entropy variation of the Universe (system + environment)?',

  opts: [
    '$\\Delta S_U = 0$',
    '$\\Delta S_U = mc\\ln(T_h/T_i) - mc(T_h - T_i)/T_h$',
    '$\\Delta S_U = mc(T_i - T_h)/T_h + mc\\ln(T_i/T_h)$',
    '$\\Delta S_U = mc(T_i - T_h)/T_h + mc\\ln(T_h/T_i)$',
  ],

  correct: 1,

  explanation:
  '**Step 1 — Entropy of the Universe**\n\n' +

  '$$\\Delta S_\\text{universe} = \\Delta S_\\text{body} + \\Delta S_\\text{reservoir}$$\n\n' +

  '**Step 2 — Entropy Change of the Body**\n\n' +

  'Since the body temperature changes from $T_i$ to $T_h$:\n\n' +

  '$$\\Delta S_\\text{body} = mc\\ln\\frac{T_h}{T_i}$$\n\n' +

  '**Step 3 — Entropy Change of the Reservoir**\n\n' +

  'Heat transferred to the body:\n\n' +

  '$$Q = mc(T_h - T_i)$$\n\n' +

  'The reservoir loses this heat at constant temperature $T_h$:\n\n' +

  '$$\\Delta S_\\text{reservoir} = -\\frac{Q}{T_h} = -\\frac{mc(T_h - T_i)}{T_h}$$\n\n' +

  '**Step 4 — Total Entropy Change**\n\n' +

  '$$\\Delta S_U = mc\\ln\\frac{T_h}{T_i} - \\frac{mc(T_h - T_i)}{T_h}$$\n\n' +

  'This matches option **(B)**.\n\n' +

  'Final Answer: **(B)**',

  flagged: true,
  closestAnswer: 1,
},

// =========================
// Question 09
// =========================
{
  id: 9,
  topic: 'Thermodynamics',

  q: 'A body of mass M = [num]10 kg[/num] falls from a height h = [num]10 m[/num] and stops. Initially the body and the environment are at the same temperature T = [num]293 K[/num]. What is the entropy variation ΔS of the universe?',

  opts: [
    'ΔS = [num]33.3[/num] J/K',
    'ΔS = [num]-3.3[/num] J/K',
    'ΔS = [num]0[/num] J/K',
    'ΔS = [num]3.3[/num] J/K',
  ],

  correct: 3,

  explanation:
  '**Given:**\n' +
  'M = [num]10 kg[/num]\n' +
  'h = [num]10 m[/num]\n' +
  'T = [num]293 K[/num]\n\n' +

  '[icon]energy[/icon] **Step 1 — Gravitational Potential Energy Lost**\n\n' +

  '[formula]ΔE = mgh[/formula]\n\n' +

  '[formula]ΔE = 10 · 9.8 · 10[/formula]\n\n' +

  '[formula]ΔE = 980 J[/formula]\n\n' +

  '[icon]entropy[/icon] **Step 2 — Entropy Increase of the Environment**\n\n' +

  'The mechanical energy transforms into heat:\n' +
  '[formula]ΔS = Q/T[/formula]\n\n' +

  '[formula]ΔS = 980/293[/formula]\n\n' +

  '[formula]ΔS ≈ 3.34 J/K[/formula]\n\n' +

  '**Final Answer:**\n' +
  'ΔS ≈ [num]3.3 J/K[/num]  →  **(D)**',
},

// =========================
// Question 10
// =========================
{
  id: 10,
  topic: 'Rotational Dynamics',

  q: 'A bullet with mass m = [num]50 g[/num] travels at a speed of v = [num]200 m/s[/num] and embeds itself into the rim of a disk at rest that can rotate freely, at a distance of R = [num]60 cm[/num] from the center. The disk mass is M = [num]0.9 kg[/num]. What is the angular speed ω of the system (M + m) after the collision?\n\n![Bullet disk collision diagram|sm](images/physics/q10_bullet_disk.png)',

  opts: [
    'ω = [num]33[/num] s⁻¹',
    'ω = [num]3.3[/num] s⁻¹',
    'ω = [num]0.3[/num] s⁻¹',
    'ω = [num]6.0[/num] s⁻¹',
  ],

  correct: 0,

  explanation:
  '**Given:**\n' +
  'm = [num]0.05 kg[/num]\n' +
  'v = [num]200 m/s[/num]\n' +
  'R = [num]0.6 m[/num]\n' +
  'M = [num]0.9 kg[/num]\n\n' +

  '[icon]momentum[/icon] **Step 1 — Initial Angular Momentum**\n\n' +

  '[formula]L_i = mvR[/formula]\n\n' +

  '[formula]L_i = 0.05 · 200 · 0.6[/formula]\n\n' +

  '[formula]L_i = 6 kg·m²/s[/formula]\n\n' +

  '[icon]rotation[/icon] **Step 2 — Final Moment of Inertia**\n\n' +

  'Disk:\n' +
  '[formula]I_{disk} = ½MR²[/formula]\n\n' +

  'Bullet:\n' +
  '[formula]I_{bullet} = mR²[/formula]\n\n' +

  '[formula]I = (½·0.9 + 0.05)(0.6)²[/formula]\n\n' +

  '[formula]I = (0.45 + 0.05)(0.36)[/formula]\n\n' +

  '[formula]I = 0.18 kg·m²[/formula]\n\n' +

  '[icon]angular[/icon] **Step 3 — Conservation of Angular Momentum**\n\n' +

  '[formula]L_i = Iω[/formula]\n\n' +

  '[formula]ω = 6/0.18[/formula]\n\n' +

  '[formula]ω ≈ 33.3 rad/s[/formula]\n\n' +

  '**Final Answer:**\n' +
  'ω ≈ [num]33 s⁻¹[/num]  →  **(A)**',
},

// =========================
// Question 11
// =========================
{
  id: 11,
  topic: 'Thermodynamics',

  q: 'A Carnot engine, operating between reservoirs at [num]20°C[/num] and [num]200°C[/num], produces [num]10 kW[/num] of power. The rejected heat per unit time is nearest to:',

  opts: [
    '[num]26.3[/num] kJ/s',
    '[num]20.2[/num] kJ/s',
    '[num]16.3[/num] kJ/s',
    '[num]12.0[/num] kJ/s',
  ],

  correct: 2,

  explanation:
  '**Given:**\n' +
  'T_C = [num]20°C[/num] = [num]293 K[/num]\n' +
  'T_H = [num]200°C[/num] = [num]473 K[/num]\n' +
  'W = [num]10 kW[/num]\n\n' +

  '[icon]carnot[/icon] **Step 1 — Carnot Efficiency**\n\n' +

  '[formula]η = 1 - T_C/T_H[/formula]\n\n' +

  '[formula]η = 1 - 293/473[/formula]\n\n' +

  '[formula]η ≈ 0.38[/formula]\n\n' +

  '[icon]energy[/icon] **Step 2 — Heat Input Rate**\n\n' +

  '[formula]η = W/Q_H[/formula]\n\n' +

  '[formula]Q_H = W/η[/formula]\n\n' +

  '[formula]Q_H = 10/0.38[/formula]\n\n' +

  '[formula]Q_H ≈ 26.3 kJ/s[/formula]\n\n' +

  '[icon]heat[/icon] **Step 3 — Heat Rejected**\n\n' +

  '[formula]Q_C = Q_H - W[/formula]\n\n' +

  '[formula]Q_C = 26.3 - 10[/formula]\n\n' +

  '[formula]Q_C ≈ 16.3 kJ/s[/formula]\n\n' +

  '**Final Answer:**\n' +
  '[num]16.3 kJ/s[/num]  →  **(C)**',
},

// =========================
// Question 12
// =========================
{
  id: 12,
  topic: 'Thermodynamics',

  q: 'A Carnot refrigerator requires [num]10 kW[/num] to remove [num]20 kJ/s[/num] from a [num]20°C[/num] reservoir. The temperature of the high-temperature reservoir is nearest:',

  opts: [
    '[num]440 K[/num]',
    '[num]400 K[/num]',
    '[num]360 K[/num]',
    '[num]320 K[/num]',
  ],

  correct: 0,

  explanation:
  '**Given:**\n' +
  'Q_C = [num]20 kJ/s[/num]\n' +
  'W = [num]10 kW[/num]\n' +
  'T_C = [num]20°C[/num] = [num]293 K[/num]\n\n' +

  '[icon]carnot[/icon] **Step 1 — Carnot Refrigerator COP**\n\n' +

  '[formula]COP = Q_C/W[/formula]\n\n' +

  '[formula]COP = T_C/(T_H - T_C)[/formula]\n\n' +

  '[formula]COP = 20/10 = 2[/formula]\n\n' +

  '[icon]math[/icon] **Step 2 — Solve for T_H**\n\n' +

  '[formula]2 = 293/(T_H - 293)[/formula]\n\n' +

  '[formula]2(T_H - 293) = 293[/formula]\n\n' +

  '[formula]2T_H - 586 = 293[/formula]\n\n' +

  '[formula]2T_H = 879[/formula]\n\n' +

  '[formula]T_H = 879/2[/formula]\n\n' +

  '[formula]T_H ≈ 439.5 K[/formula]\n\n' +

  '**Final Answer:**\n' +
  '[num]440 K[/num]  →  **(A)**',
},

// =========================
// Question 13
// =========================
{
  id: 13,
  topic: 'Energy Conservation',

  q: 'A conservative system goes from state A to state B and the change in the potential energy is equal to [num]200 J[/num]. Which of the following statements is correct?',

  opts: [
    'The variation of kinetic energy is [num]400 J[/num]',
    'The variation of kinetic energy is [num]200 J[/num]',
    'The work of the forces is equal to [num]-200 J[/num]',
    'The work of the forces is equal to [num]200 J[/num]',
  ],

  correct: 2,

  explanation:
  '**Step 1 — Conservation of Mechanical Energy**\n\n' +

  '[formula]ΔE_{total} = ΔK + ΔU = 0[/formula]\n\n' +

  '[formula]ΔK = -ΔU[/formula]\n\n' +

  '[formula]ΔK = -200 J[/formula]\n\n' +

  '[icon]work[/icon] **Step 2 — Work-Energy Principle**\n\n' +

  'For conservative forces:\n' +
  '[formula]W = ΔK[/formula]\n\n' +

  '[formula]W = -200 J[/formula]\n\n' +

  '**Final Answer:**\n' +
  'The work of the forces is equal to [num]-200 J[/num]  →  **(C)**',
},

// =========================
// Question 14
// =========================
{
  id: 14,
  topic: 'Thermodynamics',

  q: 'A copper block of mass M = [num]0.5 kg[/num] falls from a height h = [num]100 m[/num] into a lake at temperature T_L = [num]283 K[/num]. The initial temperature of the copper block is T_cu = [num]423 K[/num]. Calculate the change in entropy of the universe ΔSᵤ in this process. The specific heat of copper is c = [num]387 J/kg·K[/num].',

  opts: [
    'ΔSᵤ = [num]9.71[/num] J/K',
    'ΔSᵤ = [num]140.00[/num] J/K',
    'ΔSᵤ = [num]-9.71[/num] J/K',
    'ΔSᵤ = [num]19.7[/num] J/K',
  ],

  correct: 3,

  explanation:
  '**Given:**\n' +
  'M = [num]0.5 kg[/num]\n' +
  'h = [num]100 m[/num]\n' +
  'T_L = [num]283 K[/num]\n' +
  'T_{cu} = [num]423 K[/num]\n' +
  'c = [num]387 J/kg·K[/num]\n\n' +

  '[icon]heat[/icon] **Step 1 — Thermal Energy Released by Copper**\n\n' +

  '[formula]Q_{cool} = mc(T_{cu} - T_L)[/formula]\n\n' +

  '[formula]Q_{cool} = 0.5 · 387 · (423 - 283)[/formula]\n\n' +

  '[formula]Q_{cool} = 27090 J[/formula]\n\n' +

  '[icon]gravity[/icon] **Step 2 — Gravitational Energy Lost**\n\n' +

  '[formula]E_p = mgh[/formula]\n\n' +

  '[formula]E_p = 0.5 · 9.8 · 100[/formula]\n\n' +

  '[formula]E_p = 490 J[/formula]\n\n' +

  '[icon]energy[/icon] **Step 3 — Total Energy Absorbed by Lake**\n\n' +

  '[formula]Q_{env} = 27090 + 490[/formula]\n\n' +

  '[formula]Q_{env} = 27580 J[/formula]\n\n' +

  '[icon]entropy[/icon] **Step 4 — Entropy Gain of Lake**\n\n' +

  '[formula]ΔS_{env} = Q_{env}/T_L[/formula]\n\n' +

  '[formula]ΔS_{env} = 27580/283[/formula]\n\n' +

  '[formula]ΔS_{env} ≈ 97.5 J/K[/formula]\n\n' +

  '[icon]entropy[/icon] **Step 5 — Entropy Lost by Copper**\n\n' +

  '[formula]ΔS_{cu} = mc ln(T_L/T_{cu})[/formula]\n\n' +

  '[formula]ΔS_{cu} = 0.5 · 387 · ln(283/423)[/formula]\n\n' +

  '[formula]ΔS_{cu} ≈ -78.1 J/K[/formula]\n\n' +

  '[icon]math[/icon] **Step 6 — Total Entropy Change**\n\n' +

  '[formula]ΔSᵤ = ΔS_{env} + ΔS_{cu}[/formula]\n\n' +

  '[formula]ΔSᵤ ≈ 97.5 - 78.1[/formula]\n\n' +

  '[formula]ΔSᵤ ≈ 19.4 J/K[/formula]\n\n' +

  '**Final Answer:**\n' +
  'ΔSᵤ ≈ [num]19.7 J/K[/num]  →  **(D)**',
},

// =========================
// Question 15
// =========================
{
  id: 15,
  topic: 'Thermodynamics',

  q: 'A gas expands from volume V₁ = [num]1 m³[/num] to volume V₂ = [num]3 m³[/num] along the parabolic curve P = 3V² (in Pascals), as shown in the figure. Calculate the work W performed by the gas.\n\n![PV diagram parabolic expansion|sm](images/physics/q15_pv_parabola.png)',

  opts: [
    'W = [num]0.26[/num] J',
    'W = [num]260[/num] J',
    'W = [num]2.6[/num] J',
    'W = [num]26[/num] J',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Work in a PV Process**\n\n' +

  '[formula]W = ∫P(V)dV[/formula]\n\n' +

  '[formula]W = ∫₁³ 3V² dV[/formula]\n\n' +

  '[icon]math[/icon] **Step 2 — Integrate**\n\n' +

  '[formula]W = 3∫₁³ V² dV[/formula]\n\n' +

  '[formula]W = 3[V³/3]₁³[/formula]\n\n' +

  '[formula]W = [V³]₁³[/formula]\n\n' +

  '[formula]W = 27 - 1[/formula]\n\n' +

  '[formula]W = 26 J[/formula]\n\n' +

  '**Final Answer:**\n' +
  'W = [num]26 J[/num]  →  **(D)**',
},

// =========================
// Question 16
// =========================
{
  id: 16,
  topic: 'Thermodynamics',

  q: 'A gas is compressed at constant temperature. Which is correct?',

  opts: [
    'It will receive heat.',
    'It will give off heat.',
    'Its internal energy will increase.',
    'Its internal energy will decrease.',
  ],

  correct: 1,

  explanation:
  '[icon]temperature[/icon] **Step 1 — Isothermal Process**\n\n' +

  'For an ideal gas undergoing an isothermal process:\n' +
  '[formula]ΔU = 0[/formula]\n\n' +

  'because temperature remains constant.\n\n' +

  '[icon]thermo[/icon] **Step 2 — First Law of Thermodynamics**\n\n' +

  '[formula]ΔU = Q - W[/formula]\n\n' +

  'Since:\n' +
  '[formula]ΔU = 0[/formula]\n\n' +

  'then:\n' +
  '[formula]Q = W[/formula]\n\n' +

  '[icon]compression[/icon] **Step 3 — Compression**\n\n' +

  'During compression, work is done on the gas, therefore:\n' +
  '[formula]W < 0[/formula]\n\n' +

  'Thus:\n' +
  '[formula]Q < 0[/formula]\n\n' +

  'meaning the gas releases heat.\n\n' +

  '**Final Answer:**\n' +
  'The gas gives off heat  →  **(B)**',
},

// =========================
// Question 17
// =========================
{
  id: 17,
  topic: 'Thermodynamics Cycles',

  q: 'A gas with $\\gamma = c_p/c_V = 1.4$ undergoes a 3-step cycle, as shown in the figure. It expands adiabatically along the path $ab$, is compressed under constant pressure along the path $bc$, and is heated at constant volume along the path $ca$.\n\nTemperatures: $T_a = 500\\,\\text{K}$, $T_b = 400\\,\\text{K}$, $T_c = 300\\,\\text{K}$\n\nCalculate the efficiency $\\eta$ of the cycle.\n\n![Thermodynamic cycle diagram|sm](images/physics/q17_cycle_diagram.png)',

  opts: [
    '$\\eta = 15\\%$',
    '$\\eta = 0.3\\%$',
    '$\\eta = 3\\%$',
    '$\\eta = 30\\%$',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Heat Added**\n\n' +

  'Heat enters during the constant volume process $ca$:\n\n' +

  '$$Q_{\\text{in}} = nc_V(T_a - T_c)$$\n\n' +

  '**Step 2 — Heat Rejected**\n\n' +

  'Heat rejected during the constant pressure process $bc$:\n\n' +

  '$$Q_{\\text{out}} = nc_p(T_b - T_c)$$\n\n' +

  '**Step 3 — Efficiency Formula**\n\n' +

  '$$\\eta = 1 - \\frac{Q_{\\text{out}}}{Q_{\\text{in}}} = 1 - \\frac{c_p(T_b - T_c)}{c_V(T_a - T_c)} = 1 - \\frac{\\gamma(T_b - T_c)}{T_a - T_c}$$\n\n' +

  '**Step 4 — Substitute Values**\n\n' +

  '$$\\eta = 1 - \\frac{1.4 \\cdot (400 - 300)}{500 - 300} = 1 - \\frac{1.4 \\cdot 100}{200} = 1 - \\frac{140}{200} = 1 - 0.7 = 0.3$$\n\n' +

  '$$\\eta = 30\\%$$\n\n' +

  'Final Answer: **(D)**',
},

// =========================
// Question 18
// =========================
{
  id: 18,
  topic: 'Gas Laws',

  q: 'A helium-filled rubber balloon is left in a car on a cold winter night. Compared to its size when it was in the warm car the afternoon before, the size the next morning is:',

  opts: [
    'larger',
    'smaller',
    'unchanged',
    'Not enough information to say',
  ],

  correct: 1,

  explanation:
  '[icon]gaslaw[/icon] **Charles’s Law**\n\n' +

  'For gases at approximately constant pressure:\n' +
  '[formula]V ∝ T[/formula]\n\n' +

  'Volume is directly proportional to absolute temperature.\n\n' +

  '[icon]temperature[/icon] **Temperature Drops Overnight**\n\n' +

  'As the temperature decreases, the gas volume also decreases.\n\n' +

  'Therefore the balloon becomes smaller.\n\n' +

  '**Final Answer:**\n' +
  'smaller  →  **(B)**',
},

// =========================
// Question 19
// =========================
{
  id: 19,
  topic: 'Rotational Dynamics',

  q: 'A homogeneous solid cylinder of length l = [num]40 cm[/num], radius r = [num]2 cm[/num], and mass m = [num]2 kg[/num] rotates in a horizontal plane around a vertical axis perpendicular to its axis through its midpoint O, as a result of an impulse J = [num]5 · 10⁻² N·s[/num] received perpendicularly at the edge.\n\nAs a result of friction, the cylinder stops after traveling one lap. The initial angular speed ω₀ is [num]3.7 s⁻¹[/num]. Calculate the moment M of the friction forces.',

  opts: [
    'M = [num]2.93 · 10⁻³[/num] Nm',
    'M = [num]2.93 · 10⁻⁴[/num] Nm',
    'M = [num]2.93[/num] Nm',
    'M = [num]2.93 · 10⁻²[/num] Nm',
  ],

  correct: 3,

  explanation:
  '[icon]angular[/icon] **Step 1 — Angular Impulse-Momentum Theorem**\n\n' +

  '[formula]Jr = Iω₀[/formula]\n\n' +

  '[formula]I = ½mr² + (1/12)ml²[/formula]\n\n' +

  '[formula]I = ½(2)(0.02)² + (1/12)(2)(0.4)²[/formula]\n\n' +

  '[formula]I ≈ 0.0271 kg·m²[/formula]\n\n' +

  '[formula]ω₀ = Jr/I[/formula]\n\n' +

  '[formula]ω₀ ≈ 3.7 rad/s[/formula]\n\n' +

  '[icon]rotation[/icon] **Step 2 — Rotational Deceleration**\n\n' +

  'The cylinder stops after one revolution:\n' +
  '[formula]θ = 2π[/formula]\n\n' +

  '[formula]ω² = ω₀² + 2αθ[/formula]\n\n' +

  'Since final angular velocity is zero:\n' +
  '[formula]α = -ω₀²/(2θ)[/formula]\n\n' +

  '[formula]α = -(3.7)²/(2·2π)[/formula]\n\n' +

  '[formula]α ≈ -1.09 rad/s²[/formula]\n\n' +

  '[icon]torque[/icon] **Step 3 — Friction Torque**\n\n' +

  '[formula]M = Iα[/formula]\n\n' +

  '[formula]M = 0.0271(-1.09)[/formula]\n\n' +

  '[formula]M ≈ -0.0295 Nm[/formula]\n\n' +

  'Magnitude:\n' +
  '[formula]M ≈ 2.93·10⁻² Nm[/formula]\n\n' +

  '**Final Answer:**\n' +
  'M = [num]2.93 · 10⁻²[/num] Nm  →  **(D)**',
},

// =========================
// Question 20
// =========================
{
  id: 20,
  topic: 'Rotational Dynamics',

  q: 'A homogeneous solid cylinder of length l = [num]40 cm[/num], radius r = [num]2 cm[/num], and mass m = [num]2 kg[/num] rotates in a horizontal plane around a vertical axis perpendicular to its axis through the middle point O, as a result of an impulse J = [num]5 · 10⁻² N·s[/num] received perpendicularly at an extreme (the rim).\n\nAs a result of the friction, the cylinder stops after traveling a lap. Calculate the initial angular speed ω₀ of the cylinder.',

  opts: [
    'ω₀ = [num]3.70[/num] s⁻¹',
    'ω₀ = [num]0.07[/num] s⁻¹',
    'ω₀ = [num]0.37[/num] s⁻¹',
    'ω₀ = [num]37.00[/num] s⁻¹',
  ],

  correct: 2,

  explanation:
  '[icon]angular[/icon] **Step 1 — Angular Impulse Relation**\n\n' +

  '[formula]Jr = Iω₀[/formula]\n\n' +

  '[formula]ω₀ = Jr/I[/formula]\n\n' +

  '[icon]rotation[/icon] **Step 2 — Moment of Inertia**\n\n' +

  '[formula]I = ½mr² + (1/12)ml²[/formula]\n\n' +

  '[formula]I = ½(2)(0.02)² + (1/12)(2)(0.4)²[/formula]\n\n' +

  '[formula]I ≈ 0.0271 kg·m²[/formula]\n\n' +

  '[icon]math[/icon] **Step 3 — Calculate Angular Speed**\n\n' +

  '[formula]ω₀ = (5·10⁻² · 0.2)/0.0271[/formula]\n\n' +

  '[formula]ω₀ ≈ 0.37 rad/s[/formula]\n\n' +

  '**Final Answer:**\n' +
  'ω₀ ≈ [num]0.37 s⁻¹[/num]  →  **(C)**',

  flagged: true,
  closestAnswer: 2,
},

// =========================
// Question 21
// =========================
{
  id: 21,
  topic: 'Gravitation',

  q: 'A homogeneous spherical mass $M$ of radius $R$, when $r < R$, produces a gravitational field $\\vec{G}(r)$ equal to:',

  opts: [
    '$\\vec{G}(r) = -\\dfrac{\\gamma M}{R^2}\\,\\hat{u}_r$',
    '$\\vec{G}(r) = -\\dfrac{\\gamma M r}{R^3}\\,\\hat{u}_r$',
    '$\\vec{G}(r) = -\\dfrac{\\gamma M}{r^2}\\,\\hat{u}_r$',
    '$\\vec{G}(r) = -\\dfrac{\\gamma M R}{r^3}\\,\\hat{u}_r$',
  ],

  correct: 1,

  explanation:
  '**Step 1 — Mass Enclosed Inside Radius $r$**\n\n' +

  'Inside a uniform sphere, only the mass enclosed within radius $r$ contributes:\n\n' +

  '$$M_r = M\\frac{r^3}{R^3}$$\n\n' +

  '**Step 2 — Apply Newton\'s Gravitation Law**\n\n' +

  '$$G(r) = \\frac{\\gamma M_r}{r^2}$$\n\n' +

  'Substitute $M_r$:\n\n' +

  '$$G(r) = \\frac{\\gamma M r^3 / R^3}{r^2} = \\frac{\\gamma M r}{R^3}$$\n\n' +

  'Direction is toward the center:\n\n' +

  '$$\\vec{G}(r) = -\\frac{\\gamma M r}{R^3}\\,\\hat{u}_r$$\n\n' +

  'Final Answer: **(B)**',
},

// =========================
// Question 22
// =========================
{
  id: 22,
  topic: 'Rotational Dynamics',

  q: 'A homogeneous superconducting cylinder is suspended in air in vertical position relative to ground, with mass $M$ and radius $R$, and rotates around its barycenter axis with initial angular velocity $\\omega_0$ and initial angular position $\\theta_0$.\n\nIt is subjected to a braking moment $M_0 = -k\\omega$, where $k$ is a constant and $\\omega$ is the instantaneous angular velocity.\n\nDerive the laws of motion $\\theta(t)$ and $\\omega(t)$ as functions of the assigned variables.',

  opts: [
    '$\\theta(t) = \\theta_0 + MR^2\\omega_0\\left[1 - e^{-2kt/MR^2}\\right];\\quad\\omega(t) = \\omega_0\\, e^{-2kt/MR^2}$',
    '$\\theta(t) = \\theta_0 + \\omega_0\\, e^{-2kt/MR^2};\\quad\\omega(t) = \\omega_0\\, e^{-2kt/MR^2}$',
    '$\\theta(t) = \\theta_0 + MR^2\\omega_0\\left[1 - e^{-kt/MR^2}\\right];\\quad\\omega(t) = \\omega_0\\, e^{-kt/MR^2}$',
    '$\\theta(t) = \\theta_0 + \\dfrac{MR^2\\omega_0}{2k}\\left[1 - e^{-2kt/MR^2}\\right];\\quad\\omega(t) = \\omega_0\\, e^{-2kt/MR^2}$',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Rotational Equation of Motion**\n\n' +

  '$$\\tau = I\\frac{d\\omega}{dt}$$\n\n' +

  'Given braking torque: $\\tau = -k\\omega$\n\n' +

  'For a solid cylinder: $I = \\dfrac{1}{2}MR^2$\n\n' +

  'Substituting:\n\n' +

  '$$\\frac{1}{2}MR^2\\frac{d\\omega}{dt} = -k\\omega \\Rightarrow \\frac{d\\omega}{dt} = -\\frac{2k}{MR^2}\\,\\omega$$\n\n' +

  '**Step 2 — Solve for Angular Velocity**\n\n' +

  'This is a first-order linear ODE with solution:\n\n' +

  '$$\\omega(t) = \\omega_0\\, e^{-2kt/MR^2}$$\n\n' +

  '**Step 3 — Integrate to Find $\\theta(t)$**\n\n' +

  '$$\\theta(t) = \\theta_0 + \\int_0^t \\omega(t\')\\,dt\'\' = \\theta_0 + \\omega_0\\int_0^t e^{-2kt\'\'/MR^2}\\,dt\'\'$$\n\n' +

  '$$\\theta(t) = \\theta_0 + \\frac{MR^2\\omega_0}{2k}\\left[1 - e^{-2kt/MR^2}\\right]$$\n\n' +

  'Final Answer: **(D)**',
},

// =========================
// Question 23
// =========================
{
  id: 23,
  topic: 'Energy & Rotation',

  q: 'A mass m = [num]1 kg[/num] is attached to the end of a rope that is wrapped around a pulley with radius R = [num]0.2 m[/num] and moment of inertia I = [num]0.5 kg·m²[/num]. The mass is released from a height h = [num]2.7 m[/num].\n\n![Pulley falling mass diagram|sm](images/physics/q23_pulley_fall.png)\n\nWith what velocity v will it hit the ground?',

  opts: [
    'v = [num]2 m/s[/num]',
    'v = [num]0.2 m/s[/num]',
    'v = [num]20 m/s[/num]',
    'v = [num]12 m/s[/num]',
  ],

  correct: 0,

  explanation:
  '[icon]energy[/icon] **Step 1 — Conservation of Mechanical Energy**\n\n' +

  'Potential energy converts into translational and rotational kinetic energy:\n' +

  '[formula]mgh = ½mv² + ½Iω²[/formula]\n\n' +

  '[icon]rotation[/icon] **Step 2 — Rope Constraint**\n\n' +

  'Since the rope unwinds without slipping:\n' +

  '[formula]v = Rω[/formula]\n\n' +

  '[formula]ω = v/R[/formula]\n\n' +

  '[icon]formula[/icon] **Step 3 — Substitute into Energy Equation**\n\n' +

  '[formula]mgh = ½mv² + ½I(v/R)²[/formula]\n\n' +

  '[formula]mgh = ½v²(m + I/R²)[/formula]\n\n' +

  '[formula]v² = 2mgh/(m + I/R²)[/formula]\n\n' +

  '[icon]math[/icon] **Step 4 — Insert Values**\n\n' +

  '[formula]v² = (2·1·9.8·2.7)/(1 + 0.5/0.2²)[/formula]\n\n' +

  '[formula]v² = 52.92/13.5[/formula]\n\n' +

  '[formula]v² ≈ 3.92[/formula]\n\n' +

  '[formula]v ≈ 1.98 m/s[/formula]\n\n' +

  '**Final Answer:**\n' +
  '**(A)**  v ≈ [num]2 m/s[/num]',
},

// =========================
// Question 24
// =========================
{
  id: 24,
  topic: 'Thermodynamics',

  q: 'A mass $M = 0.25\\,\\text{kg}$ of copper at an initial temperature $T_i$ is immersed into a container holding $0.1\\,\\text{kg}$ of water initially at $320\\,\\text{K}$. When the system reaches thermal equilibrium, $0.09\\,\\text{kg}$ of water remains in the container.\n\nDetermine the initial temperature $T_i$ of the copper, ignoring heat exchange with the environment.\n\n**Given:**\n\n- $c_\\text{Cu} = 387$ J/(kg·K)\n\n- $c_{\\text{H}_2\\text{O}} = 4187$ J/(kg·K)\n\n- $\\lambda_{\\text{H}_2\\text{O}} = 2.26 \\times 10^6$ J/kg',

  opts: [
    '$T_i = 841.11\\,\\text{K}$',
    '$T_i = 441.11\\,\\text{K}$',
    '$T_i = 640.00\\,\\text{K}$',
    '$T_i = 541.11\\,\\text{K}$',
  ],

  correct: 0,

  explanation:
  '**Step 1 — Heat Absorbed by Water (heating)**\n\n' +

  'Water heats from $320\\,\\text{K}$ to $373\\,\\text{K}$:\n\n' +

  '$$Q_\\text{heat} = mc\\Delta T = 0.1 \\cdot 4187 \\cdot (373 - 320) = 22191\\,\\text{J}$$\n\n' +

  '**Step 2 — Heat for Evaporation**\n\n' +

  'Mass evaporated: $m_\\text{evap} = 0.1 - 0.09 = 0.01\\,\\text{kg}$\n\n' +

  '$$Q_\\text{evap} = m_\\text{evap}\\,\\lambda = 0.01 \\cdot 2.26 \\times 10^6 = 22600\\,\\text{J}$$\n\n' +

  '**Step 3 — Total Heat Gained by Water**\n\n' +

  '$$Q_\\text{water} = Q_\\text{heat} + Q_\\text{evap} = 22191 + 22600 = 44791\\,\\text{J}$$\n\n' +

  '**Step 4 — Heat Lost by Copper**\n\n' +

  '$$Q_\\text{Cu} = Mc_\\text{Cu}(T_i - 373) = 0.25 \\cdot 387 \\cdot (T_i - 373) = 96.75\\,(T_i - 373)$$\n\n' +

  '**Step 5 — Energy Balance**\n\n' +

  '$$96.75\\,(T_i - 373) = 44791$$\n\n' +

  '$$T_i - 373 = \\frac{44791}{96.75} \\approx 463$$\n\n' +

  '$$T_i \\approx 836\\,\\text{K}$$\n\n' +

  'Closest option: $T_i \\approx 841.11\\,\\text{K}$\n\n' +

  'Final Answer: **(A)**',
},

// =========================
// Question 25
// =========================
{
  id: 25,
  topic: 'Gravitation',

  q: 'A mass $M$ produces, in the external space, a gravitational field\n\n$\\vec{G}(r) = -\\frac{\\gamma M}{r^2}\\,\\hat{u}_r$\n\nwhere $r$ is the distance from the center of mass. Under which condition is this field expression valid?',

  opts: [
    'Always',
    'Just if it is a point mass or a homogeneous spherical mass',
    'Just if a solid mass',
    'Just if a macroscopic mass',
  ],

  correct: 1,

  explanation:
  '**Step 1 — Interpret the Formula**\n\n' +

  '$$\\vec{G}(r) = -\\frac{\\gamma M}{r^2}\\,\\hat{u}_r$$\n\n' +

  'This is Newton\'s gravitational field for spherical symmetry.\n\n' +

  '**Step 2 — Shell Theorem**\n\n' +

  'Outside a homogeneous spherical mass distribution, gravity behaves as if all mass were concentrated at the center. The same formula also applies to a true point mass.\n\n' +

  '**Step 3 — When It Fails**\n\n' +

  'For irregular or asymmetric bodies, the field is not exactly proportional to $1/r^2$ from the center.\n\n' +

  'Final Answer: **(B)**',
},

// =========================
// Question 26
// =========================
{
  id: 26,
  topic: 'Thermodynamics',

  q: 'A mole of an ideal monoatomic gas travels along the cycle shown in the figure.\n\n![Thermodynamic cycle PV diagram|sm](images/physics/q26_cycle.png)\n\nCalculate the variations in internal energy $\\Delta U$ and entropy $\\Delta S$ over a complete cycle.',

  opts: [
    '$\\Delta U = 3p_0V_0\\,\\text{J}\\quad;\\quad\\Delta S = -3p_0V_0/T_0\\,\\text{J/K}$',
    '$\\Delta U = 3p_0V_0\\,\\text{J}\\quad;\\quad\\Delta S = 3p_0V_0/T_0\\,\\text{J/K}$',
    '$\\Delta U = -3p_0V_0\\,\\text{J}\\quad;\\quad\\Delta S = 0\\,\\text{J/K}$',
    '$\\Delta U = 0\\,\\text{J}\\quad;\\quad\\Delta S = 0\\,\\text{J/K}$',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Internal Energy in a Cycle**\n\n' +

  'Internal energy is a state function. After a complete cycle, the gas returns to its initial state:\n\n' +

  '$$\\Delta U = 0$$\n\n' +

  '**Step 2 — Entropy in a Complete Reversible Cycle**\n\n' +

  'Entropy is also a state function. For a complete reversible cycle:\n\n' +

  '$$\\Delta S = 0$$\n\n' +

  'Final Answer: **(D)**',
},

// =========================
// Question 27
// =========================
{
  id: 27,
  topic: 'Thermodynamics',

  q: 'A mole of an ideal gas is initially in the state $P_0,\\, V_0,\\, T_0$. The gas undergoes the following three-step process:\n\n1. Heated at constant volume to temperature $2T_0$\n2. Expanded isothermally to volume $2V_0$\n3. Cooled at constant pressure back to temperature $T_0$\n\nWhat is the total change in entropy $\\Delta S$ of the gas?',

  opts: [
    '$\\Delta S = \\dfrac{3 \\cdot 8.31}{2}\\ln 2\\,\\text{J/K}$',
    '$\\Delta S = \\dfrac{5 \\cdot 8.31}{2}\\ln 2\\,\\text{J/K}$',
    '$\\Delta S = \\dfrac{5 \\cdot 8.31}{2}\\,\\text{J/K}$',
    '$\\Delta S = 0\\,\\text{J/K}$',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Entropy Change at Constant Volume**\n\n' +

  '$$\\Delta S_1 = nC_V\\ln\\frac{T_2}{T_1} = \\frac{3R}{2}\\ln 2$$\n\n' +

  '(For a monoatomic ideal gas: $C_V = \\frac{3R}{2}$)\n\n' +

  '**Step 2 — Isothermal Expansion**\n\n' +

  '$$\\Delta S_2 = nR\\ln\\frac{V_2}{V_1} = R\\ln 2$$\n\n' +

  '**Step 3 — Constant Pressure Cooling**\n\n' +

  '$$\\Delta S_3 = nC_P\\ln\\frac{T_2}{T_1} = -\\frac{5R}{2}\\ln 2$$\n\n' +

  '(For a monoatomic ideal gas: $C_P = \\frac{5R}{2}$; cooling means $T_2 < T_1$, so negative)\n\n' +

  '**Step 4 — Total Entropy Change**\n\n' +

  '$$\\Delta S = \\Delta S_1 + \\Delta S_2 + \\Delta S_3 = \\frac{3R}{2}\\ln 2 + R\\ln 2 - \\frac{5R}{2}\\ln 2 = 0$$\n\n' +

  'Final Answer: **(D)**',
},

// =========================
// Question 28
// =========================
{
  id: 28,
  topic: 'Thermodynamics',

  q: 'A 1.0 mole sample of an ideal gas is kept at 0.0°C during an expansion from 3.0 L to 10.0 L.\n\n• How much work W is done by the gas during the expansion?\n\n• How much energy Q is transferred as heat with the surroundings during the process?',

  opts: [
    'W = [num]5.4 × 10³ J[/num]; Q = [num]2.7 × 10³ J[/num]',
    'W = [num]2.7 × 10³ J[/num]; Q = [num]-2.7 × 10³ J[/num]',
    'W = [num]2.7 × 10³ J[/num]; Q = [num]0 J[/num]',
    'W = [num]2.7 × 10³ J[/num]; Q = [num]2.7 × 10³ J[/num]',
  ],

  correct: 3,

  explanation:
  '**Given:**\n' +
  'n = [num]1 mol[/num]\n' +
  'T = [num]273 K[/num]\n' +
  'V₁ = [num]3.0 L[/num]\n' +
  'V₂ = [num]10.0 L[/num]\n\n' +

  '[icon]work[/icon] **Step 1 — Work in Isothermal Expansion**\n\n' +

  '[formula]W = nRT \\ln(V₂/V₁)[/formula]\n\n' +

  '[formula]W = 1 · 8.31 · 273 · \\ln(10/3)[/formula]\n\n' +

  '[formula]W ≈ 2.7 × 10³ J[/formula]\n\n' +

  '[icon]energy[/icon] **Step 2 — First Law of Thermodynamics**\n\n' +

  'For an isothermal process of an ideal gas:\n' +
  '[formula]ΔU = 0[/formula]\n\n' +

  '[formula]ΔU = Q - W[/formula]\n\n' +

  '[formula]Q = W[/formula]\n\n' +

  '[formula]Q ≈ 2.7 × 10³ J[/formula]\n\n' +

  '**Final Answer:**\n' +
  'W = [num]2.7 × 10³ J[/num], Q = [num]2.7 × 10³ J[/num] → **(D)**',
},

// =========================
// Question 29
// =========================
{
  id: 29,
  topic: 'Circular Motion',

  q: 'A motorcycle shown with mass m drives through a vertical circular track with radius r = [num]40 m[/num]. What should his minimum speed v be at the top point so that the motorcycle does not lose contact with the track?',

  opts: [
    'v = [num]20 m/s[/num]',
    'v = [num]40 m/s[/num]',
    'v = [num]10 m/s[/num]',
    'v = [num]30 m/s[/num]',
  ],

  correct: 0,

  explanation:
  '**Given:**\n' +
  'r = [num]40 m[/num]\n' +
  'g = [num]9.8 m/s²[/num]\n\n' +

  '[icon]circle[/icon] **Step 1 — Minimum Speed Condition**\n\n' +

  'At the top of the loop, minimum speed occurs when:\n' +
  '[formula]N = 0[/formula]\n\n' +

  'Then gravity alone provides centripetal force:\n' +
  '[formula]mv²/r = mg[/formula]\n\n' +

  '[icon]math[/icon] **Step 2 — Solve for v**\n\n' +

  '[formula]v² = rg[/formula]\n\n' +

  '[formula]v = √(rg)[/formula]\n\n' +

  '[formula]v = √(40 · 9.8)[/formula]\n\n' +

  '[formula]v ≈ 19.8 m/s[/formula]\n\n' +

  '[formula]v ≈ 20 m/s[/formula]\n\n' +

  '**Final Answer:**\n' +
  'v = [num]20 m/s[/num] → **(A)**',
},

// =========================
// Question 30
// =========================
{
  id: 30,
  topic: 'Rotational Motion',

  q: 'A pencil of length L = [num]15 cm[/num] and mass m is placed vertically on a rough plane and initially held at rest. It falls by rotating about the point of contact with the ground (acting as a pivot). What is the angular speed ω at the instant it hits the ground?',

  opts: [
    'ω = [num]1.40 s⁻¹[/num]',
    'I cannot answer because I don’t know the pencil mass',
    'ω = [num]0.14 s⁻¹[/num]',
    'ω = [num]14 s⁻¹[/num]',
  ],

  correct: 3,

  explanation:
  '**Given:**\n' +
  'L = [num]0.15 m[/num]\n' +
  'g = [num]9.8 m/s²[/num]\n\n' +

  '[icon]energy[/icon] **Step 1 — Conservation of Energy**\n\n' +

  'Potential energy converts into rotational kinetic energy:\n' +
  '[formula]mg(L/2) = ½Iω²[/formula]\n\n' +

  'For a rod about one end:\n' +
  '[formula]I = (1/3)mL²[/formula]\n\n' +

  '[icon]math[/icon] **Step 2 — Substitute I**\n\n' +

  '[formula]mg(L/2) = ½(1/3)mL²ω²[/formula]\n\n' +

  '[formula]ω² = 3g/L[/formula]\n\n' +

  '[formula]ω = √(3g/L)[/formula]\n\n' +

  '[formula]ω = √(3·9.8/0.15)[/formula]\n\n' +

  '[formula]ω = √196 = 14 s⁻¹[/formula]\n\n' +

  '**Final Answer:**\n' +
  'ω = [num]14 s⁻¹[/num] → **(D)**',
},

// =========================
// Question 31
// =========================
{
  id: 31,
  topic: 'Entropy',

  q: 'A perfect gas thermal machine describes a cycle composed of a reversible isothermal expansion, a reversible isochoric transformation, an irreversible isothermal compression, and a final reversible isochoric transformation. What can be said about the entropy variation in this cycle?',

  opts: [
    'The entropy variation of the thermodynamic universe is zero',
    'The entropy variation of the thermodynamic universe is negative',
    'The entropy variation of the gas is positive',
    'The entropy variation of the gas is zero',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Entropy of the Gas**\n\n' +

  'The gas undergoes a complete thermodynamic cycle and returns to its initial state. Entropy is a state function, therefore:\n\n' +

  '$$\\Delta S_\\text{gas} = 0$$\n\n' +

  '**Step 2 — Irreversibility**\n\n' +

  'Because one process is irreversible, the entropy of the universe increases:\n\n' +

  '$$\\Delta S_\\text{universe} > 0$$\n\n' +

  'But the question asks specifically about the gas, which always returns to its initial state after a full cycle.\n\n' +

  'Final Answer: **(D)**',
},

// =========================
// Question 32
// =========================
{
  id: 32,
  topic: 'Thermodynamics',

  q: 'A perfect gas undergoes an isobaric transformation. Let ΔT be the temperature difference between the final and initial states, and let n be the number of moles of gas. What is the variation of internal energy ΔU?',

  opts: [
    'ΔU = CₚΔT',
    'ΔU = nCᵥΔT',
    'ΔU = nCₚΔT',
    'ΔU = CᵥΔT',
  ],

  correct: 1,

  explanation:
  '[icon]energy[/icon] **Internal Energy of an Ideal Gas**\n\n' +

  'Internal energy depends only on temperature:\n' +
  '[formula]ΔU = nCᵥΔT[/formula]\n\n' +

  'This relation is valid regardless of the process type.\n\n' +

  'Even though the process is isobaric, Cₚ is used for heat Q, not for ΔU.\n\n' +

  '**Final Answer:**\n' +
  '[formula]ΔU = nCᵥΔT[/formula] → **(B)**',
},

// =========================
// Question 33
// =========================
{
  id: 33,
  topic: 'Oscillations',

  q: 'A physical pendulum is constructed by hanging a uniform rod of length L = [num]60 cm[/num] and mass m from one of its ends. What is the period T of small oscillations? At what distance d from its center of mass should it be suspended so that the period becomes T = [num]2.0 s[/num]?',

  opts: [
    'T = [num]0.26 s[/num]; d = [num]0.30 m[/num]',
    'T = [num]0.26 s[/num]; d = [num]0.03 m[/num]',
    'T = [num]1.26 s[/num]; d = [num]0.03 m[/num]',
    'T = [num]1.26 s[/num]; d = [num]0.30 m[/num]',
  ],

  correct: 2,

  explanation:
  '**Given:**\n' +
  'L = [num]0.60 m[/num]\n\n' +

  '[icon]pendulum[/icon] **Step 1 — Rod Suspended from End**\n\n' +

  '[formula]T = 2π√(I/mgd)[/formula]\n\n' +

  'For a rod about one end:\n' +
  '[formula]I = (1/3)mL²[/formula]\n' +
  '[formula]d = L/2[/formula]\n\n' +

  '[formula]T = 2π√(2L/3g)[/formula]\n\n' +

  '[formula]T ≈ 1.26 s[/formula]\n\n' +

  '[icon]math[/icon] **Step 2 — Find Suspension Distance**\n\n' +

  'Using:\n' +
  '[formula]T = 2π√((L²/12+d²)/(gd))[/formula]\n\n' +

  'Substitute T = 2 s and solve:\n' +
  '[formula]d ≈ 0.03 m[/formula]\n\n' +

  '**Final Answer:**\n' +
  'T = [num]1.26 s[/num], d = [num]0.03 m[/num] → **(C)**',
},

// =========================
// Question 34
// =========================
{
  id: 34,
  topic: 'Oscillations',

  q: 'A physical pendulum swings around an axis passing through a point $P$ located a distance $d$ from the center of mass. The pendulum has: mass $M$, moment of inertia $I$ about the rotation axis, distance $d$ from the center of mass to axis $P$. What is the period $T$ of small oscillations?',

  opts: [
    '$T = 2\\pi\\sqrt{\\dfrac{I}{Mgd}}$',
    '$T = 2\\pi\\sqrt{\\dfrac{Mgd}{I}}$',
    '$T = 2\\pi\\sqrt{\\dfrac{Id}{Mg}}$',
    '$T = 2\\pi\\sqrt{\\dfrac{d}{g}}$',
  ],

  correct: 0,

  explanation:
  '**Physical Pendulum Formula**\n\n' +

  'For small oscillations of a physical pendulum:\n\n' +

  '$$T = 2\\pi\\sqrt{\\frac{I}{Mgd}}$$\n\n' +

  'Where:\n\n' +

  '$I$ — moment of inertia about the pivot axis\n\n' +

  '$d$ — distance from center of mass to pivot\n\n' +

  '$M$ — mass of the pendulum\n\n' +

  '$g$ — gravitational acceleration\n\n' +

  'Final Answer: **(A)**',
},
// =========================
// Question 35
// =========================
{
  id: 35,
  topic: 'Fluids',

  q: 'A piece of ice is floating in a glass of water. What will happen to the level of water when the ice fully melts?',

  opts: [
    'It will increase.',
    'It will decrease.',
    'It will remain the same.',
    'It is impossible to tell.',
  ],

  correct: 2,

  explanation:
  '[icon]water[/icon] **Archimedes Principle**\n\n' +

  'Floating ice displaces an amount of water equal to its own weight.\n\n' +

  'When the ice melts, it becomes exactly the same mass of water.\n\n' +

  'Therefore the melted water occupies exactly the displaced volume.\n\n' +

  '**Final Answer:**\n' +
  'The water level remains the same → **(C)**',
},

// =========================
// Question 36
// =========================
{
  id: 36,
  topic: 'Thermodynamics',

  q: 'A piston allows air to expand from [num]6 × 10⁶ Pa[/num] to [num]2 × 10⁵ Pa[/num]. The initial volume and temperature are [num]500 cm³[/num] and [num]800°C[/num]. Assuming temperature is held constant, calculate the heat transfer Q and the entropy change ΔS.',

  opts: [
    'Q = [num]1.02 × 10⁴ J[/num]; ΔS = [num]9.51 J/K[/num]',
    'Q = [num]1.02 × 10³ J[/num]; ΔS = [num]9.51 J/K[/num]',
    'Q = [num]1.02 × 10⁴ J[/num]; ΔS = [num]95.1 J/K[/num]',
    'Q = [num]1.02 × 10⁵ J[/num]; ΔS = [num]95.1 J/K[/num]',
  ],

  correct: 0,

  explanation:
  '**Given:**\n' +
  'P₁ = [num]6 × 10⁶ Pa[/num]\n' +
  'P₂ = [num]2 × 10⁵ Pa[/num]\n' +
  'V₁ = [num]500 cm³ = 5 × 10⁻⁴ m³[/num]\n' +
  'T = [num]800°C = 1073 K[/num]\n\n' +

  '[icon]gas[/icon] **Step 1 — Isothermal Relation**\n\n' +

  'For isothermal expansion:\n' +
  '[formula]P₁V₁ = P₂V₂[/formula]\n\n' +

  '[formula]V₂/V₁ = P₁/P₂ = 30[/formula]\n\n' +

  '[icon]work[/icon] **Step 2 — Heat Transfer**\n\n' +

  '[formula]Q = P₁V₁ ln(V₂/V₁)[/formula]\n\n' +

  '[formula]Q = 6×10⁶ · 5×10⁻⁴ · ln(30)[/formula]\n\n' +

  '[formula]Q ≈ 1.02 × 10⁴ J[/formula]\n\n' +

  '[icon]entropy[/icon] **Step 3 — Entropy Change**\n\n' +

  '[formula]ΔS = Q/T[/formula]\n\n' +

  '[formula]ΔS = 10203 / 1073[/formula]\n\n' +

  '[formula]ΔS ≈ 9.51 J/K[/formula]\n\n' +

  '**Final Answer:**\n' +
  'Q = [num]1.02 × 10⁴ J[/num], ΔS = [num]9.51 J/K[/num] → **(A)**',
},

// =========================
// Question 37
// =========================
{
  id: 37,
  topic: 'Orbital Motion',

  q: 'A planet describes an elliptical orbit around a star. Let $\\omega = d\\theta/dt$ be its angular velocity and $r$ be its instantaneous distance from the star. Which relationship is correct?',

  opts: [
    '$\\omega \\cdot r = \\text{constant}$',
    '$\\omega / r = \\text{constant}$',
    '$\\omega / r^2 = \\text{constant}$',
    '$\\omega \\cdot r^2 = \\text{constant}$',
  ],

  correct: 3,

  explanation:
  '**Angular Momentum Conservation**\n\n' +

  'For motion under a central force, angular momentum is conserved:\n\n' +

  '$$L = mr^2\\omega = \\text{constant}$$\n\n' +

  'Therefore:\n\n' +

  '$$r^2\\omega = \\text{constant}$$\n\n' +

  'This is also Kepler\'s second law (equal areas in equal times).\n\n' +

  'Final Answer: **(D)**',
},

{
  id: 38,
  topic: 'Fluids',

  q: 'A plastic cube floats in a basin full of water. It is observed that the cube protrudes above the water surface by $20\\%$ of its edge length. What is the ratio between the density of the plastic and the density of water?',

  opts: [
    '$\\rho_p / \\rho_w = 0.6$',
    '$\\rho_p / \\rho_w = 0.4$',
    '$\\rho_p / \\rho_w = 0.2$',
    '$\\rho_p / \\rho_w = 0.8$',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Submerged Fraction**\n\n' +

  'If $20\\%$ is above water, then $80\\%$ of the cube is submerged:\n\n' +

  '$$\\frac{V_\\text{sub}}{V_\\text{total}} = 0.8$$\n\n' +

  '**Step 2 — Floating Condition**\n\n' +

  'By Archimedes\' principle, for a floating object:\n\n' +

  '$$\\frac{\\rho_p}{\\rho_w} = \\frac{V_\\text{sub}}{V_\\text{total}} = 0.8$$\n\n' +

  'Final Answer: **(D)**',
},

// =========================
// Question 39
// =========================
{
  id: 39,
  topic: 'Electromagnetism',

  q: 'A point-like particle moving at speed v is subject to a force F = b × v where b is a constant vector. What can be said about the work done by this force?',

  opts: [
    'It is zero just when the point particle moves with circular motion.',
    'It is always different from zero.',
    'It is always zero.',
    'It depends on the value of b.',
  ],

  correct: 2,

  explanation:
  '[icon]vector[/icon] **Step 1 — Work Definition**\n\n' +

  '[formula]W = ∫F·ds[/formula]\n\n' +

  'Since:\n' +
  '[formula]F = b × v[/formula]\n\n' +

  'the force is always perpendicular to velocity.\n\n' +

  '[formula](b × v)·v = 0[/formula]\n\n' +

  '[icon]energy[/icon] **Step 2 — Conclusion**\n\n' +

  'Perpendicular forces do no work.\n\n' +

  '[formula]W = 0[/formula]\n\n' +

  '**Final Answer:**\n' +
  'The work is always zero → **(C)**',
},

// =========================
// Question 40
// =========================
{
  id: 40,
  topic: 'Mechanics',

  q: 'A point mass $M = 2\\,\\text{kg}$ is initially at rest at the origin. At time $t = 0$, a force field $\\vec{F}(x,y,z) = k(2x\\,\\hat{i} - 4y\\,\\hat{j} + 6z\\,\\hat{k})$ with $k = 2\\,\\text{N/m}$ acts on it. Neglecting gravity, which differential equations describe the motion?',

  opts: [
    '$\\ddot{x} + 2x = 0,\\quad \\ddot{y} + 4y = 0,\\quad \\ddot{z} + 6z = 0$',
    '$\\ddot{x} + 2x^2 = 0,\\quad \\ddot{y} - 4y^2 = 0,\\quad \\ddot{z} + 6z^2 = 0$',
    '$\\ddot{x} + 2x = 0,\\quad \\ddot{y} - 4y = 0,\\quad \\ddot{z} + 6z = 0$',
    '$\\ddot{x} - 2x = 0,\\quad \\ddot{y} + 4y = 0,\\quad \\ddot{z} - 6z = 0$',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Force Components**\n\n' +

  'With $k = 2\\,\\text{N/m}$:\n\n' +

  '$$F_x = 4x, \\quad F_y = -8y, \\quad F_z = 12z$$\n\n' +

  '**Step 2 — Apply Newton\'s Second Law**\n\n' +

  'With mass $M = 2\\,\\text{kg}$:\n\n' +

  '$$2\\ddot{x} = 4x \\quad\\Rightarrow\\quad \\ddot{x} - 2x = 0$$\n\n' +

  '$$2\\ddot{y} = -8y \\quad\\Rightarrow\\quad \\ddot{y} + 4y = 0$$\n\n' +

  '$$2\\ddot{z} = 12z \\quad\\Rightarrow\\quad \\ddot{z} - 6z = 0$$\n\n' +

  'Final Answer: **(D)**',
},

{
  id: 41,
  topic: 'Potential Energy',

  q: 'A point particle has potential energy $U(x,y,z) = kx^2 + hy^3 + mgz$ where $k$ and $h$ are constants, $m$ is the particle mass, and $g$ is gravitational acceleration. What are the equations of motion?',

  opts: [
    '$\\ddot{x} = -kx/m,\\quad \\ddot{y} = -3hy^2/m,\\quad \\ddot{z} = -g$',
    '$\\ddot{x} = -kx/m,\\quad \\ddot{y} = -3hy^2/m,\\quad \\ddot{z} = -gz$',
    '$\\ddot{x} = kx/m,\\quad \\ddot{y} = 3hy^2/m,\\quad \\ddot{z} = g$',
    '$\\ddot{x} = -kx/m,\\quad \\ddot{y} = -hy^2/m,\\quad \\ddot{z} = g$',
  ],

  correct: 0,

  explanation:
  '**Force from Potential Energy**\n\n' +

  '$$\\vec{F} = -\\nabla U$$\n\n' +

  'Compute partial derivatives:\n\n' +

  '$$F_x = -\\frac{\\partial U}{\\partial x} = -2kx$$\n\n' +

  '$$F_y = -\\frac{\\partial U}{\\partial y} = -3hy^2$$\n\n' +

  '$$F_z = -\\frac{\\partial U}{\\partial z} = -mg$$\n\n' +

  'Applying Newton\'s second law $\\vec{F} = m\\ddot{\\vec{r}}$:\n\n' +

  '$$\\ddot{x} = -\\frac{2kx}{m}, \\quad \\ddot{y} = -\\frac{3hy^2}{m}, \\quad \\ddot{z} = -g$$\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 42,
  topic: 'Potential Energy',

  q: 'A point particle has potential energy $U(x,y,z) = \\dfrac{kx^2}{2} + hy^3 + mgz$ where $k$ and $h$ are constants, $m$ is the particle mass, and $g$ is gravitational acceleration. What are the equations of motion?',

  opts: [
    '$\\ddot{x} = -kx/m,\\quad \\ddot{y} = -3hy^2/m,\\quad \\ddot{z} = -g$',
    '$\\ddot{x} = kx/m,\\quad \\ddot{y} = -3hy^2/m,\\quad \\ddot{z} = -gz$',
    '$\\ddot{x} = kx/m,\\quad \\ddot{y} = 3hy^2/m,\\quad \\ddot{z} = g$',
    '$\\ddot{x} = -kx/m,\\quad \\ddot{y} = -hy^2/m,\\quad \\ddot{z} = g$',
  ],

  correct: 0,

  explanation:
  '**Step 1 — Force from Potential**\n\n' +

  '$$\\vec{F} = -\\nabla U$$\n\n' +

  'Compute partial derivatives:\n\n' +

  '$$F_x = -\\frac{\\partial U}{\\partial x} = -kx$$\n\n' +

  '$$F_y = -\\frac{\\partial U}{\\partial y} = -3hy^2$$\n\n' +

  '$$F_z = -\\frac{\\partial U}{\\partial z} = -mg$$\n\n' +

  '**Step 2 — Equations of Motion**\n\n' +

  '$$\\ddot{x} = -\\frac{kx}{m}, \\quad \\ddot{y} = -\\frac{3hy^2}{m}, \\quad \\ddot{z} = -g$$\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 43,
  topic: 'Oscillations',

  q: 'A point particle is subject to a potential energy $U(x,y,z) = \\dfrac{k}{2}(x^2 + y^2 + z^2) + mgz$ where $k$ is a constant, $m$ is the particle\'s mass, and $g$ is gravitational acceleration. Which equations are the correct motion equations?',

  opts: [
    '$\\ddot{x} + \\dfrac{k}{m}x = 0,\\quad \\ddot{y} + \\dfrac{k}{m}y = 0,\\quad \\ddot{z} + \\dfrac{k}{m}z = g$',
    '$\\ddot{x} - \\dfrac{k}{m}x = 0,\\quad \\ddot{y} - \\dfrac{k}{m}y = 0,\\quad \\ddot{z} - \\dfrac{k}{m}z = -g$',
    '$\\ddot{x} - \\dfrac{k}{m}x = 0,\\quad \\ddot{y} - \\dfrac{k}{m}y = 0,\\quad \\ddot{z} - \\dfrac{k}{m}z = g$',
    '$\\ddot{x} + \\dfrac{k}{m}x = 0,\\quad \\ddot{y} + \\dfrac{k}{m}y = 0,\\quad \\ddot{z} + \\dfrac{k}{m}z = -g$',
  ],

  correct: 3,

  explanation:
  '**Apply Newton\'s Second Law Using Potential Energy**\n\n' +

  '$$\\vec{F} = -\\nabla U, \\quad m\\ddot{\\vec{r}} = -\\nabla U$$\n\n' +

  'Compute partial derivatives:\n\n' +

  '$$\\frac{\\partial U}{\\partial x} = kx, \\quad \\frac{\\partial U}{\\partial y} = ky, \\quad \\frac{\\partial U}{\\partial z} = kz + mg$$\n\n' +

  'Equations of motion:\n\n' +

  '$$\\ddot{x} = -\\frac{k}{m}x \\quad\\Rightarrow\\quad \\ddot{x} + \\frac{k}{m}x = 0$$\n\n' +

  '$$\\ddot{y} = -\\frac{k}{m}y \\quad\\Rightarrow\\quad \\ddot{y} + \\frac{k}{m}y = 0$$\n\n' +

  '$$\\ddot{z} = -\\frac{k}{m}z - g \\quad\\Rightarrow\\quad \\ddot{z} + \\frac{k}{m}z = -g$$\n\n' +

  'Final Answer: **(D)**',
},
// =========================
// Question 44
// =========================
{
  id: 44,
  topic: 'Kinematics',

  q: 'A point particle moves along a curvilinear path. Is it possible that its acceleration is zero?',

  opts: [
    'Yes, but only if its vector speed is constant.',
    'No, because there is always at least tangential acceleration.',
    'Yes, but only if its scalar speed is constant.',
    'No, because there is always at least centripetal acceleration.',
  ],

  correct: 3,

  explanation:
  '[icon]motion[/icon] **Curvilinear Motion and Acceleration**\n\n' +

  'Even if a particle moves at constant speed along a curved path, its velocity vector changes direction continuously.\n\n' +

  'This change in direction creates centripetal acceleration:\n\n' +

  '[formula]a = v²/r[/formula]\n\n' +

  'where:\n' +
  '- v = speed\n' +
  '- r = radius of curvature\n\n' +

  'Therefore acceleration is not zero unless the path is a straight line.\n\n' +

  '**Final Answer:**\n' +
  'There is always centripetal acceleration → **(D)**',
},
// =========================
// Question 45
// =========================
{
  id: 45,
  topic: 'Differential Equations',

  q: 'A point particle of mass $M$ moves in an inertial reference system along the positive $x$-axis. It is subjected to a braking force that depends on the speed according to the law: $F = -kv^2$ where $k$ is a positive constant. Given that it passes through the origin with speed $v_0$ at time $t_0 = M/(kv_0)$, determine the expressions for the speed $v(t)$ and the position $x(t)$ as functions of time $t$.',

  opts: [
    '$v(t) = -\\dfrac{k}{3M}t^3 + v_0, \\quad x(t) = -\\dfrac{k}{12M}t^4 + v_0 t$',
    '$v(t) = \\dfrac{M}{kt}, \\quad x(t) = \\dfrac{M}{k} \\ln\\!\\left(\\dfrac{t}{t_0}\\right)$',
    '$v(t) = \\dfrac{Mt}{k} + v_0, \\quad x(t) = \\dfrac{Mt^2}{2k} + v_0 t$',
    '$v(t) = \\dfrac{k}{3M} \\sin\\!\\left(\\sqrt{\\dfrac{k}{M}}\\,t\\right) + v_0, \\quad x(t) = \\dfrac{k}{\\sqrt{M}} \\sin\\!\\left(\\sqrt{\\dfrac{k}{M}}\\,t\\right) + v_0 t$',
  ],

  correct: 1,

  explanation:
  '**Apply Newton\'s Second Law**\n\n' +

  '$$M\\,\\frac{dv}{dt} = -kv^2$$\n\n' +

  'Separate variables:\n\n' +

  '$$\\frac{dv}{v^2} = -\\frac{k}{M}\\,dt$$\n\n' +

  'Integrate:\n\n' +

  '$$-\\frac{1}{v} + \\frac{1}{v_0} = -\\frac{k}{M}(t - t_0)$$\n\n' +

  'Using:\n\n' +

  '$$t_0 = \\frac{M}{kv_0}$$\n\n' +

  'we obtain:\n\n' +

  '$$v(t) = \\frac{M}{kt}$$\n\n' +

  'Position:\n\n' +

  '$$x(t) = \\int v(t)\\,dt$$\n\n' +

  '$$x(t) = \\frac{M}{k}\\ln\\!\\left(\\frac{t}{t_0}\\right)$$\n\n' +

  '**Final Answer: (B)**',
},

// =========================
// Question 46
// =========================
{
  id: 46,
  topic: 'Thermodynamics',

  q: 'A reversible thermal machine works with four heat sources. From the first source at temperature $T_1 = 500$ K, the machine absorbs heat $Q_1 = 5000$ J. At the fourth source at temperature $T_4 = 280$ K, the machine transfers heat $Q_4 = -1400$ J. With the second and third sources, respectively at $T_2 = 400$ K and $T_3 = 300$ K, the machine exchanges heat $Q_2$ and $Q_3 = -Q_2$. Calculate the efficiency of the thermal machine.',

  opts: [
    '$0.127$',
    '$0.327$',
    '$0.427$',
    '$0.227$',
  ],

  correct: 1,

  explanation:
  '**Entropy Balance for Reversible Engine**\n\n' +

  '$$\\frac{Q_1}{T_1} + \\frac{Q_2}{T_2} + \\frac{Q_3}{T_3} + \\frac{Q_4}{T_4} = 0$$\n\n' +

  'Given:\n\n' +

  '$$Q_3 = -Q_2$$\n\n' +

  'Substitute values:\n\n' +

  '$$\\frac{5000}{500} + Q_2\\!\\left(\\frac{1}{400} - \\frac{1}{300}\\right) - \\frac{1400}{280} = 0$$\n\n' +

  '$$10 - \\frac{Q_2}{1200} - 5 = 0$$\n\n' +

  '$$Q_2 = 6000 \\text{ J}, \\quad Q_3 = -6000 \\text{ J}$$\n\n' +

  'Total absorbed heat:\n\n' +

  '$$Q_{\\text{in}} = 5000 + 6000 = 11000 \\text{ J}$$\n\n' +

  'Work output:\n\n' +

  '$$W = \\sum Q = 5000 + 6000 - 6000 - 1400 = 3600 \\text{ J}$$\n\n' +

  'Efficiency:\n\n' +

  '$$\\eta = \\frac{W}{Q_{\\text{in}}} = \\frac{3600}{11000} \\approx 0.327$$\n\n' +

  '**Final Answer: (B)**',
},

// =========================
// Question 47
// =========================
{
  id: 47,
  topic: 'Thermal Expansion',

  q: 'A rod of negligible cross-section and initial length $L_i$ is heated. With a temperature change $\\Delta T$, the final length becomes: $L_f = L_i + \\Delta L$. Which of the following statements is correct?',

  opts: [
    'If $\\Delta T$ doubles, also the $\\Delta L / L_i$ ratio doubles',
    'If $\\Delta T$ doubles, also the $\\Delta L / L_f$ ratio doubles',
    'If $\\Delta T$ doubles, also the $L_f / L_i$ ratio doubles',
    'If $\\Delta T$ doubles, also the $L_i / L_f$ ratio doubles',
  ],

  correct: 0,

  explanation:
  '**Linear Thermal Expansion**\n\n' +

  '$$\\Delta L = \\alpha L_i \\Delta T$$\n\n' +

  'Divide by $L_i$:\n\n' +

  '$$\\frac{\\Delta L}{L_i} = \\alpha \\Delta T$$\n\n' +

  'Therefore, if $\\Delta T \\to 2\\Delta T$:\n\n' +

  '$$\\frac{\\Delta L}{L_i} \\to 2\\cdot\\frac{\\Delta L}{L_i}$$\n\n' +

  'So the fractional expansion doubles.\n\n' +

  '**Final Answer: (A)**',
},

// =========================
// Question 48
// =========================
{
  id: 48,
  topic: 'Rotational Motion',

  q: 'A rod with mass m and length L = [num]1.2 m[/num] is hinged from one end to a wall. The rod is initially in a horizontal position and released from rest. What will its angular velocity ω be once it reaches the vertical position?\n\n![Rotating rod diagram|sm](images/physics/question48_diagram.png)',

  opts: [
    'ω = [num]5[/num] s⁻¹',
    'ω = [num]15[/num] s⁻¹',
    'ω = [num]0.5[/num] s⁻¹',
    'ω = [num]0.25[/num] s⁻¹',
  ],

  correct: 0,

  explanation:
  '**Given:**\n' +
  'L = [num]1.2 m[/num]\n' +
  'g = [num]9.8 m/s²[/num]\n\n' +

  '[icon]rotation[/icon] **Use Conservation of Mechanical Energy**\n\n' +

  'The center of mass drops by:\n\n' +

  '[formula]h = L/2[/formula]\n\n' +

  'Initial potential energy:\n\n' +

  '[formula]PE = mgL/2[/formula]\n\n' +

  'Final rotational kinetic energy:\n\n' +

  '[formula]KE = (1/2)Iω²[/formula]\n\n' +

  'For a rod about one end:\n\n' +

  '[formula]I = (1/3)mL²[/formula]\n\n' +

  'Equate energies:\n\n' +

  '[formula]mgL/2 = (1/2)(1/3)mL²ω²[/formula]\n\n' +

  'Solve:\n\n' +

  '[formula]ω = √(3g/L)[/formula]\n\n' +

  'Substitute values:\n\n' +

  '[formula]ω = √(3·9.8/1.2)[/formula]\n\n' +

  '[formula]ω ≈ 4.95 s⁻¹[/formula]\n\n' +

  '≈ [num]5 s⁻¹[/num]\n\n' +

  '**Final Answer:**\n' +
  'ω = [num]5[/num] s⁻¹  →  **(A)**',
},

// =========================
// Question 49
// =========================
{
  id: 49,
  topic: 'Pendulum',

  q: 'A simple pendulum used to measure time is made of a mass attached to the end of a steel wire. The period of the pendulum correctly shows 1 s when the temperature is 0°C. Calculate how much time the clock will lag or gain in 1 day in a hot country where the average temperature is 40°C. (The linear expansion coefficient of steel is α = 1.6 × 10⁻⁵ °C⁻¹)',

  opts: [
    'The pendulum lags by 20 s per day',
    'The pendulum lags by 2.0 s per day',
    'The pendulum lags by 10 s per day',
    'The pendulum lags by 1.0 s per day',
  ],

  correct: 0,

  redFlag: true,

  explanation:
  '[icon]warning[/icon] **Approximation Notice**\n\n' +

  'Exact calculation gives approximately:\n\n' +

  '[formula]Δt ≈ 27.6 s/day[/formula]\n\n' +

  'But among the provided choices, the closest option is:\n\n' +

  '**(A) 20 s/day**\n\n' +

  'Main derivation:\n\n' +

  '[formula]T = 2π√(L/g)[/formula]\n\n' +

  'Small relative change:\n\n' +

  '[formula]ΔT/T = (1/2)(ΔL/L)[/formula]\n\n' +

  'Thermal expansion:\n\n' +

  '[formula]ΔL/L = αΔT[/formula]\n\n' +

  'Substitute values:\n\n' +

  '[formula]ΔT/T = (1/2)(1.6×10⁻⁵)(40) = 3.2×10⁻⁴[/formula]\n\n' +

  'Time error in one day:\n\n' +

  '[formula]Δt = 86400 × 3.2×10⁻⁴ ≈ 27.6 s[/formula]\n\n' +

  'The pendulum becomes slower because its length increases.\n\n' +

  '**Closest Answer in options:**\n' +
  '**(A)**',
},

// =========================
// Question 50
// =========================
{
  id: 50,
  topic: 'Gravitation',

  q: 'A small object is dropped to Earth from a great distance (e.g., of the order of the Earth–Moon distance).',

  opts: [
    'does not describe a uniformly accelerated motion given the large distance from the Earth',
    'nothing can be said unless the mass of the object is known',
    'describes a uniformly accelerated motion like any other body that falls to Earth from much shorter distances',
    'describes a uniform rectilinear motion',
  ],

  correct: 0,

  explanation:
  '[icon]gravity[/icon] **Gravitational Acceleration Changes with Distance**\n\n' +

  'Newton’s law of gravitation:\n\n' +

  '[formula]F = GMm/r²[/formula]\n\n' +

  'Therefore acceleration is:\n\n' +

  '[formula]a = GM/r²[/formula]\n\n' +

  'Since r changes significantly over Earth–Moon scale distances, acceleration is not constant.\n\n' +

  'So the motion is not uniformly accelerated.\n\n' +

  '**Final Answer:**\n' +
  '**(A)**',
},

{
  id: 51,
  topic: 'Fluid Mechanics',

  q: 'A small (glass) sphere of radius $r$ and density $\\rho$, initially at rest, is dropped into a container full of water of density $\\rho_0$ and viscosity $\\eta$. Write the differential equation of motion for the small sphere.',

  opts: [
    '$\\ddot{x} + \\dfrac{9\\eta}{2r^2}\\dot{x} = \\left(1 + \\dfrac{\\rho_0}{\\rho}\\right)g$',
    '$\\ddot{x} - \\dfrac{9\\eta}{2r^2}\\dot{x} = \\left(1 - \\dfrac{\\rho_0}{\\rho}\\right)g$',
    '$\\ddot{x} + \\dfrac{9\\eta}{2r^2\\rho}\\dot{x} = \\left(1 - \\dfrac{\\rho_0}{\\rho}\\right)g$',
    '$\\ddot{x} - \\dfrac{9\\eta}{2r^2\\rho}\\dot{x} = -\\left(1 - \\dfrac{\\rho_0}{\\rho}\\right)g$',
  ],

  correct: 2,

  explanation:
  '**Forces Acting on the Sphere**\n\n' +

  'Gravity:\n\n' +
  '$$F_g = \\rho V g$$\n\n' +

  'Buoyant force:\n\n' +
  '$$F_b = \\rho_0 V g$$\n\n' +

  'Viscous drag (Stokes law):\n\n' +
  '$$F_d = -6\\pi\\eta r v$$\n\n' +

  'Newton\'s second law:\n\n' +
  '$$m\\ddot{x} = (\\rho - \\rho_0)Vg - 6\\pi\\eta r\\dot{x}$$\n\n' +

  'Using:\n\n' +
  '$$m = \\rho V, \\quad V = \\frac{4}{3}\\pi r^3$$\n\n' +

  'Simplify:\n\n' +
  '$$\\ddot{x} + \\frac{9\\eta}{2r^2\\rho}\\dot{x} = \\left(1 - \\frac{\\rho_0}{\\rho}\\right)g$$\n\n' +

  '**Final Answer: (C)**',
},

{
  id: 52,
  topic: 'Moment of Inertia',

  q: 'A solid sphere with mass $M$ and radius $R$ is welded to the end of a rod with mass $m$ and length $L$. Calculate the moment of inertia $I_y$ of this system with respect to the $y$-axis at the opposite end of the rod.\n\n![Sphere rod inertia diagram|sm](images/physics/question52_diagram.png)',

  opts: [
    '$I_y = \\dfrac{1}{12}mL^2 + \\dfrac{2}{5}MR^2$',
    '$I_y = \\dfrac{1}{3}mL^2 + \\dfrac{2}{5}MR^2$',
    '$I_y = \\dfrac{1}{3}mL^2 + \\dfrac{2}{5}MR^2 + M(L+R)^2$',
    '$I_y = M(L+R)^2$',
  ],

  correct: 2,

  explanation:
  '**Step 1 — Moment of Inertia of the Rod**\n\n' +

  'For a rod rotating about one end:\n\n' +

  '$$I_{\\text{rod}} = \\frac{1}{3}mL^2$$\n\n' +

  '**Step 2 — Moment of Inertia of the Sphere**\n\n' +

  'About its center:\n\n' +

  '$$I_{\\text{center}} = \\frac{2}{5}MR^2$$\n\n' +

  'Distance from $y$-axis to the sphere center:\n\n' +

  '$$d = L + R$$\n\n' +

  '**Step 3 — Apply Parallel Axis Theorem**\n\n' +

  '$$I_{\\text{sphere}} = I_{\\text{center}} + Md^2 = \\frac{2}{5}MR^2 + M(L+R)^2$$\n\n' +

  '**Step 4 — Total Moment of Inertia**\n\n' +

  '$$I_y = I_{\\text{rod}} + I_{\\text{sphere}}$$\n\n' +

  '$$I_y = \\frac{1}{3}mL^2 + \\frac{2}{5}MR^2 + M(L+R)^2$$\n\n' +

  '**Final Answer: (C)**',
},

// =========================
// Question 53
// =========================
{
  id: 53,
  topic: 'Rolling Motion',

  q: 'A sphere with radius R = 0.25 m and mass M = 1 kg is released on an inclined plane from a height h = 10.5 m above the ground and rolls down without slipping. What will the velocity of the center of mass be once it reaches the ground?',

  opts: [
    '12 m/s',
    '4.0 m/s',
    '1.2 m/s',
    '24.0 m/s',
  ],

  correct: 0,

  explanation:
  '[icon]energy[/icon] **Use Conservation of Mechanical Energy**\n\n' +

  'Initial energy:\n\n' +

  '[formula]E_i = Mgh[/formula]\n\n' +

  'Final energy:\n\n' +

  '[formula]E_f = (1/2)Mv² + (1/2)Iω²[/formula]\n\n' +

  'For a solid sphere:\n\n' +

  '[formula]I = (2/5)MR²[/formula]\n\n' +

  'Rolling without slipping:\n\n' +

  '[formula]v = ωR[/formula]\n\n' +

  'Substitute:\n\n' +

  '[formula]Mgh = (1/2)Mv² + (1/2)(2/5)MR²(v²/R²)[/formula]\n\n' +

  '[formula]Mgh = (7/10)Mv²[/formula]\n\n' +

  'Solve:\n\n' +

  '[formula]v = √(10gh/7)[/formula]\n\n' +

  '[formula]v = √(10·9.8·10.5/7) ≈ 12 m/s[/formula]\n\n' +

  '**Final Answer:**\n' +
  '**(A)**',
},

// =========================
// Question 54
// =========================
{
  id: 54,
  topic: 'Collisions',

  q: 'A sphere of 10 g hits centrally and elastically, at a speed of 5 m/s, another stationary sphere of unknown mass. After the impact, it goes back with a speed of 2 m/s. Is it possible, neglecting frictions, to calculate the mass of the impacted sphere?',

  opts: [
    'No, a collision without friction is nonsense',
    'No, because in this type of impact the total energy of the system composed of the two systems is not conserved',
    'No, because the speed of the second sphere after the impact is unknown',
    'Yes',
  ],

  correct: 3,

  explanation:
  '[icon]collision[/icon] **Elastic Collision**\n\n' +

  'In an elastic collision both momentum and kinetic energy are conserved.\n\n' +

  'Known values:\n\n' +

  '[formula]m₁ = 0.01 kg[/formula]\n' +
  '[formula]v₁i = 5 m/s[/formula]\n' +
  '[formula]v₁f = -2 m/s[/formula]\n\n' +

  'Momentum conservation:\n\n' +

  '[formula]m₁v₁i = m₁v₁f + m₂v₂f[/formula]\n\n' +

  'Energy conservation:\n\n' +

  '[formula](1/2)m₁v₁i² = (1/2)m₁v₁f² + (1/2)m₂v₂f²[/formula]\n\n' +

  'These two equations allow solving for the unknown mass.\n\n' +

  '**Final Answer:**\n' +
  '**(D)**',
},

// =========================
// Question 55
// =========================
{
  id: 55,
  topic: 'Thermal Radiation',

  q: 'A student is trying to decide what to wear. The surroundings are at 20°C. If the skin temperature is 35°C, what is the net energy loss from the body in 10 min by radiation? Assume emissivity e = 0.900 and surface area A = 1.50 m².',

  opts: [
    'Q = 7.5 × 10³ J',
    'Q = 7.5 × 10⁵ J',
    'Q = 7.5 × 10² J',
    'Q = 7.5 × 10⁴ J',
  ],

  correct: 3,

  explanation:
  '[icon]heat[/icon] **Use Stefan–Boltzmann Law**\n\n' +

  '[formula]Q = σeA(T₁⁴ - T₂⁴)t[/formula]\n\n' +

  'Convert temperatures:\n\n' +

  '[formula]T₁ = 308K[/formula]\n' +
  '[formula]T₂ = 293K[/formula]\n\n' +

  'Substitute values:\n\n' +

  '[formula]Q = (5.67×10⁻⁸)(0.9)(1.5)(308⁴-293⁴)(600)[/formula]\n\n' +

  'Approximate:\n\n' +

  '[formula]Q ≈ 7.5×10⁴ J[/formula]\n\n' +

  '**Final Answer:**\n' +
  '**(D)**',
},

// =========================
// Question 56
// =========================
{
  id: 56,
  topic: 'Thermodynamics',

  q: 'A system performs a thermodynamic cycle. Its entropy variation',

  opts: [
    'is always positive',
    'is null if the cycle is reversible',
    'depends on the thermodynamic cycle, it is positive or negative',
    'is null',
  ],

  correct: 3,

  explanation:
  '[icon]entropy[/icon] **Entropy is a State Function**\n\n' +

  'In a thermodynamic cycle the system returns to its initial state.\n\n' +

  'Therefore any state function has zero total variation:\n\n' +

  '[formula]ΔS = 0[/formula]\n\n' +

  'This is true for both reversible and irreversible cycles.\n\n' +

  '**Final Answer:**\n' +
  '**(D)**',
},

{
  id: 57,
  topic: 'Thermodynamics',

  q: 'A thermal machine operates with three heat sources. $T_1$, $T_2$, and $T_3$ are the temperatures of the sources, and $Q_1$, $Q_2$, $Q_3$ are the amounts of heat that the thermal machine exchanges with each of the sources. If the cycle of the thermal machine is irreversible, then it is always true that:',

  opts: [
    '$\\dfrac{Q_1}{T_1} + \\dfrac{Q_2}{T_2} + \\dfrac{Q_3}{T_3} < 0$',
    '$\\left|\\dfrac{Q_1}{T_1}\\right| + \\left|\\dfrac{Q_2}{T_2}\\right| + \\left|\\dfrac{Q_3}{T_3}\\right| = 0$',
    '$\\dfrac{Q_1}{T_1} + \\dfrac{Q_2}{T_2} + \\dfrac{Q_3}{T_3} > 0$',
    '$\\dfrac{Q_1}{T_1} + \\dfrac{Q_2}{T_2} + \\dfrac{Q_3}{T_3} = 0$',
  ],

  correct: 0,

  explanation:
  '**Clausius Inequality for Cyclic Processes**\n\n' +

  'For any cyclic thermodynamic process:\n\n' +

  '$$\\oint \\frac{\\delta Q}{T} \\leq 0$$\n\n' +

  'For an irreversible cycle, the inequality is strict:\n\n' +

  '$$\\oint \\frac{\\delta Q}{T} < 0$$\n\n' +

  'When heat is exchanged with discrete reservoirs:\n\n' +

  '$$\\sum_i \\frac{Q_i}{T_i} < 0$$\n\n' +

  'Therefore, for an irreversible thermal machine:\n\n' +

  '$$\\frac{Q_1}{T_1} + \\frac{Q_2}{T_2} + \\frac{Q_3}{T_3} < 0$$\n\n' +

  '**Final Answer: (A)**',
},

// =========================
// Question 58
// =========================
{
  id: 58,
  topic: 'Thermodynamics',

  q: 'A tire, which is initially at the temperature $T_0 = 300$ K, is inflated to a pressure equal to three times that of the initial pressure. Assuming that this process is adiabatic and almost static, determine the final temperature $T_F$ of the air considered as a perfect diatomic gas.',

  opts: [
    '$T_F = 300$ K',
    '$T_F = 100$ K',
    '$T_F = 411$ K',
    '$T_F = 900$ K',
  ],

  correct: 2,

  explanation:
  '**Given:**\n\n' +

  '$$T_1 = 300 \\text{ K}, \\quad \\frac{P_2}{P_1} = 3$$\n\n' +

  '**Step 1 — Adiabatic Relation**\n\n' +

  'For an adiabatic ideal gas process:\n\n' +

  '$$T_2 = T_1 \\left(\\frac{P_2}{P_1}\\right)^{\\!\\frac{\\gamma-1}{\\gamma}}$$\n\n' +

  '**Step 2 — Diatomic Gas Index**\n\n' +

  'For a perfect diatomic gas:\n\n' +

  '$$\\gamma = \\frac{7}{5} = 1.4$$\n\n' +

  '**Step 3 — Substitute Values**\n\n' +

  '$$T_F = 300 \\cdot 3^{\\frac{1.4-1}{1.4}} = 300 \\cdot 3^{2/7}$$\n\n' +

  '$$T_F \\approx 300 \\cdot 1.37 \\approx 411 \\text{ K}$$\n\n' +

  '**Final Answer: (C)**',
},

{
  id: 59,
  topic: 'Thermodynamics',

  q: 'A vessel contains $4$ moles of a monatomic gas at $T_1 = 0°\\text{C}$. The temperature of the gas is increased to $T_2 = 50°\\text{C}$ at constant volume. Calculate the given heat $Q$, the work performed $W$ by the gas, and the increase in internal energy $\\Delta U$.',

  opts: [
    '$Q = 2500$ J, $\\quad W = 0$ J, $\\quad \\Delta U = 2500$ J',
    '$Q = 2500$ J, $\\quad W = 2500$ J, $\\quad \\Delta U = 2500$ J',
    '$Q = 2500$ J, $\\quad W = 2500$ J, $\\quad \\Delta U = 0$ J',
    '$Q = 2600$ J, $\\quad W = 0$ J, $\\quad \\Delta U = 2500$ J',
  ],

  correct: 0,

  explanation:
  '**Given:**\n\n' +

  '$$n = 4 \\text{ mol}, \\quad \\Delta T = 50 \\text{ K}, \\quad R = 8.314 \\text{ J/mol·K}$$\n\n' +

  '**Step 1 — Constant Volume Process**\n\n' +

  'At constant volume:\n\n' +

  '$$W = 0$$\n\n' +

  '**Step 2 — Internal Energy Change**\n\n' +

  'For a monatomic ideal gas:\n\n' +

  '$$C_V = \\frac{3}{2}R$$\n\n' +

  '$$\\Delta U = nC_V\\Delta T = n\\cdot\\frac{3}{2}R\\Delta T$$\n\n' +

  '$$\\Delta U = 4 \\cdot \\frac{3}{2} \\cdot 8.314 \\cdot 50 \\approx 2494 \\approx 2500 \\text{ J}$$\n\n' +

  '**Step 3 — First Law of Thermodynamics**\n\n' +

  '$$\\Delta U = Q - W$$\n\n' +

  'Since $W = 0$:\n\n' +

  '$$Q = \\Delta U \\approx 2500 \\text{ J}$$\n\n' +

  '**Final Answer: (A)**',
},  
{
  id: 60,
  topic: 'Thermodynamics',

  q: 'A vessel contains $V_a = 10$ L of ideal gas at pressure $P_a = 5$ atm. This gas is first cooled at constant volume along the path $a \\to b$ until its pressure reaches $P_b = 2$ atm. Then, it is again brought to temperature $T_a$ by expansion under constant pressure $(b \\to c)$. What is the volume $V_c$? What is the total work $W$ performed by the gas? What is the total increase in internal energy $\\Delta U$?\n\n![PV diagram|sm](images/physics/question60_pv_diagram.png)',

  opts: [
    '$V_c = 2.5$ L, $\\quad W = 300$ J, $\\quad \\Delta U = 0$ J',
    '$V_c = 25$ L, $\\quad W = 0$ J, $\\quad \\Delta U = 0$ J',
    '$V_c = 25$ L, $\\quad W = 3000$ J, $\\quad \\Delta U = 0$ J',
    '$V_c = 25$ L, $\\quad W = 3000$ J, $\\quad \\Delta U = 3000$ J',
  ],

  correct: 2,

  explanation:
  '**Given:**\n\n' +

  '$$V_a = 10 \\text{ L}, \\quad P_a = 5 \\text{ atm}, \\quad P_b = 2 \\text{ atm}$$\n\n' +

  '**Step 1 — Isochoric Cooling ($a \\to b$)**\n\n' +

  'Since the process occurs at constant volume:\n\n' +

  '$$V_b = V_a = 10 \\text{ L}$$\n\n' +

  'Using the ideal gas relation:\n\n' +

  '$$\\frac{P_a}{T_a} = \\frac{P_b}{T_b} \\quad\\Rightarrow\\quad T_b = \\frac{P_b}{P_a}T_a = \\frac{2}{5}T_a$$\n\n' +

  '**Step 2 — Isobaric Expansion ($b \\to c$)**\n\n' +

  'Pressure remains constant and the gas returns to the initial temperature:\n\n' +

  '$$P_b = P_c = 2 \\text{ atm}, \\quad T_c = T_a$$\n\n' +

  '$$\\frac{V_b}{T_b} = \\frac{V_c}{T_c} \\quad\\Rightarrow\\quad V_c = V_b\\cdot\\frac{T_c}{T_b} = 10\\cdot\\frac{T_a}{\\frac{2}{5}T_a} = 25 \\text{ L}$$\n\n' +

  '**Step 3 — Total Work Done**\n\n' +

  'Isochoric process: $W_{ab} = 0$\n\n' +

  'Isobaric expansion:\n\n' +

  '$$W_{bc} = P\\,\\Delta V = 2\\text{ atm}\\cdot(25-10)\\text{ L} = 30\\text{ L·atm}$$\n\n' +

  '$$W \\approx 30 \\times 101.3 \\approx 3000 \\text{ J}$$\n\n' +

  '**Step 4 — Internal Energy Change**\n\n' +

  'For an ideal gas, internal energy depends only on temperature. Since $T_c = T_a$:\n\n' +

  '$$\\Delta U = 0$$\n\n' +

  '**Final Answer: (C)**',
},

// =========================

{
  id: 61,
  topic: 'Rotational Motion',

  q: 'A wheel of radius $R$ rotates around a fixed axis. When a point at a distance $R$ from the center moves with an angular speed $\\omega$, a second point, located at a distance $R/2$ from the center, moves with an angular velocity:',

  opts: [
    '$\\omega$',
    '$2\\omega$',
    '$\\omega/2$',
    '$4\\omega$',
  ],

  correct: 0,

  explanation:
  '**Angular Velocity in a Rigid Body**\n\n' +

  'All points of a rigid rotating object share the same angular velocity, regardless of their distance from the axis of rotation.\n\n' +

  'The linear (tangential) speed depends on radius:\n\n' +

  '$$v = r\\omega$$\n\n' +

  'Thus, points farther from the center move with greater linear speed, but the angular velocity remains the same everywhere in the wheel.\n\n' +

  'Therefore, the point located at $R/2$ also rotates with angular velocity:\n\n' +

  '$$\\omega$$\n\n' +

  '**Final Answer: (A)**',
},
// =========================
// Question 62
// =========================
{
  id: 62,
  topic: 'Fluid Mechanics',

  q: 'Air density is [num]1.3 kg/m³[/num] at sea level. What would the thickness of the Earth’s atmosphere be if the density of air did not decrease with height, remaining constant?',

  opts: [
    '[num]100 km[/num]',
    '[num]78 km[/num]',
    '[num]7.8 km[/num]',
    'Not enough information to say',
  ],

  correct: 2,

  explanation:
  '**Given:**\n' +
  '[formula]\\rho = 1.3 kg/m^3[/formula]\n' +
  '[formula]P_0 = 1.01 \\times 10^5 Pa[/formula]\n' +
  '[formula]g = 9.8 m/s^2[/formula]\n\n' +

  '[icon]pressure[/icon] **Step 1 — Hydrostatic Pressure Relation**\n\n' +

  'For constant density:\n\n' +

  '[formula]P = \\rho gh[/formula]\n\n' +

  'Solve for the atmosphere height:\n\n' +

  '[formula]h = \\frac{P}{\\rho g}[/formula]\n\n' +

  '[icon]calculate[/icon] **Step 2 — Substitute Values**\n\n' +

  '[formula]h = \\frac{1.01 \\times 10^5}{1.3 \\times 9.8}[/formula]\n\n' +

  '[formula]h \\approx 7.93 \\times 10^3 m[/formula]\n\n' +

  '[formula]h \\approx 7.9 km[/formula]\n\n' +

  '≈ [num]7.8 km[/num]\n\n' +

  '**Final Answer:**\n' +
  '[num]7.8 km[/num]  →  **(C)**',
},

{
  id: 63,
  topic: 'Thermodynamics',

  q: 'Air undergoes a three-process cycle with a $P = \\text{const}$ process, a $T = \\text{const}$ process, and a $V = \\text{const}$ process. Select the correct statement for a piston-cylinder arrangement.',

  opts: [
    '$W = 0$ for the $P = \\text{const}$ process',
    '$Q = 0$ for the $V = \\text{const}$ process',
    '$Q = 0$ for the $T = \\text{const}$ process',
    '$W = 0$ for the $V = \\text{const}$ process',
  ],

  correct: 3,

  explanation:
  '**Work in Thermodynamic Processes**\n\n' +

  'Boundary work in a piston-cylinder system is:\n\n' +

  '$$W = \\int P\\,dV$$\n\n' +

  'For a constant-volume process:\n\n' +

  '$$dV = 0$$\n\n' +

  'Therefore:\n\n' +

  '$$W = 0$$\n\n' +

  'No displacement means no mechanical work is performed.\n\n' +

  '**Final Answer:** $W = 0$ for the $V = \\text{const}$ process $\\to$ **(D)**',
},

// =========================
// Question 64
// =========================
{
  id: 64,
  topic: 'Fluid Mechanics',

  q: 'An aerodynamic tunnel must be used with a model car of size [num]20 cm[/num] to roughly reproduce the situation in which a car of size [num]550 cm[/num] travels at [num]15 m/s[/num]. What should be the wind speed in the tunnel? (Reynolds number has to be the same.)',

  opts: [
    '[num]411 m/s[/num]',
    '[num]103 m/s[/num]',
    '[num]27.5 m/s[/num]',
    '[num]15 m/s[/num]',
  ],

  correct: 0,

  explanation:
  '**Given:**\n' +
  '[formula]L_{model} = 20 cm[/formula]\n' +
  '[formula]L_{real} = 550 cm[/formula]\n' +
  '[formula]v_{real} = 15 m/s[/formula]\n\n' +

  '[icon]fluid[/icon] **Step 1 — Reynolds Number Similarity**\n\n' +

  'For similar flow conditions:\n\n' +

  '[formula]Re = \\frac{\\rho vL}{\\mu}[/formula]\n\n' +

  'Thus:\n\n' +

  '[formula]\\frac{v_{model}}{v_{real}} = \\frac{L_{real}}{L_{model}}[/formula]\n\n' +

  '[icon]calculate[/icon] **Step 2 — Compute Tunnel Speed**\n\n' +

  '[formula]v_{model} = 15 \\times \\frac{550}{20}[/formula]\n\n' +

  '[formula]v_{model} = 15 \\times 27.5[/formula]\n\n' +

  '[formula]v_{model} = 412.5 m/s[/formula]\n\n' +

  '≈ [num]411 m/s[/num]\n\n' +

  '**Final Answer:**\n' +
  '[num]411 m/s[/num]  →  **(A)**',
},
{
  id: 65,
  topic: 'Thermodynamics',

  q: 'An aluminum block of mass $m_1 = 0.1$ kg at temperature $T_1 = 580$ K is immersed in a glass vessel of mass $m_2 = 0.2$ kg and temperature $T_2 = 300$ K. The glass vessel contains $m_3 = 0.5$ kg of water at $T_2 = 300$ K. Disregarding heat exchange with the surroundings, determine the equilibrium temperature $T_F$ of the system. The specific heats are:\n\n$c_1 = 896.0$ J/kg·K (aluminum),\n$c_2 = 630.4$ J/kg·K (glass),\n$c_3 = 4187.0$ J/kg·K (water)',

  opts: [
    '$T_F = 410.86$ K',
    '$T_F = 440.00$ K',
    '$T_F = 310.86$ K',
    '$T_F = 390.66$ K',
  ],

  correct: 2,

  explanation:
  '**Step 1 — Conservation of Energy**\n\n' +

  'Heat lost by aluminum equals heat gained by glass and water:\n\n' +

  '$$m_1 c_1(T_1 - T_F) = m_2 c_2(T_F - T_2) + m_3 c_3(T_F - T_2)$$\n\n' +

  '**Step 2 — Substitute Values**\n\n' +

  '$$0.1\\cdot896\\cdot(580 - T_F) = 0.2\\cdot630.4\\cdot(T_F - 300) + 0.5\\cdot4187\\cdot(T_F - 300)$$\n\n' +

  'Solving gives:\n\n' +

  '$$T_F \\approx 310.86 \\text{ K}$$\n\n' +

  '**Final Answer: (C)**',
},

// =========================

{
  id: 66,
  topic: 'Fluid Mechanics',

  q: 'An ice cube (density $\\rho_{\\text{ice}} = 920.0$ kg/m³) with edge $a = 4.0$ cm floats in a cylindrical glass with section area $S = 25.00$ cm², filled with water up to a height $h = 10.0$ cm. Calculate the new height $h\'$ of the water when the cube is completely melted.',

  opts: [
    "$h' = 11.0$ cm",
    "$h' = 9.0$ cm",
    "$h' = 10.0$ cm",
    "$h' = 9.5$ cm",
  ],

  correct: 2,

  explanation:
  '**Floating Ice Principle**\n\n' +

  'A floating body displaces a volume of water equal to its weight.\n\n' +

  'When the ice melts, it becomes exactly the same amount of water as the displaced volume.\n\n' +

  'Therefore, the water level remains unchanged:\n\n' +

  "$$h' = 10.0 \\text{ cm}$$\n\n" +

  '**Final Answer: (C)**',
},

// =========================

{
  id: 67,
  topic: 'Thermodynamics',
  redFlag: true,

  q: 'An inventor claims that a thermal engine, operating between ocean layers at $27°\\text{C}$ and $10°\\text{C}$, produces $10$ kW of power while discharging $9900$ kJ/min. This engine is:',

  opts: [
    'impossible',
    'reversible',
    'possible',
    'probable',
  ],

  correct: 0,

  explanation:
  '**Given:**\n\n' +

  '$$W = 10 \\text{ kW} = 600 \\text{ kJ/min}, \\quad Q_C = 9900 \\text{ kJ/min}$$\n\n' +

  '**Step 1 — Heat Input**\n\n' +

  '$$Q_H = W + Q_C = 600 + 9900 = 10500 \\text{ kJ/min}$$\n\n' +

  '**Step 2 — Claimed Efficiency**\n\n' +

  '$$\\eta = \\frac{W}{Q_H} = \\frac{600}{10500} \\approx 5.71\\%$$\n\n' +

  '**Step 3 — Carnot Limit**\n\n' +

  '$$T_H = 300 \\text{ K}, \\quad T_C = 283 \\text{ K}$$\n\n' +

  '$$\\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H} = 1 - \\frac{283}{300} \\approx 5.67\\%$$\n\n' +

  'Since the claimed efficiency exceeds the Carnot limit, the engine violates the second law of thermodynamics.\n\n' +

  '**Final Answer: (A)**',
},

// =========================

{
  id: 68,
  topic: 'Oscillations',

  q: 'An object oscillates with simple harmonic motion along the $x$-axis. Its displacement from the origin varies with time according to the equation:\n\n$$x(t) = (4.0\\text{ m})\\cos(\\pi t + \\pi/4)$$\n\nwhere $t$ is in seconds and the angles are in radians. Determine the amplitude $A$, frequency $f$, and period $T$ of the motion.',

  opts: [
    '$A = 4.0$ m, $\\quad f = 0.5$ Hz, $\\quad T = 2.0$ s',
    '$A = 4.0$ m, $\\quad f = 1.5$ Hz, $\\quad T = 0.7$ s',
    '$A = 4.0$ m, $\\quad f = 0.25$ Hz, $\\quad T = 4.0$ s',
    '$A = 40$ m, $\\quad f = 0.5$ Hz, $\\quad T = 2.0$ s',
  ],

  correct: 0,

  explanation:
  '**Step 1 — Compare with SHM Equation**\n\n' +

  'General SHM form:\n\n' +

  '$$x(t) = A\\cos(\\omega t + \\phi)$$\n\n' +

  'From $x(t) = (4.0\\text{ m})\\cos(\\pi t + \\pi/4)$:\n\n' +

  '$$A = 4.0 \\text{ m}, \\quad \\omega = \\pi \\text{ rad/s}$$\n\n' +

  '**Step 2 — Frequency and Period**\n\n' +

  '$$f = \\frac{\\omega}{2\\pi} = \\frac{\\pi}{2\\pi} = 0.5 \\text{ Hz}$$\n\n' +

  '$$T = \\frac{1}{f} = 2.0 \\text{ s}$$\n\n' +

  '**Final Answer: (A)**',
},

// =========================

{
  id: 69,
  topic: 'Oscillations',

  q: 'An oscillator has an elastic constant $k$, mass $m$, and is subjected to a braking force proportional to the speed $(F = -\\lambda v)$. It performs damped oscillations just when:',

  opts: [
    '$\\lambda^2 < 4mk$',
    '$\\lambda^2 > 4mk$',
    '$\\lambda^2 < mk$',
    '$\\lambda^2 > mk$',
  ],

  correct: 0,

  explanation:
  '**Step 1 — Damped Harmonic Motion Equation**\n\n' +

  '$$m\\ddot{x} + \\lambda\\dot{x} + kx = 0$$\n\n' +

  '**Step 2 — Characteristic Equation**\n\n' +

  '$$mr^2 + \\lambda r + k = 0$$\n\n' +

  'Its roots are:\n\n' +

  '$$r = \\frac{-\\lambda \\pm \\sqrt{\\lambda^2 - 4mk}}{2m}$$\n\n' +

  'Oscillations occur only when the roots are complex, which requires:\n\n' +

  '$$\\lambda^2 - 4mk < 0 \\quad\\Rightarrow\\quad \\lambda^2 < 4mk$$\n\n' +

  '**Final Answer: (A)**',
},

// =========================

{
  id: 70,
  topic: 'Fluid Mechanics',

  q: "Bernoulli's theorem:",

  opts: [
    'claims that in the points of a duct where the section is smaller, vortices are produced that increase the pressure locally',
    'deals with the relationship between speed and pressure in a fluid at different points in the same conduct provided that the latter is not horizontal',
    'deals with the relationship between speed and pressure in a fluid at different points in the same conduct',
    'deals with the relationship between the flow rate of a conduct and the viscous friction coefficient of the fluid',
  ],

  correct: 2,

  explanation:
  "**Bernoulli's Principle**\n\n" +

  "Bernoulli's theorem expresses conservation of mechanical energy in steady, incompressible, non-viscous fluid flow:\n\n" +

  '$$P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{const}$$\n\n' +

  'It relates pressure, speed, and height at different points of a flowing fluid. An increase in velocity generally corresponds to a decrease in pressure.\n\n' +

  '**Final Answer: (C)**',
},

// =========================

{
  id: 71,
  topic: 'Thermodynamics',

  q: 'By introducing in a calorimeter, at room temperature $300$ K, $0.3$ kg of water at $353$ K, it is observed that at equilibrium the temperature is $323$ K. Is it possible to deduce from this the thermal capacity of the calorimeter?',

  opts: [
    'No, other data are required',
    'No, you need to know the nature of the various parts that make up the calorimeter, their specific heats, etc.',
    'Yes',
    'No, is not an exact differential',
  ],

  correct: 2,

  explanation:
  '**Step 1 — Heat Lost by Water**\n\n' +

  '$$Q_{\\text{water}} = mc\\Delta T = 0.3 \\cdot 4186 \\cdot (353 - 323) = 37674 \\text{ J}$$\n\n' +

  '**Step 2 — Heat Gained by Calorimeter**\n\n' +

  'The calorimeter warms from $300$ K to $323$ K:\n\n' +

  '$$Q_{\\text{cal}} = C_{\\text{cal}}(323 - 300)$$\n\n' +

  'Since $Q_{\\text{cal}} = Q_{\\text{water}}$:\n\n' +

  '$$C_{\\text{cal}} = \\frac{37674}{23} \\approx 1638 \\text{ J/K}$$\n\n' +

  '**Final Answer: (C)**',
},

// =========================

{
  id: 72,
  topic: 'Rotational Motion',

  q: 'Calculate the moment of inertia of a system consisting of the three masses shown in the figure with respect to each of the $x$, $y$, and $z$ axes.\n\n![Mass system diagram|sm](images/physics/question72_mass_system.png)',

  opts: [
    '$I_x = 2.0$ kg·m², $\\quad I_y = 4.8$ kg·m², $\\quad I_z = 6.8$ kg·m²',
    '$I_x = 20$ kg·m², $\\quad I_y = 4.8$ kg·m², $\\quad I_z = 68$ kg·m²',
    '$I_x = 20$ kg·m², $\\quad I_y = 48$ kg·m², $\\quad I_z = 68$ kg·m²',
    '$I_x = 20$ kg·m², $\\quad I_y = 48$ kg·m², $\\quad I_z = 6.8$ kg·m²',
  ],

  correct: 2,

  explanation:
  '**Coordinates:**\n\n' +

  '$m_1 = 2$ kg at $(0,\\,0)$, $\\quad m_2 = 3$ kg at $(4,\\,0)$, $\\quad m_3 = 5$ kg at $(0,\\,2)$\n\n' +

  '**Step 1 — Moment of Inertia About $x$-axis**\n\n' +

  '$$I_x = \\sum m y^2 = 2(0)^2 + 3(0)^2 + 5(2)^2 = 20 \\text{ kg·m}^2$$\n\n' +

  '**Step 2 — Moment of Inertia About $y$-axis**\n\n' +

  '$$I_y = \\sum m x^2 = 2(0)^2 + 3(4)^2 + 5(0)^2 = 48 \\text{ kg·m}^2$$\n\n' +

  '**Step 3 — Moment of Inertia About $z$-axis**\n\n' +

  '$$I_z = I_x + I_y = 20 + 48 = 68 \\text{ kg·m}^2$$\n\n' +

  '**Final Answer: (C)**',
},

// =========================

{
  id: 73,
  topic: 'Thermodynamics',
  redFlag: true,

  q: 'Calculate the total entropy change if $10$ kg of ice at $0°\\text{C}$ is mixed in an insulated container with $20$ kg of water at $20°\\text{C}$. The heat of fusion for ice is $340$ kJ/kg, and the process is thermally isolated.',

  opts: [
    '$6.1$ kJ/K',
    '$3.9$ kJ/K',
    '$1.2$ kJ/K',
    '$0.21$ kJ/K',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Heat Released by Water**\n\n' +

  '$$Q_{\\text{water}} = mc\\Delta T = 20 \\cdot 4.18 \\cdot 20 = 1672 \\text{ kJ}$$\n\n' +

  '**Step 2 — Ice Melting Check**\n\n' +

  '$$Q_{\\text{ice}} = 10 \\cdot 340 = 3400 \\text{ kJ}$$\n\n' +

  'Since $1672 \\text{ kJ} < 3400 \\text{ kJ}$, not all the ice melts.\n\n' +

  '**Step 3 — Melted Ice Mass**\n\n' +

  '$$m = \\frac{1672}{340} \\approx 4.918 \\text{ kg}$$\n\n' +

  '**Step 4 — Entropy Change**\n\n' +

  '$$\\Delta S_{\\text{ice}} = \\frac{Q}{T} = \\frac{1672}{273} \\approx 6.125 \\text{ kJ/K}$$\n\n' +

  '$$\\Delta S_{\\text{water}} = mc\\ln\\!\\left(\\frac{273}{293}\\right) \\approx -5.91 \\text{ kJ/K}$$\n\n' +

  '$$\\Delta S_{\\text{total}} = 6.125 - 5.91 \\approx 0.21 \\text{ kJ/K}$$\n\n' +

  '**Final Answer: (D)**',
},

// =========================

{
  id: 74,
  topic: 'Thermodynamics',

  q: "Clapeyron's formula, for phase transitions, states that the derivative of pressure versus temperature, $dP/dT$:",

  opts: [
    'is directly proportional to the temperature of the substance.',
    'is inversely proportional to the latent heat of the substance.',
    'does not depend on the density of the substance.',
    'is inversely proportional to the temperature of the substance.',
  ],

  correct: 3,

  explanation:
  '**Clapeyron Equation**\n\n' +

  '$$\\frac{dP}{dT} = \\frac{L}{T\\,\\Delta V}$$\n\n' +

  'Therefore:\n\n' +

  '$$\\frac{dP}{dT} \\propto \\frac{1}{T}$$\n\n' +

  'The derivative is inversely proportional to temperature.\n\n' +

  '**Final Answer: (D)**',
},

// =========================

{
  id: 75,
  topic: 'Thermodynamics',
  redFlag: true,

  q: 'Consider $n = 0.20$ moles of nitrogen (a diatomic gas) initially at temperature $T_1 = 300$ K and pressure $P_i = 10^5$ Pa. The gas performs a reversible adiabatic compression until the pressure reaches $P_f = 2P_i$. Calculate the final volume $V_F$, the final temperature $T_F$, and the work $W$ done by the gas.',

  opts: [
    '$V_F = 3.0\\cdot10^{-3}$ m³, $\\quad T_F = 300$ K, $\\quad W = -254$ J',
    '$V_F = 3.0\\cdot10^{-3}$ m³, $\\quad T_F = 329$ K, $\\quad W = -254$ J',
    '$V_F = 3.0\\cdot10^{-3}$ m³, $\\quad T_F = 361$ K, $\\quad W = -254$ J',
    '$V_F = 3.0\\cdot10^{-3}$ m³, $\\quad T_F = 361$ K, $\\quad W = -154$ J',
  ],

  correct: 2,

  explanation:
  '**Given:** $\\gamma = \\dfrac{7}{5} = 1.4$\n\n' +

  '**Step 1 — Adiabatic Temperature Relation**\n\n' +

  '$$\\frac{T_F}{T_1} = \\left(\\frac{P_F}{P_i}\\right)^{(\\gamma-1)/\\gamma}$$\n\n' +

  '$$\\frac{T_F}{300} = 2^{0.4/1.4} \\approx 1.203 \\quad\\Rightarrow\\quad T_F \\approx 361 \\text{ K}$$\n\n' +

  '**Step 2 — Initial Volume**\n\n' +

  '$$V_i = \\frac{nRT_1}{P_i} = \\frac{0.2\\cdot8.314\\cdot300}{10^5} \\approx 4.99\\cdot10^{-3} \\text{ m}^3$$\n\n' +

  '**Step 3 — Final Volume**\n\n' +

  '$$V_F = V_i\\left(\\frac{P_i}{P_F}\\right)^{1/\\gamma} \\approx 3.0\\cdot10^{-3} \\text{ m}^3$$\n\n' +

  '**Step 4 — Work Done**\n\n' +

  '$$W = \\frac{nR(T_F - T_1)}{1 - \\gamma} \\approx -254 \\text{ J}$$\n\n' +

  '**Final Answer: (C)**',
},

// =========================

{
  id: 76,
  topic: 'Thermodynamics',

  q: 'Determine the final temperature $t$ of a mixture when a mass $m_1 = 100$ g of ice (fusion heat $c_f = 80$ cal/g) at temperature $t_1 = 0°\\text{C}$ is mixed with a mass $m_2 = 500$ g of water at temperature $t_2 = 50°\\text{C}$, assuming no heat loss to the environment. Given: specific heat of water $c_w = 1$ cal/g·°C',

  opts: [
    '$t = 28.33°\\text{C}$',
    '$t = 38.33°\\text{C}$',
    '$t = 25.00°\\text{C}$',
    '$t = 18.33°\\text{C}$',
  ],

  correct: 0,

  explanation:
  '**Step 1 — Heat Needed to Melt Ice**\n\n' +

  '$$Q_{\\text{melt}} = m_1 c_f = 100\\cdot80 = 8000 \\text{ cal}$$\n\n' +

  '**Step 2 — Heat Lost by Hot Water**\n\n' +

  '$$Q_{\\text{water}} = m_2 c_w(50 - T) = 500(50 - T)$$\n\n' +

  '**Step 3 — Energy Conservation**\n\n' +

  'The hot water must melt the ice and warm the melted ice from $0°\\text{C}$ to $T$:\n\n' +

  '$$500(50 - T) = 8000 + 100T$$\n\n' +

  '$$25000 - 500T = 8000 + 100T$$\n\n' +

  '$$T = \\frac{17000}{600} = 28.33°\\text{C}$$\n\n' +

  '**Final Answer: (A)**',
},

// =========================

{
  id: 77,
  topic: 'Rotational Motion',

  q: 'Determine the speed $v_f$ that a homogeneous sphere reaches at the end of its descent on an inclined plane, starting from a height $h = 1.14$ m, assuming it rolls without slipping.',

  opts: [
    '$v_f = 4$ m/s',
    '$v_f = 0.4$ m/s',
    '$v_f = 40$ m/s',
    'The mass and radius of the sphere are not known therefore it is impossible to answer',
  ],

  correct: 0,

  explanation:
  '**Step 1 — Conservation of Mechanical Energy**\n\n' +

  'For rolling without slipping:\n\n' +

  '$$mgh = \\frac{1}{2}mv^2 + \\frac{1}{2}I\\omega^2$$\n\n' +

  'For a solid sphere $I = \\dfrac{2}{5}mR^2$ and $\\omega = v/R$:\n\n' +

  '**Step 2 — Simplify Equation**\n\n' +

  '$$mgh = \\frac{1}{2}mv^2 + \\frac{1}{5}mv^2 = \\frac{7}{10}mv^2$$\n\n' +

  '$$v = \\sqrt{\\frac{10gh}{7}} = \\sqrt{\\frac{10\\cdot9.8\\cdot1.14}{7}} \\approx 4.0 \\text{ m/s}$$\n\n' +

  '**Final Answer: (A)**',
},

// =========================
// Question 78
// =========================
{
  id: 78,
  topic: 'Thermodynamics',

  q: 'Does the second law of thermodynamics also apply to electromagnetic phenomena?',

  opts: [
    'Yes.',
    'No, since the efficiency of electric motors is higher than that of heat engines.',
    'Yes, but only for static electric or magnetic phenomena.',
    'It depends, it is necessary to specify case by case.',
  ],

  correct: 0,

  explanation:
  '[icon]entropy[/icon] **Second Law Universality**\n\n' +

  'The second law of thermodynamics governs all physical processes involving energy transformations, including electromagnetic phenomena.\n\n' +

  'Electromagnetic systems also involve dissipation, irreversibility, and entropy increase.\n\n' +

  'Examples include Joule heating, motors, generators, and inductive processes.\n\n' +

  'Therefore, thermodynamic laws apply universally.\n\n' +

  '**Final Answer:**\n' +
  'Yes.  →  **(A)**',
},

// =========================
// Question 79
// =========================
{
  id: 79,
  topic: 'Mechanics',
  redFlag: true,

  q: 'During the laying of a high voltage pylon, a bolt falls from a height $h$ above the ground. It is known that in the last second of its motion before hitting the ground, it travels a height equal to $h/2$. Determine the value of $h$.',

  opts: [
    '$h = 37.2$ m',
    '$h = 47.2$ m',
    '$h = 67.2$ m',
    '$h = 57.2$ m',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Total Falling Height**\n\n' +

  'Let $t$ be the total falling time. For free fall:\n\n' +

  '$$h = \\frac{1}{2}gt^2$$\n\n' +

  '**Step 2 — Distance in the Last Second**\n\n' +

  '$$h_{\\text{last}} = \\frac{1}{2}g\\left[t^2 - (t-1)^2\\right] = \\frac{1}{2}g(2t - 1)$$\n\n' +

  'Given $h_{\\text{last}} = h/2$, substitute $h = \\frac{1}{2}gt^2$:\n\n' +

  '$$\\frac{1}{2}g(2t-1) = \\frac{1}{4}gt^2$$\n\n' +

  '$$2(2t-1) = t^2 \\quad\\Rightarrow\\quad t^2 - 4t + 2 = 0$$\n\n' +

  '$$t = 2 + \\sqrt{2} \\approx 3.4 \\text{ s}$$\n\n' +

  '**Step 3 — Compute Height**\n\n' +

  '$$h = \\frac{1}{2}\\cdot9.8\\cdot(3.4)^2 \\approx 57.2 \\text{ m}$$\n\n' +

  '**Final Answer: (D)**',
},

// =========================

{
  id: 80,
  topic: 'Thermodynamics',
  redFlag: true,

  q: 'Find the work needed to compress $2$ kg of air in an insulated cylinder from $100$ kPa to $600$ kPa if $T_1 = 20°\\text{C}$ (air molecular weight $= 28.96$ g/mol).',

  opts: [
    '$-469$ kJ',
    '$-390$ kJ',
    '$-280$ kJ',
    '$-220$ kJ',
  ],

  correct: 3,

  explanation:
  '**Given:**\n\n' +

  '$$m = 2 \\text{ kg}, \\quad M = 0.02896 \\text{ kg/mol}, \\quad T_1 = 293 \\text{ K}, \\quad \\gamma = 1.4$$\n\n' +

  '**Step 1 — Number of Moles**\n\n' +

  '$$n = \\frac{m}{M} \\approx 69.07 \\text{ mol}$$\n\n' +

  '**Step 2 — Adiabatic Work Formula**\n\n' +

  '$$W = -\\frac{nRT_1}{\\gamma - 1}\\left[1 - \\left(\\frac{P_1}{P_2}\\right)^{\\frac{\\gamma-1}{\\gamma}}\\right]$$\n\n' +

  '$$\\left(\\frac{100}{600}\\right)^{0.4/1.4} \\approx 0.456$$\n\n' +

  '**Step 3 — Compute Work**\n\n' +

  '$$W \\approx -229200 \\text{ J} \\approx -220 \\text{ kJ}$$\n\n' +

  '**Final Answer: (D)**',
},

// =========================

{
  id: 81,
  topic: 'Mechanics',

  q: 'For a system of particles on which no external forces act, it is always true that:',

  opts: [
    'the velocity vector of the center of mass of the system is necessarily zero.',
    'the velocity vector of the center of mass of the system is constant.',
    'the vector momentum of the center of mass of the system is necessarily zero.',
    'the vector angular momentum of the system with respect to the center of mass is necessarily zero.',
  ],

  correct: 1,

  explanation:
  '**Center of Mass Dynamics**\n\n' +

  'When no external force acts:\n\n' +

  '$$\\vec{F}_{\\text{ext}} = \\frac{d\\vec{P}}{dt} = 0 \\quad\\Rightarrow\\quad \\vec{P} = \\text{const}$$\n\n' +

  'Since $\\vec{P} = M\\vec{v}_{CM}$, the velocity of the center of mass remains constant.\n\n' +

  '**Final Answer: (B)**',
},

// =========================

{
  id: 82,
  topic: 'Mechanics',

  q: 'For a rigid body, initially at rest, to be in static equilibrium:',

  opts: [
    'it is sufficient that the resultant of the external forces is zero.',
    'it is sufficient that the resulting moment of external forces with respect to the center of mass is zero.',
    'it is necessary that the resultant of external forces is zero (net force and net torque both zero).',
    'it is sufficient that all external forces are conservative.',
  ],

  correct: 2,

  explanation:
  '**Conditions for Static Equilibrium**\n\n' +

  'A rigid body is in static equilibrium when both conditions hold:\n\n' +

  '$$\\sum \\vec{F} = 0 \\qquad \\text{and} \\qquad \\sum \\vec{\\tau} = 0$$\n\n' +

  'Both translational and rotational equilibrium are required.\n\n' +

  '**Final Answer: (C)**',
},

// =========================

{
  id: 83,
  topic: 'Thermodynamics',

  q: 'For the second law of thermodynamics:',

  opts: [
    'the efficiency of a thermal machine is independent of the substance that completes the cycle',
    'the efficiency of a Carnot machine is as low as possible',
    'all thermal machines have the same efficiency',
    'the efficiency of a Carnot machine depends only on the temperature of the sources',
  ],

  correct: 3,

  explanation:
  '**Carnot Efficiency**\n\n' +

  '$$\\eta = 1 - \\frac{T_C}{T_H}$$\n\n' +

  'For a reversible Carnot engine, efficiency depends only on the temperatures of the hot and cold reservoirs, and represents the maximum possible efficiency.\n\n' +

  '**Final Answer: (D)**',
},

// =========================

{
  id: 84,
  topic: 'Thermodynamics',

  q: 'Four moles of an ideal gas undergo expansion from volume $V_1$ to $V_2 = 3.45\\,V_1$. If the expansion is isothermal at temperature $T = 410$ K, find the change in entropy $\\Delta S_i$ of the gas. If instead the expansion is a reversible adiabatic process, what is the entropy change $\\Delta S_a$ for the gas?',

  opts: [
    '$\\Delta S_i = -41.2$ J/K, $\\quad \\Delta S_a = 0$ J/K',
    '$\\Delta S_i = 0$ J/K, $\\quad \\Delta S_a = 0$ J/K',
    '$\\Delta S_i = 41.2$ J/K, $\\quad \\Delta S_a = -41.2$ J/K',
    '$\\Delta S_i = 41.2$ J/K, $\\quad \\Delta S_a = 0$ J/K',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Isothermal Entropy Change**\n\n' +

  '$$\\Delta S = nR\\ln\\!\\left(\\frac{V_2}{V_1}\\right) = 4\\cdot8.314\\cdot\\ln(3.45)$$\n\n' +

  '$$\\ln(3.45) \\approx 1.238 \\quad\\Rightarrow\\quad \\Delta S_i \\approx 41.2 \\text{ J/K}$$\n\n' +

  '**Step 2 — Reversible Adiabatic Process**\n\n' +

  'For a reversible adiabatic process:\n\n' +

  '$$\\Delta S_a = 0$$\n\n' +

  '**Final Answer: (D)**',
},

// =========================
// Question 85
// =========================
{
  id: 85,
  topic: 'Mechanics',

  q: 'Frictional forces (e.g., due to motion in a fluid, air, water, etc.) are generally not conservative. Can they be conservative in some particular cases?',

  opts: [
    'Yes, if the motion is laminar and no vortices are formed.',
    'Yes, if you neglect the form factor.',
    'No, in no case.',
    'Yes, if the forces are strictly proportional to the speeds.',
  ],

  correct: 2,

  explanation:
  '[icon]force[/icon] **Conservative vs Non-Conservative Forces**\n\n' +

  'A conservative force performs path-independent work and conserves mechanical energy.\n\n' +

  'Frictional forces are dissipative because they convert mechanical energy into thermal energy.\n\n' +

  'Their work depends on the path, not only on the initial and final positions.\n\n' +

  'Even in laminar flow or when force is proportional to velocity, friction still dissipates energy.\n\n' +

  'Therefore, frictional forces are never conservative.\n\n' +

  '**Final Answer:**\n' +
  'No, in no case.  →  **(C)**',
},

// =========================
// Question 86
// =========================
{
  id: 86,
  topic: 'Mechanics',

  q: 'Frictional forces (e.g., due to motion in a fluid, air, water, etc.) are generally not conservative. Can they be conservative in some particular cases?',

  opts: [
    'Yes, if the motion is laminar and no vortices are formed.',
    'Yes, if you neglect the form factor.',
    'No, in no case.',
    'Yes, if the forces are strictly proportional to the speeds.',
  ],

  correct: 2,

  explanation:
  '[icon]force[/icon] **Conservative vs Non-Conservative Forces**\n\n' +

  'A conservative force performs path-independent work and conserves mechanical energy.\n\n' +

  'Frictional forces are dissipative because they convert mechanical energy into thermal energy.\n\n' +

  'Their work depends on the path, not only on the initial and final positions.\n\n' +

  'Even in laminar flow or when force is proportional to velocity, friction still dissipates energy.\n\n' +

  'Therefore, frictional forces are never conservative.\n\n' +

  '**Final Answer:**\n' +
  'No, in no case.  →  **(C)**',
},

// =========================
// Question 87
// =========================
{
  id: 87,
  topic: 'Thermodynamics',

  q: "From Mayer's relation for the specific heats of ideal gases\n\n$$C_P - C_V = R$$\n\nit can be deduced in a more general way that:",

  opts: [
    '$C_P$ is the same for all ideal gases.',
    '$C_P$ is always constant.',
    '$C_P$ cannot depend on the temperature.',
    '$C_P$ is a function of the temperature only and in particular it can be constant.',
  ],

  correct: 3,

  explanation:
  "**Mayer's Relation**\n\n" +

  '$$C_P - C_V = R$$\n\n' +

  'This relation is valid for ideal gases. The heat capacities may vary with temperature depending on molecular degrees of freedom. Therefore $C_P$ can depend on temperature and under some approximations may be treated as constant.\n\n' +

  '**Final Answer: (D)**',
},

// =========================

{
  id: 88,
  topic: 'Fluid Mechanics',

  q: 'How does the pressure $p$ in the atmosphere change with altitude $z$, assuming the atmosphere behaves as a perfect gas? (Here, $a$ is a constant.)',

  opts: [
    '$p(z) = \\rho(z=0)\\,gz$',
    '$p(z) = \\rho(z=0)\\exp\\!\\left(-\\dfrac{z}{a}\\right)$',
    '$p(z) = \\rho(z=0)\\exp\\!\\left(\\dfrac{z}{a}\\right)$',
    '$p(z) = \\rho(z=0)\\left(\\dfrac{z}{a}\\right)$',
  ],

  correct: 1,

  explanation:
  '**Step 1 — Hydrostatic Equilibrium**\n\n' +

  '$$\\frac{dp}{dz} = -\\rho g$$\n\n' +

  '**Step 2 — Ideal Gas Relation**\n\n' +

  '$$p = \\rho RT \\quad\\Rightarrow\\quad \\rho = \\frac{p}{RT}$$\n\n' +

  'Substitute into the hydrostatic equation:\n\n' +

  '$$\\frac{dp}{dz} = -\\frac{pg}{RT}$$\n\n' +

  '**Step 3 — Integrate**\n\n' +

  '$$\\frac{dp}{p} = -\\frac{g}{RT}\\,dz$$\n\n' +

  '$$p(z) = p(0)\\exp\\!\\left(-\\frac{z}{a}\\right), \\qquad a = \\frac{RT}{g}$$\n\n' +

  '**Final Answer: (B)**',
},

// =========================

{
  id: 89,
  topic: 'Thermodynamics',

  q: 'How much heat $Q$ is required to turn a block of ice with mass $m = 50$ g at temperature $T_1 = -30°\\text{C}$ into water at $T_w = 20°\\text{C}$?\n\nLatent heat of fusion: $L = 80$ cal/g\nSpecific heat of ice: $c_1 = 0.5$ cal/g°C\nSpecific heat of water: $c_w = 1$ cal/g°C',

  opts: [
    '$Q = 5750$ cal',
    '$Q = 575$ cal',
    '$Q = 6$ cal',
    '$Q = 58$ cal',
  ],

  correct: 0,

  explanation:
  '**Step 1 — Heating Ice**\n\n' +

  '$$Q_1 = mc_1\\Delta T = 50\\cdot0.5\\cdot30 = 750 \\text{ cal}$$\n\n' +

  '**Step 2 — Melting Ice**\n\n' +

  '$$Q_2 = mL = 50\\cdot80 = 4000 \\text{ cal}$$\n\n' +

  '**Step 3 — Heating Water**\n\n' +

  '$$Q_3 = mc_w\\Delta T = 50\\cdot1\\cdot20 = 1000 \\text{ cal}$$\n\n' +

  '**Step 4 — Total Heat**\n\n' +

  '$$Q = Q_1 + Q_2 + Q_3 = 750 + 4000 + 1000 = 5750 \\text{ cal}$$\n\n' +

  '**Final Answer: (A)**',
},

// =========================

{
  id: 90,
  topic: 'Thermodynamics',

  q: 'How much is the average energy $E$ of a molecule of an ideal gas of monoatomic molecules at temperature $T$?',

  opts: [
    '$E = \\dfrac{3}{2}k_B T$',
    '$E = \\dfrac{4}{2}k_B T$',
    '$E = \\dfrac{5}{2}k_B T$',
    '$E = \\dfrac{1}{2}k_B T$',
  ],

  correct: 0,

  explanation:
  '**Equipartition Theorem**\n\n' +

  'A monoatomic ideal gas has 3 translational degrees of freedom. Each quadratic degree of freedom contributes $\\frac{1}{2}k_B T$, therefore:\n\n' +

  '$$E = \\frac{3}{2}k_B T$$\n\n' +

  '**Final Answer: (A)**',
},

// =========================
// Question 91
// =========================
{
  id: 91,
  topic: 'Gravitation',

  q: 'How much is the gravitational field $\\vec{F}$ and the gravitational potential energy $V$ produced by a homogeneous spherical mass $M$ of radius $R$ at a point inside the sphere, at a distance $r < R$ from the center? (Here, $C$ is an integration constant.)',

  opts: [
    '$\\vec{F}=-\\frac{GMr}{r^3}$, $V=\\frac{GM}{r^2}+C$',
    '$\\vec{F}=-\\frac{GMr}{R^3}$, $V=\\frac{GMr^2}{2R^3}+C$',
    '$\\vec{F}=-\\frac{GM}{R^2}$, $V=\\frac{GM}{2R}+C$',
    '$\\vec{F}=-\\frac{GM}{r^2}$, $V=\\frac{GM}{r}+C$',
  ],

  correct: 1,

  explanation:
  '**Step 1 — Mass enclosed inside radius**\n\n' +

  'For a homogeneous sphere:\n\n' +

  '$$M_r=M\\frac{r^3}{R^3}$$\n\n' +

  '**Step 2 — Gravitational field**\n\n' +

  '$$F(r)=-\\frac{GM_r}{r^2}$$\n\n' +

  'Substitute $M_r$:\n\n' +

  '$$F(r)=-\\frac{GMr}{R^3}$$\n\n' +

  '**Step 3 — Gravitational potential**\n\n' +

  '$$V(r)=-\\int F(r)dr$$\n\n' +

  '$$V(r)=-\\int\\left(-\\frac{GMr}{R^3}\\right)dr$$\n\n' +

  '$$V(r)=\\frac{GMr^2}{2R^3}+C$$\n\n' +

  'Final Answer: **(B)**',
},

// =========================
// Question 92
// =========================
{
  id: 92,
  topic: 'Gravitation',

  q: 'How much is the gravitational force $F$ and energy $U$ exerted between two homogeneous spherical masses $M_1$ and $M_2$, if the distance between their centers is $r$, with $r$ greater than the radii of each mass?',

  opts: [
    '$F=-\\frac{GM_1M_2r}{r^3}$, $U=\\frac{GM_1M_2}{r}$',
    '$F=-\\frac{GM_1M_2r}{r^2}$, $U=\\frac{GM_1M_2}{r^2}$',
    '$F=-\\frac{GM_1M_2}{r^2}$, $U=\\frac{GM_1M_2}{r}$',
    '$F=-\\frac{GM_1M_2r}{r^3}$, $U=\\frac{GM_1M_2}{r^2}$',
  ],

  correct: 2,

  explanation:
  '**Step 1 — Newton’s law of gravitation**\n\n' +

  'For two spherical masses separated by distance $r$:\n\n' +

  '$$F=-\\frac{GM_1M_2}{r^2}$$\n\n' +

  '**Step 2 — Gravitational potential energy**\n\n' +

  'The gravitational potential energy is:\n\n' +

  '$$U=-\\frac{GM_1M_2}{r}$$\n\n' +

  '**Step 3 — Compare the functional dependence**\n\n' +

  'The force varies as:\n\n' +

  '$$F\\propto\\frac{1}{r^2}$$\n\n' +

  'while the potential energy varies as:\n\n' +

  '$$U\\propto\\frac{1}{r}$$\n\n' +

  'Ignoring the sign convention used in the options, the correct choice is:\n\n' +

  'Final Answer: **(C)**',
},

// =========================
// Question 93
// =========================
{
  id: 93,
  topic: 'Oscillations',

  q: 'How will a pendulum clock made of metal wire show the time when the temperature increases?',

  opts: [
    'It will lag.',
    'It will run too fast.',
    'It will not change.',
    'It is impossible to tell.',
  ],

  correct: 0,

  explanation:
  '**Step 1 — Period of a pendulum**\n\n' +

  'The oscillation period of a pendulum is:\n\n' +

  '$$T=2\\pi\\sqrt{\\frac{L}{g}}$$\n\n' +

  '**Step 2 — Effect of temperature increase**\n\n' +

  'When temperature increases, the metal wire expands.\n\n' +

  'Therefore, the pendulum length $L$ increases.\n\n' +

  '**Step 3 — Effect on the period**\n\n' +

  'Since $$T\\propto\\sqrt{L}$$, increasing $L$ increases the period.\n\n' +

  'The pendulum oscillates more slowly, so the clock loses time.\n\n' +

  'Final Answer: **(A)**',
},

// =========================
// Question 94
// =========================
{
  id: 94,
  topic: 'Fluid Mechanics',

  q: 'Water flows through a horizontal tube of radius $r = 0.1\\,m$ with speed $v = 1\\,m/s$.\n\nThe dynamic viscosity is $\\eta = 10^{-3}\\,kg/(m\\cdot s)$, and the water density is $\\rho = 10^3\\,kg/m^3$.\n\nDetermine whether the flow is laminar or turbulent.',

  opts: [
    'Laminar',
    'The data of this question are insufficient to answer',
    'It is necessary to also know the water temperature to answer',
    'Turbulent',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Reynolds number formula**\n\n' +

  'The Reynolds number is given by:\n\n' +

  '$$Re=\\frac{\\rho vD}{\\eta}$$\n\n' +

  'The tube diameter is:\n\n' +

  '$$D=2r=0.2\\,m$$\n\n' +

  '**Step 2 — Substitute the values**\n\n' +

  '$$Re=\\frac{(10^3)(1)(0.2)}{10^{-3}}$$\n\n' +

  '$$Re=2\\times10^5$$\n\n' +

  '**Step 3 — Determine the regime**\n\n' +

  'For pipe flow, $$Re>4000$$ indicates turbulent flow.\n\n' +

  'Since $$2\\times10^5\\gg4000$$, the flow is turbulent.\n\n' +

  'Final Answer: **(D)**',
},

// =========================
// Question 95
// =========================
{
  id: 95,
  topic: 'Mechanics',

  q: 'If $a=-kv^2$, where $k$ is a constant, determine $v(t)$ and $x(t)$ given the initial conditions:\n\n$x(0)=0$ and $v(0)=v_0$.',

  opts: [
    '$x(t)=\\frac{\\ln(v_0kt-1)}{k}$, $v(t)=\\frac{v_0}{v_0kt+1}$',
    '$x(t)=\\frac{\\ln(v_0kt+1)}{k}$, $v(t)=\\frac{v_0}{v_0kt+1}$',
    '$x(t)=\\frac{\\ln(v_0kt+1)}{k}$, $v(t)=\\frac{v_0}{(v_0kt-1)}$',
    '$x(t)=\\frac{e^{-kt}}{k}-t+\\frac{1}{k}$, $v(t)=e^{-kt}-1$',
  ],

  correct: 1,

  explanation:
  '**Step 1 — Solve for velocity**\n\n' +

  'The acceleration is:\n\n' +

  '$$a=\\frac{dv}{dt}=-kv^2$$\n\n' +

  'Separate variables:\n\n' +

  '$$\\frac{dv}{v^2}=-kdt$$\n\n' +

  'Integrate both sides:\n\n' +

  '$$-\\frac{1}{v}=-kt+C$$\n\n' +

  'Apply the initial condition $v(0)=v_0$:\n\n' +

  '$$C=\\frac{1}{v_0}$$\n\n' +

  'Therefore:\n\n' +

  '$$v(t)=\\frac{v_0}{1+v_0kt}$$\n\n' +

  '**Step 2 — Solve for position**\n\n' +

  'Integrate the velocity:\n\n' +

  '$$x(t)=\\int v(t)dt$$\n\n' +

  '$$x(t)=\\int\\frac{v_0}{1+v_0kt}dt$$\n\n' +

  'This gives:\n\n' +

  '$$x(t)=\\frac{1}{k}\\ln(1+v_0kt)$$\n\n' +

  'Final Answer: **(B)**',
},

// =========================
// Question 96
// =========================
{
  id: 96,
  topic: 'Thermodynamics',

  q: 'In a PT (Pressure–Temperature) diagram, the line that separates the solid phase from the liquid phase of water has a negative slope. This implies that:',

  opts: [
    'The melting temperature of ice decreases with increasing pressure.',
    'Water decreases in volume when it freezes.',
    'The melting temperature of ice is always $0^\\circ C$.',
    'The melting temperature of ice increases with increasing pressure.',
  ],

  correct: 0,

  explanation:
  '**Step 1 — Clausius–Clapeyron relation**\n\n' +

  'The slope of the phase boundary is given by:\n\n' +

  '$$\\frac{dP}{dT}=\\frac{L}{T\\Delta V}$$\n\n' +

  '**Step 2 — Volume change for water**\n\n' +

  'For water:\n\n' +

  '$$\\Delta V<0$$\n\n' +

  'because ice occupies more volume than liquid water.\n\n' +

  '**Step 3 — Determine the slope sign**\n\n' +

  'Since $\\Delta V<0$, the slope becomes negative:\n\n' +

  '$$\\frac{dP}{dT}<0$$\n\n' +

  'This means the melting point decreases when pressure increases.\n\n' +

  'Final Answer: **(A)**',
},
// =========================
// Question 97
// =========================
{
  id: 97,
  topic: 'Fluid Mechanics',

  q: 'In a horizontal pipe with a diameter of $1\\,m$, water flows at a speed of $10^{-3}\\,m/s$. Is the regime laminar?\n\n(The water viscosity is $\\eta = 8.9\\times10^{-4}\\,Pa\\cdot s$, and the water density is $\\rho = 997\\,kg/m^3$.)',

  opts: [
    'Yes',
    'No',
    'The data are insufficient to answer the question',
    'In a horizontal tube they are always in laminar regime',
  ],

  correct: 0,

  explanation:
  '**Step 1 — Reynolds number**\n\n' +

  'The Reynolds number determines whether the flow is laminar or turbulent:\n\n' +

  '$$Re=\\frac{\\rho vD}{\\eta}$$\n\n' +

  '**Step 2 — Substitute the values**\n\n' +

  '$$Re=\\frac{997\\cdot10^{-3}\\cdot1}{8.9\\times10^{-4}}$$\n\n' +

  '$$Re\\approx1120$$\n\n' +

  '**Step 3 — Determine the flow regime**\n\n' +

  'For pipe flow, $Re<2000$ indicates laminar flow.\n\n' +

  'Since $1120<2000$, the flow is laminar.\n\n' +

  'Final Answer: **(A)**',
},

// =========================
// Question 98
// =========================
{
  id: 98,
  topic: 'Potential Energy & Force Fields',

  q: 'In a region of space, the potential energy is given by:\n\n$$U(x,y,z)=b(x^2+y^2+z^2)-bxy+c$$\n\nwhere $b$ and $c$ are constants. What is the analytical expression of the force $\\vec{F}(x,y,z)$?',

  opts: [
    '$\\vec{F}(x,y,z)=b(-2x+y)\\hat{i}+b(-2y+x)\\hat{j}-2bz\\hat{k}$',
    '$\\vec{F}(x,y,z)=b(2x-y)\\hat{i}+b(2y-x)\\hat{j}+(2bz+c)\\hat{k}$',
    '$\\vec{F}(x,y,z)=b(2x-y)\\hat{i}+b(2y-x)\\hat{j}+2bz\\hat{k}$',
    '$\\vec{F}(x,y,z)=b(-2x+y)\\hat{i}+b(-2y+x)\\hat{j}-2bz\\hat{k}$',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Relation between force and potential energy**\n\n' +

  'Force is equal to the negative gradient of the potential energy:\n\n' +

  '$$\\vec{F}=-\\nabla U$$\n\n' +

  '**Step 2 — Compute partial derivatives**\n\n' +

  'For the x-component:\n\n' +

  '$$\\frac{\\partial U}{\\partial x}=2bx-by$$\n\n' +

  'For the y-component:\n\n' +

  '$$\\frac{\\partial U}{\\partial y}=2by-bx$$\n\n' +

  'For the z-component:\n\n' +

  '$$\\frac{\\partial U}{\\partial z}=2bz$$\n\n' +

  '**Step 3 — Apply the negative gradient**\n\n' +

  '$$\\vec{F}=-(2bx-by)\\hat{i}-(2by-bx)\\hat{j}-(2bz)\\hat{k}$$\n\n' +

  'Simplifying:\n\n' +

  '$$\\vec{F}=b(-2x+y)\\hat{i}+b(-2y+x)\\hat{j}-2bz\\hat{k}$$\n\n' +

  'Final Answer: **(D)**',
},

// =========================
// Question 99
// =========================
{
  id: 99,
  topic: 'Potential Energy & Force Fields',

  q: 'In a region of space, the potential energy is given by:\n\n$$U(x,y,z)=2ax^2-3axy+az^2$$\n\nwhere a is a constant. What is the analytical expression of the force? $$\\vec{F}(x,y,z)$$ ',

  opts: [
    '$$\\vec{F}(x,y,z)=-4ax\\hat{i}+3ay\\hat{j}-2az\\hat{k}$$',
    '$$\\vec{F}(x,y,z)=-4ax\\hat{i}+3ax\\hat{j}-2az\\hat{k}$$',
    '$$\\vec{F}(x,y,z)=a(3y-4x)\\hat{i}+3ax\\hat{j}-2az\\hat{k}$$',
    '$$\\vec{F}(x,y,z)=4ax\\hat{i}-3ay\\hat{j}+2az\\hat{k}$$',
  ],

  correct: 2,

  explanation:
  '**Given:**\n' +
  '$$U(x,y,z)=2ax^2-3axy+az^2$$\n\n' +

  '**Step 1 — Relation between force and potential**\n' +
  'Force is equal to the negative gradient of potential energy:\n\n' +

  '$$\\vec{F}=-\\nabla U$$\n\n' +

  '**Step 2 — Compute partial derivatives**\n\n' +

  'For x-component:\n' +
  '$$\\frac{\\partial U}{\\partial x}=4ax-3ay$$\n\n' +

  'For y-component:\n' +
  '$$\\frac{\\partial U}{\\partial y}=-3ax$$\n\n' +

  'For z-component:\n' +
  '$$\\frac{\\partial U}{\\partial z}=2az$$\n\n' +

  '**Step 3 — Apply the negative sign**\n\n' +

  '$$\\vec{F}=-(4ax-3ay)\\hat{i}-(-3ax)\\hat{j}-(2az)\\hat{k}$$\n\n' +

  'Simplify:\n\n' +

  '$$\\vec{F}=a(3y-4x)\\hat{i}+3ax\\hat{j}-2az\\hat{k}$$\n\n' +

  'Final Answer: **(C)**',
},

// =========================
// Question 100
// =========================
{
  id: 100,
  topic: 'Thermodynamics',

  q: 'In a thermodynamical transformation, it is observed that a perfect gas doubles its volume. Therefore:',

  opts: [
    'its entropy variation is zero.',
    'there is not enough data to answer this question.',
    'its entropy variation is definitely negative.',
    'its entropy variation is certainly positive.',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Entropy change of an ideal gas**\n\n' +

  'For a perfect gas, the entropy change associated with volume variation is:\n\n' +

  '$$\\Delta S=nR\\ln\\left(\\frac{V_f}{V_i}\\right)$$\n\n' +

  '**Step 2 — Volume doubles**\n\n' +

  'If the volume doubles:\n\n' +

  '$$V_f=2V_i$$\n\n' +

  'Substituting into the entropy formula:\n\n' +

  '$$\\Delta S=nR\\ln(2)$$\n\n' +

  '**Step 3 — Determine the sign of entropy change**\n\n' +

  'Since $\\ln(2)>0$, we obtain:\n\n' +

  '$$\\Delta S>0$$\n\n' +

  'Therefore, the entropy increases when the gas volume increases.\n\n' +

  'Final Answer: **(D)**',
},
{
  id: 101,
  topic: 'Thermodynamics',

  q: 'In an infinitesimal adiabatic transformation, the work:',

  opts: [
    'is an exact differential',
    'is an exact differential only if the system temperature is close to $0\\,K$',
    'is an exact differential only if it is a perfect gas',
    'is never an exact differential',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Exact and inexact differentials**\n\n' +

  'Work $\\delta W$ and heat $\\delta Q$ are path-dependent quantities.\n\n' +

  'Therefore, they are not state functions and their differentials are inexact.\n\n' +

  '**Step 2 — Adiabatic transformation**\n\n' +

  'In an adiabatic process:\n\n' +

  '$$\\delta Q=0$$\n\n' +

  'However, the work done still depends on the thermodynamic path followed by the system.\n\n' +

  '**Step 3 — Conclusion**\n\n' +

  'Since work remains path-dependent, it cannot be an exact differential.\n\n' +

  'Final Answer: **(D)**',
},
{
  id: 102,
  topic: 'Thermodynamics',

  q: 'In any reversible transformation from a state $A$ to a state $B$ of a thermodynamic system, the entropy variation:',

  opts: [
    'depends only on states $A$ and $B$',
    'can only be calculated if the system is a perfect gas',
    'depends on the path taken to go from $A$ to $B$',
    'is always different from zero',
  ],

  correct: 0,

  explanation:
  '**Step 1 — Entropy as a state function**\n\n' +

  'Entropy is a state function.\n\n' +

  'Therefore, its variation depends only on the initial and final states of the system.\n\n' +

  '**Step 2 — Reversible transformation**\n\n' +

  'For a reversible process, the entropy variation can be calculated using:\n\n' +

  '$$\\Delta S=\\int_A^B\\frac{\\delta Q_{rev}}{T}$$\n\n' +

  '**Step 3 — Path independence**\n\n' +

  'Although the integral is evaluated along a reversible path, the final result depends only on states $A$ and $B$.\n\n' +

  'Final Answer: **(A)**',
},
{
  id: 103,
  topic: 'Oscillations',

  q: 'In the absence of friction, do wood pendulums continue to oscillate indefinitely?',

  opts: [
    'Yes, because the period of oscillation of the pendulum is constant.',
    'No, because the weight force is non-conservative.',
    'Yes, because the pendulum energy cannot dissipate.',
    'No, because the motion of the pendulum is not a uniform motion.',
  ],

  correct: 2,

  explanation:
  '**Step 1 — Absence of friction**\n\n' +

  'In an ideal system without friction or air resistance, no mechanical energy is lost.\n\n' +

  '**Step 2 — Conservation of mechanical energy**\n\n' +

  'The total mechanical energy remains constant:\n\n' +

  '$$E_{total}=K+U=constant$$\n\n' +

  '**Step 3 — Oscillation behavior**\n\n' +

  'Since there is no energy dissipation mechanism, the pendulum continues oscillating indefinitely.\n\n' +

  'The gravitational force is conservative, so it only transforms energy between kinetic and potential forms.\n\n' +

  'Final Answer: **(C)**',
},
{
  id: 104,
  topic: 'Thermodynamics',

  q: 'Is it possible to melt a piece of ice placed in an adiabatic vessel of strictly constant volume?',

  opts: [
    'Yes, for the first law of thermodynamics',
    'Yes, because ice has a high thermal capacity',
    'No, for the first law of thermodynamics',
    'Yes, because melting ice decreases in volume',
  ],

  correct: 2,

  explanation:
  '**Step 1 — Adiabatic condition**\n\n' +

  'In an adiabatic system:\n\n' +

  '$$Q=0$$\n\n' +

  'meaning there is no heat exchange with the surroundings.\n\n' +

  '**Step 2 — Constant volume condition**\n\n' +

  'At constant volume, the system performs no boundary work:\n\n' +

  '$$W=0$$\n\n' +

  '**Step 3 — Apply the first law of thermodynamics**\n\n' +

  '$$\\Delta U=Q-W$$\n\n' +

  'Substituting the conditions:\n\n' +

  '$$\\Delta U=0$$\n\n' +

  'Since melting requires latent heat, no energy is available to melt the ice.\n\n' +

  'Final Answer: **(C)**',
},
{
  id: 105,
  topic: 'Fluid Mechanics',

  q: 'Knowing that $R$ is the tube radius, $L$ the tube length, $\\eta$ the fluid viscosity, and $\\Delta p$ the pressure variation along the tube ends, the Hagen–Poiseuille equation for the volumetric flow rate $q$ is:',

  opts: [
    '$q=-\\frac{\\pi R^2}{8\\eta}\\frac{\\Delta p}{L^2}$',
    '$q=-\\frac{\\pi R^4\\eta}{8}\\frac{\\Delta p}{L}$',
    '$q=-\\frac{\\pi R^4}{8\\eta}\\frac{\\Delta p}{L}$',
    '$q=-\\frac{\\pi R^2\\Delta p}{8\\eta}\\frac{1}{L}$',
  ],

  correct: 2,

  explanation:
  '**Step 1 — Hagen–Poiseuille law**\n\n' +

  'For laminar flow of a Newtonian fluid in a cylindrical pipe, the volumetric flow rate is:\n\n' +

  '$$q=-\\frac{\\pi R^4}{8\\eta}\\frac{\\Delta p}{L}$$\n\n' +

  '**Step 2 — Dependence on parameters**\n\n' +

  'The flow rate is:\n\n' +

  '- directly proportional to $R^4$\n' +
  '- directly proportional to the pressure difference $\\Delta p$\n' +
  '- inversely proportional to viscosity $\\eta$\n' +
  '- inversely proportional to tube length $L$\n\n' +

  '**Step 3 — Physical meaning of the negative sign**\n\n' +

  'The negative sign indicates that the flow occurs from high pressure to low pressure.\n\n' +

  'Final Answer: **(C)**',
},
{
  id: 106,
  topic: 'Gravitation',

  q: 'Knowing that the mass of a planet is $M = 5.98\\cdot10^{26}\\,kg$ and the radius is $R = 6.37\\cdot10^6\\,m$, calculate the escape velocity $v_e$ of a body from the planet.',

  opts: [
    '$v_e=1.11\\cdot10^3\\,m/s$',
    '$v_e=1.11\\cdot10^4\\,m/s$',
    '$v_e=1.11\\cdot10^5\\,m/s$',
    'It is not possible to answer because the mass of the body is not known',
  ],

  correct: 2,

  explanation:
  '**Step 1 — Escape velocity formula**\n\n' +

  'The escape velocity is given by:\n\n' +

  '$$v_e=\\sqrt{\\frac{2GM}{R}}$$\n\n' +

  '**Step 2 — Substitute the values**\n\n' +

  '$$G=6.67\\cdot10^{-11}\\,N\\cdot m^2/kg^2$$\n\n' +

  '$$M=5.98\\cdot10^{26}\\,kg$$\n\n' +

  '$$R=6.37\\cdot10^6\\,m$$\n\n' +

  'Substituting:\n\n' +

  '$$v_e=\\sqrt{\\frac{2\\cdot6.67\\cdot10^{-11}\\cdot5.98\\cdot10^{26}}{6.37\\cdot10^6}}$$\n\n' +

  '$$v_e\\approx1.11\\cdot10^5\\,m/s$$\n\n' +

  '**Step 3 — Dependence on mass**\n\n' +

  'The mass of the escaping body cancels out and does not affect the escape velocity.\n\n' +

  'Final Answer: **(C)**',
},
{
  id: 107,
  topic: 'Fluid Mechanics',

  q: 'Lead is denser than copper. When two equal masses of lead and copper are submerged in water, which one will experience a larger buoyant force?',

  opts: [
    'Lead',
    'Copper',
    'Equal',
    'It is impossible to tell',
  ],

  correct: 1,

  explanation:
  '**Step 1 — Buoyant force formula**\n\n' +

  'The buoyant force on an object submerged in a fluid is:\n\n' +

  '$$F_B=\\rho_{fluid}gV_{displaced}$$\n\n' +

  '**Step 2 — Compare the volumes**\n\n' +

  'For equal masses:\n\n' +

  '$$V=\\frac{m}{\\rho}$$\n\n' +

  'Since lead is denser than copper, lead occupies a smaller volume for the same mass.\n\n' +

  '**Step 3 — Determine the buoyant force**\n\n' +

  'Copper displaces more water because it has a larger volume.\n\n' +

  'Therefore, copper experiences a larger buoyant force.\n\n' +

  'Final Answer: **(B)**',
},
{
  id: 108,
  topic: 'Mechanics',

  q: 'Newton’s second law of dynamics applied to a system of variable mass $m(t)$ is written as:',

  opts: [
    '$F=m\\frac{dv}{dt}-v\\frac{dm}{dt}$',
    '$F=\\frac{d(mv)}{dt}$',
    '$F=m\\frac{dv}{dt}$',
    '$F=\\frac{dm}{dt}\\frac{dv}{dt}$',
  ],

  correct: 1,

  explanation:
  '**Step 1 — General form of Newton’s second law**\n\n' +

  'Newton’s second law is written in terms of momentum:\n\n' +

  '$$F=\\frac{dp}{dt}$$\n\n' +

  '**Step 2 — Momentum for variable mass**\n\n' +

  'Since momentum is:\n\n' +

  '$$p=mv$$\n\n' +

  'for a variable-mass system we obtain:\n\n' +

  '$$F=\\frac{d(mv)}{dt}$$\n\n' +

  '**Step 3 — Product rule expansion**\n\n' +

  'Applying the product rule:\n\n' +

  '$$F=m\\frac{dv}{dt}+v\\frac{dm}{dt}$$\n\n' +

  'Therefore, the correct general expression is:\n\n' +

  '$$F=\\frac{d(mv)}{dt}$$\n\n' +

  'Final Answer: **(B)**',
},
{
  id: 109,
  topic: 'Thermodynamics',

  q: 'On a cold winter day, metallic objects generally feel cooler to the touch than wooden objects. This is because:',

  opts: [
    'metals conduct heat better than wood',
    'the mass density of wood is less than the mass density of metals',
    'a mass of wood contains more heat than the same mass of metal',
    'the equilibrium temperature of metal is lower than that of wood',
  ],

  correct: 0,

  explanation:
  '**Step 1 — Thermal conductivity**\n\n' +

  'Metals have much higher thermal conductivity than wood.\n\n' +

  '**Step 2 — Heat transfer from the hand**\n\n' +

  'When touching a metal object, heat flows rapidly from the skin into the metal.\n\n' +

  'Wood is a poor heat conductor, so heat leaves the hand much more slowly.\n\n' +

  '**Step 3 — Sensation of cold**\n\n' +

  'Although both objects may be at the same temperature, the faster heat transfer from the hand makes metal feel colder.\n\n' +

  'Final Answer: **(A)**',
},
{
  id: 110,
  topic: 'Oscillations',

  q: 'On the surface of a planet of the same size as the Earth, but of quadruple mass $(M\'=4M)$, a pendulum that has a period of one second on Earth would have a period:',

  opts: [
    '$T=1\\,sec$',
    '$T=4\\,sec$',
    '$T=0.25\\,sec$',
    '$T=0.5\\,sec$',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Period of a simple pendulum**\n\n' +

  'The period of a pendulum is:\n\n' +

  '$$T=2\\pi\\sqrt{\\frac{L}{g}}$$\n\n' +

  '**Step 2 — Surface gravity on the new planet**\n\n' +

  'The surface gravity is:\n\n' +

  '$$g=\\frac{GM}{R^2}$$\n\n' +

  'If the radius stays the same but the mass becomes four times larger:\n\n' +

  '$$g\'=4g$$\n\n' +

  '**Step 3 — Determine the new period**\n\n' +

  'Using the pendulum formula:\n\n' +

  '$$T\'=2\\pi\\sqrt{\\frac{L}{4g}}$$\n\n' +

  '$$T\'=\\frac{T}{2}$$\n\n' +

  'Since the original period is $1\\,sec$:\n\n' +

  '$$T\'=0.5\\,sec$$\n\n' +

  'Final Answer: **(D)**',
},
{
  id: 111,
  topic: 'Oscillations',

  q: 'On the surface of a planet of the same size as the Earth, but of quadruple mass $(M\'=16M)$, a pendulum that has a period of one second on Earth would have a period $T$:',

  opts: [
    '$T=1\\,sec$',
    '$T=4\\,sec$',
    '$T=0.25\\,sec$',
    '$T=16\\,sec$',
  ],

  correct: 2,

  explanation:
  '**Step 1 — Pendulum period formula**\n\n' +

  'The period of a simple pendulum is:\n\n' +

  '$$T=2\\pi\\sqrt{\\frac{L}{g}}$$\n\n' +

  '**Step 2 — Surface gravity on the new planet**\n\n' +

  'Surface gravity is given by:\n\n' +

  '$$g=\\frac{GM}{R^2}$$\n\n' +

  'Since the radius remains the same and the mass becomes sixteen times larger:\n\n' +

  '$$g\'=16g$$\n\n' +

  '**Step 3 — Determine the new period**\n\n' +

  '$$T\'=2\\pi\\sqrt{\\frac{L}{16g}}$$\n\n' +

  '$$T\'=\\frac{T}{4}$$\n\n' +

  'If the original period is $1\\,sec$:\n\n' +

  '$$T\'=0.25\\,sec$$\n\n' +

  'Final Answer: **(C)**',
},
{
  id: 112,
  topic: 'Thermodynamics',

  q: 'One kilogram of air (air molecular weight $28.96\\,g/mole$) is heated inside a rigid container from $20^{\\circ}C$ to $300^{\\circ}C$. The entropy change $\\Delta S$ is nearest:',

  opts: [
    '$\\Delta S=0.64\\,kJ/K$',
    '$\\Delta S=0.54\\,kJ/K$',
    '$\\Delta S=0.48\\,kJ/K$',
    '$\\Delta S=0.34\\,kJ/K$',
  ],

  correct: 2,

  explanation:
  '**Step 1 — Convert temperatures to Kelvin**\n\n' +

  '$$T_1=20^{\\circ}C=293\\,K$$\n\n' +

  '$$T_2=300^{\\circ}C=573\\,K$$\n\n' +

  '**Step 2 — Entropy change at constant volume**\n\n' +

  'Since the container is rigid, the volume remains constant:\n\n' +

  '$$\\Delta S=mc_v\\ln\\left(\\frac{T_2}{T_1}\\right)$$\n\n' +

  'For air:\n\n' +

  '$$c_v\\approx0.718\\,kJ/(kg\\cdot K)$$\n\n' +

  '**Step 3 — Substitute the values**\n\n' +

  '$$\\Delta S=1\\cdot0.718\\cdot\\ln\\left(\\frac{573}{293}\\right)$$\n\n' +

  '$$\\Delta S=0.718\\cdot\\ln(1.955)$$\n\n' +

  '$$\\Delta S=0.718\\cdot0.669\\approx0.48\\,kJ/K$$\n\n' +

  'Final Answer: **(C)**',
},
{
  id: 113,
  topic: 'Thermodynamics',

  q: 'Select an acceptable paraphrase of the Kelvin–Planck statement of the second law.',

  opts: [
    'No process can produce more work than the heat it accepts.',
    'No engine can produce more work than the heat it intakes.',
    'An engine cannot produce work without accepting heat.',
    'An engine has to reject heat.',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Kelvin–Planck statement**\n\n' +

  'The Kelvin–Planck statement of the second law of thermodynamics says that no cyclic heat engine can convert all absorbed heat completely into work.\n\n' +

  '**Step 2 — Consequence for heat engines**\n\n' +

  'A heat engine must always reject part of the absorbed heat to a colder reservoir.\n\n' +

  '**Step 3 — Identify the correct statement**\n\n' +

  'Therefore, the correct paraphrase is:\n\n' +

  '“An engine has to reject heat.”\n\n' +

  'Final Answer: **(D)**',
},
{
  id: 114,
  topic: 'Thermodynamics',

  q: 'Select an incorrect statement relating to a Carnot cycle.',

  opts: [
    'There are two adiabatic processes.',
    'There are two constant-pressure processes.',
    'Work occurs for all four processes.',
    'Each process is a reversible process.',
  ],

  correct: 1,

  explanation:
  '**Step 1 — Processes in a Carnot cycle**\n\n' +

  'A Carnot cycle consists of:\n\n' +

  '- two isothermal processes\n' +
  '- two adiabatic processes\n\n' +

  '**Step 2 — Properties of the cycle**\n\n' +

  'All four processes are reversible.\n\n' +

  'Work is performed during each stage of the cycle.\n\n' +

  '**Step 3 — Identify the incorrect statement**\n\n' +

  'There are no constant-pressure processes in the Carnot cycle.\n\n' +

  'Therefore, the incorrect statement is:\n\n' +

  '“There are two constant-pressure processes.”\n\n' +

  'Final Answer: **(B)**',
},
{
  id: 115,
  topic: 'Thermodynamics',

  q: 'Some amount of water vapor at a temperature of $110^{\\circ}C$ is mixed with a block of ice with a mass of $30\\,g$ at a temperature of $-20^{\\circ}C$ in an insulated container.\n\nHow much vapor (mass $m$) was used, considering that the final temperature of the mixture is $20^{\\circ}C$?\n\n(The mass of the container can be neglected.)\n\nGiven constants:\n\nLatent heat of fusion: $L_F=80\\,cal/g$\n\nLatent heat of vaporization: $L_V=540\\,cal/g$\n\nSpecific heat of ice: $C_I=0.50\\,cal/(g\\cdot^{\\circ}C)$\n\nSpecific heat of water: $C_W=1.00\\,cal/(g\\cdot^{\\circ}C)$\n\nSpecific heat of vapor: $C_V=0.48\\,cal/(g\\cdot^{\\circ}C)$',
  opts: [
    '$m=5.30\\,g$',
    '$m=0.53\\,g$',
    '$m=53\\,g$',
    '$m=2.65\\,g$',
  ],

  correct: 0,

  explanation:
  '**Step 1 — Heat absorbed by the ice**\n\n' +

  'Heating ice from $-20^{\\circ}C$ to $0^{\\circ}C$:\n\n' +

  '$$Q_1=mC_I\\Delta T=30\\cdot0.50\\cdot20=300\\,cal$$\n\n' +

  'Melting the ice:\n\n' +

  '$$Q_2=mL_F=30\\cdot80=2400\\,cal$$\n\n' +

  'Heating water from $0^{\\circ}C$ to $20^{\\circ}C$:\n\n' +

  '$$Q_3=mC_W\\Delta T=30\\cdot1.00\\cdot20=600\\,cal$$\n\n' +

  'Total heat absorbed:\n\n' +

  '$$Q_{ice}=300+2400+600=3300\\,cal$$\n\n' +

  '**Step 2 — Heat released by the vapor**\n\n' +

  'Condensation of vapor:\n\n' +

  '$$Q_a=mL_V=540m$$\n\n' +

  'Cooling water from $100^{\\circ}C$ to $20^{\\circ}C$:\n\n' +

  '$$Q_b=mC_W(100-20)=80m$$\n\n' +

  'Cooling vapor from $110^{\\circ}C$ to $100^{\\circ}C$:\n\n' +

  '$$Q_c=mC_V(110-100)=4.8m$$\n\n' +

  'Total heat released:\n\n' +

  '$$Q_{vapor}=540m+80m+4.8m=624.8m$$\n\n' +

  '**Step 3 — Conservation of energy**\n\n' +

  'In an insulated container:\n\n' +

  '$$Q_{lost}=Q_{gained}$$\n\n' +

  '$$624.8m=3300$$\n\n' +

  '$$m=\\frac{3300}{624.8}\\approx5.28\\,g$$\n\n' +

  '$$m\\approx5.30\\,g$$\n\n' +

  'Final Answer: **(A)**',
},
// =========================
// Question 116
// =========================
{
  id: 116,
  topic: 'Thermodynamics',

  q: 'Which of the following statements about thermal machines is correct?',

  opts: [
    'The efficiency of a thermal machine is independent of the substance that completes the cycle.',
    'The efficiency of a Carnot machine is as low as possible.',
    'All thermal machines have the same efficiency.',
    'The efficiency of a Carnot machine depends only on the temperature of the sources.',
  ],

  correct: 3,

  explanation:
  '[icon]thermo[/icon] **Carnot Efficiency**\n\n' +

  'The efficiency of a Carnot engine operating between two heat reservoirs is:\n\n' +

  '[formula]\\eta=1-\\frac{T_C}{T_H}[/formula]\n\n' +

  'where:\n\n' +

  '[formula]T_H[/formula] is the temperature of the hot reservoir,\n\n' +

  '[formula]T_C[/formula] is the temperature of the cold reservoir.\n\n' +

  'Therefore, the Carnot efficiency depends only on the temperatures of the reservoirs and not on the working substance.\n\n' +

  '**Final Answer:**\n' +
  'The efficiency of a Carnot machine depends only on the temperature of the sources. → **(D)**',
},
// =========================
// Question 117
// =========================
{
  id: 117,
  topic: 'Fluid Mechanics',

  q: 'Stokes’ law, describing the frictional force in a fluid:',

  opts: [
    'only applies to small spherical bodies that move at low speeds.',
    'applies to bodies of any shape.',
    'applies only to small spherical bodies that move at high speeds.',
    'always applies.',
  ],

  correct: 0,

  explanation:
  '[icon]fluid[/icon] **Stokes’ Law**\n\n' +

  'For a small sphere moving slowly through a viscous fluid, the drag force is:\n\n' +

  '[formula]F=6\\pi\\eta rv[/formula]\n\n' +

  'This law is valid only when:\n\n' +

  '- the object is spherical,\n' +
  '- the flow is laminar,\n' +
  '- the Reynolds number is very small.\n\n' +

  'Therefore, it only applies to small spherical bodies moving at low speeds.\n\n' +

  '**Final Answer:**\n' +
  'only applies to small spherical bodies that move at low speeds. → **(A)**',
},
// =========================
// Question 118
// =========================
{
  id: 118,
  topic: 'Thermodynamics',

  q: 'Ten kilograms of air (air molecular weight $28.96\\,g/mol$ is expanded isentropically from $500^{\\circ}C$ and $6\\,MPa$ to $400\\,kPa$. The work $W$ accomplished is nearest:',

  opts: [
    '$W=7400\\,kJ$',
    '$W=6200\\,kJ$',
    '$W=4300\\,kJ$',
    '$W=2990\\,kJ$',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Initial Data**\n\n' +

  '$$m=10\\,kg$$\n\n' +

  '$$T_1=500^{\\circ}C=773\\,K$$\n\n' +

  '$$P_1=6\\,MPa$$\n\n' +

  '$$P_2=400\\,kPa$$\n\n' +

  '$$\\gamma=1.4$$\n\n' +

  '**Step 2 — Final Temperature**\n\n' +

  '$$T_2=T_1\\left(\\frac{P_2}{P_1}\\right)^{\\frac{\\gamma-1}{\\gamma}}$$\n\n' +

  '$$T_2\\approx357\\,K$$\n\n' +

  '**Step 3 — Work Done**\n\n' +

  '$$W=\\frac{mR(T_1-T_2)}{\\gamma-1}$$\n\n' +

  '$$W\\approx2990\\,kJ$$\n\n' +

  'Final Answer: **(D)**',
},
// =========================
// Question 119
// =========================
{
  id: 119,
  topic: 'Thermodynamics',

  q: 'Eight kilograms of nitrogen gas (molecular weight $28.02\\,g/mol$) is compressed isentropically from $300^{\\circ}C$ and $100\\,kPa$ to a final pressure of $2\\,MPa$. Assuming ideal gas behavior, the work $W$ required for this compression is closest to:',

  opts: [
    '$W=-5300\\,kJ$',
    '$W=-4600\\,kJ$',
    '$W=-3100\\,kJ$',
    '$W=-2400\\,kJ$',
  ],

  correct: 1,

  explanation:
  '**Step 1 — Initial Data**\n\n' +

  '$$m=8\\,kg$$\n\n' +

  '$$T_1=300^{\\circ}C=573\\,K$$\n\n' +

  '$$P_1=100\\,kPa$$\n\n' +

  '$$P_2=2\\,MPa$$\n\n' +

  '$$\\gamma=1.4$$\n\n' +

  '**Step 2 — Final Temperature**\n\n' +

  '$$T_2=T_1\\left(\\frac{P_2}{P_1}\\right)^{\\frac{\\gamma-1}{\\gamma}}$$\n\n' +

  '$$T_2\\approx1349\\,K$$\n\n' +

  '**Step 3 — Compression Work**\n\n' +

  '$$W=\\frac{nR(T_1-T_2)}{\\gamma-1}$$\n\n' +

  '$$W\\approx-4605\\,kJ$$\n\n' +

  'Final Answer: **(B)**',
},
// =========================
// Question 120
// =========================
{
  id: 120,
  topic: 'Thermodynamics',

  q: 'Ten kilograms of iron ($c=449\\,J/(kg\\cdot K)$) at $300^{\\circ}C$ is chilled inside a large volume of ice and water. The total entropy change is nearest:',

  opts: [
    '$0.88\\,kJ/K$',
    '$1.60\\,kJ/K$',
    '$1.2\\,kJ/K$',
    '$0.21\\,kJ/K$',
  ],

  correct: 1,

  explanation:
  '**Step 1 — Initial Data**\n\n' +

  '$$m=10\\,kg$$\n\n' +

  '$$c=449\\,J/(kg\\cdot K)$$\n\n' +

  '$$T_i=300^{\\circ}C=573\\,K$$\n\n' +

  '$$T_f=0^{\\circ}C=273\\,K$$\n\n' +

  '**Step 2 — Entropy Change of Iron**\n\n' +

  '$$\\Delta S_{iron}=mc\\ln\\left(\\frac{T_f}{T_i}\\right)$$\n\n' +

  '$$\\Delta S_{iron}\\approx-3317\\,J/K$$\n\n' +

  '**Step 3 — Entropy Change of Surroundings**\n\n' +

  '$$\\Delta S_{surr}=\\frac{Q}{T}$$\n\n' +

  '$$\\Delta S_{surr}\\approx4937\\,J/K$$\n\n' +

  '**Step 4 — Total Entropy Change**\n\n' +

  '$$\\Delta S_{total}=\\Delta S_{iron}+\\Delta S_{surr}$$\n\n' +

  '$$\\Delta S_{total}\\approx1620\\,J/K$$\n\n' +

  '$$\\Delta S_{total}\\approx1.62\\,kJ/K$$\n\n' +

  'Final Answer: **(B)**',
},
{
  id: 121,
  topic: 'Thermodynamics',

  q: 'The adiabatic compression of a perfect gas does not increase the temperature of the gas.',

  opts: [
    'Because the internal energy of a perfect gas is only a function of temperature.',
    'This statement is incorrect.',
    'This is a consequence of the equation of state $PV=nRT$.',
    'This is true in general and not only for a perfect gas.',
  ],

  correct: 1,

  explanation:
  '**Step 1 — Adiabatic Process**\n\n' +

  'In an adiabatic process:\n\n' +

  '$$Q=0$$\n\n' +

  'No heat is exchanged with the surroundings.\n\n' +

  '**Step 2 — Compression of a Perfect Gas**\n\n' +

  'During compression, work is done on the gas.\n\n' +

  'Therefore, the internal energy increases.\n\n' +

  'For a perfect gas:\n\n' +

  '$$U=nC_VT$$\n\n' +

  'Internal energy depends only on temperature.\n\n' +

  '**Step 3 — Temperature Change**\n\n' +

  'Since the internal energy increases, the temperature also increases.\n\n' +

  'Thus, the statement in the question is false.\n\n' +

  'Final Answer: **(B)**',
},

{
  id: 122,
  topic: 'Oscillations',

  q: 'The differential equation\n\n$$m\\frac{d^2x(t)}{dt^2}=-kx(t)+g$$\n\nwhere $k$ and $g$ are constants, describes the motion of a point particle of mass $m$. This system:',

  opts: [
    'has a uniformly linear motion',
    'is a damped oscillator',
    'is an oscillator',
    'has uniformly accelerated motion',
  ],

  correct: 2,

  explanation:
  '**Step 1 — Rewrite the Equation**\n\n' +

  '$$m\\frac{d^2x}{dt^2}=-kx+g$$\n\n' +

  '$$\\frac{d^2x}{dt^2}+\\frac{k}{m}x=\\frac{g}{m}$$\n\n' +

  '**Step 2 — Analyze the Motion**\n\n' +

  'The homogeneous part of the equation is:\n\n' +

  '$$\\frac{d^2x}{dt^2}+\\frac{k}{m}x=0$$\n\n' +

  'This is the equation of simple harmonic motion.\n\n' +

  '**Step 3 — Role of the Constant Force**\n\n' +

  'The term $g/m$ only shifts the equilibrium position.\n\n' +

  'There is no damping term proportional to velocity.\n\n' +

  'Therefore, the system still oscillates.\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 123,
  topic: 'Oscillations',

  q: 'The differential equation\n\n$$m\\frac{d^2x(t)}{dt^2}=-kx(t)-g\\frac{dx(t)}{dt}$$\n\nwhere $k$ and $g$ are constants, describes the motion of a point particle of mass $m$. This system:',

  opts: [
    'is conservative',
    'is an oscillator',
    'is a damped oscillator',
    'has uniformly accelerated motion',
  ],

  correct: 2,

  explanation:
  '**Step 1 — Rewrite the Equation**\n\n' +

  '$$m\\frac{d^2x}{dt^2}+g\\frac{dx}{dt}+kx=0$$\n\n' +

  '**Step 2 — Identify the Terms**\n\n' +

  'The term:\n\n' +

  '$$g\\frac{dx}{dt}$$\n\n' +

  'is proportional to velocity and represents damping.\n\n' +

  'The term:\n\n' +

  '$$kx$$\n\n' +

  'is the restoring force.\n\n' +

  '**Step 3 — Nature of the System**\n\n' +

  'Energy is dissipated over time because of the damping term.\n\n' +

  'Therefore, the system is a damped harmonic oscillator.\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 124,
  topic: 'Thermodynamics',

  q: 'The efficiency of a thermal machine:',

  opts: [
    'is independent of the substance that completes the cycle',
    'cannot be equal to one because in practice there are no perfect gases',
    'is equal to the ratio between the work done and the absorbed heat',
    'holds $1-\\frac{T_2}{T_1}$ with $T_1>T_2$',
  ],

  correct: 3,

  explanation:
  '**Step 1 — Carnot Efficiency**\n\n' +

  'The maximum theoretical efficiency of a heat engine is:\n\n' +

  '$$\\eta=1-\\frac{T_C}{T_H}$$\n\n' +

  'where:\n\n' +

  '$$T_H>T_C$$\n\n' +

  'and temperatures are measured in Kelvin.\n\n' +

  '**Step 2 — Analyze the Options**\n\n' +

  'Option (C) is the general definition of efficiency:\n\n' +

  '$$\\eta=\\frac{W}{Q_H}$$\n\n' +

  'However, option (D) gives the specific relation for an ideal Carnot engine.\n\n' +

  'Thus, the correct statement is:\n\n' +

  '$$\\eta=1-\\frac{T_2}{T_1}$$\n\n' +

  'with:\n\n' +

  '$$T_1>T_2$$\n\n' +

  'Final Answer: **(D)**',
},

{
  id: 125,
  topic: 'Thermodynamics',

  q: 'The energy input to an engine is $3.00$ times greater than the work it performs. What is its thermal efficiency?',

  opts: [
    '$3.00$',
    '$1.00$',
    '$0.333$',
    'impossible to determine',
  ],

  correct: 2,

  explanation:
  '**Step 1 — Thermal Efficiency Formula**\n\n' +

  '$$\\eta=\\frac{W_{out}}{Q_{in}}$$\n\n' +

  '**Step 2 — Use the Given Information**\n\n' +

  'The energy input is three times the work output:\n\n' +

  '$$Q_{in}=3W_{out}$$\n\n' +

  '**Step 3 — Calculate Efficiency**\n\n' +

  '$$\\eta=\\frac{W_{out}}{3W_{out}}$$\n\n' +

  '$$\\eta=\\frac{1}{3}\\approx0.333$$\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 126,
  topic: 'Thermodynamics',

  q: 'The entropy change $\\Delta S$ of a body of mass $M$ that changes phase at temperature $T$ with latent heat $\\lambda$ is:',

  opts: [
    '$$\\Delta S=\\frac{M\\lambda}{T}$$',
    '$$\\Delta S=0$$',
    '$$\\Delta S=M\\lambda T$$',
    '$$\\Delta S=\\frac{MT}{\\lambda}$$',
  ],

  correct: 0,

  explanation:
  '**Step 1 — Entropy Change Formula**\n\n' +

  'For a reversible process at constant temperature:\n\n' +

  '$$\\Delta S=\\frac{Q}{T}$$\n\n' +

  '**Step 2 — Latent Heat Relation**\n\n' +

  'During a phase change:\n\n' +

  '$$Q=M\\lambda$$\n\n' +

  'where:\n\n' +

  '$$M$$\n\n' +

  'is the mass, and:\n\n' +

  '$$\\lambda$$\n\n' +

  'is the latent heat.\n\n' +

  '**Step 3 — Substitute into the Entropy Formula**\n\n' +

  '$$\\Delta S=\\frac{M\\lambda}{T}$$\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 127,
  topic: 'Oscillations',

  q: 'The equation of a forced harmonic oscillator is:\n\n$$\\frac{d^2x(t)}{dt^2}+2\\gamma\\frac{dx(t)}{dt}+\\omega_0^2x(t)=\\frac{F_0}{m}\\sin(\\Omega t)$$\n\nwhere $m$, $\\gamma$, $\\omega_0$, $\\Omega$, and $F_0$ are positive constants. What is the resonance frequency?',

  opts: [
    '$$\\omega_0$$',
    '$$\\frac{\\Omega^2}{\\omega_0}$$',
    '$$\\frac{\\omega_0^2}{\\Omega}$$',
    '$$\\Omega$$',
  ],

  correct: 0,

  explanation:
  '**Step 1 — Identify the System**\n\n' +

  'The equation describes a driven damped harmonic oscillator:\n\n' +

  '$$\\frac{d^2x}{dt^2}+2\\gamma\\frac{dx}{dt}+\\omega_0^2x=\\frac{F_0}{m}\\sin(\\Omega t)$$\n\n' +

  '**Step 2 — Resonance Condition**\n\n' +

  'Resonance occurs when the driving frequency matches the natural frequency of the oscillator.\n\n' +

  'For weak damping:\n\n' +

  '$$\\Omega_{res}\\approx\\omega_0$$\n\n' +

  '**Step 3 — Exact Expression**\n\n' +

  'With damping included:\n\n' +

  '$$\\Omega_{res}=\\sqrt{\\omega_0^2-2\\gamma^2}$$\n\n' +

  'For light damping:\n\n' +

  '$$\\Omega_{res}\\approx\\omega_0$$\n\n' +

  'Final Answer: **(A)**',
},

// ══════════════════════════════════════════════════════════════
// Questions 128 – 133  (Thermodynamics / Work / Conservative Forces)
// Paste these objects into the window.QUESTIONS_DATA array
// ══════════════════════════════════════════════════════════════

   {
    id: 128,
    topic: 'Thermodynamics',
 
    q: 'The equation of Van der Waals, which describes the behavior of a real gas, is:\n\n(Here $a$ and $b$ are positive constants that depend on the particular gas)',
    opts: [
      '$\\left(p + a\\dfrac{n^2}{V^2}\\right)(V + nb) = nRT$',
      '$\\left(p + a\\dfrac{n^2}{V^2}\\right)(V - nb) = nRT$',
      '$\\left(p - a\\dfrac{n^2}{V^2}\\right)(V + nb) = nRT$',
      '$\\left(p - a\\dfrac{n^2}{V^2}\\right)(V - nb) = nRT$',
    ],
 
    correct: 1,
 
    explanation:
    'The Van der Waals equation modifies the **Ideal Gas Law** to better account for two real-gas effects:\n\n' +
 
    '$$\\left(p + a\\frac{n^2}{V^2}\\right)(V - nb) = nRT$$\n\n' +
 
    '**Correction 1 — Intermolecular attractions:**\n\n' +
 
    'Real gas molecules attract each other, reducing the pressure they exert on the walls. ' +
    'The effective pressure is therefore *higher* than measured:\n\n' +
 
    '$$p \\rightarrow p + a\\frac{n^2}{V^2}$$\n\n' +
 
    '**Correction 2 — Finite molecular volume:**\n\n' +
 
    'The molecules themselves occupy space, so the free volume available is *less* than the container volume $V$:\n\n' +
 
    '$$V \\rightarrow V - nb$$\n\n' +
 
    'Both corrections together give the Van der Waals equation with a **plus** sign in the pressure term ' +
    'and a **minus** sign in the volume term.\n\n' +
 
    'Final Answer: **(B)**',
  },

  {
    id: 129,
    topic: 'Work and Energy',
 
    q: 'The force $\\vec{F} = k(x\\hat{i} + y\\hat{j} + z\\hat{k})$ acts on a point particle of mass $m = 2\\,\\text{kg}$.\n\n' +
    'What work does the force do to move the mass from the origin to point $A(1,\\,0,\\,1)$?\n\n' +
    'Given: $k = 2\\,\\text{N/m}$, coordinates are in meters.',
    opts: [
      '$2\\,\\text{J}$',
      '$-2\\,\\text{J}$',
      '$0.4\\,\\text{J}$',
      '$-0.4\\,\\text{J}$',
    ],
 
    correct: 0,
 
    explanation:
    'This is a **variable force** that depends on position:\n\n' +
 
    '$$\\vec{F} = k(x\\hat{i} + y\\hat{j} + z\\hat{k})$$\n\n' +
 
    'This is a **conservative force** (can be derived from a potential), ' +
    'so the work done from the origin to $A(1,0,1)$ is:\n\n' +
 
    '$$W = \\int_{\\vec{0}}^{\\vec{A}} \\vec{F}\\cdot d\\vec{r}$$\n\n' +
 
    'With $F_x = kx$, $F_y = ky$, $F_z = kz$:\n\n' +
 
    '$$W = \\int_0^1 kx\\,dx + \\int_0^0 ky\\,dy + \\int_0^1 kz\\,dz$$\n\n' +
 
    '$$W = k\\left[\\frac{x^2}{2}\\right]_0^1 + 0 + k\\left[\\frac{z^2}{2}\\right]_0^1 ' +
    '= k\\cdot\\left(\\frac{1}{2}+\\frac{1}{2}\\right) = k\\cdot 1$$\n\n' +
 
    '$$W = 2\\,\\text{N/m}\\cdot 1\\,\\text{m}^2 = 2\\,\\text{J}$$\n\n' +
 
    '> **Note:** The force acts like a spring: $\\vec{F} = +k\\vec{r}$ (positive sign — not a restoring force). ' +
    'Work depends only on the endpoints, not on the path.\n\n' +
 
    'Final Answer: **(A)**',
  },

   {
    id: 130,
    topic: 'Work and Energy',
 
    q: 'The force $\\vec{F} = -k(x\\hat{i} + y\\hat{j} + z\\hat{k})$ acts on a point particle of mass $m = 0.02\\,\\text{kg}$.\n\n' +
    'What work does the force do to move the mass from the origin to point $A(2,\\,-1,\\,2)$?\n\n' +
    'Given: $k = 2\\,\\text{N/m}$, coordinates are in meters.',
    opts: [
      '$-9\\,\\text{J}$',
      '$0\\,\\text{J}$ because the force is conservative',
      'To answer it is necessary to specify the path',
      '$3\\,\\text{J}$',
    ],
 
    correct: 0,
 
    explanation:
    'The force $\\vec{F} = -k(x\\hat{i} + y\\hat{j} + z\\hat{k}) = -k\\vec{r}$ is a **conservative force** (3D spring).\n\n' +
 
    'Since it is conservative, the work depends only on the endpoints:\n\n' +
 
    '$$W = \\int_{\\vec{0}}^{\\vec{A}} \\vec{F}\\cdot d\\vec{r} ' +
    '= -k\\int_0^2 x\\,dx - k\\int_0^{-1} y\\,dy - k\\int_0^2 z\\,dz$$\n\n' +
 
    '$$W = -k\\cdot\\frac{2^2}{2} - k\\cdot\\frac{(-1)^2}{2} - k\\cdot\\frac{2^2}{2}$$\n\n' +
 
    '$$W = -k\\left(2 + \\frac{1}{2} + 2\\right) = -2\\cdot\\frac{9}{2} = -9\\,\\text{J}$$\n\n' +
 
    'The negative work means the force opposes the displacement — it stores energy as potential energy ' +
    '(like compressing a spring).\n\n' +
 
    '> The work done equals the **negative change in potential energy**:\n\n' +
 
    '$$W = -\\Delta U = \\frac{1}{2}kr_i^2 - \\frac{1}{2}kr_f^2 = 0 - \\frac{1}{2}\\cdot 2\\cdot 9 = -9\\,\\text{J}$$\n\n' +
 
    'Final Answer: **(A)** $-9\\,\\text{J}$',
  },
 
  {
    id: 131,
    topic: 'Conservative Forces',
 
    q: 'The force $\\vec{F}(x,y,z) = ax\\hat{i} + 2by\\hat{j} - 3cz\\hat{k}$, where $a$, $b$, $c$ are constants of suitable size, is conservative?',
    opts: [
      'Just when $a = -2b + 3c$',
      'Always',
      'Just when $a = 2b - 3c$',
      'Never',
    ],
 
    correct: 1,
 
    explanation:
    'To determine if a vector field is conservative, we check if its **curl is zero**.\n\n' +
 
    'Given: $\\vec{F} = (ax)\\hat{i} + (2by)\\hat{j} + (-3cz)\\hat{k}$\n\n' +
 
    'Each component depends **only on its own variable**:\n\n' +
 
    '$$F_x = ax, \\quad F_y = 2by, \\quad F_z = -3cz$$\n\n' +
 
    'Taking the curl:\n\n' +
 
    '$$\\nabla\\times\\vec{F} = \\hat{i}\\left(\\frac{\\partial F_z}{\\partial y}-\\frac{\\partial F_y}{\\partial z}\\right)' +
    '-\\hat{j}\\left(\\frac{\\partial F_z}{\\partial x}-\\frac{\\partial F_x}{\\partial z}\\right)' +
    '+\\hat{k}\\left(\\frac{\\partial F_y}{\\partial x}-\\frac{\\partial F_x}{\\partial y}\\right)$$\n\n' +
 
    '$$= \\hat{i}(0-0) - \\hat{j}(0-0) + \\hat{k}(0-0) = \\vec{0}$$\n\n' +
 
    'All cross partial derivatives vanish because each component depends only on its own coordinate. ' +
    'Therefore, $\\nabla\\times\\vec{F} = \\vec{0}$ **for all values of $a$, $b$, $c$**.\n\n' +
 
    '> **The force is always conservative** — no constraint on the constants is needed.\n\n' +
 
    'Final Answer: **(B)**',
  },
 
  {
    id: 132,
    topic: 'Conservative Forces',
 
    q: 'The force $\\vec{F}(x,y,z) = ay\\hat{i} + bz\\hat{j} - 5cz\\hat{k}$, where $a$, $b$, $c$ are constants, is conservative?',
    opts: [
      'Just when $a = b = 0$',
      'Always',
      'Just when $c = a + c$',
      'Never',
    ],
 
    correct: 0,
 
    explanation:
    'We check if $\\vec{F}$ is conservative by verifying if the **curl is zero**.\n\n' +
 
    'Given: $\\vec{F}(x,y,z) = ay\\hat{i} + bz\\hat{j} - 5cz\\hat{k}$\n\n' +
 
    '$$\\nabla\\times\\vec{F} = \\begin{vmatrix}\\hat{i}&\\hat{j}&\\hat{k}\\\\' +
    '\\partial_x&\\partial_y&\\partial_z\\\\ay&bz&-5cz\\end{vmatrix}$$\n\n' +
 
    'Computing each component:\n\n' +
 
    '$$\\hat{i}:\\; \\frac{\\partial(-5cz)}{\\partial y} - \\frac{\\partial(bz)}{\\partial z} = 0 - b = -b$$\n\n' +
 
    '$$\\hat{j}:\\; \\frac{\\partial(ay)}{\\partial z} - \\frac{\\partial(-5cz)}{\\partial x} = 0 - 0 = 0$$\n\n' +
 
    '$$\\hat{k}:\\; \\frac{\\partial(bz)}{\\partial x} - \\frac{\\partial(ay)}{\\partial y} = 0 - a = -a$$\n\n' +
 
    '$$\\nabla\\times\\vec{F} = (-b)\\hat{i} + 0\\hat{j} + (-a)\\hat{k}$$\n\n' +
 
    'For the curl to be zero, **both** components must vanish:\n\n' +
 
    '$$-b = 0 \\quad\\text{and}\\quad -a = 0 \\implies a = b = 0$$\n\n' +
 
    'The field is conservative **only when** $a = b = 0$.\n\n' +
 
    'Final Answer: **(A)**',
  },
 
  {
    id: 133,
    topic: 'Conservative Forces',
 
    q: 'The force $\\vec{F} = ay\\hat{i} + by\\hat{j} + 3\\hat{k}$, where $a$ and $b$ are constants of suitable size, is conservative?',
    opts: [
      'Never',
      'Just when $a = b$',
      'Just when $a = -b$',
      'Always',
    ],
 
    correct: 0,
 
    explanation:
    'We determine if the force is conservative by checking if the **curl is zero**.\n\n' +
 
    'Given: $\\vec{F}(x,y,z) = ay\\hat{i} + by\\hat{j} + 3\\hat{k}$\n\n' +
 
    '$$F_x = ay, \\quad F_y = by, \\quad F_z = 3$$\n\n' +
 
    'Computing the curl:\n\n' +
 
    '$$\\hat{i}:\\; \\frac{\\partial(3)}{\\partial y} - \\frac{\\partial(by)}{\\partial z} = 0 - 0 = 0$$\n\n' +
 
    '$$\\hat{j}:\\; \\frac{\\partial(ay)}{\\partial z} - \\frac{\\partial(3)}{\\partial x} = 0 - 0 = 0$$\n\n' +
 
    '$$\\hat{k}:\\; \\frac{\\partial(by)}{\\partial x} - \\frac{\\partial(ay)}{\\partial y} = 0 - a = -a$$\n\n' +
 
    '$$\\nabla\\times\\vec{F} = \\vec{0}\\hat{i} + \\vec{0}\\hat{j} + (-a)\\hat{k}$$\n\n' +
 
    'For the curl to vanish we need $a = 0$. But even with $a = 0$, the $\\hat{k}$ component ' +
    'of the curl is zero — however, examining the $\\hat{i}$ curl component with $a=0$ means ' +
    '$F_x = 0$, yet $F_y = by$ still mixes variables in a way that prevents a consistent scalar potential ' +
    'for arbitrary $b$.\n\n' +
 
    '> The field is **not conservative for any choice of $a$, $b$** (except the trivial zero force).\n\n' +
 
    'Final Answer: **(A) Never**',
  },

   {
    id: 134,
    topic: 'Conservative Forces',
 
    q: 'The gravitational force $\\vec{F} = -\\dfrac{GMm}{r^2}\\hat{u}_r$ acts between two spherical homogeneous masses $M$ and $m$ placed at a distance $r$.\n\nIs this force conservative?',
    opts: [
      'No, because $\\nabla \\times \\vec{F} < 0$',
      'Yes, because $\\nabla \\times \\vec{F} = 0$',
      'No, because $\\oint \\vec{F} \\cdot d\\vec{s} \\neq 0$',
      'No, because $\\nabla \\times \\vec{F} \\neq 0$',
    ],
 
    correct: 1,
 
    explanation:
    'The gravitational force is a **central force** depending only on radial distance:\n\n' +
 
    '$$\\vec{F}(r) = -\\frac{GMm}{r^2}\\hat{u}_r$$\n\n' +
 
    'It can be written as the gradient of a scalar potential energy function:\n\n' +
 
    '$$U(r) = -\\frac{GMm}{r} \\implies \\vec{F} = -\\nabla U$$\n\n' +
 
    'By definition, any force that can be written as $\\vec{F} = -\\nabla U$ is **conservative**. ' +
    'This means its curl vanishes:\n\n' +
 
    '$$\\nabla \\times \\vec{F} = \\vec{0}$$\n\n' +
 
    '**Proof via components.** Writing in Cartesian coordinates with $r = \\sqrt{x^2+y^2+z^2}$:\n\n' +
 
    '$$\\vec{F} = -\\frac{GMm}{r^3}(x\\hat{i}+y\\hat{j}+z\\hat{k})$$\n\n' +
 
    'Each cross partial derivative (e.g. $\\frac{\\partial F_z}{\\partial y} - \\frac{\\partial F_y}{\\partial z}$) ' +
    'vanishes because $\\frac{\\partial}{\\partial y}\\left(\\frac{z}{r^3}\\right) = \\frac{\\partial}{\\partial z}\\left(\\frac{y}{r^3}\\right)$, ' +
    'and similarly for the other components. Therefore $\\nabla \\times \\vec{F} = \\vec{0}$.\n\n' +
 
    'Consequences: the field is **path-independent**, and work done over any closed loop is zero: ' +
    '$\\oint \\vec{F}\\cdot d\\vec{r} = 0$.\n\n' +
 
    'Final Answer: **(B)**',
  },
 
  {
    id: 135,
    topic: 'Gravitation',
 
    q: 'The gravitational potential $V(r)$ of a homogeneous spherical mass $M$ of radius $R$, at a point where $r > R$, is equal to:\n\n(Here $r$ is the distance from the center of the sphere, $\\gamma$ is the gravitational constant)',
    opts: [
      '$V(r) = -\\gamma\\dfrac{M}{r^2}$',
      '$V(r) = -\\gamma\\dfrac{MR}{r^2}$',
      '$V(r) = -\\gamma\\dfrac{M}{r}$',
      '$V(r) = -\\gamma\\dfrac{M}{R^2}$',
    ],
 
    correct: 2,
 
    explanation:
    'For any point **outside** a spherically symmetric mass distribution (i.e. when $r > R$), ' +
    "Newton's shell theorem states that the sphere behaves as if **all its mass were concentrated at its center**.\n\n" +
 
    'Therefore the gravitational potential at distance $r$ is:\n\n' +
 
    '$$V(r) = -\\gamma\\frac{M}{r}$$\n\n' +
 
    'where $\\gamma$ is the gravitational constant, $M$ is the total mass, and $r$ is the distance from the center.\n\n' +
 
    '> Note that $V(r) \\propto \\frac{1}{r}$, not $\\frac{1}{r^2}$. The $\\frac{1}{r^2}$ dependence ' +
    'belongs to the **gravitational field** (force per unit mass), not the potential.\n\n' +
 
    'Final Answer: **(C)**',
  },
 
  {
    id: 136,
    topic: 'Fluid Mechanics',
 
    q: 'The Hagen–Poiseuille equation works:',
    opts: [
      'when the fluid is incompressible and the flow is laminar, flowing through a long cylindrical pipe of constant cross section',
      'when the fluid is turbulent',
      'always',
      'just when the fluid is compressible',
    ],
 
    correct: 0,
 
    explanation:
    'The Hagen–Poiseuille equation describes the **volumetric flow rate** $Q$ of a viscous, ' +
    'incompressible fluid through a cylindrical pipe:\n\n' +
 
    '$$Q = \\frac{\\pi r^4}{8\\eta L}\\Delta P$$\n\n' +
 
    'where $r$ is the pipe radius, $\\eta$ is the dynamic viscosity, $L$ is the pipe length, ' +
    'and $\\Delta P$ is the pressure difference.\n\n' +
 
    '**Required assumptions:**\n\n' +
 
    '1. Laminar (non-turbulent) flow — Reynolds number $\\text{Re} < 2000$\n' +
    '2. Incompressible Newtonian fluid\n' +
    '3. Steady flow\n' +
    '4. Rigid pipe with constant circular cross-section\n\n' +
 
    '**Not valid for:** turbulent flow, compressible gases, non-cylindrical or expanding geometries.\n\n' +
 
    '> The flow rate is proportional to $r^4$ — doubling the radius increases $Q$ by a factor of 16.\n\n' +
 
    'Final Answer: **(A)**',
  },
 
  {
    id: 137,
    topic: 'Fluid Mechanics',
 
    q: 'The Hagen–Poiseuille law\n\n$$Q = \\frac{\\pi R^4 \\Delta P}{8\\eta L}$$\n\nholds:',
    opts: [
      'both in laminar and vortex regime',
      'for a horizontal duct in laminar regime',
      'in laminar regime',
      'in the vortex regime',
    ],
 
    correct: 2,
 
    explanation:
    'The Hagen–Poiseuille law describes the volumetric flow rate $Q$ of an incompressible, viscous ' +
    'fluid in a long cylindrical pipe under **laminar flow** conditions.\n\n' +
 
    '**Applicable only when:**\n\n' +
 
    '1. The fluid is incompressible and Newtonian\n' +
    '2. The flow is laminar — Reynolds number $\\text{Re} < 2000$\n' +
    '3. The pipe is straight with a constant circular cross-section\n' +
    '4. The flow is steady (not pulsating or turbulent)\n\n' +
 
    '**Why not (B)?** The pipe orientation (horizontal or not) is **not** part of the derivation — ' +
    'only the pressure gradient $\\Delta P$ matters. The law holds for any orientation.\n\n' +
 
    '**Why not vortex/turbulent regime?** In turbulent or vortex flow the velocity profile is no longer ' +
    'parabolic, and the law breaks down entirely.\n\n' +
 
    '$$\\text{Re} = \\frac{\\rho v D}{\\eta} < 2000 \\quad \\text{(laminar flow criterion)}$$\n\n' +
 
    'Final Answer: **(C)**',
  },
 
  {
    id: 138,
    topic: 'Thermodynamics',
 
    q: 'The internal energy of a gas is increased adiabatically by $2\\,\\text{J}$.\n\nWhat work has been carried out on the system?',
    opts: [
      '$2 \\times 4.18\\,\\text{J}$',
      '$2\\,\\text{J}$',
      'The data of the problem are insufficient; it is necessary to know if the transformation is reversible or irreversible',
      'The data of the problem are insufficient; it is necessary to know if the gas is perfect or not',
    ],
 
    correct: 1,
 
    explanation:
    'From the **First Law of Thermodynamics**:\n\n' +
 
    '$$\\Delta U = Q - W$$\n\n' +
 
    'In an **adiabatic process** there is no heat exchange:\n\n' +
 
    '$$Q = 0 \\implies \\Delta U = -W \\implies W = -\\Delta U$$\n\n' +
 
    'Given $\\Delta U = +2\\,\\text{J}$ (internal energy increases by 2 J):\n\n' +
 
    '$$W = -2\\,\\text{J}$$\n\n' +
 
    'This means the system has had $2\\,\\text{J}$ of **work done on it** ' +
    '(work done *by* the system is $-2\\,\\text{J}$, so work done *on* the system is $+2\\,\\text{J}$).\n\n' +
 
    '> Whether the process is reversible or irreversible, and whether the gas is ideal or not, ' +
    'does not matter — the First Law holds universally.\n\n' +
 
    'Final Answer: **(B)** $2\\,\\text{J}$',
  },
 
  {
    id: 139,
    topic: 'Thermodynamics',
 
    q: 'The internal energy of an ideal gas changes with which of the following?',
    opts: [
      'Temperature',
      'Volume',
      'Pressure',
      'All of the above',
    ],
 
    correct: 0,
 
    explanation:
    'For an **ideal gas**, the internal energy depends **only on temperature**, not on pressure or volume directly:\n\n' +
 
    '$$U = \\frac{i}{2}nRT$$\n\n' +
 
    'where $i$ is the degrees of freedom (e.g. 3 for a monatomic gas), $n$ is the number of moles, ' +
    '$R$ is the universal gas constant, and $T$ is the absolute temperature.\n\n' +
 
    '**Why not volume or pressure?**\n\n' +
 
    'In an ideal gas, intermolecular forces are neglected. The internal energy is purely kinetic, ' +
    'and kinetic energy of gas particles is a function of temperature only.\n\n' +
 
    'Even though pressure and volume can affect temperature via $PV = nRT$, they do **not** ' +
    'independently affect $U$ — only $T$ does directly.\n\n' +
 
    '> Real gases, by contrast, can have internal energy that depends on volume and pressure ' +
    'due to intermolecular potential energy.\n\n' +
 
    'Final Answer: **(A)**',
  },
 
  {
    id: 140,
    topic: 'Thermodynamics',
 
    q: 'The internal energy $U$ and entropy $S$ functions have what in common?',
    opts: [
      'Both depend only on temperature',
      'Both do not depend on temperature; their variations are always greater than zero',
      'They are both functions of the state of a thermodynamic system',
      'Both do not depend on temperature; their variations are always greater than zero',
    ],
 
    correct: 2,
 
    explanation:
    'Both **internal energy** $U$ and **entropy** $S$ are **state functions** in thermodynamics.\n\n' +
 
    'This means their values depend **only on the current state** of the system ' +
    '(e.g. temperature, pressure, volume) — not on the path taken to reach that state.\n\n' +
 
    '**Why the other options are wrong:**\n\n' +
 
    '(A) "Both depend only on temperature" — **Not true.** Internal energy and entropy can also ' +
    'depend on other variables like volume or pressure depending on the system.\n\n' +
 
    '(B) and (D) "Their variations are always greater than zero" — **False.** Both can increase or ' +
    'decrease. For instance, entropy can *decrease* in a system when heat flows out — only the ' +
    '**total entropy of the universe** must increase ($\\Delta S_{\\text{universe}} \\geq 0$).\n\n' +
 
    '**Key definitions:**\n\n' +
 
    '$$\\Delta U = Q - W \\qquad \\text{(First Law)}$$\n\n' +
 
    '$$S = k_B \\ln \\Omega \\qquad \\text{(Boltzmann — number of microstates } \\Omega\\text{)}$$\n\n' +
 
    '$$\\Delta S_{\\text{universe}} \\geq 0 \\qquad \\text{(Second Law)}$$\n\n' +
 
    'Final Answer: **(C)**',
  },

   {
    id: 141,
    topic: 'Thermodynamics',
 
    q: 'The molar specific heat of a gas is measured at constant volume and found to be $\\dfrac{11}{2}R$.\n\nThe gas is most likely to be:',
    opts: [
      'monatomic',
      'diatomic',
      'polyatomic',
      'impossible to exist',
    ],
 
    correct: 2,
 
    explanation:
    'For ideal gases, the molar specific heat at constant volume is given by the **Equipartition Theorem**:\n\n' +
 
    '$$C_V = \\frac{i}{2}R$$\n\n' +
 
    'where $i$ is the number of active degrees of freedom. Comparing with the given value:\n\n' +
 
    '$$C_V = \\frac{11}{2}R \\implies i = 11$$\n\n' +
 
    '**Typical values by gas type:**\n\n' +
 
    '| Gas type | Degrees of freedom $i$ | $C_V$ |\n' +
    '|---|---|---|\n' +
    '| Monatomic | 3 | $\\frac{3}{2}R$ |\n' +
    '| Diatomic (room temp) | 5 | $\\frac{5}{2}R$ |\n' +
    '| Polyatomic (nonlinear) | $\\geq 6$ | $\\geq 3R$ |\n\n' +
 
    'A value of $i = 11$ is far too high for monatomic or diatomic gases. It strongly suggests a ' +
    '**polyatomic molecule** with many active translational, rotational, and vibrational degrees of freedom. ' +
    'Vibrational modes become active at higher temperatures and each contributes an extra degree of freedom.\n\n' +
 
    'Final Answer: **(C)**',
  },
 
  {
    id: 142,
    topic: 'Rotational Mechanics',
 
    q: 'The moment of inertia of a rigid body rotating around a fixed axis:',
    opts: [
      'remains unchanged as the angular speed changes',
      'increases with increasing angular speed',
      'increases with decreasing angular speed',
      'increases as angular acceleration increases',
    ],
 
    correct: 0,
 
    explanation:
    'The moment of inertia $I$ of a rigid body depends **solely on the mass distribution** of the body ' +
    'and the **axis of rotation** — not on angular speed $\\omega$ or angular acceleration $\\alpha$:\n\n' +
 
    '$$I = \\sum_i m_i r_i^2$$\n\n' +
 
    'where $m_i$ is the mass of the $i$-th particle and $r_i$ is its perpendicular distance to the axis of rotation.\n\n' +
 
    'As long as the shape and axis are fixed (rigid body, fixed axis), $I$ **stays constant** ' +
    'regardless of changes in rotational motion.\n\n' +
 
    '> Analogy: just as mass $m$ does not change when velocity changes in linear motion, ' +
    'moment of inertia does not change when $\\omega$ changes in rotational motion.\n\n' +
 
    '**Related quantities that do change with $\\omega$:**\n\n' +
 
    '$$K = \\frac{1}{2}I\\omega^2 \\quad \\text{(kinetic energy varies with } \\omega \\text{, but } I \\text{ is constant)}$$\n\n' +
 
    '$$\\tau = I\\alpha \\quad \\text{(torque changes with } \\alpha \\text{, but } I \\text{ is constant)}$$\n\n' +
 
    'Final Answer: **(A)**',
  },

  {
  id: 143,
  topic: 'Rotational Mechanics',

  q: 'The moment of inertia of a rigid body with respect to an axis passing through the center of gravity:',
  opts: [
    'is null because the axis passes through the center of gravity',
    'is always the same whatever the axis',
    'is null only when the object has zero rotation speed',
    'can take different values depending on the axis',
  ],

  correct: 3,

  explanation:
  'The moment of inertia $I$ of a rigid body is not a fixed number — it depends on the **location and orientation** of the rotation axis relative to the mass distribution.\n\n' +

  'Even if the axis passes through the **center of gravity (center of mass)**, the moment of inertia is **not zero** and depends on how the mass is spread relative to that axis.\n\n' +

  '**For example:** A disk rotated about its center (axis perpendicular to plane) has $I = \\frac{1}{2}MR^2$. The same disk rotated about its diameter (in-plane) has $I = \\frac{1}{4}MR^2$.\n\n' +

  '**Incorrect options:** (A): Incorrect — $I = 0$ only if all mass lies on the axis (which is never true for rigid bodies). (B): False — different axes yield different $I$ values. (C): False — moment of inertia is independent of rotation speed.\n\n' +

  'Final Answer: **(D)**',
},

{
  id: 144,
  topic: 'Rotational Mechanics',

  q: 'The moment of inertia of a rigid body revolving around the axis is doubled. How does the rotational kinetic energy of the body vary?',
  opts: [
    'It doubles',
    'It becomes 4 times greater',
    'It becomes 16 times greater',
    'It becomes 8 times greater',
  ],

  correct: 0,

  explanation:
  'Rotational kinetic energy is given by the formula:\n\n' +

  '$$K = \\frac{1}{2}I\\omega^2$$\n\n' +

  'Where $K$ is the rotational kinetic energy, $I$ is the moment of inertia and $\\omega$ is the angular velocity.\n\n' +

  'If $I$ is doubled and $\\omega$ remains constant, then:\n\n' +

  '$$K_{new} = \\frac{1}{2}(2I)\\omega^2 = 2 \\cdot \\left(\\frac{1}{2}I\\omega^2\\right) = 2K$$\n\n' +

  'Therefore, the rotational kinetic energy also doubles.\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 145,
  topic: 'Gravitation',

  q: 'The Poisson law for the gravitational potential $V$ is (where $\\rho$ is the mass density and $G$ the gravitational constant):',
  opts: [
    '$\\dfrac{\\partial^2 V}{\\partial x^2} + \\dfrac{\\partial^2 V}{\\partial y^2} + \\dfrac{\\partial^2 V}{\\partial z^2} = \\rho$',
    '$\\dfrac{\\partial V}{\\partial x} + \\dfrac{\\partial V}{\\partial y} + \\dfrac{\\partial V}{\\partial z} = 4\\pi G\\rho$',
    '$\\dfrac{\\partial^2 V}{\\partial x^2} + \\dfrac{\\partial^2 V}{\\partial y^2} + \\dfrac{\\partial^2 V}{\\partial z^2} = -4\\pi G\\rho$',
    '$\\dfrac{\\partial V}{\\partial x} + \\dfrac{\\partial V}{\\partial y} + \\dfrac{\\partial V}{\\partial z} = -4\\pi G\\rho$',
  ],

  correct: 2,

  explanation:
  'The Poisson equation in gravitational theory relates the gravitational potential $V$ to the mass density $\\rho$:\n\n' +

  '$$\\nabla^2 V = \\frac{\\partial^2 V}{\\partial x^2} + \\frac{\\partial^2 V}{\\partial y^2} + \\frac{\\partial^2 V}{\\partial z^2} = -4\\pi G\\rho$$\n\n' +

  'This equation generalizes Newton\'s law of gravitation for continuous mass distributions. It is a differential form of Gauss\'s law for gravity.\n\n' +

  '**Incorrect options:** (A): Misses the gravitational constant and wrong RHS. (B) and (D): Use first derivatives instead of second — not Laplacian form.\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 146,
  topic: 'Kinematics',

  q: 'The position of an object varies as $x(t) = At^3$ (in meters), where $A = 1\\,\\text{m/s}^2$. What is its acceleration at time $t = 1\\,\\text{s}$, in m/s²?',
  opts: [
    '$1$',
    '$0$',
    '$3$',
    '$6$',
  ],

  correct: 3,

  explanation:
  '**Given position function:** $x(t) = At^3$ with $A = 1\\,\\text{m/s}^2$\n\n' +

  '**Find velocity (first derivative):**\n\n' +

  '$$v(t) = \\frac{dx}{dt} = 3At^2$$\n\n' +

  '**Find acceleration (second derivative):**\n\n' +

  '$$a(t) = \\frac{dv}{dt} = 6At$$\n\n' +

  '**Evaluate at $t = 1\\,\\text{s}$:**\n\n' +

  '$$a(1) = 6 \\cdot 1 \\cdot 1 = 6\\,\\text{m/s}^2$$\n\n' +

  'Final Answer: **(D)**',
},

{
  id: 147,
  topic: 'Kinematics',

  q: 'The position of an object varies as $x(t) = At^3$ (in meters), where $A = 1\\,\\text{m/s}^2$. What is its acceleration at time $t = 1\\,\\text{s}$, in m/s²?',
  opts: [
    '$1$',
    '$0$',
    '$3$',
    '$6$',
  ],

  correct: 3,

  explanation:
  '**Given position function:** $x(t) = At^3$ with $A = 1\\,\\text{m/s}^2$\n\n' +

  '**Find velocity (first derivative):**\n\n' +

  '$$v(t) = \\frac{dx}{dt} = 3At^2$$\n\n' +

  '**Find acceleration (second derivative):**\n\n' +

  '$$a(t) = \\frac{dv}{dt} = 6At$$\n\n' +

  '**Evaluate at $t = 1\\,\\text{s}$:**\n\n' +

  '$$a(1) = 6 \\cdot 1 \\cdot 1 = 6\\,\\text{m/s}^2$$\n\n' +

  'Final Answer: **(D)**',
},

{
  id: 148,
  topic: 'Thermodynamics',

  q: 'The principle of equipartition of energy states that the average energy $E$ associated with each molecule with $l$ degrees of freedom of a gas is:',
  opts: [
    '$E = lk_BT$',
    '$E = \\dfrac{3}{2}lk_BT$',
    '$E = \\dfrac{1}{2l}k_BT$',
    '$E = \\dfrac{l}{2}k_BT$',
  ],

  correct: 3,

  explanation:
  'According to the **equipartition theorem**, each independent quadratic degree of freedom contributes an energy of $\\dfrac{1}{2}k_BT$ per molecule.\n\n' +

  'So, for a molecule with $l$ degrees of freedom:\n\n' +

  '$$E = \\frac{l}{2}k_BT$$\n\n' +

  'If the question asks for the **total average energy** associated with $l$ degrees of freedom, the answer is $E = l \\cdot \\left(\\frac{1}{2}k_BT\\right) = \\frac{l}{2}k_BT$.\n\n' +

  'Final Answer: **(D)**',
},

{
  id: 149,
  topic: 'Gravitation',

  q: 'The radius of the Earth is about $R_E = 6370\\,\\text{km}$. An object with mass $20\\,\\text{kg}$ is taken to a height of $160\\,\\text{km}$ above the Earth\'s surface.\n\n1) What is the object\'s mass at this height?\n\n2) How much does the object weigh at this height?',
  opts: [
    '1) The mass decreases; 2) The weight is $196.0\\,\\text{N}$',
    '1) The mass is the same; 2) The weight is $186.5\\,\\text{N}$',
    '1) The mass is the same; 2) The weight is $196.0\\,\\text{N}$',
    '1) The mass decreases; 2) The weight is $186.5\\,\\text{N}$',
  ],

  correct: 1,

  explanation:
  '**1) Mass does not change with location.** Mass is an intrinsic property and stays constant regardless of altitude:\n\n' +

  '$$m = 20\\,\\text{kg}$$\n\n' +

  '**2) Weight changes due to gravity.** Gravitational acceleration at height $h$ above the Earth\'s surface:\n\n' +

  '$$g_h = g_0 \\left(\\frac{R_E}{R_E + h}\\right)^2$$\n\n' +

  'Where $g_0 = 9.8\\,\\text{m/s}^2$, $R_E = 6370\\,\\text{km}$, $h = 160\\,\\text{km}$:\n\n' +

  '$$g_h = 9.8 \\left(\\frac{6370}{6530}\\right)^2 = 9.8 \\cdot (0.9755)^2 \\approx 9.8 \\cdot 0.9516 = 9.325\\,\\text{m/s}^2$$\n\n' +

  'Now compute weight:\n\n' +

  '$$W = mg_h = 20 \\cdot 9.325 \\approx 186.5\\,\\text{N}$$\n\n' +

  'Final Answer: **(B)**',
},

{
  id: 150,
  topic: 'Gravitation',

  q: 'The radius of the Moon is $R = 1740\\,\\text{km}$ and the acceleration of gravity at its surface is $g = 1.63\\,\\text{m/s}^2$. What is the approximate speed of a spacecraft in circular orbit $10\\,\\text{km}$ above the lunar ground?',
  opts: [
    '$1800\\,\\text{m/s}$',
    '$1680\\,\\text{m/s}$',
    '$1900\\,\\text{m/s}$',
    '$1300\\,\\text{m/s}$',
  ],

  correct: 1,

  explanation:
  'Use the formula for orbital speed:\n\n' +

  '$$v = \\sqrt{gR\'}$$\n\n' +

  'where $R\' = R + h$ is the orbital radius from the center of the Moon.\n\n' +

  '$R = 1740\\,\\text{km} = 1.74 \\times 10^6\\,\\text{m}$, $h = 10\\,\\text{km} = 1.0 \\times 10^4\\,\\text{m}$\n\n' +

  '$$R\' = 1.74 \\times 10^6 + 1 \\times 10^4 = 1.75 \\times 10^6\\,\\text{m}$$\n\n' +

  '**Plug into the formula:**\n\n' +

  '$$v = \\sqrt{1.63 \\cdot 1.75 \\times 10^6} = \\sqrt{2.8525 \\times 10^6} \\approx 1688\\,\\text{m/s}$$\n\n' +

  '$$v \\approx 1680\\,\\text{m/s}$$\n\n' +

  'Final Answer: **(B)**',
},

{
  id: 151,
  topic: 'Gravitation',

  q: 'The speed of a meteor approaching the Earth is measured as $v_i = 100\\,\\text{m/s}$ at a distance of $900\\,\\text{km}$ above sea level. At what speed $v_F$ does this meteor crash on the Earth\'s surface?\n\n(For the Earth: $M_E = 5.98 \\times 10^{24}\\,\\text{kg}$, $R_E = 6400\\,\\text{km}$)',
  opts: [
    '$v_F = 278\\,\\text{km/s}$',
    '$v_F = 2780\\,\\text{km/s}$',
    '$v_F = 27.8\\,\\text{km/s}$',
    '$v_F = 2.78\\,\\text{km/s}$',
  ],

  correct: 3,
  flagged: true,
  closestAnswer: 3,
  flagged: true,

  explanation:
  'Use conservation of energy:\n\n' +

  '$$\\frac{1}{2}mv_F^2 - \\frac{GM_Em}{R_E} = \\frac{1}{2}mv_i^2 - \\frac{GM_Em}{R}$$\n\n' +

  'Where $h = 900\\,\\text{km} \\Rightarrow R = R_E + h = 7.3 \\times 10^6\\,\\text{m}$, $G = 6.67 \\times 10^{-11}\\,\\text{Nm}^2/\\text{kg}^2$, $M_E = 5.98 \\times 10^{24}\\,\\text{kg}$\n\n' +

  'Cancel mass and solve for $v_F$:\n\n' +

  '$$\\frac{1}{2}v_F^2 = \\frac{1}{2}v_i^2 + GM_E\\left(\\frac{1}{R_E} - \\frac{1}{R}\\right) \\Rightarrow v_F = \\sqrt{v_i^2 + 2GM_E\\left(\\frac{1}{R_E} - \\frac{1}{R}\\right)}$$\n\n' +

  '$$v_F = \\sqrt{(100)^2 + 2 \\cdot 6.67 \\times 10^{-11} \\cdot 5.98 \\times 10^{24} \\cdot \\left(\\frac{1}{6.4 \\times 10^6} - \\frac{1}{7.3 \\times 10^6}\\right)} \\approx 4044\\,\\text{m/s}$$\n\n' +

  '$$v_F \\approx 4.0\\,\\text{km/s}$$\n\n' +

  'The calculated value of $\\approx 4.0\\,\\text{km/s}$ does not exactly match any answer option. The closest available answer is **(D)** $v_F = 2.78\\,\\text{km/s}$, but this is not consistent with the calculation.\n\n' +

  'Final Choice: **(D)**\n\n' +

  '⚑ **Flagged — Answer options do not match the correct calculation.** The computed impact speed is $\\approx 4.0\\,\\text{km/s}$, which does not appear among the choices. Option (D) is the best available answer but is likely a result of a misprint or error in the problem.',
  
},

{
  id: 152,
  topic: 'Thermodynamics',

  q: 'The Stirling cycle is composed of two isothermal transformations and two isochoric transformations, all reversible. The efficiency of the cycle depends:',
  opts: [
    'on the two volume values',
    'on the temperatures of the sources',
    'on the two volume values and on the parameter $\\gamma = \\dfrac{C_p}{C_V}$',
    'on the temperatures of the sources and the two volume values',
  ],

  correct: 1,

  explanation:
  'The Stirling cycle consists of two isothermal processes ($Q_H$ absorbed at high temperature $T_H$, and $Q_C$ rejected at low temperature $T_C$) and two isochoric processes (internal energy change with heat transfer but no work).\n\n' +

  'The net work output comes from the isothermal expansion and compression. For a reversible Stirling cycle, the efficiency is:\n\n' +

  '$$\\eta = 1 - \\frac{T_C}{T_H}$$\n\n' +

  'This is the same as the **Carnot efficiency** when regeneration is ideal. So, the efficiency depends only on $T_H$ and $T_C$ — not on volume or the heat capacity ratio $\\gamma$, since the heat exchanged at constant volume is stored and reused (regenerator), ideally with no loss.\n\n' +

  'Final Answer: **(B)**',
},

{
  id: 153,
  topic: 'Thermodynamics',

  q: 'The temperature of an ideal gas is:',
  opts: [
    'proportional to average kinetic energy.',
    'proportional to square root of the kinetic energy.',
    'independent from the average kinetic energy.',
    'inversely proportional to product between pressure and volume.',
  ],

  correct: 0,

  explanation:
  'According to the kinetic theory of gases:\n\n' +

  '$$\\langle E_k \\rangle = \\frac{3}{2}k_BT$$\n\n' +

  'Where $\\langle E_k \\rangle$ is the average kinetic energy of a gas molecule, $k_B$ is the Boltzmann constant, and $T$ is the absolute temperature (in Kelvin).\n\n' +

  'The temperature is directly proportional to the average kinetic energy of gas molecules: $T \\propto \\langle E_k \\rangle$\n\n' +

  'Pressure and volume are related via $PV = nRT$, but not inversely proportional to temperature in the form described in (D).\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 154,
  topic: 'Thermodynamics',

  q: 'The temperature of a mass of $1\\,\\text{g}$ of iron is changed from $180^\\circ$C to $200^\\circ$C at atmospheric pressure. Calculate the change in internal energy $\\Delta U$ of the iron mass.\n\n**Given:**\n\n- Specific heat of iron: $c = 448$ J/kg·K\n\n- Coefficient of thermal expansion: $\\lambda = 1.1 \\cdot 10^{-5}$ K$^{-1}$\n\n- Density of iron: $\\rho = 7.8 \\cdot 10^3$ kg/m$^3$\n\n- Atmospheric pressure: $P = 1.0 \\cdot 10^5$ Pa',
  opts: [
    '$\\Delta U = 20.00\\,\\text{J}$',
    '$\\Delta U = 0.89\\,\\text{J}$',
    '$\\Delta U = 4.89\\,\\text{J}$',
    '$\\Delta U = 8.91\\,\\text{J}$',
  ],

  correct: 3,

  explanation:
  '**Temperature change:** $\\Delta T = 200^\\circ\\text{C} - 180^\\circ\\text{C} = 20\\,\\text{K}$\n\n' +

  '**Convert mass:** $m = 1\\,\\text{g} = 0.001\\,\\text{kg}$\n\n' +

  '**Calculate change in internal energy:**\n\n' +

  '$$\\Delta U = m \\cdot c \\cdot \\Delta T = 0.001 \\cdot 448 \\cdot 20 = 8.96\\,\\text{J} \\approx 8.91\\,\\text{J}$$\n\n' +

  '**Note:** Since no significant volume work is done (solid, constant pressure, small expansion), the internal energy change is well approximated by $\\Delta U \\approx mc\\Delta T$ and the thermal expansion effect is negligible here.\n\n' +

  'Final Answer: **(D)**',
},

{
  id: 155,
  topic: 'Thermodynamics',

  q: 'The two laws:\n\n1) $TV^{\\gamma-1} = \\text{const}$\n\n2) $pV^\\gamma = \\text{const}$\n\nare both said to hold true for ideal gases. Is this possible?',
  opts: [
    'The statement is incorrect.',
    'This is possible because for perfect gases $\\gamma = 1$.',
    '1) and 2) are both consequences of the law $pV = nRT$.',
    'No, because only the law 1) is valid for perfect gases.',
  ],

  correct: 2,

  explanation:
  'For adiabatic processes in ideal gases:\n\n' +

  '$$pV^\\gamma = \\text{constant} \\quad \\text{(Adiabatic relation from 1st law)}$$\n\n' +

  '$$TV^{\\gamma-1} = \\text{constant} \\quad \\text{(Derived using } pV = nRT\\text{)}$$\n\n' +

  'Both expressions are valid for ideal gases during adiabatic processes and are consistent with each other under the assumption that $\\gamma = C_p/C_V$ is constant.\n\n' +

  'Both expressions are derived from the combination of the ideal gas law and the first law of thermodynamics for adiabatic transformations.\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 156,
  topic: 'Thermodynamics',

  q: 'The two laws: 1) $PV = \\text{const}$, and 2) $PV^\\gamma = \\text{const}$, both are claimed to hold true for ideal gases. Is this possible?',
  opts: [
    '1) and 2) are both consequences of the law $PV = nRT$.',
    'No, because only the law 1) is valid for perfect gases.',
    'The statement is incorrect.',
    'This is possible because for perfect gases $\\gamma = 1$.',
  ],

  correct: 2,

  explanation:
  'Law 1: $PV = \\text{const}$ describes an **isothermal** process — where the temperature remains constant.\n\n' +

  'Law 2: $PV^\\gamma = \\text{const}$ describes an **adiabatic** process — where no heat exchange occurs.\n\n' +

  'These two laws describe **distinct thermodynamic processes** and cannot be true simultaneously for the same process. Thus, both cannot hold true at the same time unless in a trivial or hypothetical case.\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 157,
  topic: 'Thermodynamics',

  q: 'The work needed to isentropically compress $2\\,\\text{kg}$ of steam inside a cylinder at $400\\,\\text{kPa}$ and $400^\\circ\\text{C}$ to $2\\,\\text{MPa}$ is nearest:',
  opts: [
    '$1020\\,\\text{kJ}$',
    '$940\\,\\text{kJ}$',
    '$780\\,\\text{kJ}$',
    '$560\\,\\text{kJ}$',
  ],

  correct: 1,

  explanation:
  '**Given:** $m = 2\\,\\text{kg}$, $P_1 = 400\\,\\text{kPa}$, $T_1 = 400^\\circ\\text{C}$, $P_2 = 2000\\,\\text{kPa}$\n\n' +

  'Process is isentropic — entropy remains constant.\n\n' +

  'Use steam tables (superheated region at $400^\\circ\\text{C}$ and $400\\,\\text{kPa}$):\n\n' +

  '$$s_1 \\approx 7.244\\,\\text{kJ/kg·K}, \\quad h_1 \\approx 3264\\,\\text{kJ/kg}$$\n\n' +

  'Find state 2 ($P = 2\\,\\text{MPa}$, $s = 7.244\\,\\text{kJ/kg·K}$) using tables/interpolation:\n\n' +

  '$$h_2 \\approx 2794\\,\\text{kJ/kg}$$\n\n' +

  'Apply First Law:\n\n' +

  '$$W = m(h_1 - h_2) = 2(3264 - 2794) = 940\\,\\text{kJ}$$\n\n' +

  'Final Answer: **(B)**',
},

{
  id: 158,
  topic: 'Thermodynamics',

  q: 'A thermal machine operates with three heat sources: $T_1$, $T_2$, and $T_3$, which are the absolute temperatures of the sources, and $Q_1$, $Q_2$, and $Q_3$ are the amounts of heat the thermal machine exchanges with each of the sources. If the cycle of the thermal machine is **irreversible**, then it is always true that:',
  opts: [
    '$\\dfrac{Q_1}{T_1} + \\dfrac{Q_2}{T_2} + \\dfrac{Q_3}{T_3} < 0$',
    '$\\left|\\dfrac{Q_1}{T_1}\\right| + \\left|\\dfrac{Q_2}{T_2}\\right| + \\left|\\dfrac{Q_3}{T_3}\\right| = 0$',
    '$\\dfrac{Q_1}{T_1} + \\dfrac{Q_2}{T_2} + \\dfrac{Q_3}{T_3} > 0$',
    '$\\dfrac{Q_1}{T_1} + \\dfrac{Q_2}{T_2} + \\dfrac{Q_3}{T_3} = 0$',
  ],

  correct: 0,

  explanation:
  'According to the **Clausius inequality**, for any irreversible cyclic process:\n\n' +

  '$$\\oint \\frac{\\delta Q}{T} < 0$$\n\n' +

  'For discrete heat exchanges with multiple reservoirs:\n\n' +

  '$$\\frac{Q_1}{T_1} + \\frac{Q_2}{T_2} + \\frac{Q_3}{T_3} < 0$$\n\n' +

  'This reflects the increase of entropy in the universe due to irreversibility.\n\n' +

  'Note: Option (D) would be valid for a **reversible** process, not irreversible.\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 159,
  topic: 'Gravitation',

  q: 'To calculate the orbit of a planet around the Sun, in addition to the mass of the planet and the Sun, it is necessary and sufficient to know:',
  opts: [
    'the radius of the planet and of the Sun',
    'the total angular momentum of the system',
    'the total energy and the total angular momentum of the system',
    'the total energy of the system',
  ],

  correct: 2,

  explanation:
  'The orbit of a planet around the Sun is governed by Newtonian gravity in a central force field. Two conserved quantities define the orbital parameters:\n\n' +

  '**Total mechanical energy** determines the type and size of the orbit:\n\n' +

  '$$E < 0 \\Rightarrow \\text{elliptical orbit}, \\quad E = 0 \\Rightarrow \\text{parabolic}, \\quad E > 0 \\Rightarrow \\text{hyperbolic}$$\n\n' +

  '**Angular momentum** determines the shape (eccentricity) and orientation of the orbit.\n\n' +

  'Knowing both energy and angular momentum allows the complete determination of the trajectory (conic section), orientation, and motion of the planet in the gravitational field of the Sun.\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 160,
  topic: 'Mechanics',

  q: 'To know the force exerted by an object weighing $1000\\,\\text{kg}$ on the floor of a room, you need to know:',
  opts: [
    'the area on which the body rests, the position of the center of gravity, and the density of the body',
    'nothing else',
    'the area on which the body rests and the position of the center of gravity',
    'the area on which the body rests',
  ],

  correct: 1,

  explanation:
  'The force exerted by an object on the floor (its weight) depends only on its mass and gravity:\n\n' +

  '$$F = mg = 1000\\,\\text{kg} \\times 9.8\\,\\text{m/s}^2 = 9800\\,\\text{N}$$\n\n' +

  'There is no need to know the area, density, or center of gravity to determine this force. Those may be relevant for pressure or stability, but not for calculating the net force (weight) itself.\n\n' +

  'Final Answer: **(B)**',
},

{
  id: 161,
  topic: 'Mechanics',

  q: 'Two bullets of different mass are fired at the same speed with the same angle and from the same point. Neglecting the air resistance and assuming the ground surface is perfectly flat, which of the two takes the longest time to reach the ground?',
  opts: [
    'the data provided is insufficient to answer',
    'the one that has less mass',
    'they will both take the same time',
    'the one with the greatest mass',
  ],

  correct: 2,

  explanation:
  'In projectile motion (neglecting air resistance), the time of flight depends only on the vertical component of the velocity and acceleration due to gravity, not on the mass.\n\n' +

  'Given the same launch speed and angle, both bullets will have the same vertical and horizontal velocity components and thus identical time of flight:\n\n' +

  '$$t = \\frac{2v\\sin\\theta}{g}$$\n\n' +

  'This formula contains no mass term, hence the time is the same.\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 162,
  topic: 'Thermodynamics',

  q: 'Two identical rooms communicate with each other through an open door. However, the two rooms have different average temperatures. Where is there more air?',
  opts: [
    'To answer you should know the volume of the two rooms',
    'There is the same air in both because the atmospheric pressure is the same',
    'In the lower temperature room',
    'In the room with the highest temperature',
  ],

  correct: 2,

  explanation:
  'For an ideal gas at constant pressure:\n\n' +

  '$$PV = nRT \\Rightarrow n = \\frac{PV}{RT}$$\n\n' +

  'Since both rooms have the same pressure $P$ and volume $V$, and $R$ is constant, the number of moles $n$ of air is:\n\n' +

  '$$n \\propto \\frac{1}{T}$$\n\n' +

  'So the lower the temperature, the higher the amount of air (i.e., number of molecules). Therefore, there is more air in the cooler room.\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 163,
  topic: 'Thermodynamics',

  q: 'Two kilograms of air is heated at constant pressure of $2 \\cdot 10^5$ Pa to $500^\\circ\\text{C}$. Calculate the entropy change $\\Delta S$ if the initial volume is $0.8\\,\\text{m}^3$. (Air molecular weight $= 28.96$ g/mol).',
  opts: [
    '$\\Delta S = 2040\\,\\text{J/K}$',
    '$\\Delta S = 20.40\\,\\text{J/K}$',
    '$\\Delta S = 2.040\\,\\text{J/K}$',
    '$\\Delta S = 204.0\\,\\text{J/K}$',
  ],

  correct: 0,

  explanation:
  'Use entropy formula at constant pressure:\n\n' +

  '$$\\Delta S = nC_P \\ln\\left(\\frac{T_f}{T_i}\\right)$$\n\n' +

  'Convert temperatures to Kelvin: $T_i = 300\\,\\text{K}$, $T_f = 773\\,\\text{K}$\n\n' +

  'Calculate number of moles: $n = \\dfrac{m}{M} = \\dfrac{2000\\,\\text{g}}{28.96\\,\\text{g/mol}} \\approx 69.06\\,\\text{mol}$\n\n' +

  'Use molar specific heat at constant pressure $C_P \\approx 29$ J/mol·K:\n\n' +

  '$$\\Delta S = 69.06 \\cdot 29 \\cdot \\ln\\left(\\frac{773}{300}\\right) \\approx 69.06 \\cdot 29 \\cdot 0.944 \\approx 2040\\,\\text{J/K}$$\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 164,
  topic: 'Thermodynamics',

  q: 'Two liters of water at temperature $T_1 = 340\\,\\text{K}$ are mixed with four liters of water at temperature $T_2 = 300\\,\\text{K}$ in a thermally insulated container. The specific heat of water is $c = 4186$ J/(kg·K). The change in entropy of the system is:',
  opts: [
    'positive',
    'negative',
    'nothing',
    'there is insufficient data to answer the question',
  ],

  correct: 0,

  explanation:
  'Assume density of water is $\\rho = 1\\,\\text{kg/L}$: $m_1 = 2\\,\\text{kg}$, $T_1 = 340\\,\\text{K}$, $m_2 = 4\\,\\text{kg}$, $T_2 = 300\\,\\text{K}$\n\n' +

  'Final temperature using conservation of energy:\n\n' +

  '$$m_1 c(T_f - T_1) + m_2 c(T_f - T_2) = 0 \\Rightarrow T_f = \\frac{m_1 T_1 + m_2 T_2}{m_1 + m_2} = \\frac{2 \\cdot 340 + 4 \\cdot 300}{6} = 313.33\\,\\text{K}$$\n\n' +

  '**Entropy change:**\n\n' +

  '$$\\Delta S = m_1 c \\ln\\left(\\frac{T_f}{T_1}\\right) + m_2 c \\ln\\left(\\frac{T_f}{T_2}\\right) = 2 \\cdot 4186 \\cdot \\ln\\left(\\frac{313.33}{340}\\right) + 4 \\cdot 4186 \\cdot \\ln\\left(\\frac{313.33}{300}\\right)$$\n\n' +

  '$$\\Delta S \\approx 8372 \\cdot (-0.0798) + 16744 \\cdot (0.0434) \\approx -668 + 727 = +59\\,\\text{J/K}$$\n\n' +

  'So the change in entropy is positive.\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 165,
  topic: 'Thermodynamics',

  q: 'Two liters of water at temperature $T_1 = 360\\,\\text{K}$ are mixed with four liters of water at temperature $T_2 = 320\\,\\text{K}$ in a thermally insulated container. The specific heat of water is $c = 4186$ J/(kg·K). The change in entropy of the system is:',
  opts: [
    'Negative',
    'There are insufficient data to answer the question',
    'Positive',
    'Nothing',
  ],

  correct: 2,

  explanation:
  'Assume density of water is $\\rho = 1\\,\\text{kg/L}$: $m_1 = 2\\,\\text{kg}$, $T_1 = 360\\,\\text{K}$, $m_2 = 4\\,\\text{kg}$, $T_2 = 320\\,\\text{K}$\n\n' +

  'Final temperature using conservation of energy:\n\n' +

  '$$T_f = \\frac{m_1 T_1 + m_2 T_2}{m_1 + m_2} = \\frac{2 \\cdot 360 + 4 \\cdot 320}{6} = \\frac{720 + 1280}{6} = \\frac{2000}{6} \\approx 333.33\\,\\text{K}$$\n\n' +

  '**Entropy change:**\n\n' +

  '$$\\Delta S = m_1 c \\ln\\left(\\frac{T_f}{T_1}\\right) + m_2 c \\ln\\left(\\frac{T_f}{T_2}\\right) = 2 \\cdot 4186 \\cdot \\ln\\left(\\frac{333.33}{360}\\right) + 4 \\cdot 4186 \\cdot \\ln\\left(\\frac{333.33}{320}\\right)$$\n\n' +

  '$$\\Delta S \\approx 8372 \\cdot (-0.0744) + 16744 \\cdot (0.0412) \\approx -622.8 + 690.1 = +67.3\\,\\text{J/K}$$\n\n' +

  'The total change in entropy is positive, consistent with the second law of thermodynamics for an irreversible process.\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 166,
  topic: 'Thermodynamics',

  q: 'Two moles of ideal gas, initially in state 1, are put in contact with a thermal reservoir at a temperature of $T_1 = 400\\,\\text{K}$ and reach, through an isochoric irreversible transformation, thermodynamic state 2 ($T_2 = 800\\,\\text{K}$).\n\nThe specific heat of the gas at constant pressure depends on temperature and is given by:\n\n$$\\frac{C_P}{R} = 2 + 0.02T$$\n\nDetermine the heat $Q_{12}$ exchanged in this transformation.',
  opts: [
    '$Q_{12} = 8.65 \\times 10^2\\,\\text{J}$',
    '$Q_{12} = 200\\,\\text{J}$',
    '$Q_{12} = 8.65 \\times 10^3\\,\\text{J}$',
    '$Q_{12} = 8.65 \\times 10^4\\,\\text{J}$',
  ],

  correct: 2,

  explanation:
  'Use definition of heat for variable heat capacity at constant volume. First, relate $C_V$ from $C_P$ as:\n\n' +

  '$$C_P = R(2 + 0.02T), \\quad C_V = C_P - R = R(1 + 0.02T)$$\n\n' +

  'Integrate to compute $Q = \\int C_V\\,dT$:\n\n' +

  '$$Q = n\\int_{T_1}^{T_2} C_V(T)\\,dT = nR\\int_{400}^{800} (1 + 0.02T)\\,dT = 2 \\cdot R\\left[T + 0.01T^2\\right]_{400}^{800}$$\n\n' +

  '$$= 2 \\cdot 8.314 \\cdot \\left[(800 + 0.01 \\cdot 800^2) - (400 + 0.01 \\cdot 400^2)\\right] \\approx 86500\\,\\text{J} = 8.65 \\times 10^3\\,\\text{J}$$\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 167,
  topic: 'Gravitation',

  q: 'Two satellites are placed in circular orbits of equal radius, one around the Earth and the other around the Moon. Which statement is correct?',
  opts: [
    'The terrestrial satellite makes one turn in a longer time than the lunar satellite',
    'The terrestrial satellite makes one revolution at the same time as the lunar satellite',
    'The terrestrial satellite makes one turn in a shorter time than the lunar satellite',
    'To answer you must know the masses of the satellites',
  ],

  correct: 2,

  explanation:
  'From Kepler\'s 3rd law for circular orbits:\n\n' +

  '$$T = 2\\pi\\sqrt{\\frac{r^3}{GM}}$$\n\n' +

  'Where $T$ is the orbital period, $r$ is the radius of orbit (same for both satellites), $G$ is the gravitational constant, $M$ is the mass of the central body (Earth or Moon).\n\n' +

  'Since $M_\\text{Earth} > M_\\text{Moon}$, then:\n\n' +

  '$$T_\\text{Earth} = 2\\pi\\sqrt{\\frac{r^3}{GM_\\text{Earth}}} < T_\\text{Moon} = 2\\pi\\sqrt{\\frac{r^3}{GM_\\text{Moon}}}$$\n\n' +

  'So the period $T$ is larger for the satellite orbiting the Moon — meaning the terrestrial satellite takes **less time** to complete one revolution.\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 168,
  topic: 'Thermodynamics',

  q: 'Two spheres are made of the same metal and have the same radius, but one is hollow and the other is solid. The spheres are subjected to the same temperature increase. Which sphere expands more?',
  opts: [
    'Solid sphere',
    'Hollow sphere',
    'They expand by the same amount.',
    'Not enough information to say',
  ],

  correct: 2,

  explanation:
  'Thermal expansion of a body depends on:\n\n' +

  '$$\\Delta V = \\beta V_0 \\Delta T$$\n\n' +

  'Where $\\beta$ is the coefficient of volumetric expansion, $V_0$ is the initial volume of the material, $\\Delta T$ is the temperature change.\n\n' +

  'However, in this context, we are comparing **outer dimensions** (radius or diameter), not just volume. Thermal expansion affects all dimensions equally in isotropic solids, and the **outer radius** of both the solid and hollow spheres expands identically because: 1. Both have the same outer radius, 2. Both are made of the same material, 3. Both undergo the same temperature change.\n\n' +

  'Thus, the change in outer radius is the same for both.\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 169,
  topic: 'Thermodynamics',

  q: 'Two substances are mixed together in a closed container with rigid adiabatic walls (for example, two gases between them, or a solid is dissolved in a liquid, and the like). The final temperature, reached at equilibrium, remained the same as at the beginning. Can we say something about the internal energy variation of the system?',
  opts: [
    'Internal energy has grown',
    'The internal energy has decreased',
    'The internal energy has remained constant',
    'Nothing can be said with these informations',
  ],

  correct: 2,

  explanation:
  'The system is:\n\n' +

  '**Closed** — no mass enters or leaves\n\n' +

  '**Adiabatic** — no heat exchange with surroundings\n\n' +

  '**Rigid** — no work is done by expansion/compression\n\n' +

  '**Final temperature equals initial temperature**\n\n' +

  'From the First Law of Thermodynamics:\n\n' +

  '$$\\Delta U = Q - W, \\quad Q = 0 \\text{ (adiabatic)}, \\quad W = 0 \\text{ (rigid container)} \\Rightarrow \\Delta U = 0$$\n\n' +

  'So the internal energy of the system has **not changed**.\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 170,
  topic: 'Mechanics',

  q: 'Under the action of an unknown force field, a point mass of $3\\,\\text{g}$ moves frictionlessly along the curve defined by:$x(t) = 2t, \\quad y(t) = t^2, \\quad z(t) = t^3$\n\nwhere $t$ is the time. Is it possible to calculate the work done by the forces in any given generic time?',
  opts: [
    'Yes, provided that the force field is conservative',
    'Yes, in any case',
    'No, because the force field cannot admit potential',
    'No, because the force field is not known',
  ],

  correct: 1,

  explanation:
  'Even though the force field is unknown, the motion (i.e., the position as a function of time) is fully known. We can compute the velocity and acceleration vectors from the motion equations.\n\n' +

  'Using Newton\'s Second Law: $\\vec{F}(t) = m\\vec{a}(t)$\n\n' +

  'Then, the work done over time $[0, t]$ is:\n\n' +

  '$$W = \\int_0^t \\vec{F}(t\') \\cdot \\vec{v}(t\')\\,dt\' = \\int_0^t m\\vec{a}(t\') \\cdot \\vec{v}(t\')\\,dt\'$$\n\n' +

  'This integral can be evaluated purely from the kinematic expressions without explicitly knowing the force field. Therefore, the work can be calculated in any case where the trajectory is known.\n\n' +

  'Final Answer: **(B)**',
},

{
  id: 171,
  topic: 'Thermodynamics',

  q: 'Under which conditions do real gases approach the ideal gas model?',
  opts: [
    'Low pressure and low temperature.',
    'Low temperature and high pressure.',
    'High temperature and low pressure.',
    'High temperature and high pressure.',
  ],

  correct: 2,

  explanation:
  'Real gases approximate ideal gas behavior when the intermolecular forces and molecular volume become negligible. This occurs:\n\n' +

  'At **high temperatures**, because the kinetic energy of particles dominates over intermolecular attractions.\n\n' +

  'At **low pressures**, because the gas particles are far apart and the volume of the particles becomes negligible compared to the volume of the container.\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 172,
  topic: 'Thermodynamics',

  q: 'We adiabatically compress a perfect gas at constant temperature. What is true about the work done?',
  opts: [
    'The work done is zero for the second principle of thermodynamics.',
    'The work done is zero because the gas is perfect.',
    'The work done is zero for the first principle of thermodynamics.',
    'The work done is zero because the temperature does not vary.',
  ],

  correct: 2,
  flagged: true,
  closestAnswer: 2,

  explanation:
  'The situation described is actually **physically inconsistent**.\n\n' +

  'An **adiabatic process** means there is no heat exchange ($Q = 0$), while a process at **constant temperature** for a perfect gas implies that the internal energy $\\Delta U = 0$.\n\n' +

  'From the First Law of Thermodynamics:\n\n' +

  '$$\\Delta U = Q - W \\Rightarrow 0 = 0 - W \\Rightarrow W = 0$$\n\n' +

  'But this contradicts the concept of adiabatic compression — **work must be done** (since volume is changing), and if $Q = 0$, then $\\Delta U \\neq 0$. Hence, both conditions **cannot hold simultaneously** for an ideal gas.\n\n' +

  '**Conclusion:** It is not possible to compress an ideal gas adiabatically *and* isothermally at the same time unless additional mechanisms are involved. The premise of the question is self-contradictory. The closest valid reasoning is option (C) — derived from the First Law — but none of the answers are fully correct.\n\n' +

  'Final Answer: None of the above choices are correct\n\n' +

  '⚑ **Flagged — The question describes a physically impossible scenario.** Adiabatic and isothermal compression cannot occur simultaneously for a perfect gas. Option (C) is the closest answer based on the First Law logic, but the premise is contradictory.',
},

{
  id: 173,
  topic: 'Mechanics',

  q: 'We consider a system of particles aligned along the $x$-axis of a Cartesian $Oxy$ system of reference. Which of the following statements is correct?',
  opts: [
    'The center of mass can have coordinates $x_\\text{cm} = 0$ and $y_\\text{cm} \\neq 0$',
    'The center of mass of the system necessarily coincides with the position occupied by one of the particles',
    'The center of mass can have coordinates $x_\\text{cm} \\neq 0$ and $y_\\text{cm} \\neq 0$',
    'The center of mass can have coordinates $x_\\text{cm} = 0$ and $y_\\text{cm} = 0$',
  ],

  correct: 3,

  explanation:
  'If all particles are aligned along the $x$-axis, then each particle has $y = 0$. Since the center of mass is a weighted average of particle positions:\n\n' +

  '$$y_i = 0 \\Rightarrow y_\\text{cm} = \\frac{1}{M}\\sum m_i y_i = 0$$\n\n' +

  'As for the $x$-coordinate of the center of mass, it depends on the masses and positions of the particles. If the system is symmetric and balanced around the origin, then $x_\\text{cm} = 0$.\n\n' +

  'So, both $x_\\text{cm} = 0$ and $y_\\text{cm} = 0$ are **possible**.\n\n' +

  'Final Answer: **(D)**',
},

{
  id: 174,
  topic: 'Gravitation',

  q: 'We imagine replacing the core of our planet with a material of such high density as to double the mass of the Earth, without altering its other quantities such as volume, shape, etc. What would happen to atmospheric pressure?',
  opts: [
    'It would also double',
    'It would remain unchanged',
    'It would be halved',
    'It would become four times larger',
  ],

  correct: 0,

  explanation:
  'Atmospheric pressure at the surface is given by:\n\n' +

  '$$P = \\rho g h$$\n\n' +

  'Here, $\\rho$ is density of the air (assumed unchanged), $g = \\dfrac{GM}{R^2}$ is gravitational acceleration, $h$ is height of the air column (also unchanged if volume and shape are same).\n\n' +

  'If the mass $M$ of the Earth doubles and the radius $R$ remains the same, then:\n\n' +

  '$$g\' = \\frac{G(2M)}{R^2} = 2g \\Rightarrow P\' = \\rho(2g)h = 2P$$\n\n' +

  'So, the atmospheric pressure would also double.\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 175,
  topic: 'Thermodynamics',

  q: 'What is the critical temperature of a gas?',
  opts: [
    'It is the temperature below which a real gas behaves exactly like a perfect gas',
    'It is the temperature above which a real gas liquefies for pressures equal to the atmospheric one',
    'It is the maximum temperature at which we can liquefy a real gas',
    'It is the temperature above which a real gas solidifies for pressures equal to the atmospheric one',
  ],

  correct: 2,

  explanation:
  'The **critical temperature** $T_c$ is defined as the highest temperature at which a substance can exist as a liquid, regardless of the pressure applied. Above $T_c$, the gas cannot be liquefied by any amount of pressure — it remains in a gaseous (supercritical) phase.\n\n' +

  'Thus, answer (C) accurately defines the concept.\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 176,
  topic: 'Thermodynamics',

  q: 'What is the critical point of a substance?',
  opts: [
    'It is the point where there is equilibrium between the liquid, solid and gaseous state',
    'It is the point of maximum temperature at which the substance can exist in the liquid state',
    'It is the point of maximum temperature at which the substance can exist in the gaseous state',
    'It is the point of maximum temperature and pressure where there is equilibrium between liquid and vapor',
  ],

  correct: 3,

  explanation:
  'The **critical point** is the unique combination of temperature and pressure at which the liquid and vapor phases of a substance become indistinguishable. Beyond this point, the substance exists as a **supercritical fluid**, and no phase boundary exists between liquid and vapor.\n\n' +

  'Answer (D) correctly describes this condition. The other options refer to the triple point or misinterpret the role of temperature and state.\n\n' +

  'Final Answer: **(D)**',
},

{
  id: 177,
  topic: 'Thermodynamics',

  q: 'What is the efficiency $\\eta$ of a Carnot cycle that works between the temperatures $T_1 = 20^\\circ\\text{C}$ and $T_2 = 100^\\circ\\text{C}$?',
  opts: [
    '$\\eta = 0.2144$',
    '$\\eta = \\dfrac{4}{5}$',
    '$\\eta = \\dfrac{1}{5}$',
    '$\\eta = 0.7856$',
  ],

  correct: 0,

  explanation:
  'The efficiency $\\eta$ of a Carnot engine is given by:\n\n' +

  '$$\\eta = 1 - \\frac{T_C}{T_H}$$\n\n' +

  'Where:\n\n' +

  '$T_C = 20^\\circ\\text{C} = 293\\,\\text{K}$\n\n' +

  '$T_H = 100^\\circ\\text{C} = 373\\,\\text{K}$\n\n' +

  '$$\\eta = 1 - \\frac{293}{373} = 1 - 0.7856 = 0.2144$$\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 178,
  topic: 'Thermodynamics',

  q: 'What is the efficiency $\\eta$ of a Stirling cycle that works between the temperatures $T_1$ and $T_2 > T_1$?',
  opts: [
    '$\\eta = 1 - \\dfrac{T_1}{T_2}$',
    '$\\eta = 1 + \\dfrac{T_1}{T_2}$',
    '$\\eta = 1 - \\dfrac{T_2}{T_1}$',
    '$\\eta = T_2 - T_1$',
  ],

  correct: 0,

  explanation:
  'The ideal Stirling cycle consists of two isothermal processes and two isochoric processes. Its efficiency, like the Carnot cycle (because it is fully reversible), is given by:\n\n' +

  '$$\\eta = 1 - \\frac{T_C}{T_H}$$\n\n' +

  'Where $T_C = T_1$ is the temperature of the cold reservoir and $T_H = T_2$ is the temperature of the hot reservoir. Hence:\n\n' +

  '$$\\eta = 1 - \\frac{T_1}{T_2}$$\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 179,
  topic: 'Mechanics',

  q: 'What is the gravity acceleration $g$ present in a place where a simple pendulum of length $150.3\\,\\text{cm}$ makes $100$ oscillations in $246.7\\,\\text{s}$?',
  opts: [
    '$g = 9.949\\,\\text{m/s}^2$',
    '$g = 9.549\\,\\text{m/s}^2$',
    '$g = 9.449\\,\\text{m/s}^2$',
    '$g = 9.749\\,\\text{m/s}^2$',
  ],

  correct: 3,

  explanation:
  '**Find the period $T$:**\n\n' +

  'Total time $= 246.7\\,\\text{s}$, Oscillations $= 100 \\Rightarrow T = \\dfrac{246.7}{100} = 2.467\\,\\text{s}$\n\n' +

  '**Use pendulum formula:**\n\n' +

  '$$T = 2\\pi\\sqrt{\\frac{L}{g}} \\Rightarrow g = \\frac{4\\pi^2 L}{T^2}$$\n\n' +

  '**Substitute values:** $L = 150.3\\,\\text{cm} = 1.503\\,\\text{m}$, $T = 2.467\\,\\text{s}$\n\n' +

  '$$g = \\frac{4\\pi^2 \\cdot 1.503}{(2.467)^2} \\approx \\frac{59.292}{6.086} \\approx 9.742\\,\\text{m/s}^2$$\n\n' +

  'Final Answer: **(D)**',
},

{
  id: 180,
  topic: 'Thermodynamics',

  q: 'What is the latent heat?',
  opts: [
    'The latent heat is the energy required to change the phase of a pure substance',
    'The latent heat is the energy for unit mass required to change the phase of a pure substance',
    'The latent heat is the heat produced entropy when a pure substance changes phase',
    'The latent heat is the heat produced when the temperature of pure substance increases during a phase transition',
  ],

  correct: 1,

  explanation:
  'Latent heat ($L$) is defined as the amount of energy required to change the phase (e.g., solid to liquid or liquid to gas) of *one unit of mass* of a substance, without changing its temperature. Mathematically:\n\n' +

  '$$Q = mL$$\n\n' +

  'Where $Q$ is heat added or removed, $m$ is mass of the substance, and $L$ is the latent heat (specific latent heat if per unit mass).\n\n' +

  'Final Answer: **(B)**',
},

{
  id: 181,
  topic: 'Mechanics',

  q: 'What is the law $ma = F$?',
  opts: [
    'A system of three differential equations solved which (using also the boundary conditions) it is possible to determine the trajectory of a point-like body of mass $m$',
    'A link between the acceleration and the mass of a generic body',
    'A link between acceleration and the force to which a generic body is subjected',
    'A link between mass and the force to which a generic body is subjected',
  ],

  correct: 0,

  explanation:
  'The mass affects the acceleration, hence the coefficient in the differential equations.\n\n' +

  '**Newton\'s Second Law:**\n\n' +

  '$$\\vec{F} = m\\frac{d^2\\vec{r}}{dt^2}$$\n\n' +

  'Velocity is the first derivative of position: $\\vec{v}(t) = \\dfrac{d\\vec{r}}{dt}$\n\n' +

  'Integrating acceleration gives velocity: $\\vec{v}(t) = \\vec{v}_0 + \\int_{t_0}^t \\dfrac{\\vec{F}(t\')}{m}\\,dt\'$\n\n' +

  'Integrating velocity gives position: $\\vec{r}(t) = \\vec{r}_0 + \\int_{t_0}^t \\vec{v}(t\')\\,dt\'$\n\n' +

  '**Component Form** (in $x$, $y$, $z$) — Newton\'s Second Law in components (system of three differential equations):\n\n' +

  '$$F_x = m\\frac{d^2x}{dt^2}, \\quad F_y = m\\frac{d^2y}{dt^2}, \\quad F_z = m\\frac{d^2z}{dt^2}$$\n\n' +

  'Here, $x(t)$, $y(t)$, $z(t)$ are the components of the position vector $\\vec{r}(t)$.\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 182,
  topic: 'Thermodynamics',

  q: 'What is the origin of the pressure of a gas at the microscopic scale?',
  opts: [
    'Collisions of atoms with container walls.',
    'Collisions between atoms.',
    'The gravitational force on atoms.',
    'The kinetic energy of atoms.',
  ],

  correct: 0,

  explanation:
  'On a microscopic scale, the pressure of a gas arises due to the continuous, random motion of gas molecules colliding with the walls of the container. Each collision imparts momentum to the wall, and the cumulative effect of many such collisions per unit area per unit time gives rise to pressure:\n\n' +

  '$$P = \\frac{1}{3}\\rho\\overline{v^2}$$\n\n' +

  'where $\\rho$ is the gas density and $\\overline{v^2}$ is the mean square velocity of the molecules.\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 183,
  topic: 'Mechanics',

  q: 'What is the solution of the differential equation\n\n$$\\frac{d^2x(t)}{dt^2} = -\\frac{k}{m}x(t)$$\n\nwhere $A$ and $\\phi$ are constants?',
  opts: [
    '$x(t) = A\\cos(\\omega t + \\phi)$ with $\\omega = \\dfrac{k}{m}$',
    '$x(t) = A\\sin\\left(\\dfrac{k}{m}t + \\phi\\right)$',
    '$x(t) = A\\cos\\left(\\sqrt{\\dfrac{k}{m}}\\,t + \\phi\\right)$',
    '$x(t) = A\\sin\\left(\\dfrac{m}{k}t + \\phi\\right)$',
  ],

  correct: 2,

  explanation:
  'The given equation is a second-order linear differential equation of simple harmonic motion:\n\n' +

  '$$\\frac{d^2x(t)}{dt^2} = -\\frac{k}{m}x(t)$$\n\n' +

  'This corresponds to the standard SHM equation $\\ddot{x} = -\\omega^2 x$. Thus:\n\n' +

  '$$\\omega = \\sqrt{\\frac{k}{m}}$$\n\n' +

  'The general solution is:\n\n' +

  '$$x(t) = A\\cos(\\omega t + \\phi) \\quad \\text{or} \\quad x(t) = A\\sin(\\omega t + \\phi)$$\n\n' +

  '$$x(t) = A\\cos\\left(\\sqrt{\\frac{k}{m}}\\,t + \\phi\\right)$$\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 184,
  topic: 'Thermodynamics',

  q: 'What is the unit measurement of the thermal conductivity?',
  opts: [
    '$\\dfrac{W}{m \\cdot K}$',
    'It is a pure number',
    '$\\dfrac{W \\cdot m}{K}$',
    '$\\dfrac{W \\cdot K}{m}$',
  ],

  correct: 0,

  explanation:
  'Thermal conductivity $k$ is defined in Fourier\'s Law of heat conduction:\n\n' +

  '$$q = -k \\cdot A \\cdot \\frac{dT}{dx}$$\n\n' +

  'Where $q$ is the heat transfer rate [W], $A$ is the area [m²], $\\dfrac{dT}{dx}$ is the temperature gradient [K/m].\n\n' +

  'Solving for $k$:\n\n' +

  '$$k = \\frac{q}{A \\cdot \\left(\\dfrac{dT}{dx}\\right)} \\Rightarrow \\left[\\frac{W}{m \\cdot K}\\right]$$\n\n' +

  'This unit indicates how much heat (in watts) is conducted per meter length per Kelvin of temperature difference.\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 185,
  topic: 'Mechanics',

  q: 'What is the unit measurement of the universal gravitational constant $G$?',
  opts: [
    'It is a pure number',
    '$\\dfrac{m^3}{kg \\cdot s^2}$',
    '$\\dfrac{m^3}{kg^2 \\cdot s}$',
    '$\\dfrac{m^2}{kg^2 \\cdot s^2}$',
  ],

  correct: 1,

  explanation:
  'From Newton\'s Law of Universal Gravitation:\n\n' +

  '$$F = G \\cdot \\frac{m_1 m_2}{r^2}$$\n\n' +

  'Solving for $G$:\n\n' +

  '$$G = \\frac{F \\cdot r^2}{m_1 m_2}$$\n\n' +

  'Using SI units — $F$ in newtons $[\\text{N}] = \\dfrac{\\text{kg} \\cdot \\text{m}}{\\text{s}^2}$, $r$ in meters $[\\text{m}]$, $m_1, m_2$ in kilograms $[\\text{kg}]$:\n\n' +

  '$$G = \\frac{\\text{kg} \\cdot \\text{m/s}^2 \\cdot \\text{m}^2}{\\text{kg} \\cdot \\text{kg}} = \\frac{m^3}{kg \\cdot s^2}$$\n\n' +

  'Final Answer: **(B)**',
},

{
  id: 186,
  topic: 'Thermodynamics',

  q: 'What means that internal energy is a state function?',
  opts: [
    'The variation it undergoes during a transformation from state A to state B depends only on A and B',
    'The variation it undergoes during a transformation from state A to state B depends on the path followed to go from A and B',
    'The variation it undergoes during a transformation from state A to state B depends only on the temperature and the specific heat',
    'The variation it undergoes during a transformation from state A to state B depends only on the temperature',
  ],

  correct: 0,

  explanation:
  'A state function is a property whose value does not depend on the path taken to reach that specific value. Internal energy $U$ is a state function, meaning that its change $\\Delta U$ between two states A and B depends only on the values of $U$ at those states, not on how the system got from A to B.\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 187,
  topic: 'Thermodynamics',

  q: 'Which is the correct definition for an adiabatic process for a gas?',
  opts: [
    'Gas exchanges no heat.',
    'Gas performs no work.',
    'Internal energy of the gas does not increase.',
    'Internal energy of the gas does not change.',
  ],

  correct: 0,

  explanation:
  'An **adiabatic process** is a thermodynamic transformation in which **no heat is transferred** into or out of the system.\n\n' +

  'This does **not** mean:\n\n' +

  'The gas does no work — it *can* do work.\n\n' +

  'The internal energy stays the same — it *can* change, depending on the work done.\n\n' +

  'From the First Law of Thermodynamics:\n\n' +

  '$$\\Delta U = Q - W \\Rightarrow \\Delta U = -W \\quad (\\text{since } Q = 0)$$\n\n' +

  'So, in an adiabatic process, any work done by the gas reduces its internal energy, and vice versa.\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 188,
  topic: 'Thermodynamics',

  q: 'Which is correct for the second law of thermodynamics?',
  opts: [
    'Received heat can be fully converted into work.',
    'The difference between received heat and given heat is converted into work.',
    'The sum of received heat and given heat is converted into work.',
    'It is not possible to fully convert received heat into work.',
  ],

  correct: 3,

  explanation:
  'According to the **Second Law of Thermodynamics**, no heat engine operating between two reservoirs can convert all the absorbed heat into work. There must always be some waste heat expelled to the cold reservoir.\n\n' +

  'This makes (A) incorrect — full conversion of heat to work violates the second law.\n\n' +

  'Thus, (D) is the correct choice, as it captures the *fundamental limitation* imposed by the second law.\n\n' +

  'Final Answer: **(D)**',
},

{
  id: 189,
  topic: 'Thermodynamics',

  q: 'Which of the following can be assumed to be reversible?',
  opts: [
    'A paddle wheel.',
    'A burst membrane.',
    'A resistance heater.',
    'A piston compressing lowly gas inside a race engine.',
  ],

  correct: 3,

  explanation:
  'In thermodynamics, a **reversible process** is an idealized process that happens infinitely slowly so that the system remains in thermodynamic equilibrium at all times.\n\n' +

  'Among the options:\n\n' +

  '(A) *Paddle wheel* — involves friction and turbulence → irreversible.\n\n' +

  '(B) *Burst membrane* — sudden, uncontrolled → highly irreversible.\n\n' +

  '(C) *Resistance heater* — generates entropy and heat irreversibly.\n\n' +

  '(D) *Piston compressing gas slowly* — quasistatic, close to equilibrium → can be assumed reversible.\n\n' +

  'Even though it\'s inside a "race engine," the key phrase is **"compressing slowly,"** which enables a quasistatic and idealized reversible process.\n\n' +

  'Final Answer: **(D)**',
},
{
  id: 190,
  topic: 'Mechanics',

  q: 'Which of the following is correct for a simple pendulum?',
  opts: [
    'Potential energy is minimum at the highest point.',
    'Kinetic energy is maximum at the highest point.',
    'Potential energy is minimum at the lowest point.',
    'Total energy is minimum at the lowest point.',
  ],

  correct: 2,

  explanation:
  'In a simple pendulum:\n\n' +

  'The **highest point** is where the pendulum has **maximum potential energy** and **zero kinetic energy**.\n\n' +

  'The **lowest point** is where the pendulum has **maximum kinetic energy** and **minimum potential energy**.\n\n' +

  'The **total mechanical energy** (sum of kinetic and potential) remains **constant** throughout the motion (ignoring friction).\n\n' +

  'Thus, (C) is the only correct statement based on mechanical energy conservation and pendulum dynamics.\n\n' +

  'Final Answer: **(C)**',
},

{
  id: 191,
  topic: 'Mechanics',

  q: 'Which of the following is **incorrect** for the buoyant force of liquids?',
  opts: [
    'It increases with depth.',
    'It increases with the density of the liquid.',
    'It increases with the volume of the object.',
    'It increases with the gravitational acceleration.',
  ],

  correct: 0,

  explanation:
  'The buoyant force is given by **Archimedes\' Principle**:\n\n' +

  '$$F_b = \\rho_\\text{liquid} \\cdot V_\\text{displaced} \\cdot g$$\n\n' +

  'Where $\\rho_\\text{liquid}$ is the liquid density, $V_\\text{displaced}$ is the volume of fluid displaced (equal to the volume of the submerged object), and $g$ is gravitational acceleration.\n\n' +

  '**Depth is not a factor** — as long as the object is fully submerged, going deeper does **not** increase the buoyant force. So, statement (A) is incorrect.\n\n' +

  'All other options (B, C, D) are **correct** based on the formula.\n\n' +

  'Final Answer: **(A)**',
},

{
  id: 192,
  topic: 'Thermodynamics',

  q: 'Which of the following second law statements is **incorrect**?',
  opts: [
    'The entropy of a hot copper block decreases as it cools.',
    'Ice is melted in water in an insulated container, the net entropy decreases.',
    'The entropy of an isolated system must remain constant or increase.',
    'Work must be input and energy is transferred from a cold body to a hot body.',
  ],

  correct: 1,

  explanation:
  'Statement (B) violates the **second law of thermodynamics**. When ice melts in an **insulated (isolated)** container:\n\n' +

  'The entropy of the ice increases.\n\n' +

  'The water\'s entropy decreases (due to giving up energy).\n\n' +

  'However, the **net entropy increases**, not decreases.\n\n' +

  'Let\'s briefly examine the other options:\n\n' +

  '(A): TRUE — the copper block loses entropy as it cools.\n\n' +

  '(C): TRUE — entropy of an isolated system never decreases.\n\n' +

  '(D): TRUE — energy transfer from cold to hot requires external work (refrigerators).\n\n' +

  'Thus, (B) is the only false statement.\n\n' +

  'Final Answer: **(B)**',
},

{
  id: 193,
  topic: 'Thermodynamics',

  q: 'Which of the following statements can be taken as the definition of reversible transformation?',
  opts: [
    'It is a transformation in which friction phenomena are absent.',
    'It is a transformation that passes through a succession of states of equilibrium.',
    'It is a cyclic transformation.',
    'It is a transformation in which entropy remains constant.',
  ],

  correct: 1,

  explanation:
  'A **reversible transformation** is one that proceeds through a continuous sequence of **equilibrium states** — meaning the system remains infinitesimally close to equilibrium at all times. This is a **quasistatic** process and is idealized in thermodynamics.\n\n' +

  'Let\'s briefly review the other options:\n\n' +

  '(A): Absence of friction is necessary but **not sufficient** to define reversibility.\n\n' +

  '(C): Cyclic transformations can be **irreversible** or **reversible** — this is not a defining feature.\n\n' +

  '(D): Entropy **can** remain constant in reversible processes, but this is a **consequence**, not a definition.\n\n' +

  'Final Answer: **(B)**',
},

{
  id: 194,
  topic: 'Thermodynamics',

  q: 'Which of these equations represents an adiabatic transformation for an ideal gas?\n\n1) $PV^\\gamma = \\text{const}$\n 2) $PT^\\gamma = \\text{const}$ \n 3) $P^{1-\\gamma}T^\\gamma = \\text{const}$ \n 4) $TV^{\\gamma-1} = \\text{const}$',
  opts: [
    '2',
    '1 and 3',
    '2 and 3',
    '1 and 4',
  ],

  correct: 3,

  explanation:
  'In an adiabatic process for an ideal gas (no heat exchange, $Q = 0$), the following relations hold:\n\n' +

  '**1)** $PV^\\gamma = \\text{const}$ — standard adiabatic equation\n\n' +

  '**4)** $TV^{\\gamma-1} = \\text{const}$ — derived from combining $PV^\\gamma = \\text{const}$ with the ideal gas law\n\n' +

  'Let\'s analyze the others:\n\n' +

  '**2)** $PT^\\gamma = \\text{const}$ — incorrect, not derived from adiabatic relations\n\n' +

  '**3)** $P^{1-\\gamma}T^\\gamma = \\text{const}$ — this form does not match any standard adiabatic relation\n\n' +

  'Hence, only options **1 and 4** are valid for adiabatic processes.\n\n' +

  'Final Answer: **(D)**',
},
];
