export type Density = 'starter' | 'practiced' | 'writer';

export interface Dot {
  x: number; // 0-1 normalized
  y: number; // 0-1 normalized
  strokeBreak?: boolean; // true = lift pen before this dot (new stroke)
}

export interface DotLayout {
  density: Density;
  dots: Dot[];
}

export interface LetterDefinition {
  letter: string;
  layouts: Record<Density, Dot[]>;
}

export type DotState = 'upcoming' | 'active' | 'connected';

export interface GameDot extends Dot {
  index: number;
  state: DotState;
  screenX: number;
  screenY: number;
  radius: number;
}

export interface DrawnPoint {
  x: number;
  y: number;
  timestamp: number;
}

export interface StarRating {
  stars: number; // 0-3
  accuracy: number; // 0-1
}
