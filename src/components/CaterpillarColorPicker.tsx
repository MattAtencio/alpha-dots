"use client";

import { loadProgress, getUnlockedColors, saveProgress } from "@/utils/storage";

interface Props {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

/**
 * Caterpillar-segment color picker for the game screen.
 * Each unlocked color is a tappable circle styled as a caterpillar body segment,
 * with a head segment on the left side featuring eyes and antennae.
 */
export function CaterpillarColorPicker({ selectedColor, onColorChange }: Props) {
  const progress = loadProgress();
  const unlocked = getUnlockedColors(progress.totalStars);

  const handleTap = (color: string) => {
    onColorChange(color);
    // Persist to storage so it remembers across sessions
    const p = loadProgress();
    p.crayonColor = color;
    saveProgress(p);
  };

  const segSize = 48;

  return (
    <div
      className="flex items-center justify-center gap-1 px-3 py-2 shrink-0"
      role="radiogroup"
      aria-label="Crayon color"
    >
      {/* Caterpillar head */}
      <div
        className="rounded-full relative shrink-0 shadow-md animate-[caterpillarBounce_2s_ease_infinite]"
        style={{
          width: segSize * 0.7,
          height: segSize * 0.7,
          background: "#FF6B6B",
          marginRight: -2,
        }}
      >
        {/* Left eye */}
        <div
          className="absolute rounded-full bg-white flex items-center justify-center"
          style={{ top: "22%", left: "16%", width: "28%", height: "32%" }}
        >
          <div className="rounded-full bg-[#37474F]" style={{ width: "50%", height: "50%" }} />
        </div>
        {/* Right eye */}
        <div
          className="absolute rounded-full bg-white flex items-center justify-center"
          style={{ top: "22%", right: "16%", width: "28%", height: "32%" }}
        >
          <div className="rounded-full bg-[#37474F]" style={{ width: "50%", height: "50%" }} />
        </div>
        {/* Smile */}
        <div
          className="absolute"
          style={{
            bottom: "18%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "40%",
            height: "16%",
            borderBottom: "1.5px solid #37474F",
            borderRadius: "0 0 50% 50%",
          }}
        />
        {/* Left antenna */}
        <div
          className="absolute"
          style={{
            top: -10,
            left: "28%",
            width: 1.5,
            height: 10,
            background: "#37474F",
            transformOrigin: "bottom",
            transform: "rotate(-20deg)",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{ width: 5, height: 5, background: "#FFD54F", top: -3, left: -1.5 }}
          />
        </div>
        {/* Right antenna */}
        <div
          className="absolute"
          style={{
            top: -10,
            right: "28%",
            width: 1.5,
            height: 10,
            background: "#37474F",
            transformOrigin: "bottom",
            transform: "rotate(20deg)",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{ width: 5, height: 5, background: "#FFD54F", top: -3, right: -1.5 }}
          />
        </div>
      </div>

      {/* Color segments */}
      {unlocked.map((r, i) => {
        const isSelected = selectedColor === r.color;
        return (
          <button
            key={r.color}
            role="radio"
            aria-checked={isSelected}
            aria-label={r.name}
            onClick={() => handleTap(r.color)}
            className="rounded-full shrink-0 transition-all duration-150 active:scale-90"
            style={{
              width: isSelected ? segSize + 6 : segSize,
              height: isSelected ? segSize + 6 : segSize,
              background: r.color,
              boxShadow: isSelected
                ? `0 0 0 3px white, 0 0 0 5px ${r.color}, 0 2px 8px rgba(0,0,0,0.15)`
                : "0 1px 3px rgba(0,0,0,0.12)",
              marginLeft: i === 0 ? 2 : -3,
            }}
          />
        );
      })}
    </div>
  );
}
