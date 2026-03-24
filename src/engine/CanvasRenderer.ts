import type { GameState } from './GameEngine';
import type { GameDot } from './types';

const DOT_COLORS: Record<string, string> = { upcoming: '#BDBDBD', active: '#FF6B6B', connected: '#66BB6A' };

export class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private size: number;
  private time = 0;
  private frameCount = 0;

  constructor(ctx: CanvasRenderingContext2D, size: number) { this.ctx = ctx; this.size = size; }
  resize(ctx: CanvasRenderingContext2D, size: number) { this.ctx = ctx; this.size = size; }

  clear() { this.ctx.clearRect(0, 0, this.size, this.size); this.frameCount++; this.time = this.frameCount / 60; }

  drawGuidePaths(state: GameState) {
    if (state.isComplete) return;
    const nextIndex = state.currentDotIndex + 1;
    if (nextIndex >= state.dots.length) return;
    const current = state.dots[state.currentDotIndex];
    const next = state.dots[nextIndex];
    if (next.strokeBreak) return;
    this.ctx.save();
    this.ctx.setLineDash([4, 8]);
    this.ctx.strokeStyle = 'rgba(206, 147, 216, 0.2)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(current.screenX, current.screenY);
    this.ctx.lineTo(next.screenX, next.screenY);
    this.ctx.stroke();
    this.ctx.restore();
  }

  drawCompletedPaths(state: GameState) {
    for (const path of state.completedPaths) {
      if (path.points.length < 2) continue;
      this.drawCrayonPath(path.points.map(p => ({ x: p.x, y: p.y })), state.crayonColor);
    }
  }

  drawCurrentPath(state: GameState) {
    if (!state.isDrawing || state.currentPath.length < 2) return;
    this.drawCrayonPath(state.currentPath.map(p => ({ x: p.x, y: p.y })), state.crayonColor);
  }

  private drawCrayonPath(points: { x: number; y: number }[], color: string) {
    const ctx = this.ctx;
    ctx.save();
    let seed = 0;
    for (const p of points) { seed += p.x * 7 + p.y * 13; }
    const rng = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    for (let i = 1; i < points.length; i++) {
      const p0 = points[i - 1], p1 = points[i];
      const dx = p1.x - p0.x, dy = p1.y - p0.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.floor(dist / 2));
      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        ctx.globalAlpha = 0.4 + rng() * 0.3;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p0.x + dx * t + (rng() - 0.5) * 2, p0.y + dy * t + (rng() - 0.5) * 2, 4 + rng() * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  drawDots(state: GameState) {
    if (state.isComplete) return;
    for (const dot of state.dots) this.drawSingleDot(dot);
  }

  drawParticles(state: GameState) {
    const ctx = this.ctx;
    for (const p of state.particles) {
      ctx.save(); ctx.globalAlpha = p.life; ctx.fillStyle = p.color;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
  }

  private drawSingleDot(dot: GameDot) {
    const ctx = this.ctx;
    const { screenX: x, screenY: y, state, radius } = dot;
    if (state === 'connected') return;
    ctx.save();
    let displayRadius = radius;
    if (state === 'active') {
      const pulse = Math.sin(this.time * 4) * 0.15 + 1;
      displayRadius = radius * pulse;
      const glowRadius = displayRadius + 10;
      const gradient = ctx.createRadialGradient(x, y, displayRadius, x, y, glowRadius);
      gradient.addColorStop(0, 'rgba(255, 107, 107, 0.5)');
      gradient.addColorStop(1, 'rgba(255, 107, 107, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath(); ctx.arc(x, y, glowRadius, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = DOT_COLORS[state];
    ctx.beginPath(); ctx.arc(x, y, displayRadius, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
}
