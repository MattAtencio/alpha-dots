"use client";

import { useEffect, useState } from "react";

const COLORS = ["#FF6B6B", "#FFD54F", "#66BB6A", "#42A5F5", "#AB47BC", "#FF7043"];

export function Confetti() {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 0.8,
      size: 6 + Math.random() * 8,
      duration: 1.5 + Math.random() * 1.5,
      round: Math.random() > 0.5,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <div key={p.id} className="absolute" style={{
          left: `${p.x}%`, top: -10, width: p.size, height: p.size,
          background: p.color, borderRadius: p.round ? "50%" : "2px",
          animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
        }} />
      ))}
    </div>
  );
}
