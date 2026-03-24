// Letters in alphabetical order, grouped in sets of 5-6 for progressive unlocking
export const LETTER_GROUPS: string[][] = [
  ['A', 'B', 'C', 'D', 'E'],
  ['F', 'G', 'H', 'I', 'J'],
  ['K', 'L', 'M', 'N', 'O'],
  ['P', 'Q', 'R', 'S', 'T'],
  ['U', 'V', 'W', 'X', 'Y', 'Z'],
];

export const ALL_LETTERS = LETTER_GROUPS.flat();

export function isLetterUnlocked(letter: string, unlockedGroups: number): boolean {
  for (let i = 0; i < unlockedGroups && i < LETTER_GROUPS.length; i++) {
    if (LETTER_GROUPS[i].includes(letter)) return true;
  }
  return false;
}

export function getNextLetter(currentLetter: string): string | null {
  const idx = ALL_LETTERS.indexOf(currentLetter);
  if (idx < 0 || idx >= ALL_LETTERS.length - 1) return null;
  return ALL_LETTERS[idx + 1];
}

export function getLetterGroup(letter: string): number {
  for (let i = 0; i < LETTER_GROUPS.length; i++) {
    if (LETTER_GROUPS[i].includes(letter)) return i;
  }
  return -1;
}
