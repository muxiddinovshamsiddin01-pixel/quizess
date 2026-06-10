/**
 * physics2_data.js — Physics 2 subject registration
 * Registers the subject into the global SUBJECTS map and defines topic ID ranges.
 *
 * Load order in HTML:
 *   storage.js  →  physics2_data.js  →  physics2_questions.js
 */

// ── Subject registration ──────────────────────────────────────
SUBJECTS['physics2'] = {
  id:    'physics2',
  name:  'Physics 2',
  short: 'PHY2',
  color: '--cy',
  icon:  'atom',
  desc:  'Electrostatics, Fields in Matter, Magnetostatics, Electrodynamics, Waves',
  topics: {
    electrostatics:       { name: 'Electrostatics',          color: '--cy'  },
    electricFieldMatter:  { name: 'Electric Field in Matter', color: '--pk2' },
    magnetostatics:       { name: 'Magnetostatics',           color: '--am'  },
    magneticFieldMatter:  { name: 'Magnetic Field in Matter', color: '--gr'  },
    electrodynamics:      { name: 'Electrodynamics',          color: '--vi2' },
    wavesOptics:          { name: 'Waves & Optics',           color: '--cy'  },
  }
};

// ── Topic → Question ID map ───────────────────────────────────
const PHYSICS2_TOPIC_IDS = {
  electrostatics:      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34],
  electricFieldMatter: [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67],
  magnetostatics:      [68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97],
  magneticFieldMatter: [98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124],
  electrodynamics:     [125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163],
  wavesOptics:         [164, 165, 166, 167, 168, 169, 170, 171, 172, 173],
};

// ── Stub ──────────────────────────────────────────────────────
if (typeof window.PHYSICS2_QUESTIONS === 'undefined') window.PHYSICS2_QUESTIONS = [];
