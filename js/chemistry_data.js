/**
 * chemistry_data.js — Chemistry subject registration
 * Registers the subject into the global SUBJECTS map and defines topic ID ranges.
 *
 * Load order in HTML:
 *   storage.js  →  chemistry_data.js  →  chemistry_questions.js
 */

// ── Subject registration ──────────────────────────────────────
SUBJECTS['chemistry'] = {
  id:    'chemistry',
  name:  'Chemistry',
  short: 'CHEM',
  color: '--gr',
  icon:  'flask',
  desc:  'Gas laws, solutions, equilibrium, electrochemistry, thermochemistry',
  topics: {
    gases:         { name: 'Gas Laws & Kinetic Theory',       color: '--gr'  },
    solutions:     { name: 'Solutions & Colligative Props.',  color: '--cy'  },
    equilibrium:   { name: 'Chemical Equilibrium',            color: '--pk2' },
    electrochem:   { name: 'Electrochemistry',                color: '--am'  },
    thermo:        { name: 'Thermochemistry',                 color: '--vi2' },
    kinetics:      { name: 'Reaction Kinetics',                color: '--pk'  },
    bonding:       { name: 'Atomic Structure & Bonding',       color: '--cy'  },
    stoichiometry: { name: 'Stoichiometry & Mole Concept',     color: '--am'  },
  }
};

// ── Topic → Question ID map ───────────────────────────────────
// IDs 8001–8056 (see js/chemistry_questions.js)
const CHEMISTRY_TOPIC_IDS = {
  gases:         [8001, 8004, 8005, 8012, 8016, 8027, 8028, 8035, 8045, 8049, 8054, 8056],
  solutions:     [8002, 8006, 8007, 8009, 8024, 8025, 8030, 8033, 8039, 8048],
  equilibrium:   [8011, 8018, 8021, 8023, 8037, 8038, 8041, 8051, 8052],
  electrochem:   [8003, 8008, 8014, 8022, 8031, 8040, 8046],
  thermo:        [8013, 8019, 8044, 8050],
  kinetics:      [8015, 8032, 8047],
  bonding:       [8017, 8026, 8029, 8034, 8042, 8043, 8055],
  stoichiometry: [8010, 8020, 8036, 8053],
};

// ── Stub ──────────────────────────────────────────────────────
if (typeof window.CHEMISTRY_QUESTIONS === 'undefined') window.CHEMISTRY_QUESTIONS = [];
