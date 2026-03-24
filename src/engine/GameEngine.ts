import type { GameDot, DotState, DrawnPoint, Density } from './types';
import { getLetterDots } from '../data/letters';
import { calculateStars } from './scoring';

export interface Particle {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; color: string; size: number;
}

export interface GameState {
  letter: string; density: Density; dots: GameDot[];
  currentDotIndex: number; isDrawing: boolean; isComplete: boolean;
  currentPath: DrawnPoint[]; segmentPaths: DrawnPoint[][];
  completedPaths: { from: GameDot; to: GameDot; points: DrawnPoint[] }[];
  stars: number; accuracy: number; crayonColor: string; particles: Particle[];
}

const DOT_RADIUS = 10;
const HIT_RADIUS = 30;
const PARTICLE_COLORS = ['#FF6B6B', '#FFD54F', '#66BB6A', '#42A5F5', '#AB47BC', '#FF7043'];

export class GameEngine {
  state: GameState;
  private canvasSize: number;
  private padding: number;

  constructor(letter: string, density: Density, canvasSize: number, crayonColor: string) {
    this.canvasSize = canvasSize;
    this.padding = canvasSize * 0.08;
    const rawDots = getLetterDots(letter, density);
    const dots: GameDot[] = rawDots.map((d, i) => ({
      ...d, index: i,
      state: (i === 0 ? 'active' : 'upcoming') as DotState,
      screenX: this.toScreen(d.x), screenY: this.toScreen(d.y), radius: DOT_RADIUS,
    }));
    this.state = {
      letter, density, dots, currentDotIndex: 0, isDrawing: false, isComplete: false,
      currentPath: [], segmentPaths: [], completedPaths: [],
      stars: 0, accuracy: 0, crayonColor, particles: [],
    };
  }

  private toScreen(n: number): number { return this.padding + n * (this.canvasSize - 2 * this.padding); }

  resize(canvasSize: number) {
    this.canvasSize = canvasSize;
    this.padding = canvasSize * 0.08;
    for (const dot of this.state.dots) { dot.screenX = this.toScreen(dot.x); dot.screenY = this.toScreen(dot.y); }
  }

  handleTouchStart(x: number, y: number): boolean {
    if (this.state.isComplete) return false;
    const d = this.state.dots[this.state.currentDotIndex];
    if (Math.sqrt((x - d.screenX) ** 2 + (y - d.screenY) ** 2) <= HIT_RADIUS) {
      this.state.isDrawing = true;
      this.state.currentPath = [{ x, y, timestamp: Date.now() }];
      return true;
    }
    return false;
  }

  handleTouchMove(x: number, y: number): { connected: boolean } {
    if (!this.state.isDrawing || this.state.isComplete) return { connected: false };
    this.state.currentPath.push({ x, y, timestamp: Date.now() });
    const nextIndex = this.state.currentDotIndex + 1;
    if (nextIndex >= this.state.dots.length) return { connected: false };
    const nextDot = this.state.dots[nextIndex];
    if (Math.sqrt((x - nextDot.screenX) ** 2 + (y - nextDot.screenY) ** 2) <= HIT_RADIUS) {
      return this.connectDot(nextIndex);
    }
    return { connected: false };
  }

  private connectDot(index: number): { connected: boolean } {
    const prevDot = this.state.dots[this.state.currentDotIndex];
    const currentDot = this.state.dots[index];
    prevDot.state = 'connected';
    currentDot.state = 'active';
    this.spawnParticles(currentDot.screenX, currentDot.screenY);
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(15);

    this.state.currentPath.push({ x: currentDot.screenX, y: currentDot.screenY, timestamp: Date.now() });
    this.state.segmentPaths.push([...this.state.currentPath]);
    this.state.completedPaths.push({ from: { ...prevDot }, to: { ...currentDot }, points: [...this.state.currentPath] });
    this.state.currentDotIndex = index;

    if (index === this.state.dots.length - 1) { this.complete(); return { connected: true }; }

    const nextDot = this.state.dots[index + 1];
    if (nextDot && nextDot.strokeBreak) {
      this.state.isDrawing = false;
      this.state.currentPath = [];
      currentDot.state = 'connected';
      nextDot.state = 'active';
      this.state.currentDotIndex = index + 1;
    } else if (currentDot.strokeBreak) {
      this.state.isDrawing = false;
      this.state.currentPath = [];
    } else {
      this.state.currentPath = [{ x: currentDot.screenX, y: currentDot.screenY, timestamp: Date.now() }];
    }
    return { connected: true };
  }

  private spawnParticles(x: number, y: number) {
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12 + (Math.random() - 0.5) * 0.5;
      const speed = 1.5 + Math.random() * 3;
      this.state.particles.push({
        x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        life: 1, maxLife: 1, color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        size: 3 + Math.random() * 4,
      });
    }
  }

  updateParticles() {
    const ps = this.state.particles;
    for (let i = ps.length - 1; i >= 0; i--) {
      ps[i].x += ps[i].vx; ps[i].y += ps[i].vy; ps[i].vy += 0.1; ps[i].life -= 0.025;
      if (ps[i].life <= 0) ps.splice(i, 1);
    }
  }

  handleTouchEnd(): void { this.state.isDrawing = false; }

  private complete(): void {
    this.state.isComplete = true;
    this.state.isDrawing = false;
    this.state.dots[this.state.currentDotIndex].state = 'connected';
    const rawDots = getLetterDots(this.state.letter, this.state.density);
    const { stars, accuracy } = calculateStars(this.state.segmentPaths, rawDots, this.canvasSize);
    this.state.stars = stars;
    this.state.accuracy = accuracy;
  }
}
