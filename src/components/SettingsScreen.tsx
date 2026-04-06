"use client";

import { useState } from "react";
import { loadProgress, saveProgress, resetProgress, CRAYON_REWARDS } from "@/utils/storage";

export function SettingsScreen({ onBack }: { onBack: () => void }) {
  const [progress, setProgress] = useState(loadProgress());
  const [showReset, setShowReset] = useState(false);

  const toggleSound = () => { const u = { ...progress, soundEnabled: !progress.soundEnabled }; saveProgress(u); setProgress(u); };
  const selectColor = (c: string) => { const u = { ...progress, crayonColor: c }; saveProgress(u); setProgress(u); };
  const handleReset = () => { resetProgress(); setProgress(loadProgress()); setShowReset(false); };

  return (
    <div className="flex flex-col h-full overflow-y-auto animate-[fadeUp_0.3s_ease]">
      <div className="flex items-center justify-between pl-16 pr-4 py-3">
        <button onClick={onBack} className="w-11 h-11 rounded-full flex items-center justify-center active:bg-black/5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <h2 className="text-xl font-bold">Settings</h2>
        <div className="w-11" />
      </div>

      <div className="px-5 pb-5 space-y-6">
        <div>
          <h3 className="text-xs font-bold text-[var(--text-light)] uppercase tracking-wide mb-3">Sound</h3>
          <button onClick={toggleSound} className="flex items-center justify-between w-full p-4 bg-white rounded-xl shadow-sm">
            <span className="font-semibold">Sound Effects</span>
            <span className={`w-12 h-7 rounded-full relative transition-colors ${progress.soundEnabled ? "bg-[var(--dot-connected)]" : "bg-gray-300"}`}>
              <span className={`absolute w-5.5 h-5.5 bg-white rounded-full top-[3px] shadow transition-[left] ${progress.soundEnabled ? "left-[23px]" : "left-[3px]"}`} />
            </span>
          </button>
        </div>

        <div>
          <h3 className="text-xs font-bold text-[var(--text-light)] uppercase tracking-wide mb-3">Crayon Color</h3>
          <div className="grid grid-cols-7 gap-2.5">
            {CRAYON_REWARDS.map((r) => {
              const ok = progress.totalStars >= r.stars;
              return (
                <button key={r.color} disabled={!ok} onClick={() => ok && selectColor(r.color)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-3 transition-transform active:scale-90 ${
                    progress.crayonColor === r.color ? "border-[var(--text-primary)] scale-110" : "border-transparent"
                  } ${ok ? "" : "opacity-50"}`}
                  style={{ backgroundColor: ok ? r.color : "#ccc" }}>
                  {progress.crayonColor === r.color && <span className="text-white font-bold text-sm drop-shadow">✓</span>}
                  {!ok && <span className="text-white text-[9px] font-bold drop-shadow">🔒 {r.stars}</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-[var(--text-light)] uppercase tracking-wide mb-3">Progress</h3>
          <div className="bg-white rounded-xl shadow-sm p-4 space-y-1 font-semibold text-sm mb-4">
            <p>Total Stars: {progress.totalStars}</p>
            <p>Groups Unlocked: {progress.unlockedGroups} / 5</p>
          </div>
          {!showReset ? (
            <button onClick={() => setShowReset(true)} className="w-full py-3 rounded-xl border-2 border-red-400 text-red-400 font-bold">Reset All Progress</button>
          ) : (
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <p className="font-semibold mb-3">Are you sure? This cannot be undone.</p>
              <div className="flex gap-2">
                <button onClick={() => setShowReset(false)} className="flex-1 py-2.5 bg-white rounded-full border-2 border-gray-200 font-bold">Cancel</button>
                <button onClick={handleReset} className="flex-1 py-2.5 bg-red-400 text-white rounded-full font-bold">Yes, Reset</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
