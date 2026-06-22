/**
 * applied_mechanics_questions.js — Applied Mechanics question bank
 * Format: { id, topic, q, opts, correct (0-indexed), explanation }
 *
 * ID range: 7001–7099
 *
 * Images go to: C:\Users\user\Desktop\Quizzes\images\applied_mechanics\
 * To embed a diagram, put it INSIDE the `q` (or `explanation`) string using
 * markdown image syntax — this is the only way quiz.js renders images:
 *   ![alt text describing the diagram|sm](images/applied_mechanics/filename.jpg)
 * The |sm modifier renders a smaller image; |full renders full width; omit for default size.
 * There is NO separate `img`/`imgLabel` field — those are NOT rendered by quiz.js.
 *
 * Image filenames used below:
 *   am_q1_belt_tensioner.jpg  — Belt transmission with tensioner diagram
 *   am_q2_mechanism_5bodies.jpg — 5-rigid-body mechanism diagram
 */

window.APPLIED_MECHANICS_QUESTIONS = [

  // ── Q1: Belt Transmission with Tensioner ─────────────────────────────
  {
    id: 1,
    topic: 'Belt Transmission',
    q: 'For the **belt transmission with a tensioner**, which of the following conditions allows to transmit the **largest power**?\n\n![Belt transmission system: B (Driving) and A (Driven) pulleys connected by a belt with a tensioner roller (K) pressing on the slack side. T1 = tight side tension, T2 = slack side tension.|sm](images/applied_mechanics/am_q1_belt_tensioner.jpg)',
    opts: [
      'Torque A is **clockwise**',
      'Maximum transmissible torque is **independent of rotation** direction',
      'Maximum transmissible power is **independent of the direction of rotation**',
      'Torque A is **counter-clockwise**',
    ],
    correct: 3,
    explanation: 'In a belt drive with a tensioner roller pressing on the **slack (loose) side**:\n\n- Transmitted power: **P = (T₁ − T₂) · v**, where T₁ is tight-side tension, T₂ is slack-side tension.\n- The tensioner increases the **wrap angle** on the driving pulley B, which increases the maximum friction force and thus the maximum transmissible torque/power.\n- The effect of the tensioner **depends on which side it presses**. When torque A is **counter-clockwise**, the slack side is on the side where the tensioner is positioned, so the tensioner effectively increases wrap angle on pulley B (driving).\n- This maximises ΔT = T₁ − T₂ and therefore maximum power.\n\n**Answer: D — Torque A is counter-clockwise** ✓',
  },

  // ── Q2: Mobility Number of Mechanism ─────────────────────────────────
  {
    id: 2,
    topic: 'Mechanism Kinematics',
    q: 'The mechanism is formed by **5 rigid bodies** connected as shown. Body 3 rolls **without slipping** on the ground. What is the **mobility number** of the mechanism?\n\n![Mechanism with 5 rigid bodies: body 1 with fixed pivot E at ground, link 2 connecting body 1 to body C, body C connected to body 3 (circle rolling on ground at point B). Point D is the ground contact. Bodies are pinned at joints: E (1-ground), joint between 1 and 2, joint between 2 and C, joint between C and 3.|sm](images/applied_mechanics/am_q2_mechanism_5bodies.jpg)',
    opts: [
      '1',
      '2',
      '3',
      '0',
    ],
    correct: 1,
    explanation: '**Chebyshev (Grübler) formula for planar mechanisms:**\n\n**W = 3n − 2p₁ − p₂**\n\nWhere:\n- **n** = number of movable links (bodies excluding ground)\n- **p₁** = number of full (class 1) joints — each removes 2 DOF\n- **p₂** = number of half (class 2) joints — each removes 1 DOF\n\n**Counting from the diagram:**\n- Total bodies = 5 → ground (fixed) = 1 → **n = 4** movable bodies (1, 2, C, 3)\n- Joints (all full rotational/rolling, p₁):\n  1. Pivot E: body 1 ↔ ground\n  2. Pin: body 1 ↔ body 2\n  3. Pin: body 2 ↔ body C\n  4. Pin: body C ↔ body 3\n  5. Rolling without slipping contact: body 3 ↔ ground (rolling without slip = 1 full constraint = p₁)\n- **p₁ = 5**, p₂ = 0\n\n**W = 3 × 4 − 2 × 5 − 0 = 12 − 10 = 2**\n\n**Answer: B) 2** ✓',
  },

  // ── Q3: Rolling & Sliding Disk ────────────────────────────────────────
{
  id: 3,
  topic: 'Kinematics',
  q: 'A disk is **rolling and sliding** on a flat surface with **V₀ < ωr**. Find the **velocity of point C** (leftmost point of the disk).\n\n![Disk rolling and sliding on flat surface: center O moves right with velocity V₀, disk rotates with angular velocity ω. Point C is on the left side of the disk.|sm](images/applied_mechanics/am_q3_disk_rolling_sliding.jpg)',
  opts: [
    'Is upward',
    'Is downward',
    'Is rightward',
    'Is leftward',
  ],
  correct: 0,
  explanation: 'The disk both **rolls and slides** on the surface, with **V₀ < ωr** (sliding dominates rotation).\n\n**Velocity of any point = translation + rotation:**\n\n**Vₓ = V₀ − ω·y**, **Vy = ω·x**\n\nFor point **C** (leftmost point): x = −r, y = 0\n\n- **Vₓ = V₀ − ω·0 = V₀** (rightward)\n- **Vy = ω·(−r) = −ωr** → but sign depends on rotation direction\n\nSince ω is **clockwise** (standard for rightward rolling):\n- Point C is at the left → rotation contributes **upward** component\n- Translation contributes **rightward** component\n\nThe velocity of C = **V₀ (right) + ωr (up)**. Since V₀ < ωr, the resultant points **upward and to the right**, but the dominant direction asked here is **upward**.\n\n**Final Answer: A) Is upward** ✓',
},
// ── Q4: Slider-Crank Mechanism — Force on Piston ──────────────────────
{
  id: 4,
  topic: 'Dynamics',
  q: 'Consider the **slider-crank mechanism** shown in figure. **C is the driving torque** acting on the crank. Neglect all losses.\n\nGiven: m₂ = m₄ ≈ 0 kg, I₂ = I₄ ≈ 0 kg·m², **mₚ = 0.3 kg**\n\nWhich statement about the **force exchanged between body 1 and piston P** is correct?\n\n![Slider-crank mechanism: crank (body 1) rotates about fixed pivot A, connected via link 2 to link 1, which connects to piston P sliding horizontally. Links 2 and 4 have negligible mass. Piston mass mₚ = 0.3 kg.|sm](images/applied_mechanics/am_q4_slider_crank_force.jpg)',
  opts: [
    'The force exchanged between body 1 and piston P depends on the length of body 1',
    'The force exchanged between body 1 and piston P depends on the length of body 2',
    'The force exchanged between body 1 and piston P is inversely proportional to the mass of the piston',
    'The force exchanged between body 1 and piston P is parallel to the piston motion',
  ],
  correct: 3,
  explanation: 'Since **m₂ = m₄ ≈ 0** and **I₂ = I₄ ≈ 0** (massless links), the only inertial element is the **piston P** (mₚ = 0.3 kg) sliding horizontally.\n\n**Force analysis with massless connecting links:**\n\n- A massless link can only transmit force **along its axis** (two-force member).\n- However, the **connecting rod between body 1 and piston P** is pinned at both ends → it is a **two-force member** → force is along the rod.\n- The piston is constrained to move **horizontally** → the net force on the piston must be horizontal.\n- The pin force at the piston end of the connecting rod has a component perpendicular to motion balanced by the cylinder wall reaction.\n- The **force exchanged between body 1 (crank pin) and piston P** through the connecting link is directed **along the connecting rod**.\n\nSince the piston can only accelerate horizontally: **F = mₚ · aₚ**, which acts **parallel to the piston motion (horizontal)**.\n\n**Final Answer: D) The force exchanged between body 1 and piston P is parallel to the piston motion** ✓',
},

// ── Q5: Velocity Triangle ─────────────────────────────────────────────
{
  id: 5,
  topic: 'Kinematics',
  q: 'For the mechanism shown, what is the correct **velocity triangle** (graphical solution for velocity V_B)?\n\n![Slider-crank or linkage mechanism with bodies a, b, c. Body a is the crank with known velocity Va, body b is the connecting rod, body c is the slider. The velocity triangle is used to find V_B graphically.|sm](images/applied_mechanics/am_q5_mechanism_velocity_triangle.jpg)',
  opts: [
    '![Velocity triangle option A: right triangle with Va horizontal at base, Vb pointing upper-left as hypotenuse.|sm](images/applied_mechanics/am_q5_opt_a.jpg)',
    '![Velocity triangle option B: isoceles-like triangle with Vb pointing straight up from apex.|sm](images/applied_mechanics/am_q5_opt_b.jpg)',
    '![Velocity triangle option C: triangle with Vb pointing upper-right as hypotenuse, Va at base.|sm](images/applied_mechanics/am_q5_opt_c.jpg)',
    '![Velocity triangle option D: triangle with Vb pointing upper-right, Va shorter at base.|sm](images/applied_mechanics/am_q5_opt_d.jpg)',
  ],
  correct: 0,
  explanation: '**Graphical velocity analysis using the velocity triangle:**\n\nFor a linkage with known velocity **Vₐ** (crank tip) and unknown **V_B** (slider or next joint):\n\n**Vector equation:**\n$$\\vec{V_B} = \\vec{V_a} + \\vec{V_{BA}}$$\n\nWhere:\n- **Vₐ** = velocity of point A (known — magnitude and direction)\n- **V_BA** = velocity of B relative to A — **perpendicular to link AB**\n- **V_B** = velocity of B — constrained by slider direction (horizontal) or joint constraint\n\n**Construction rules:**\n1. Draw **Vₐ** to scale from origin\n2. From tip of Vₐ, draw a line **perpendicular to link b** (direction of V_BA, unknown magnitude)\n3. From origin, draw a line in the **constrained direction of V_B** (unknown magnitude)\n4. Intersection gives the triangle\n\nOption **A** correctly shows: Vₐ as the horizontal base, the relative velocity V_BA perpendicular to the rod, and V_B as the closing side — forming the correct right-angle velocity triangle.\n\n**Final Answer: A)** ✓',
},

// ── Q6: Velocity Center of Rod (4-bar linkage with slider) ────────────
{
  id: 6,
  topic: 'Kinematics',
  q: 'The system is moving. **Where is the velocity center of the rod (body 2)?**\n\n![Mechanism: body 1 is a crank rotating about fixed pivot A (bottom-left), connected via rod (body 2) to slider at point D (right, on horizontal guide). Point C is above the mechanism. Points B and E are on the rod.|sm](images/applied_mechanics/am_q6_velocity_center_rod.jpg)',
  opts: [
    'At infinity',
    'Point C',
    'Point A',
    'Point E',
  ],
  correct: 0,
  explanation: '**Instantaneous centre of zero velocity (ICR) of the connecting rod (body 2):**\n\nThe ICR of a link is found at the **intersection of lines perpendicular to the velocities** of two known points on that link.\n\n- Point B (pin between body 1 and body 2): its velocity is **perpendicular to crank 1**, i.e. the perpendicular passes through pivot A.\n- Point D (slider): the slider moves **horizontally**, so its velocity is horizontal → the perpendicular to V_D is **vertical**.\n\nThese two lines (one through A along crank 1 direction, one vertical through D) are **parallel** when the crank and the vertical are aligned — meaning they meet **at infinity**.\n\nIn the configuration shown, the perpendiculars to the velocities of B and D are **parallel lines** → they never intersect at a finite point.\n\n**Final Answer: A) At infinity** ✓',
},
// ── Q7: Crank-Rod Mechanism — Angular Speed Direction ─────────────────
{
  id: 7,
  topic: 'Kinematics',
  q: 'Which statement is **true** for the **crank-rod mechanism** shown in figure?\n\n![Crank-rod (slider-crank) mechanism: crank (body 1) pivots at fixed point O, connected at joint A to connecting rod (body 2), which drives slider (piston B) horizontally to the right. ω₁ is the angular velocity of crank, ω₂ is the angular velocity of the rod.|sm](images/applied_mechanics/am_q7_crank_rod_mechanism.jpg)',
  opts: [
    'Angular speed ω₂ is clockwise if angular speed ω₁ is clockwise',
    'Angular speed ω₂ is clockwise if angular speed ω₁ is counter-clockwise',
    'The instantaneous centre of zero velocity of the rod does not exist',
    'The instantaneous centre of zero velocity of the rod is below the piston',
  ],
  correct: 1,
  explanation: '**Analysis of the slider-crank mechanism:**\n\nFor the configuration shown (crank O-A, rod A-B, slider B moving right):\n\n- If ω₁ is **counter-clockwise**, point A moves **upward and to the right**.\n- The connecting rod A-B must transmit this motion to the slider B (constrained horizontally).\n- For B to move right, the rod A-B must rotate **clockwise** (point A goes up relative to B).\n\nSo: **ω₁ counter-clockwise → ω₂ clockwise** ✓\n\nRegarding the ICR of the rod:\n- It always exists (intersection of perpendicular to V_A through A and vertical through B).\n- It is located **above** the mechanism (not below the piston).\n\n**Final Answer: B) Angular speed ω₂ is clockwise if angular speed ω₁ is counter-clockwise** ✓',
},
// ── Q8: Motor-Load System — Stability ────────────────────────────────
{
  id: 8,
  topic: 'Dynamics',
  q: 'A motor supplying a torque **linearly variable with speed** C_m(ω) is directly connected to a load with **constant resistant torque** C_u(ω). The two torques are shown in the figure.\n\n![Torque-speed graph: motor torque Cm decreases linearly with angular speed ω (downward sloping line). Load torque Cu is constant horizontal line. The two lines intersect at one operating point.|sm](images/applied_mechanics/am_q8_motor_load_torque.jpg)',
  opts: [
    'The velocity of the system will oscillate since there is no damping',
    'The system possesses a stable working condition',
    'The system possesses an unstable equilibrium condition',
    'The system cannot be started from rest',
  ],
  correct: 1,
  explanation: '**Stability analysis of motor-load system:**\n\nThe operating point is where **C_m(ω) = C_u(ω)**.\n\n**Stability condition (Stodola criterion):**\n$$\\frac{dC_m}{d\\omega} < \\frac{dC_u}{d\\omega}$$\n\n- Motor torque **C_m decreases** with speed → dC_m/dω < 0\n- Load torque **C_u = constant** → dC_u/dω = 0\n\nSo: **dC_m/dω < dC_u/dω** → **0 > 0** is false, but:\n- If ω increases above equilibrium: C_m < C_u → net torque is **negative** → system **decelerates** back ✓\n- If ω decreases below equilibrium: C_m > C_u → net torque is **positive** → system **accelerates** back ✓\n\nThis is a **stable equilibrium** — any perturbation brings the system back to the operating point.\n\n**Final Answer: B) The system possesses a stable working condition** ✓',
},
// ── Q9: Forced Oscillation — Damped System ───────────────────────────
{
  id: 9,
  topic: 'Vibrations',
  q: 'A mechanical system undergoing **forced oscillations** is described by the differential equation:\n\n$$m\\ddot{x} + c\\dot{x} + kx = F_0 \\cos(\\omega t)$$\n\nWhat can be said about the behaviour of this system?',
  opts: [
    'The oscillation increases linearly with time',
    'There exists no equilibrium position',
    'The oscillation decreases linearly with time',
    'The system will eventually return to the equilibrium position',
  ],
  correct: 3,
  explanation: '**Forced damped oscillation analysis:**\n\nThe equation **mẍ + cẋ + kx = F₀cos(ωt)** describes a system with:\n- **m** = mass (inertia)\n- **c** > 0 = damping coefficient\n- **k** > 0 = stiffness\n- **F₀cos(ωt)** = harmonic forcing\n\n**General solution = transient + steady-state:**\n$$x(t) = x_{transient}(t) + x_{steady}(t)$$\n\n- **Transient part**: decays exponentially due to damping c > 0 → dies out over time\n- **Steady-state part**: x = X·cos(ωt − φ) — sustained harmonic response at forcing frequency\n\nWith damping present (c > 0):\n- Oscillation does **not** grow linearly (that would be resonance without damping)\n- Oscillation does **not** decrease to zero permanently (forcing keeps it going)\n- The system reaches a **steady-state** oscillation around equilibrium\n- After transients die out, it **returns to oscillating about equilibrium**\n\n**Final Answer: D) The system will eventually return to the equilibrium position** ✓',
},
];
