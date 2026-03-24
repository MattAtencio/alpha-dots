"use client";

import { useState } from "react";
import { LETTER_GROUPS, isLetterUnlocked } from "@/data/letterGroups";
import { loadProgress, getStars, getDensityUnlocked } from "@/utils/storage";
import type { Density } from "@/engine/types";

function StarRow({ count, size = 10 }: { count: number; size?: number }) {
  return (
    <span className="flex gap-px">{[1, 2, 3].map((i) => (
      <span key={i} style={{ fontSize: size, color: i <= count ? "var(--star-earned)" : "var(--star-empty)" }}>&#9733;</span>
    ))}</span>
  );
}

export function LetterSelectScreen({ onBack, onSelect }: { onBack: () => void; onSelect: (l: string, d: Density) => void }) {
  const progress = loadProgress();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-full overflow-y-auto animate-[fadeUp_0.3s_ease]">
      <div className="flex items-center justify-between px-4 py-3 sticky top-0 bg-[var(--color-cream)] z-10">
        <button onClick={onBack} className="w-11 h-11 rounded-full flex items-center justify-center active:bg-black/5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <h2 className="text-xl font-bold">Choose a Letter</h2>
        <span className="flex items-center gap-1 font-bold"><span className="text-[var(--star-earned)]">&#9733;</span>{progress.totalStars}</span>
      </div>

      <div className="px-4 pb-4">
        {LETTER_GROUPS.map((group, gi) => {
          const unlocked = gi < progress.unlockedGroups;
          return (
            <div key={gi} className="mb-4">
              <div className="text-xs font-bold text-[var(--text-light)] uppercase tracking-wide mb-2">
                {unlocked ? `Group ${gi + 1}` : `🔒 Group ${gi + 1}`}
              </div>
              <div className="grid grid-cols-5 gap-2">
                {group.map((letter) => {
                  const isUnlocked = isLetterUnlocked(letter, progress.unlockedGroups);
                  const stars = getStars(letter, "starter");
                  return (
                    <button key={letter} disabled={!isUnlocked} onClick={() => isUnlocked && setSelected(letter)}
                      className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 font-bold min-h-12 transition-transform active:scale-93 ${
                        isUnlocked ? "bg-white shadow-sm" : "bg-gray-100 text-gray-300"
                      } ${selected === letter ? "ring-2 ring-[var(--dot-active)] scale-105" : ""}`}>
                      <span className="text-xl leading-none">{isUnlocked ? letter : "🔒"}</span>
                      {isUnlocked && <StarRow count={stars} />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="sticky bottom-0 bg-white border-t border-black/5 p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] animate-[fadeUp_0.2s_ease]">
          <h3 className="text-center font-bold mb-3">Difficulty for {selected}</h3>
          <div className="flex gap-2">
            {(["starter", "practiced", "writer"] as const).map((d) => {
              const ok = getDensityUnlocked(selected, d);
              return (
                <button key={d} disabled={!ok} onClick={() => ok && onSelect(selected, d)}
                  className={`flex-1 py-2.5 rounded-xl text-center font-semibold text-sm ${ok ? "bg-[var(--color-cream)]" : "bg-gray-100 text-gray-300"} active:scale-95 transition-transform`}>
                  {d === "starter" ? "Easy" : d === "practiced" ? "Medium" : "Hard"}
                  <div className="mt-1">{ok ? <StarRow count={getStars(selected, d)} size={12} /> : "🔒"}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
