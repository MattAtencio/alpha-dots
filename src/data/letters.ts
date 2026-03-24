import type { LetterDefinition, Dot } from '../engine/types';

// All coordinates are normalized 0-1 within a square canvas area.
// Letters are designed to fit within approximately 0.15-0.85 range.
// strokeBreak=true means "lift pen before this dot" (start of new stroke).
// Stroke order follows Zaner-Bloser handwriting conventions.

const L: LetterDefinition = {
  letter: 'L',
  layouts: {
    starter: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.30 },
      { x: 0.25, y: 0.45 },
      { x: 0.25, y: 0.60 },
      { x: 0.25, y: 0.75 },
      { x: 0.25, y: 0.85 },
      { x: 0.40, y: 0.85 },
      { x: 0.55, y: 0.85 },
      { x: 0.70, y: 0.85 },
    ],
    practiced: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.45 },
      { x: 0.25, y: 0.85 },
      { x: 0.50, y: 0.85 },
      { x: 0.70, y: 0.85 },
    ],
    writer: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.85 },
      { x: 0.70, y: 0.85 },
    ],
  },
};

const I: LetterDefinition = {
  letter: 'I',
  layouts: {
    starter: [
      // Top bar
      { x: 0.35, y: 0.15 },
      { x: 0.50, y: 0.15 },
      { x: 0.65, y: 0.15 },
      // Vertical stroke
      { x: 0.50, y: 0.15, strokeBreak: true },
      { x: 0.50, y: 0.30 },
      { x: 0.50, y: 0.45 },
      { x: 0.50, y: 0.60 },
      { x: 0.50, y: 0.75 },
      { x: 0.50, y: 0.85 },
      // Bottom bar
      { x: 0.35, y: 0.85, strokeBreak: true },
      { x: 0.50, y: 0.85 },
      { x: 0.65, y: 0.85 },
    ],
    practiced: [
      { x: 0.35, y: 0.15 },
      { x: 0.65, y: 0.15 },
      { x: 0.50, y: 0.15, strokeBreak: true },
      { x: 0.50, y: 0.50 },
      { x: 0.50, y: 0.85 },
      { x: 0.35, y: 0.85, strokeBreak: true },
      { x: 0.65, y: 0.85 },
    ],
    writer: [
      { x: 0.35, y: 0.15 },
      { x: 0.65, y: 0.15 },
      { x: 0.50, y: 0.15, strokeBreak: true },
      { x: 0.50, y: 0.85 },
      { x: 0.35, y: 0.85, strokeBreak: true },
      { x: 0.65, y: 0.85 },
    ],
  },
};

const T: LetterDefinition = {
  letter: 'T',
  layouts: {
    starter: [
      // Top bar (left to right)
      { x: 0.20, y: 0.15 },
      { x: 0.35, y: 0.15 },
      { x: 0.50, y: 0.15 },
      { x: 0.65, y: 0.15 },
      { x: 0.80, y: 0.15 },
      // Vertical stroke (top to bottom)
      { x: 0.50, y: 0.15, strokeBreak: true },
      { x: 0.50, y: 0.35 },
      { x: 0.50, y: 0.55 },
      { x: 0.50, y: 0.75 },
      { x: 0.50, y: 0.85 },
    ],
    practiced: [
      { x: 0.20, y: 0.15 },
      { x: 0.50, y: 0.15 },
      { x: 0.80, y: 0.15 },
      { x: 0.50, y: 0.15, strokeBreak: true },
      { x: 0.50, y: 0.50 },
      { x: 0.50, y: 0.85 },
    ],
    writer: [
      { x: 0.20, y: 0.15 },
      { x: 0.80, y: 0.15 },
      { x: 0.50, y: 0.15, strokeBreak: true },
      { x: 0.50, y: 0.85 },
    ],
  },
};

const C: LetterDefinition = {
  letter: 'C',
  layouts: {
    starter: [
      { x: 0.72, y: 0.25 },
      { x: 0.58, y: 0.16 },
      { x: 0.42, y: 0.15 },
      { x: 0.28, y: 0.22 },
      { x: 0.20, y: 0.35 },
      { x: 0.18, y: 0.50 },
      { x: 0.20, y: 0.65 },
      { x: 0.28, y: 0.78 },
      { x: 0.42, y: 0.85 },
      { x: 0.58, y: 0.84 },
      { x: 0.72, y: 0.75 },
    ],
    practiced: [
      { x: 0.72, y: 0.25 },
      { x: 0.42, y: 0.15 },
      { x: 0.20, y: 0.35 },
      { x: 0.18, y: 0.50 },
      { x: 0.20, y: 0.65 },
      { x: 0.42, y: 0.85 },
      { x: 0.72, y: 0.75 },
    ],
    writer: [
      { x: 0.72, y: 0.25 },
      { x: 0.35, y: 0.15 },
      { x: 0.18, y: 0.50 },
      { x: 0.35, y: 0.85 },
      { x: 0.72, y: 0.75 },
    ],
  },
};

const O: LetterDefinition = {
  letter: 'O',
  layouts: {
    starter: [
      { x: 0.50, y: 0.15 },
      { x: 0.35, y: 0.18 },
      { x: 0.22, y: 0.28 },
      { x: 0.18, y: 0.42 },
      { x: 0.18, y: 0.58 },
      { x: 0.22, y: 0.72 },
      { x: 0.35, y: 0.82 },
      { x: 0.50, y: 0.85 },
      { x: 0.65, y: 0.82 },
      { x: 0.78, y: 0.72 },
      { x: 0.82, y: 0.58 },
      { x: 0.82, y: 0.42 },
      { x: 0.78, y: 0.28 },
      { x: 0.65, y: 0.18 },
      { x: 0.50, y: 0.15 },
    ],
    practiced: [
      { x: 0.50, y: 0.15 },
      { x: 0.22, y: 0.28 },
      { x: 0.18, y: 0.50 },
      { x: 0.22, y: 0.72 },
      { x: 0.50, y: 0.85 },
      { x: 0.78, y: 0.72 },
      { x: 0.82, y: 0.50 },
      { x: 0.78, y: 0.28 },
      { x: 0.50, y: 0.15 },
    ],
    writer: [
      { x: 0.50, y: 0.15 },
      { x: 0.18, y: 0.50 },
      { x: 0.50, y: 0.85 },
      { x: 0.82, y: 0.50 },
      { x: 0.50, y: 0.15 },
    ],
  },
};

const V: LetterDefinition = {
  letter: 'V',
  layouts: {
    starter: [
      { x: 0.20, y: 0.15 },
      { x: 0.26, y: 0.30 },
      { x: 0.32, y: 0.45 },
      { x: 0.38, y: 0.60 },
      { x: 0.44, y: 0.75 },
      { x: 0.50, y: 0.85 },
      { x: 0.56, y: 0.75 },
      { x: 0.62, y: 0.60 },
      { x: 0.68, y: 0.45 },
      { x: 0.74, y: 0.30 },
      { x: 0.80, y: 0.15 },
    ],
    practiced: [
      { x: 0.20, y: 0.15 },
      { x: 0.32, y: 0.45 },
      { x: 0.50, y: 0.85 },
      { x: 0.68, y: 0.45 },
      { x: 0.80, y: 0.15 },
    ],
    writer: [
      { x: 0.20, y: 0.15 },
      { x: 0.50, y: 0.85 },
      { x: 0.80, y: 0.15 },
    ],
  },
};

const W: LetterDefinition = {
  letter: 'W',
  layouts: {
    starter: [
      { x: 0.10, y: 0.15 },
      { x: 0.15, y: 0.35 },
      { x: 0.20, y: 0.55 },
      { x: 0.25, y: 0.75 },
      { x: 0.30, y: 0.85 },
      { x: 0.35, y: 0.65 },
      { x: 0.40, y: 0.45 },
      { x: 0.50, y: 0.55 },
      { x: 0.60, y: 0.45 },
      { x: 0.65, y: 0.65 },
      { x: 0.70, y: 0.85 },
      { x: 0.75, y: 0.75 },
      { x: 0.80, y: 0.55 },
      { x: 0.85, y: 0.35 },
      { x: 0.90, y: 0.15 },
    ],
    practiced: [
      { x: 0.10, y: 0.15 },
      { x: 0.20, y: 0.55 },
      { x: 0.30, y: 0.85 },
      { x: 0.40, y: 0.45 },
      { x: 0.50, y: 0.55 },
      { x: 0.60, y: 0.45 },
      { x: 0.70, y: 0.85 },
      { x: 0.80, y: 0.55 },
      { x: 0.90, y: 0.15 },
    ],
    writer: [
      { x: 0.10, y: 0.15 },
      { x: 0.30, y: 0.85 },
      { x: 0.50, y: 0.45 },
      { x: 0.70, y: 0.85 },
      { x: 0.90, y: 0.15 },
    ],
  },
};

const X: LetterDefinition = {
  letter: 'X',
  layouts: {
    starter: [
      // First stroke: top-left to bottom-right
      { x: 0.22, y: 0.15 },
      { x: 0.32, y: 0.30 },
      { x: 0.42, y: 0.45 },
      { x: 0.50, y: 0.50 },
      { x: 0.58, y: 0.60 },
      { x: 0.68, y: 0.72 },
      { x: 0.78, y: 0.85 },
      // Second stroke: top-right to bottom-left
      { x: 0.78, y: 0.15, strokeBreak: true },
      { x: 0.68, y: 0.30 },
      { x: 0.58, y: 0.42 },
      { x: 0.50, y: 0.50 },
      { x: 0.42, y: 0.60 },
      { x: 0.32, y: 0.72 },
      { x: 0.22, y: 0.85 },
    ],
    practiced: [
      { x: 0.22, y: 0.15 },
      { x: 0.50, y: 0.50 },
      { x: 0.78, y: 0.85 },
      { x: 0.78, y: 0.15, strokeBreak: true },
      { x: 0.50, y: 0.50 },
      { x: 0.22, y: 0.85 },
    ],
    writer: [
      { x: 0.22, y: 0.15 },
      { x: 0.78, y: 0.85 },
      { x: 0.78, y: 0.15, strokeBreak: true },
      { x: 0.22, y: 0.85 },
    ],
  },
};

const K: LetterDefinition = {
  letter: 'K',
  layouts: {
    starter: [
      // Vertical stroke
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.30 },
      { x: 0.25, y: 0.45 },
      { x: 0.25, y: 0.60 },
      { x: 0.25, y: 0.75 },
      { x: 0.25, y: 0.85 },
      // Upper diagonal
      { x: 0.70, y: 0.15, strokeBreak: true },
      { x: 0.55, y: 0.32 },
      { x: 0.25, y: 0.50 },
      // Lower diagonal
      { x: 0.25, y: 0.50, strokeBreak: true },
      { x: 0.55, y: 0.68 },
      { x: 0.70, y: 0.85 },
    ],
    practiced: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.50 },
      { x: 0.25, y: 0.85 },
      { x: 0.70, y: 0.15, strokeBreak: true },
      { x: 0.25, y: 0.50 },
      { x: 0.25, y: 0.50, strokeBreak: true },
      { x: 0.70, y: 0.85 },
    ],
    writer: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.85 },
      { x: 0.70, y: 0.15, strokeBreak: true },
      { x: 0.25, y: 0.50 },
      { x: 0.25, y: 0.50, strokeBreak: true },
      { x: 0.70, y: 0.85 },
    ],
  },
};

const A: LetterDefinition = {
  letter: 'A',
  layouts: {
    starter: [
      // Left diagonal up to peak
      { x: 0.20, y: 0.85 },
      { x: 0.26, y: 0.70 },
      { x: 0.32, y: 0.55 },
      { x: 0.38, y: 0.40 },
      { x: 0.44, y: 0.25 },
      { x: 0.50, y: 0.15 },
      // Right diagonal down
      { x: 0.56, y: 0.25 },
      { x: 0.62, y: 0.40 },
      { x: 0.68, y: 0.55 },
      { x: 0.74, y: 0.70 },
      { x: 0.80, y: 0.85 },
      // Crossbar
      { x: 0.32, y: 0.58, strokeBreak: true },
      { x: 0.50, y: 0.58 },
      { x: 0.68, y: 0.58 },
    ],
    practiced: [
      { x: 0.20, y: 0.85 },
      { x: 0.35, y: 0.50 },
      { x: 0.50, y: 0.15 },
      { x: 0.65, y: 0.50 },
      { x: 0.80, y: 0.85 },
      { x: 0.32, y: 0.58, strokeBreak: true },
      { x: 0.68, y: 0.58 },
    ],
    writer: [
      { x: 0.20, y: 0.85 },
      { x: 0.50, y: 0.15 },
      { x: 0.80, y: 0.85 },
      { x: 0.32, y: 0.58, strokeBreak: true },
      { x: 0.68, y: 0.58 },
    ],
  },
};

const M: LetterDefinition = {
  letter: 'M',
  layouts: {
    starter: [
      { x: 0.15, y: 0.85 },
      { x: 0.15, y: 0.65 },
      { x: 0.15, y: 0.45 },
      { x: 0.15, y: 0.25 },
      { x: 0.15, y: 0.15 },
      { x: 0.25, y: 0.30 },
      { x: 0.35, y: 0.45 },
      { x: 0.50, y: 0.55 },
      { x: 0.65, y: 0.45 },
      { x: 0.75, y: 0.30 },
      { x: 0.85, y: 0.15 },
      { x: 0.85, y: 0.25 },
      { x: 0.85, y: 0.45 },
      { x: 0.85, y: 0.65 },
      { x: 0.85, y: 0.85 },
    ],
    practiced: [
      { x: 0.15, y: 0.85 },
      { x: 0.15, y: 0.50 },
      { x: 0.15, y: 0.15 },
      { x: 0.50, y: 0.55 },
      { x: 0.85, y: 0.15 },
      { x: 0.85, y: 0.50 },
      { x: 0.85, y: 0.85 },
    ],
    writer: [
      { x: 0.15, y: 0.85 },
      { x: 0.15, y: 0.15 },
      { x: 0.50, y: 0.55 },
      { x: 0.85, y: 0.15 },
      { x: 0.85, y: 0.85 },
    ],
  },
};

const N: LetterDefinition = {
  letter: 'N',
  layouts: {
    starter: [
      { x: 0.22, y: 0.85 },
      { x: 0.22, y: 0.65 },
      { x: 0.22, y: 0.45 },
      { x: 0.22, y: 0.25 },
      { x: 0.22, y: 0.15 },
      { x: 0.34, y: 0.30 },
      { x: 0.46, y: 0.48 },
      { x: 0.58, y: 0.65 },
      { x: 0.70, y: 0.78 },
      { x: 0.78, y: 0.85 },
      { x: 0.78, y: 0.65 },
      { x: 0.78, y: 0.45 },
      { x: 0.78, y: 0.25 },
      { x: 0.78, y: 0.15 },
    ],
    practiced: [
      { x: 0.22, y: 0.85 },
      { x: 0.22, y: 0.50 },
      { x: 0.22, y: 0.15 },
      { x: 0.50, y: 0.50 },
      { x: 0.78, y: 0.85 },
      { x: 0.78, y: 0.50 },
      { x: 0.78, y: 0.15 },
    ],
    writer: [
      { x: 0.22, y: 0.85 },
      { x: 0.22, y: 0.15 },
      { x: 0.78, y: 0.85 },
      { x: 0.78, y: 0.15 },
    ],
  },
};

const Z: LetterDefinition = {
  letter: 'Z',
  layouts: {
    starter: [
      { x: 0.22, y: 0.15 },
      { x: 0.36, y: 0.15 },
      { x: 0.50, y: 0.15 },
      { x: 0.64, y: 0.15 },
      { x: 0.78, y: 0.15 },
      { x: 0.64, y: 0.35 },
      { x: 0.50, y: 0.50 },
      { x: 0.36, y: 0.65 },
      { x: 0.22, y: 0.85 },
      { x: 0.36, y: 0.85 },
      { x: 0.50, y: 0.85 },
      { x: 0.64, y: 0.85 },
      { x: 0.78, y: 0.85 },
    ],
    practiced: [
      { x: 0.22, y: 0.15 },
      { x: 0.50, y: 0.15 },
      { x: 0.78, y: 0.15 },
      { x: 0.50, y: 0.50 },
      { x: 0.22, y: 0.85 },
      { x: 0.50, y: 0.85 },
      { x: 0.78, y: 0.85 },
    ],
    writer: [
      { x: 0.22, y: 0.15 },
      { x: 0.78, y: 0.15 },
      { x: 0.22, y: 0.85 },
      { x: 0.78, y: 0.85 },
    ],
  },
};

const H: LetterDefinition = {
  letter: 'H',
  layouts: {
    starter: [
      // Left vertical
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.30 },
      { x: 0.25, y: 0.45 },
      { x: 0.25, y: 0.60 },
      { x: 0.25, y: 0.75 },
      { x: 0.25, y: 0.85 },
      // Crossbar
      { x: 0.25, y: 0.50, strokeBreak: true },
      { x: 0.40, y: 0.50 },
      { x: 0.55, y: 0.50 },
      { x: 0.75, y: 0.50 },
      // Right vertical
      { x: 0.75, y: 0.15, strokeBreak: true },
      { x: 0.75, y: 0.30 },
      { x: 0.75, y: 0.45 },
      { x: 0.75, y: 0.60 },
      { x: 0.75, y: 0.75 },
      { x: 0.75, y: 0.85 },
    ],
    practiced: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.50 },
      { x: 0.25, y: 0.85 },
      { x: 0.25, y: 0.50, strokeBreak: true },
      { x: 0.75, y: 0.50 },
      { x: 0.75, y: 0.15, strokeBreak: true },
      { x: 0.75, y: 0.50 },
      { x: 0.75, y: 0.85 },
    ],
    writer: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.85 },
      { x: 0.25, y: 0.50, strokeBreak: true },
      { x: 0.75, y: 0.50 },
      { x: 0.75, y: 0.15, strokeBreak: true },
      { x: 0.75, y: 0.85 },
    ],
  },
};

const F: LetterDefinition = {
  letter: 'F',
  layouts: {
    starter: [
      // Vertical stroke
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.30 },
      { x: 0.25, y: 0.45 },
      { x: 0.25, y: 0.60 },
      { x: 0.25, y: 0.75 },
      { x: 0.25, y: 0.85 },
      // Top bar
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.40, y: 0.15 },
      { x: 0.55, y: 0.15 },
      { x: 0.75, y: 0.15 },
      // Middle bar
      { x: 0.25, y: 0.50, strokeBreak: true },
      { x: 0.40, y: 0.50 },
      { x: 0.60, y: 0.50 },
    ],
    practiced: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.50 },
      { x: 0.25, y: 0.85 },
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.75, y: 0.15 },
      { x: 0.25, y: 0.50, strokeBreak: true },
      { x: 0.60, y: 0.50 },
    ],
    writer: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.85 },
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.75, y: 0.15 },
      { x: 0.25, y: 0.50, strokeBreak: true },
      { x: 0.60, y: 0.50 },
    ],
  },
};

const E: LetterDefinition = {
  letter: 'E',
  layouts: {
    starter: [
      // Vertical stroke
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.30 },
      { x: 0.25, y: 0.45 },
      { x: 0.25, y: 0.60 },
      { x: 0.25, y: 0.75 },
      { x: 0.25, y: 0.85 },
      // Top bar
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.40, y: 0.15 },
      { x: 0.55, y: 0.15 },
      { x: 0.75, y: 0.15 },
      // Middle bar
      { x: 0.25, y: 0.50, strokeBreak: true },
      { x: 0.40, y: 0.50 },
      { x: 0.60, y: 0.50 },
      // Bottom bar
      { x: 0.25, y: 0.85, strokeBreak: true },
      { x: 0.40, y: 0.85 },
      { x: 0.55, y: 0.85 },
      { x: 0.75, y: 0.85 },
    ],
    practiced: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.50 },
      { x: 0.25, y: 0.85 },
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.75, y: 0.15 },
      { x: 0.25, y: 0.50, strokeBreak: true },
      { x: 0.60, y: 0.50 },
      { x: 0.25, y: 0.85, strokeBreak: true },
      { x: 0.75, y: 0.85 },
    ],
    writer: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.85 },
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.75, y: 0.15 },
      { x: 0.25, y: 0.50, strokeBreak: true },
      { x: 0.60, y: 0.50 },
      { x: 0.25, y: 0.85, strokeBreak: true },
      { x: 0.75, y: 0.85 },
    ],
  },
};

const U: LetterDefinition = {
  letter: 'U',
  layouts: {
    starter: [
      { x: 0.22, y: 0.15 },
      { x: 0.22, y: 0.30 },
      { x: 0.22, y: 0.45 },
      { x: 0.22, y: 0.60 },
      { x: 0.25, y: 0.72 },
      { x: 0.32, y: 0.80 },
      { x: 0.42, y: 0.85 },
      { x: 0.50, y: 0.86 },
      { x: 0.58, y: 0.85 },
      { x: 0.68, y: 0.80 },
      { x: 0.75, y: 0.72 },
      { x: 0.78, y: 0.60 },
      { x: 0.78, y: 0.45 },
      { x: 0.78, y: 0.30 },
      { x: 0.78, y: 0.15 },
    ],
    practiced: [
      { x: 0.22, y: 0.15 },
      { x: 0.22, y: 0.50 },
      { x: 0.22, y: 0.72 },
      { x: 0.50, y: 0.86 },
      { x: 0.78, y: 0.72 },
      { x: 0.78, y: 0.50 },
      { x: 0.78, y: 0.15 },
    ],
    writer: [
      { x: 0.22, y: 0.15 },
      { x: 0.22, y: 0.72 },
      { x: 0.50, y: 0.86 },
      { x: 0.78, y: 0.72 },
      { x: 0.78, y: 0.15 },
    ],
  },
};

const D: LetterDefinition = {
  letter: 'D',
  layouts: {
    starter: [
      // Vertical stroke
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.30 },
      { x: 0.25, y: 0.45 },
      { x: 0.25, y: 0.60 },
      { x: 0.25, y: 0.75 },
      { x: 0.25, y: 0.85 },
      // Curve
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.42, y: 0.16 },
      { x: 0.58, y: 0.22 },
      { x: 0.70, y: 0.34 },
      { x: 0.75, y: 0.50 },
      { x: 0.70, y: 0.66 },
      { x: 0.58, y: 0.78 },
      { x: 0.42, y: 0.84 },
      { x: 0.25, y: 0.85 },
    ],
    practiced: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.50 },
      { x: 0.25, y: 0.85 },
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.58, y: 0.22 },
      { x: 0.75, y: 0.50 },
      { x: 0.58, y: 0.78 },
      { x: 0.25, y: 0.85 },
    ],
    writer: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.85 },
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.75, y: 0.50 },
      { x: 0.25, y: 0.85 },
    ],
  },
};

const J: LetterDefinition = {
  letter: 'J',
  layouts: {
    starter: [
      // Top bar
      { x: 0.35, y: 0.15 },
      { x: 0.50, y: 0.15 },
      { x: 0.65, y: 0.15 },
      // Vertical + curve
      { x: 0.55, y: 0.15, strokeBreak: true },
      { x: 0.55, y: 0.30 },
      { x: 0.55, y: 0.45 },
      { x: 0.55, y: 0.60 },
      { x: 0.53, y: 0.72 },
      { x: 0.48, y: 0.80 },
      { x: 0.40, y: 0.85 },
      { x: 0.30, y: 0.82 },
      { x: 0.25, y: 0.75 },
    ],
    practiced: [
      { x: 0.35, y: 0.15 },
      { x: 0.65, y: 0.15 },
      { x: 0.55, y: 0.15, strokeBreak: true },
      { x: 0.55, y: 0.50 },
      { x: 0.55, y: 0.72 },
      { x: 0.40, y: 0.85 },
      { x: 0.25, y: 0.75 },
    ],
    writer: [
      { x: 0.35, y: 0.15 },
      { x: 0.65, y: 0.15 },
      { x: 0.55, y: 0.15, strokeBreak: true },
      { x: 0.55, y: 0.72 },
      { x: 0.25, y: 0.75 },
    ],
  },
};

const P: LetterDefinition = {
  letter: 'P',
  layouts: {
    starter: [
      // Vertical stroke
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.30 },
      { x: 0.25, y: 0.45 },
      { x: 0.25, y: 0.60 },
      { x: 0.25, y: 0.75 },
      { x: 0.25, y: 0.85 },
      // Bump
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.40, y: 0.15 },
      { x: 0.55, y: 0.18 },
      { x: 0.65, y: 0.25 },
      { x: 0.68, y: 0.35 },
      { x: 0.65, y: 0.44 },
      { x: 0.55, y: 0.50 },
      { x: 0.40, y: 0.52 },
      { x: 0.25, y: 0.52 },
    ],
    practiced: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.50 },
      { x: 0.25, y: 0.85 },
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.55, y: 0.18 },
      { x: 0.68, y: 0.35 },
      { x: 0.55, y: 0.50 },
      { x: 0.25, y: 0.52 },
    ],
    writer: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.85 },
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.68, y: 0.35 },
      { x: 0.25, y: 0.52 },
    ],
  },
};

const B: LetterDefinition = {
  letter: 'B',
  layouts: {
    starter: [
      // Vertical stroke
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.30 },
      { x: 0.25, y: 0.45 },
      { x: 0.25, y: 0.60 },
      { x: 0.25, y: 0.75 },
      { x: 0.25, y: 0.85 },
      // Top bump
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.45, y: 0.15 },
      { x: 0.62, y: 0.20 },
      { x: 0.65, y: 0.32 },
      { x: 0.60, y: 0.44 },
      { x: 0.45, y: 0.50 },
      { x: 0.25, y: 0.50 },
      // Bottom bump
      { x: 0.45, y: 0.50 },
      { x: 0.65, y: 0.55 },
      { x: 0.70, y: 0.67 },
      { x: 0.65, y: 0.79 },
      { x: 0.45, y: 0.85 },
      { x: 0.25, y: 0.85 },
    ],
    practiced: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.50 },
      { x: 0.25, y: 0.85 },
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.62, y: 0.20 },
      { x: 0.65, y: 0.35 },
      { x: 0.25, y: 0.50 },
      { x: 0.70, y: 0.67 },
      { x: 0.25, y: 0.85 },
    ],
    writer: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.85 },
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.65, y: 0.32 },
      { x: 0.25, y: 0.50 },
      { x: 0.70, y: 0.67 },
      { x: 0.25, y: 0.85 },
    ],
  },
};

const R: LetterDefinition = {
  letter: 'R',
  layouts: {
    starter: [
      // Vertical stroke
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.30 },
      { x: 0.25, y: 0.45 },
      { x: 0.25, y: 0.60 },
      { x: 0.25, y: 0.75 },
      { x: 0.25, y: 0.85 },
      // Bump
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.40, y: 0.15 },
      { x: 0.55, y: 0.18 },
      { x: 0.65, y: 0.25 },
      { x: 0.68, y: 0.35 },
      { x: 0.62, y: 0.45 },
      { x: 0.50, y: 0.50 },
      { x: 0.25, y: 0.50 },
      // Leg
      { x: 0.50, y: 0.50, strokeBreak: true },
      { x: 0.58, y: 0.60 },
      { x: 0.65, y: 0.72 },
      { x: 0.72, y: 0.85 },
    ],
    practiced: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.50 },
      { x: 0.25, y: 0.85 },
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.55, y: 0.18 },
      { x: 0.68, y: 0.35 },
      { x: 0.25, y: 0.50 },
      { x: 0.50, y: 0.50, strokeBreak: true },
      { x: 0.72, y: 0.85 },
    ],
    writer: [
      { x: 0.25, y: 0.15 },
      { x: 0.25, y: 0.85 },
      { x: 0.25, y: 0.15, strokeBreak: true },
      { x: 0.68, y: 0.35 },
      { x: 0.25, y: 0.50 },
      { x: 0.50, y: 0.50, strokeBreak: true },
      { x: 0.72, y: 0.85 },
    ],
  },
};

const G: LetterDefinition = {
  letter: 'G',
  layouts: {
    starter: [
      { x: 0.72, y: 0.25 },
      { x: 0.58, y: 0.16 },
      { x: 0.42, y: 0.15 },
      { x: 0.28, y: 0.22 },
      { x: 0.20, y: 0.35 },
      { x: 0.18, y: 0.50 },
      { x: 0.20, y: 0.65 },
      { x: 0.28, y: 0.78 },
      { x: 0.42, y: 0.85 },
      { x: 0.58, y: 0.84 },
      { x: 0.72, y: 0.75 },
      { x: 0.72, y: 0.62 },
      { x: 0.72, y: 0.50 },
      { x: 0.58, y: 0.50 },
    ],
    practiced: [
      { x: 0.72, y: 0.25 },
      { x: 0.42, y: 0.15 },
      { x: 0.18, y: 0.50 },
      { x: 0.42, y: 0.85 },
      { x: 0.72, y: 0.75 },
      { x: 0.72, y: 0.50 },
      { x: 0.58, y: 0.50 },
    ],
    writer: [
      { x: 0.72, y: 0.25 },
      { x: 0.18, y: 0.50 },
      { x: 0.42, y: 0.85 },
      { x: 0.72, y: 0.62 },
      { x: 0.58, y: 0.50 },
    ],
  },
};

const Q: LetterDefinition = {
  letter: 'Q',
  layouts: {
    starter: [
      // O shape
      { x: 0.50, y: 0.15 },
      { x: 0.35, y: 0.18 },
      { x: 0.22, y: 0.28 },
      { x: 0.18, y: 0.42 },
      { x: 0.18, y: 0.58 },
      { x: 0.22, y: 0.72 },
      { x: 0.35, y: 0.82 },
      { x: 0.50, y: 0.85 },
      { x: 0.65, y: 0.82 },
      { x: 0.78, y: 0.72 },
      { x: 0.82, y: 0.58 },
      { x: 0.82, y: 0.42 },
      { x: 0.78, y: 0.28 },
      { x: 0.65, y: 0.18 },
      { x: 0.50, y: 0.15 },
      // Tail
      { x: 0.58, y: 0.68, strokeBreak: true },
      { x: 0.68, y: 0.78 },
      { x: 0.78, y: 0.90 },
    ],
    practiced: [
      { x: 0.50, y: 0.15 },
      { x: 0.22, y: 0.28 },
      { x: 0.18, y: 0.50 },
      { x: 0.22, y: 0.72 },
      { x: 0.50, y: 0.85 },
      { x: 0.78, y: 0.72 },
      { x: 0.82, y: 0.50 },
      { x: 0.78, y: 0.28 },
      { x: 0.50, y: 0.15 },
      { x: 0.58, y: 0.68, strokeBreak: true },
      { x: 0.78, y: 0.90 },
    ],
    writer: [
      { x: 0.50, y: 0.15 },
      { x: 0.18, y: 0.50 },
      { x: 0.50, y: 0.85 },
      { x: 0.82, y: 0.50 },
      { x: 0.50, y: 0.15 },
      { x: 0.58, y: 0.68, strokeBreak: true },
      { x: 0.78, y: 0.90 },
    ],
  },
};

const S: LetterDefinition = {
  letter: 'S',
  layouts: {
    starter: [
      { x: 0.68, y: 0.22 },
      { x: 0.58, y: 0.16 },
      { x: 0.45, y: 0.15 },
      { x: 0.32, y: 0.18 },
      { x: 0.24, y: 0.26 },
      { x: 0.22, y: 0.35 },
      { x: 0.28, y: 0.43 },
      { x: 0.40, y: 0.48 },
      { x: 0.55, y: 0.52 },
      { x: 0.68, y: 0.58 },
      { x: 0.75, y: 0.66 },
      { x: 0.76, y: 0.75 },
      { x: 0.70, y: 0.82 },
      { x: 0.58, y: 0.86 },
      { x: 0.45, y: 0.86 },
      { x: 0.32, y: 0.82 },
    ],
    practiced: [
      { x: 0.68, y: 0.22 },
      { x: 0.45, y: 0.15 },
      { x: 0.24, y: 0.26 },
      { x: 0.22, y: 0.38 },
      { x: 0.50, y: 0.50 },
      { x: 0.76, y: 0.62 },
      { x: 0.76, y: 0.76 },
      { x: 0.55, y: 0.86 },
      { x: 0.32, y: 0.82 },
    ],
    writer: [
      { x: 0.68, y: 0.22 },
      { x: 0.35, y: 0.15 },
      { x: 0.22, y: 0.35 },
      { x: 0.50, y: 0.50 },
      { x: 0.76, y: 0.68 },
      { x: 0.55, y: 0.86 },
      { x: 0.32, y: 0.82 },
    ],
  },
};

const Y: LetterDefinition = {
  letter: 'Y',
  layouts: {
    starter: [
      // Left arm to center
      { x: 0.20, y: 0.15 },
      { x: 0.28, y: 0.25 },
      { x: 0.36, y: 0.35 },
      { x: 0.44, y: 0.42 },
      { x: 0.50, y: 0.50 },
      // Right arm from top
      { x: 0.80, y: 0.15, strokeBreak: true },
      { x: 0.72, y: 0.25 },
      { x: 0.64, y: 0.35 },
      { x: 0.56, y: 0.42 },
      { x: 0.50, y: 0.50 },
      // Stem down
      { x: 0.50, y: 0.50, strokeBreak: true },
      { x: 0.50, y: 0.62 },
      { x: 0.50, y: 0.74 },
      { x: 0.50, y: 0.85 },
    ],
    practiced: [
      { x: 0.20, y: 0.15 },
      { x: 0.50, y: 0.50 },
      { x: 0.80, y: 0.15, strokeBreak: true },
      { x: 0.50, y: 0.50 },
      { x: 0.50, y: 0.50, strokeBreak: true },
      { x: 0.50, y: 0.85 },
    ],
    writer: [
      { x: 0.20, y: 0.15 },
      { x: 0.50, y: 0.50 },
      { x: 0.80, y: 0.15, strokeBreak: true },
      { x: 0.50, y: 0.50 },
      { x: 0.50, y: 0.50, strokeBreak: true },
      { x: 0.50, y: 0.85 },
    ],
  },
};

// Build the complete letter map
export const LETTERS: Record<string, LetterDefinition> = {
  L, I, T, C, O,
  V, W, X, K, A,
  M, N, Z, H, F,
  E, U, D, J, P,
  B, R, G, Q, S, Y,
};

export function getLetterDots(letter: string, density: 'starter' | 'practiced' | 'writer'): Dot[] {
  const def = LETTERS[letter];
  if (!def) return [];
  return def.layouts[density];
}
