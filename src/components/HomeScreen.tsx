"use client";

import { loadProgress } from "@/utils/storage";
import type { Density } from "@/engine/types";

interface Props {
  onPlay: (density: Density) => void;
  onPractice: () => void;
  onSettings: () => void;
}

export function HomeScreen({ onPlay, onPractice, onSettings }: Props) {
  const progress = loadProgress();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-5 p-5 relative animate-[fadeUp_0.3s_ease]">
      <button onClick={onSettings} className="absolute top-5 right-5 w-11 h-11 rounded-full bg-black/5 flex items-center justify-center text-[var(--text-light)]" aria-label="Settings">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
      </button>

      <h1 className="text-5xl font-extrabold leading-none tracking-tight">
        <span className="text-[var(--text-primary)]">Alpha</span>{" "}
        <span className="text-[var(--dot-active)]">Dots</span>
      </h1>
      <p className="text-base text-[var(--text-light)]">Connect the dots, learn to write!</p>

      {progress.totalStars > 0 && (
        <div className="flex items-center gap-1.5 text-xl font-bold">
          <span className="text-[var(--star-earned)] text-2xl">&#9733;</span>
          {progress.totalStars}
        </div>
      )}

      <div className="flex flex-col items-center gap-3 mt-2">
        <button onClick={() => onPlay("starter")} className="bg-[var(--dot-active)] text-white text-2xl font-extrabold py-4 px-16 rounded-full shadow-[0_4px_12px_rgba(255,107,107,0.4)] active:scale-95 transition-transform">
          Play A – Z
        </button>
        <div className="flex gap-2">
          {(["starter", "practiced", "writer"] as const).map((d) => (
            <button key={d} onClick={() => onPlay(d)} className="px-5 py-2 rounded-full text-sm font-bold bg-white shadow-sm active:scale-93 transition-transform">
              {d === "starter" ? "Easy" : d === "practiced" ? "Medium" : "Hard"}
            </button>
          ))}
        </div>
      </div>

      <button onClick={onPractice} className="mt-1 px-9 py-3 rounded-full text-lg font-bold bg-white border-2 border-gray-200 active:scale-95 transition-transform">
        Practice Mode
      </button>
    </div>
  );
}
