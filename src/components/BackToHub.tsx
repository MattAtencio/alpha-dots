"use client";

/**
 * Back to Hub navigation button.
 * Fixed top-left, matches MuteButton style from @kids-games/core.
 * Links to the Kids Corner hub root (kids.mattatencio.com).
 */
export function BackToHub({ size = 48 }: { size?: number }) {
  const iconSize = Math.round(size * 0.5);

  return (
    <a
      href="/"
      className="fixed top-3 left-3 z-50 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center active:scale-90 transition-transform"
      style={{ width: size, height: size }}
      aria-label="Back to Kids Corner"
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12L12 3l9 9" />
        <path d="M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9" />
      </svg>
    </a>
  );
}
