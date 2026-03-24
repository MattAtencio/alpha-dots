"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { GameEngine } from "@/engine/GameEngine";
import { CanvasRenderer } from "@/engine/CanvasRenderer";
import { recordStars, loadProgress } from "@/utils/storage";
import { getNextLetter } from "@/data/letterGroups";
import { Confetti } from "./Confetti";
import type { Density } from "@/engine/types";

const MESSAGES = ["Great job!", "Awesome!", "You did it!", "Nice work!", "Way to go!"];

interface Props { letter: string; density: Density; onBack: () => void; onNext: (l: string) => void; }

export function GameScreen({ letter, density, onBack, onNext }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const rendererRef = useRef<CanvasRenderer | null>(null);
  const animRef = useRef(0);
  const timerRef = useRef(0);
  const timer2Ref = useRef(0);
  const [letterDone, setLetterDone] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [stars, setStars] = useState(0);
  const [message] = useState(() => MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
  const progress = loadProgress();

  const getSize = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    return Math.floor(Math.min(vw, vh - 80) * 0.95);
  }, []);

  const loop = (engine: GameEngine, renderer: CanvasRenderer) => {
    const render = () => {
      engine.updateParticles(); renderer.clear();
      renderer.drawGuidePaths(engine.state); renderer.drawCompletedPaths(engine.state);
      renderer.drawCurrentPath(engine.state); renderer.drawDots(engine.state);
      renderer.drawParticles(engine.state);
      animRef.current = requestAnimationFrame(render);
    };
    render();
  };

  const init = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const size = getSize(); const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr; canvas.height = size * dpr;
    canvas.style.width = `${size}px`; canvas.style.height = `${size}px`;
    const ctx = canvas.getContext("2d")!; ctx.scale(dpr, dpr);
    const engine = new GameEngine(letter, density, size, progress.crayonColor);
    const renderer = new CanvasRenderer(ctx, size);
    engineRef.current = engine; rendererRef.current = renderer;
    return { engine, renderer };
  }, [letter, density, progress.crayonColor, getSize]);

  useEffect(() => {
    setLetterDone(false); setShowText(false); setShowButtons(false); setStars(0);
    clearTimeout(timerRef.current); clearTimeout(timer2Ref.current);
    const r = init(); if (!r) return;
    loop(r.engine, r.renderer);
    return () => { cancelAnimationFrame(animRef.current); clearTimeout(timerRef.current); clearTimeout(timer2Ref.current); };
  }, [letter, density]);

  const pt = (e: React.PointerEvent) => {
    const c = canvasRef.current; if (!c) return null;
    const r = c.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const onDown = (e: React.PointerEvent) => {
    e.preventDefault(); canvasRef.current?.setPointerCapture(e.pointerId);
    const p = pt(e); if (p) engineRef.current?.handleTouchStart(p.x, p.y);
  };

  const onMove = (e: React.PointerEvent) => {
    e.preventDefault();
    const engine = engineRef.current; const p = pt(e); if (!engine || !p) return;
    const result = engine.handleTouchMove(p.x, p.y);
    if (result.connected && engine.state.isComplete && !letterDone) {
      setStars(engine.state.stars); setLetterDone(true);
      recordStars(letter, density, engine.state.stars);
      timerRef.current = window.setTimeout(() => setShowText(true), 600);
      timer2Ref.current = window.setTimeout(() => setShowButtons(true), 2000);
    }
  };

  const onUp = (e: React.PointerEvent) => { e.preventDefault(); engineRef.current?.handleTouchEnd(); };

  const replay = () => {
    setLetterDone(false); setShowText(false); setShowButtons(false); setStars(0);
    clearTimeout(timerRef.current); clearTimeout(timer2Ref.current);
    cancelAnimationFrame(animRef.current);
    const r = init(); if (r) loop(r.engine, r.renderer);
  };

  const nextLetter = getNextLetter(letter);

  return (
    <div className="flex flex-col h-full overflow-hidden animate-[fadeUp_0.3s_ease]">
      <div className="flex items-center justify-between px-3 py-2 h-14 shrink-0">
        <button onClick={onBack} className="w-11 h-11 rounded-full flex items-center justify-center active:bg-black/5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <div className="text-center">
          <div className="text-3xl font-extrabold leading-none">{letter}</div>
          <div className="text-xs text-[var(--text-light)] font-semibold">{density === "starter" ? "Easy" : density === "practiced" ? "Medium" : "Hard"}</div>
        </div>
        <div className="w-11" />
      </div>

      <div className="flex-1 flex items-center justify-center overflow-hidden relative">
        <canvas ref={canvasRef} className="bg-white rounded-2xl shadow-sm" style={{ touchAction: "none" }}
          onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp} />

        {showText && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none" style={{ animation: "floatIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards" }}>
            <span className="text-4xl font-extrabold text-[var(--text-primary)]" style={{ textShadow: "0 2px 8px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.8)" }}>{message}</span>
            <span className="flex gap-1.5">
              {[1, 2, 3].map((i) => (
                <span key={i} className={`text-3xl ${i <= stars ? "text-[var(--star-earned)]" : "text-[var(--star-empty)]"}`}
                  style={{ animation: `starPop 0.4s ease ${i * 0.15}s forwards`, opacity: 0 }}>&#9733;</span>
              ))}
            </span>
          </div>
        )}
      </div>

      {letterDone && stars >= 3 && <Confetti />}

      {showButtons && (
        <div className="flex gap-3 px-5 py-3 pb-5 shrink-0" style={{ animation: "fadeUp 0.35s ease forwards" }}>
          <button onClick={replay} className="flex-1 py-3.5 rounded-full text-base font-bold bg-white border-2 border-gray-200 active:scale-95 transition-transform">
            Try Again
          </button>
          {nextLetter ? (
            <button onClick={() => onNext(nextLetter)} className="flex-1 py-3.5 rounded-full text-base font-bold bg-[var(--dot-active)] text-white shadow-[0_2px_8px_rgba(255,107,107,0.3)] active:scale-95 transition-transform">
              Next: {nextLetter}
            </button>
          ) : (
            <button onClick={onBack} className="flex-1 py-3.5 rounded-full text-base font-bold bg-[var(--dot-active)] text-white shadow-[0_2px_8px_rgba(255,107,107,0.3)] active:scale-95 transition-transform">
              Done!
            </button>
          )}
        </div>
      )}
    </div>
  );
}
