import type { Density } from "../engine/types";
import { LETTER_GROUPS } from "../data/letterGroups";

const STORAGE_KEY = "alpha-dots-v1";

export interface ProgressData {
  version: 1;
  stars: Record<string, Record<Density, number>>;
  totalStars: number;
  unlockedGroups: number;
  crayonColor: string;
  soundEnabled: boolean;
}

function defaultProgress(): ProgressData {
  return { version: 1, stars: {}, totalStars: 0, unlockedGroups: 1, crayonColor: "#1E88E5", soundEnabled: true };
}

export function loadProgress(): ProgressData {
  if (typeof window === "undefined") return defaultProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress();
    const data = JSON.parse(raw);
    return data.version === 1 ? data : defaultProgress();
  } catch { return defaultProgress(); }
}

export function saveProgress(data: ProgressData) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

export function getStars(letter: string, density: Density): number {
  return loadProgress().stars[letter]?.[density] ?? 0;
}

export function recordStars(letter: string, density: Density, stars: number): ProgressData {
  const data = loadProgress();
  if (!data.stars[letter]) data.stars[letter] = { starter: 0, practiced: 0, writer: 0 };
  if (stars > (data.stars[letter][density] ?? 0)) data.stars[letter][density] = stars;
  data.totalStars = Object.values(data.stars).reduce((sum, d) => sum + Object.values(d).reduce((s, v) => s + v, 0), 0);
  const unlockedLetters = LETTER_GROUPS.slice(0, data.unlockedGroups).flat();
  if (unlockedLetters.every((l) => (data.stars[l]?.starter ?? 0) >= 1) && data.unlockedGroups < LETTER_GROUPS.length) data.unlockedGroups++;
  saveProgress(data);
  return data;
}

export function getDensityUnlocked(letter: string, density: Density): boolean {
  if (density === "starter") return true;
  const s = loadProgress().stars[letter];
  if (!s) return false;
  if (density === "practiced") return s.starter >= 2;
  if (density === "writer") return s.practiced >= 2;
  return false;
}

export function resetProgress() { localStorage.removeItem(STORAGE_KEY); }

export const CRAYON_REWARDS = [
  { stars: 0, color: "#1E88E5", name: "Blue" },
  { stars: 5, color: "#EF5350", name: "Red" },
  { stars: 10, color: "#66BB6A", name: "Green" },
  { stars: 20, color: "#AB47BC", name: "Purple" },
  { stars: 50, color: "#FF7043", name: "Orange" },
  { stars: 80, color: "#EC407A", name: "Pink" },
  { stars: 150, color: "#FFD54F", name: "Gold" },
];

export function getUnlockedColors(totalStars: number) {
  return CRAYON_REWARDS.filter((r) => totalStars >= r.stars);
}
