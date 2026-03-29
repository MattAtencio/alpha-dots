"use client";

/** "Dot" the caterpillar mascot — a chain of colored circles with eyes and antennae */
export function Caterpillar({
  size = 120,
  mood = "happy",
}: {
  size?: number;
  mood?: "happy" | "excited" | "curious";
}) {
  const segSize = size / 6;
  const colors = ["#FF6B6B", "#FFD54F", "#66BB6A", "#42A5F5", "#AB47BC"];
  const eyeScale = mood === "excited" ? 1.2 : 1;
  const animClass =
    mood === "excited"
      ? "animate-[caterpillarBounce_0.6s_ease_infinite]"
      : mood === "curious"
        ? "animate-[pulse_1.5s_ease_infinite]"
        : "animate-[caterpillarBounce_2s_ease_infinite]";

  return (
    <div className={`flex items-end relative ${animClass}`} style={{ gap: `-${segSize * 0.2}px` }}>
      {/* Body segments */}
      {colors.slice(1).reverse().map((color, i) => (
        <div
          key={i}
          className="rounded-full shadow-sm"
          style={{
            width: segSize * 0.85,
            height: segSize * 0.85,
            background: color,
            marginLeft: i > 0 ? -segSize * 0.15 : 0,
          }}
        />
      ))}
      {/* Head */}
      <div
        className="rounded-full shadow-md relative"
        style={{
          width: segSize * 1.2,
          height: segSize * 1.2,
          background: colors[0],
          marginLeft: -segSize * 0.15,
        }}
      >
        {/* Left eye */}
        <div
          className="absolute rounded-full bg-white flex items-center justify-center"
          style={{
            top: "28%",
            left: "18%",
            width: segSize * 0.22 * eyeScale,
            height: segSize * 0.28 * eyeScale,
          }}
        >
          <div className="rounded-full bg-[#37474F]" style={{ width: "50%", height: "50%" }} />
        </div>
        {/* Right eye */}
        <div
          className="absolute rounded-full bg-white flex items-center justify-center"
          style={{
            top: "28%",
            right: "18%",
            width: segSize * 0.22 * eyeScale,
            height: segSize * 0.28 * eyeScale,
          }}
        >
          <div className="rounded-full bg-[#37474F]" style={{ width: "50%", height: "50%" }} />
        </div>
        {/* Smile */}
        <div
          className="absolute"
          style={{
            bottom: "22%",
            left: "50%",
            transform: "translateX(-50%)",
            width: segSize * 0.4,
            height: segSize * 0.18,
            borderBottom: "2px solid #37474F",
            borderRadius: "0 0 50% 50%",
          }}
        />
        {/* Left antenna */}
        <div
          className="absolute"
          style={{
            top: -segSize * 0.4,
            left: "30%",
            width: 2,
            height: segSize * 0.4,
            background: "#37474F",
            transformOrigin: "bottom",
            transform: "rotate(-15deg)",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: segSize * 0.15,
              height: segSize * 0.15,
              background: "#FFD54F",
              top: -segSize * 0.08,
              left: -segSize * 0.06,
            }}
          />
        </div>
        {/* Right antenna */}
        <div
          className="absolute"
          style={{
            top: -segSize * 0.4,
            right: "30%",
            width: 2,
            height: segSize * 0.4,
            background: "#37474F",
            transformOrigin: "bottom",
            transform: "rotate(15deg)",
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: segSize * 0.15,
              height: segSize * 0.15,
              background: "#FFD54F",
              top: -segSize * 0.08,
              right: -segSize * 0.06,
            }}
          />
        </div>
      </div>
    </div>
  );
}
