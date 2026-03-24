import type { DrawnPoint, Dot } from './types';

function segmentAccuracy(points: DrawnPoint[], fromDot: Dot, toDot: Dot, canvasSize: number): number {
  if (points.length < 2) return 1;

  const dx = toDot.x - fromDot.x;
  const dy = toDot.y - fromDot.y;
  const segLen = Math.sqrt(dx * dx + dy * dy);
  if (segLen < 0.01) return 1;

  const corridorWidth = 0.08;

  let inCorridor = 0;
  for (const p of points) {
    const px = p.x / canvasSize;
    const py = p.y / canvasSize;
    const t = Math.max(0, Math.min(1,
      ((px - fromDot.x) * dx + (py - fromDot.y) * dy) / (segLen * segLen)
    ));
    const closestX = fromDot.x + t * dx;
    const closestY = fromDot.y + t * dy;
    const dist = Math.sqrt((px - closestX) ** 2 + (py - closestY) ** 2);
    if (dist <= corridorWidth) inCorridor++;
  }

  return inCorridor / points.length;
}

export function calculateStars(
  segmentPoints: DrawnPoint[][],
  dots: Dot[],
  canvasSize: number
): { stars: number; accuracy: number } {
  if (segmentPoints.length === 0) return { stars: 1, accuracy: 0 };

  let totalAccuracy = 0;
  let segments = 0;

  for (let i = 0; i < dots.length - 1; i++) {
    if (dots[i + 1].strokeBreak) continue;
    const points = segmentPoints[i] || [];
    if (points.length > 0) {
      totalAccuracy += segmentAccuracy(points, dots[i], dots[i + 1], canvasSize);
      segments++;
    }
  }

  const accuracy = segments > 0 ? totalAccuracy / segments : 0;
  let stars = 1;
  if (accuracy >= 0.7) stars = 2;
  if (accuracy >= 0.9) stars = 3;

  return { stars, accuracy };
}
