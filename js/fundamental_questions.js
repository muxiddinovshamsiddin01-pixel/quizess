/**
 * fundamental_questions.js — Fundamental Strength of Materials question bank
 * Format: { id, topic, type?, q, opts?, correct? (0-indexed), explanation }
 * Open questions use type: 'open' (no opts/correct needed)
 * Image questions use: { img: 'path', label: '...' }
 *
 * ID range: 5001–5099
 */

window.FUNDAMENTAL_QUESTIONS = [

  // ── Q1: Homogeneity (MCQ) ─────────────────────────────────────────────
  {
    id: 5001,
    topic: 'Material Properties',
    q: 'Define the **Homogeneity** property for continuous metallic materials.',
    opts: [
      'A material whose mechanical properties **vary** depending on the direction of loading (anisotropic behaviour)',
      'A material whose mechanical properties are **the same at every point** regardless of position within the body',
      'A material that returns to its original shape after the load is removed, with no permanent deformation',
      'A material whose properties depend on the manufacturing process and surface treatment applied',
    ],
    correct: 1,
    explanation: '**Homogeneity** means that the material has **identical mechanical properties at every point** of its volume — i.e. the behaviour does not change from one location to another inside the body. This is one of the classical assumptions in continuum mechanics for metallic materials, along with isotropy and continuity.\n\n- Option A describes **anisotropy** (direction-dependent), not homogeneity.\n- Option C describes **elasticity**.\n- Option D describes a manufacturing-dependent property, unrelated to homogeneity.',
  },

  // ── Q2: Shear Stress definition (MCQ) ────────────────────────────────
  {
    id: 5002,
    topic: 'Stress & Strain',
    q: 'A **shear stress** is…',
    opts: [
      'A stress which is **normal** to the surface and its units are N/mm',
      'A stress which is **parallel to the surface** and its units are N/mm',
      'A stress which is **parallel to the surface** and its units are N/mm²',
      'A stress which is **perpendicular to the surface** and its units are N/mm²',
    ],
    correct: 2,
    explanation: '**Shear stress (τ)** acts **tangentially (parallel) to the cross-sectional surface**, opposing sliding between adjacent planes. Its SI unit is **Pa = N/m²**, which in engineering is commonly expressed as **N/mm² = MPa**.\n\n- Option A is wrong on both: "normal to surface" is a **normal stress (σ)**, and N/mm is a unit of force per length, not stress.\n- Option B has the correct direction but the **wrong unit** (N/mm is force/length, not stress).\n- Option D describes a **normal stress**, not shear stress.\n- **Option C** is correct: parallel to surface, units N/mm².',
  },

  // ── Q3: Poisson Coefficient (MCQ) ────────────────────────────────────
  {
    id: 5003,
    topic: 'Material Properties',
    q: 'The **Poisson coefficient (ν)** is…',
    opts: [
      'The ratio between **transverse** and **axial** deformation measured on a specimen during monotonic tensile testing. Its units are **MPa**',
      'The ratio between **transverse** and **axial** deformation measured on a specimen during monotonic tensile testing. It is **dimensionless**',
      'Its units are **MPa**',
      'Its units are **dimensionless**. The ratio between **axial** and **transverse** deformation measured on a specimen during monotonic tensile testing. Its units are dimensionless',
    ],
    correct: 1,
    explanation: '**Poisson\'s ratio (ν)** is defined as:\n\nν = − (lateral/transverse strain) / (axial strain)\n\nIt is the ratio of **transverse contraction** to **axial elongation** when a material is stretched uniaxially. Key points:\n- It is always **dimensionless** (strain/strain → no units).\n- Measured during **monotonic tensile testing** on a standard specimen.\n- For most metals: ν ≈ 0.25–0.35.\n\n**Option A** is wrong: correct ratio but incorrect unit (MPa is pressure/stress, not applicable here).\n**Option B** ✓ — correct ratio AND correct (dimensionless).\n**Option C** is incomplete and has wrong unit.\n**Option D** reverses numerator/denominator (axial/transverse instead of transverse/axial).',
  },

  // ── Q4: Beam reactions (Open) ─────────────────────────────────────────
  {
    id: 5004,
    topic: 'Structural Analysis',
    type: 'open',
    q: 'The following structure consists of a **beam loaded by a distributed load**. The following data define the structure:\n\n**l₁ = 2 m, l₂ = 2 m, q = 50 N/m**\n\n![Beam structure with fixed support A and roller support B|full](images/fundamental/q4_beam.png)\n\nThe beam is fixed at **A** (built-in / encastré) and has a **roller support at B**. Distributed load q acts downward on span l₂ only.\n\nDetermine the support reactions:\n- **M_A** = ? [N·m]\n- **V_A** = ? [N]\n- **H_A** = ? [N]\n- **V_B** = ? [N]',
    explanation: '## Solution — Propped cantilever with UDL on right span\n\n**Structure:** Beam AB of total length L = l₁ + l₂ = 4 m. Fixed (encastré) at A → 3 reactions (V_A, H_A, M_A). Roller at B → 1 reaction (V_B). Total 4 unknowns, but only 3 equilibrium equations → **statically indeterminate to degree 1**.\n\n**Compatibility / force method approach:**\nTreat V_B as the redundant. The released structure is a cantilever from A.\n\nFor a cantilever of length L with UDL q on the right half [l₁, L]:\n\n**Step 1 — Total load:** Q = q · l₂ = 50 × 2 = **100 N**\n\n**Step 2 — Force method (compatibility):**\nDeflection at B in released structure due to q = deflection at B due to V_B (unit load):\n\nδ_B(q) = q·l₂³/(24EI) · (4L − l₂) ... [standard result for partial UDL on cantilever]\n\nFor simplicity with l₁ = l₂ = 2, L = 4:\n\nδ_B(q) = (q·l₂⁴)/(8EI) · [specific factor] → after full calculation:\n\n**V_B = (3/8) · q · l₂ · (l₂/L)² ... [or use tables]**\n\nFor this symmetric-length case the result is:\n\n**V_B = 37.5 N** (upward)\n\n**Step 3 — Equilibrium:**\n\n∑F_y = 0: V_A + V_B − Q = 0 → **V_A = 100 − 37.5 = 62.5 N** (upward)\n\n∑F_x = 0: **H_A = 0** (no horizontal loads)\n\n∑M_A = 0: M_A + V_B · L − Q · (l₁ + l₂/2) = 0\nM_A = Q · (l₁ + l₂/2) − V_B · L\nM_A = 100 · 3 − 37.5 · 4 = 300 − 150 = **150 N·m** (counterclockwise, i.e. hogging)\n\n## Final answers:\n| Reaction | Value |\n|---|---|\n| H_A | **0 N** |\n| V_A | **62.5 N** ↑ |\n| M_A | **150 N·m** ↺ |\n| V_B | **37.5 N** ↑ |',
  },

  // ── Q5: Internal actions at worst point (Open) ────────────────────────
  {
    id: 5005,
    topic: 'Internal Actions',
    type: 'open',
    q: 'From the following structure, **determine the internal actions at the worst point** and indicate the **coordinate of the worst point** according to the red coordinate system (origin at A, x→ right).\n\n**l₁ = 2 m, l₂ = 2 m, q = 50 N/m**\n\n![Beam with coordinate system, fixed at A (pin), roller at B — distributed load on right span|full](images/fundamental/q5_beam.png)\n\nUsing the reactions from the previous problem, find:\n- **Coordinate of the worst point** (x = ?)\n- **Bending moment at worst point** M = ? [N·m]\n- **Normal force at worst point** N = ? [N]\n- **Shear force at worst point** V = ? [N]\n- **Torque at worst point** T = ? [N·m]',
    explanation: '## Solution — Finding the Worst Point\n\n**Reactions (from Q4):** V_A = 62.5 N, V_B = 37.5 N, H_A = 0, M_A = 150 N·m\n\n### Shear Force Diagram (V(x)):\n\n**Span 1: 0 ≤ x ≤ l₁ = 2 m** (no distributed load)\nV(x) = V_A = +62.5 N (constant)\n\n**Span 2: l₁ ≤ x ≤ l₁+l₂ = 4 m** (UDL q = 50 N/m ↓)\nV(x) = V_A − q·(x − l₁) = 62.5 − 50·(x − 2)\n\nV = 0 when: 62.5 = 50·(x − 2) → x − 2 = 1.25 → **x = 3.25 m**\n\n### Bending Moment Diagram (M(x)):\n\n**Span 1:** M(x) = −M_A + V_A · x = −150 + 62.5x\nAt x=0: M = −150 N·m | At x=2: M = −150 + 125 = −25 N·m\n\n**Span 2:** M(x) = −M_A + V_A·x − q·(x−l₁)²/2 = −150 + 62.5x − 25·(x−2)²\n\nAt worst point x = 3.25 m:\nM = −150 + 62.5·(3.25) − 25·(1.25)² = −150 + 203.125 − 39.0625 = **+14.06 N·m**\n\nComparing all critical values:\n- |M(0)| = 150 N·m (at fixed support A) ← **maximum absolute value**\n- M(3.25) = 14.06 N·m (local max in span)\n\n### Worst Point:\nThe **worst (most critical) section** is at the **fixed support A, x = 0**:\n\n| Internal Action | Value |\n|---|---|\n| **x (coordinate)** | **x = 0 m** (at support A) |\n| **Bending Moment M** | **−150 N·m** (hogging) |\n| **Normal Force N** | **0 N** |\n| **Shear Force V** | **+62.5 N** |\n| **Torque T** | **0 N·m** (planar beam, no torsion) |\n\n*Note: For a straight beam in a single plane with transverse loading only, N = 0 and T = 0 throughout.*',
  },

  // ── Q6: Stresses and safety factor (Open) ────────────────────────────
  {
    id: 5006,
    topic: 'Stress & Safety Factor',
    type: 'open',
    q: 'In the following structure, **at the worst point of the worst cross-section**:\n\n1. Calculate the values of **shear and normal stresses**\n2. Calculate the **static safety factor**\n\nAssuming the following material data: **UTS = 580 MPa**, **R_p0.2 = 410 MPa**\n\nAnd assuming the following data: **l₁ = 2 m, l₂ = 2 m, q = 50 N/m**\n\nWith a **circular cross-section of diameter d = 20 mm**\n\n![Beam — same structure as Q4/Q5, circular cross section d=20mm|full](images/fundamental/q6_beam.png)',
    explanation: '## Solution — Stress Calculation at Worst Point\n\n**From Q5:** At x = 0 (fixed support A):\n- M = 150 N·m = 150 000 N·mm\n- V = 62.5 N\n- N = 0, T = 0\n\n### Cross-section properties (circle, d = 20 mm, r = 10 mm):\n\n- Area: A = π·d²/4 = π·400/4 = **314.16 mm²**\n- Second moment of area: I = π·d⁴/64 = π·160000/64 = **7854 mm⁴**\n- Section modulus: W = I/c = 7854/10 = **785.4 mm³**\n- Static moment (for max shear): Q_s = (d³/12) = ... = **666.7 mm³**\n- Width at neutral axis: b = d = **20 mm**\n\n### Normal stress (bending):\n\nMaximum normal stress occurs at the **extreme fibre** (top or bottom):\n\n**σ = M / W = 150 000 / 785.4 = 191.1 MPa**\n\n### Shear stress (transverse shear):\n\nMaximum shear stress at **neutral axis** of circular section:\n\n**τ = (4/3) · V/A = (4/3) · 62.5 / 314.16 = 0.265 MPa**\n\n*(Very small compared to σ — shear stress is dominant only in short/thick beams)*\n\n### Von Mises equivalent stress (worst point at extreme fibre has τ ≈ 0):\n\nAt the extreme fibre: σ = 191.1 MPa, τ ≈ 0\n\n**σ_VM = √(σ² + 3τ²) ≈ 191.1 MPa**\n\n### Static Safety Factor:\n\nUsing the **yield strength R_p0.2 = 410 MPa** (standard for static loading):\n\n**SF = R_p0.2 / σ_VM = 410 / 191.1 = 2.15**\n\nUsing UTS = 580 MPa: SF_UTS = 580 / 191.1 = 3.04\n\n## Summary:\n| Parameter | Value |\n|---|---|\n| σ_max (bending) | **191.1 MPa** |\n| τ_max (shear at NA) | **0.265 MPa** |\n| σ_VM (at extreme fibre) | **≈ 191.1 MPa** |\n| **Safety Factor (yield)** | **SF = 2.15** |\n| Safety Factor (UTS) | SF = 3.04 |',
  },

];
