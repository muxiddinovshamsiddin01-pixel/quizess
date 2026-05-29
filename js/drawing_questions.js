/**
 * drawing_questions.js — Engineering Drawing (Дровинг) question bank
 * Format: { id, topic, q, opts: [A,B,C,D], correct (0-indexed), explanation }
 * Image options use object format: { img: 'path/to/image.png', label: '(a)' }
 *
 * ID range: 3001–3099
 */

window.DRAWING_QUESTIONS = [
  {
    id: 3001,
    topic: 'Threaded Connections',
    q: 'Which of the following drawings represents a mechanical connection with a **cap screw** (винт)?',
    opts: [
      { img: 'images/drawing/q1_a.png', label: '(a) Bolt connection' },
      { img: 'images/drawing/q1_b.png', label: '(b) Cap screw connection' },
      { img: 'images/drawing/q1_c.png', label: '(c) Stud connection' },
    ],
    correct: 1,
    explanation: 'A **cap screw** (винт) screws directly into a tapped (threaded) hole in one of the parts — no nut is needed on the other side. Drawing **(b)** shows exactly this: the hex-head screw passes through a clearance hole in the first part and threads into a blind tapped hole in the second. Drawing **(a)** is a **bolt** connection (болт) — the bolt passes through clearance holes in both parts and is secured with a nut. Drawing **(c)** is a **stud** connection (шпилька) — a headless rod threaded into one part on one end, with a nut on the other.',
  },

  // ── Dimension Notation ───────────────────────────────────────────────────

  {
    id: 3002,
    topic: 'Dimension Notation',
    q: 'What is the meaning of the dimension: **G 1**?',
    opts: [
      'Not Sealed GAS Threadings with nominal diameter of 1 inch',
      'ISO Threadings with nominal diameter of 1 mm',
      'Sealed GAS Threadings with nominal diameter of 1 inch',
    ],
    correct: 2,
    explanation: '**G** is the ISO designation for **Sealed (cylindrical) GAS pipe threads** (ГОСТ 6357, ISO 228). The number after G is the nominal diameter in **inches**. So **G 1** = Sealed GAS Threading with nominal diameter **1 inch**. Note: unsealable parallel pipe threads also use G, but in engineering drawing context "Sealed GAS" refers to the standard parallel thread. Option (a) confuses sealed/not-sealed; option (b) incorrectly states mm.',
  },

  {
    id: 3003,
    topic: 'Dimension Notation',
    q: 'What is the meaning of the dimension: **10H7**?',
    opts: [
      'Dimensional Tolerance with position H and grade 7 for a dimension 10 mm',
      'ISO Threadings with nominal diameter 10 and fine pitch 7 mm',
      'Withworth Threading with nominal diameter 10 inch',
    ],
    correct: 0,
    explanation: 'In ISO tolerance notation, **10H7** means: nominal size = **10 mm**, tolerance position = **H** (for holes; H means the lower deviation is zero), IT grade = **7** (IT7 — medium precision). This is a **dimensional tolerance** designation, not a thread callout. Option (b) would be written as M10×0.7; option (c) would use the Whitworth symbol W.',
  },

  {
    id: 3004,
    topic: 'Dimension Notation',
    q: 'What is the meaning of the dimension: **R 1/2**?',
    opts: [
      'Sealed GAS Threading with nominal diameter 1/2 inch',
      'Dimensional Tolerance with position R and grade 1 for a dimension 2',
      'ISO Threading with nominal diameter 1 mm and pitch 2 mm',
    ],
    correct: 0,
    explanation: '**R** (or Rc) is the ISO/BSP designation for **tapered pipe threads** (sealed). The number is the nominal bore in **inches**. So **R 1/2** = Sealed (tapered) GAS Threading with nominal diameter **1/2 inch**. Option (b) misreads R as a tolerance letter; option (c) confuses R with metric M notation.',
  },

  // ── Fits & Tolerances ────────────────────────────────────────────────────

  {
    id: 3005,
    topic: 'Fits & Tolerances',
    q: 'Using the table below, determine the fit **Ø7 H7/g6**: is it interference or clearance? Find the maximum and minimum diameters of the hole and shaft.\n\n![ISO Tolerance Table|full](images/drawing/tolerance_table_iso_2.png)',
    opts: [
      'Interference\nD Max Hole = 7.015\nD Min Hole = 7.000\nd Max Shaft = 6.995\nd Min Shaft = 6.986',
      'Clearance\nD Max Hole = 7.009\nD Min Hole = 7.000\nd Max Shaft = 7.995\nd Min Shaft = 7.989',
      'Clearance\nD Max Hole = 7.015\nD Min Hole = 7.000\nd Max Shaft = 6.995\nd Min Shaft = 6.986',
    ],
    correct: 2,
    explanation: '**H7/g6** is a standard **clearance fit** (посадка с зазором). From the table, H7 on Ø7: ES = +0.015, EI = 0 → D Max = **7.015**, D Min = **7.000**. Shaft g6: es = −0.005, ei = −0.014 → d Max = **6.995**, d Min = **6.986**. The maximum shaft (6.995) is always smaller than the minimum hole (7.000) → always a positive clearance → **clearance fit**. Option (a) has the correct numbers but wrong fit type. Option (b) has wrong numbers entirely.',
  },

  {
    id: 3006,
    topic: 'Fits & Tolerances',
    q: 'Using the table below, determine the fit **Ø12 H6/s5**: is it clearance or interference? Find the maximum and minimum diameters of the hole and shaft.\n\n![ISO Tolerance Table|full](images/drawing/tolerance_table_iso.png)',
    opts: [
      'Clearance\nD Max Hole = 12.011\nD Min Hole = 12.000\nd Max Shaft = 12.036\nd Min Shaft = 12.028',
      'Interference\nD Max Hole = 12.011\nD Min Hole = 12.000\nd Max Shaft = 12.036\nd Min Shaft = 12.028',
      'Interference\nD Max Hole = 12.009\nD Min Hole = 12.000\nd Max Shaft = 12.021\nd Min Shaft = 12.015',
    ],
    correct: 1,
    explanation: 'From the ISO tolerance table, **H6 on Ø12**: ES = +0.011, EI = 0 → D Max = **12.011**, D Min = **12.000**. **s5 on Ø12**: es = +0.036, ei = +0.028 → d Max = **12.036**, d Min = **12.028**. Since the minimum shaft (12.028) > maximum hole (12.011), the shaft is **always larger** → **interference fit** (натяг). Option (c) uses wrong tolerance grade values.',
  },
  // ── Taper & Conicity ─────────────────────────────────────────────────────

  {
    id: 3007,
    topic: 'Taper & Conicity',
    q: 'Given the **1:4 taper**, length **L = 100**, larger diameter **D = 80** — calculate the smaller diameter **d**.\n\n![Taper diagram|sm](images/drawing/taper_diagram.png)',
    opts: [
      '55',
      '25',
      '32',
      '43.75',
    ],
    correct: 0,
    explanation: 'Taper ratio 1:4 means for every 4 units of length, the diameter changes by 1 unit → conicity formula: **D = d + L/k**, where k = 4.\n\nd = D − L/k = 80 − 100/4 = 80 − 25 = **55**.\n\nOption (b) 25 = L/k alone. Option (c) 32 uses wrong k. Option (d) 43.75 = D − L/k with k incorrectly taken as 4 on radius instead of diameter.',
  },

  {
    id: 3008,
    topic: 'Fits & Tolerances',
    q: 'Using the table below, determine the fit **Ø11 H6/f6**: is it clearance or interference? Find the maximum and minimum diameters of the hole and shaft.\n\n![ISO Tolerance Table|full](images/drawing/tolerance_table_iso_3.png)',
    opts: [
      'Clearance\nD Max Hole = 11.011\nD Min Hole = 11.000\nd Max Shaft = 10.994\nd Min Shaft = 10.983',
      'Clearance\nD Max Hole = 11.016\nD Min Hole = 11.000\nd Max Shaft = 10.984\nd Min Shaft = 10.966',
      'Interference\nD Max Hole = 11.011\nD Min Hole = 11.000\nd Max Shaft = 11.017\nd Min Shaft = 11.006',
    ],
    correct: 0,
    explanation: 'From the table, **H6 on Ø11**: ES = +0.011, EI = 0 → D Max = **11.011**, D Min = **11.000**. **f6 on Ø11**: es = −0.006, ei = −0.017 → d Max = 11 − 0.006 = **10.994**, d Min = 11 − 0.017 = **10.983**. The maximum shaft (10.994) < minimum hole (11.000) → always clearance → **clearance fit**. Option (b) uses wrong IT grade values for f6. Option (c) shows an interference fit with shaft larger than hole — wrong fit type and wrong numbers.',
  },
  {
    id: 3009,
    topic: 'Taper & Conicity',
    q: 'Given the **1:4 taper**, length **L = 10**, larger diameter **D = 60** — calculate the smaller diameter **d**.\n\n![Taper diagram|sm](images/drawing/taper_diagram.png)',
    opts: [
      '57.5',
      '55',
      '52.5',
      '47.5',
    ],
    correct: 0,
    explanation: 'Conicity formula: **D = d + L/k**, where k = 4.\n\nd = D − L/k = 60 − 10/4 = 60 − 2.5 = **57.5**.\n\nOption (b) 55 confuses L = 100 from a different problem. Option (c) 52.5 uses L/k = 7.5 (wrong). Option (d) 47.5 applies L/k = 12.5 (wrong k).',
  },
  {
    id: 3010,
    topic: 'Fits & Tolerances',
    q: 'Using the table below, determine the fit **Ø5 H7/g7**: is it clearance or interference? Find the maximum and minimum diameters of the hole and shaft.\n\n![ISO Tolerance Table|full](images/drawing/tolerance_table_iso_4.png)',
    opts: [
      'Clearance\nD Max Hole = 5.012\nD Min Hole = 5.000\nd Max Shaft = 4.860\nd Min Shaft = 4.848',
      'Interference\nD Max Hole = 5.012\nD Min Hole = 5.000\nd Max Shaft = 5.018\nd Min Shaft = 5.006',
      'Clearance\nD Max Hole = 5.012\nD Min Hole = 5.000\nd Max Shaft = 4.992\nd Min Shaft = 4.980',
    ],
    correct: 0,
    explanation: 'From the table, **H7 on Ø5**: EI = 0, ES = IT7 = +0.012 → D Max = **5.012**, D Min = **5.000**.\n\n**g7 on Ø5**: es = −0.140 mm, ei = es − IT7 = −0.140 − 0.012 = −0.152 → d Max = 5 + (−0.140) = **4.860**, d Min = 5 + (−0.152) = **4.848**.\n\nMax clearance = D Max − d Min = 5.012 − 4.848 = 0.164 mm. Min clearance = D Min − d Max = 5.000 − 4.860 = 0.140 mm. Always positive → **clearance fit**.\n\nOption (b) has shaft > hole → interference. Option (c) uses wrong g7 deviations.',
  },
  {
    id: 3014,
    topic: 'Threaded Connections',
    q: 'Which of the following drawings represents a **cylindrical head with hexagonal slot** (hex socket / Allen screw)?',
    opts: [
      { img: 'images/drawing/conn_hex_socket_screw.png', label: '(a) Hex socket cap screw' },
      { img: 'images/drawing/conn_bolt_double_nut.png',  label: '(b) Bolt with double nut' },
      { img: 'images/drawing/conn_stud_nut.png',         label: '(c) Stud with nut' },
    ],
    correct: 0,
    explanation: 'Drawing **(a)** shows a **hex socket cap screw** (винт с цилиндрической головкой под шестигранник): a cylindrical head with an internal hexagonal recess (Allen key slot), screwed directly into a tapped blind hole — no nut needed.\n\nDrawing **(b)** is a **bolt** connection with nuts on both sides.\n\nDrawing **(c)** is a **stud** (шпилька) — threaded rod screwed into one part with a nut and washer on the other end.',
  },

  // ── Open Questions ───────────────────────────────────────────────────────

  {
    id: 3011,
    topic: 'Sections',
    type: 'open',
    q: 'Indicate and explain all the **types of sections** that can be used in a technical drawing.',
    explanation: '**1. In relation with cutting plane:**\n- Full section\n- Offset section\n- Aligned section\n\n**2. In relation with cutting plane extension:**\n- Half section\n- Broken out\n\n**3. In relation with cutting plane location:**\n- Revolved section\n- Removed section',
  },

  {
    id: 3012,
    topic: 'Threads',
    type: 'open',
    q: 'Indicate and explain which are the **main dimensions of internal and external threads** and which are the **common thread forms**.',
    explanation: '**Main dimensions of threads:**\n- Major diameter (d / D) — outer diameter\n- Minor diameter (d₁ / D₁) — inner/root diameter\n- Pitch diameter (d₂ / D₂)\n- Pitch (p) — distance between threads\n- Thread depth (h)\n- Lead angle (α)\n\n**Common thread forms:**\n- ISO Metric (triangular 60°) — M\n- Unified (triangular 60°) — UNC/UNF\n- Whitworth (triangular 55°) — W\n- Trapezoidal (Tr)\n- Square thread\n- Buttress thread\n- Pipe thread — G / R',
  },

  {
    id: 3013,
    topic: 'Threaded Connections',
    type: 'open',
    q: 'Indicate and explain the different **Threaded Fasteners** definitions.',
    explanation: '**Bolt (болт)** — passes through clearance holes in both parts, secured with a nut. Used when access from both sides is possible.\n\n**Cap Screw / Machine Screw (винт)** — screws directly into a tapped hole in one part. No nut needed.\n\n**Stud (шпилька)** — headless rod threaded on both ends. One end screws permanently into a part; the other end takes a nut.\n\n**Nut (гайка)** — internally threaded fastener paired with a bolt or stud.\n\n**Washer (шайба)** — flat disc placed under a nut or bolt head to distribute load.\n\n**Set Screw (установочный винт)** — fully threaded, no head; used to lock a part in position (e.g. collar on shaft).',
  },
];
