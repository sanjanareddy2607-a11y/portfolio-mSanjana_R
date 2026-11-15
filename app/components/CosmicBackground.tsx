type Star = {
  left: number;
  top: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
};

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildStars(seed: number, count: number): Star[] {
  const random = mulberry32(seed);
  return Array.from({ length: count }, () => {
    const size = random() < 0.82 ? 1 : random() < 0.7 ? 1.5 : 2;
    return {
      left: Number((random() * 100).toFixed(2)),
      top: Number((random() * 100).toFixed(2)),
      size,
      opacity: Number((0.16 + random() * 0.55).toFixed(2)),
      duration: Number((6 + random() * 9).toFixed(1)),
      delay: Number((random() * 9).toFixed(1)),
    };
  });
}

const nearStars = buildStars(20261114, 90);
const farStars = buildStars(781, 70);

export const CosmicBackground = () => {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-abyss">
      {/* deep space base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, #073039 0%, #04151b 42%, #020b12 72%, #010509 100%)",
        }}
      />

      {/* atmospheric light fields */}
      <div
        className="absolute left-1/2 top-[-22%] h-[75vw] w-[75vw] -translate-x-1/2 rounded-full opacity-70 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(16,112,116,0.55) 0%, rgba(8,58,66,0.32) 42%, transparent 70%)",
        }}
      />
      <div
        className="orbital-drift absolute right-[-10%] top-[38%] h-[46vw] w-[46vw] rounded-full opacity-60 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(32,230,208,0.18) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute left-[-14%] top-[62%] h-[38vw] w-[38vw] rounded-full opacity-50 blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(20,86,140,0.22) 0%, transparent 70%)",
        }}
      />

      {/* starfields */}
      <div className="absolute inset-0">
        {farStars.map((star, index) => (
          <span
            key={`far-${index}`}
            className="star"
            style={
              {
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                "--o": star.opacity,
                "--d": `${star.duration + 4}s`,
                "--delay": `${star.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
        {nearStars.map((star, index) => (
          <span
            key={`near-${index}`}
            className="star"
            style={
              {
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                "--o": star.opacity,
                "--d": `${star.duration}s`,
                "--delay": `${star.delay / 2}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* technical grid */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(90,220,210,0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(90,220,210,0.055) 1px, transparent 1px)",
          backgroundSize: "92px 92px",
          maskImage:
            "radial-gradient(ellipse 90% 65% at 50% 18%, rgba(0,0,0,0.9) 0%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 65% at 50% 18%, rgba(0,0,0,0.9) 0%, transparent 78%)",
        }}
      />

      {/* planetary orbital arcs */}
      <svg
        className="absolute left-1/2 top-[6%] h-[130vh] w-[130vw] -translate-x-1/2 opacity-[0.5]"
        viewBox="0 0 1200 1200"
        fill="none"
      >
        <defs>
          <linearGradient id="arc-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#20E6D0" stopOpacity="0" />
            <stop offset="45%" stopColor="#20E6D0" stopOpacity="0.36" />
            <stop offset="100%" stopColor="#20E6D0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="arc-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E3B778" stopOpacity="0" />
            <stop offset="50%" stopColor="#E3B778" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#E3B778" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse cx="600" cy="600" rx="520" ry="330" stroke="url(#arc-a)" strokeWidth="1" />
        <ellipse cx="600" cy="600" rx="410" ry="470" stroke="url(#arc-b)" strokeWidth="0.8" />
        <ellipse
          cx="600"
          cy="600"
          rx="560"
          ry="560"
          stroke="rgba(90,220,210,0.14)"
          strokeWidth="0.7"
          strokeDasharray="1 12"
        />
      </svg>

      {/* vignette + film grain */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 100% at 50% 35%, transparent 40%, rgba(1,5,9,0.55) 82%, rgba(1,5,9,0.9) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
};

export default CosmicBackground;
