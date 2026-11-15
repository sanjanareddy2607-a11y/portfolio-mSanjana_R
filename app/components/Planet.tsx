type PlanetProps = {
  id?: string;
  className?: string;
  showOrbits?: boolean;
};

export const Planet = ({ id = "planet", className = "", showOrbits = true }: PlanetProps) => {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden>
      {/* atmospheric halo */}
      <div
        className="absolute inset-[-16%] rounded-full opacity-80 blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 62% 58%, rgba(32,230,208,0.28) 0%, rgba(32,230,208,0.08) 42%, transparent 66%)",
        }}
      />

      {/* body */}
      <div
        className="absolute inset-[8%] overflow-hidden rounded-full"
        style={{
          background:
            "radial-gradient(circle at 33% 27%, #0e4550 0%, #082a33 34%, #04161d 62%, #010609 86%)",
          boxShadow:
            "inset -22px -16px 70px rgba(32,230,208,0.22), inset 16px 12px 70px rgba(0,0,0,0.85), 0 0 120px rgba(32,230,208,0.12)",
        }}
      >
        <svg viewBox="0 0 400 400" className="h-full w-full" fill="none">
          <defs>
            <linearGradient id={`${id}-meridian`} x1="0" y1="0" x2="1" y2="0.2">
              <stop offset="0%" stopColor="#20E6D0" stopOpacity="0.04" />
              <stop offset="50%" stopColor="#20E6D0" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#20E6D0" stopOpacity="0.04" />
            </linearGradient>
            <radialGradient id={`${id}-limb`} cx="0.7" cy="0.72" r="0.7">
              <stop offset="55%" stopColor="#20E6D0" stopOpacity="0" />
              <stop offset="88%" stopColor="#20E6D0" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#9ffff2" stopOpacity="0.6" />
            </radialGradient>
          </defs>

          {/* latitude bands */}
          <g stroke={`url(#${id}-meridian)`} strokeWidth="0.9">
            <ellipse cx="200" cy="200" rx="178" ry="40" />
            <ellipse cx="200" cy="200" rx="166" ry="86" />
            <ellipse cx="200" cy="200" rx="150" ry="128" />
            <ellipse cx="200" cy="200" rx="122" ry="162" />
          </g>
          {/* meridians */}
          <g stroke="rgba(32,230,208,0.1)" strokeWidth="0.8">
            <ellipse cx="200" cy="200" rx="46" ry="178" />
            <ellipse cx="200" cy="200" rx="104" ry="178" />
            <ellipse cx="200" cy="200" rx="150" ry="178" />
          </g>

          {/* surface glow nodes */}
          <g>
            <circle cx="252" cy="150" r="2.4" fill="#20E6D0" opacity="0.9" />
            <circle cx="252" cy="150" r="8" stroke="#20E6D0" strokeOpacity="0.3" />
            <circle cx="152" cy="238" r="1.8" fill="#20E6D0" opacity="0.65" />
            <circle cx="214" cy="288" r="1.6" fill="#E3B778" opacity="0.55" />
            <circle cx="286" cy="224" r="1.4" fill="#9ffff2" opacity="0.5" />
          </g>

          {/* terminator */}
          <circle cx="200" cy="200" r="178" fill={`url(#${id}-limb)`} />
        </svg>
      </div>

      {/* rim light */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" fill="none">
        <defs>
          <linearGradient id={`${id}-rim`} x1="0.15" y1="0.1" x2="0.95" y2="0.95">
            <stop offset="0%" stopColor="#20E6D0" stopOpacity="0.08" />
            <stop offset="42%" stopColor="#20E6D0" stopOpacity="0.35" />
            <stop offset="72%" stopColor="#7ffcee" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <circle
          cx="200"
          cy="200"
          r="184"
          stroke={`url(#${id}-rim)`}
          strokeWidth="1.4"
          strokeDasharray="420 900"
          strokeDashoffset="-160"
        />
        <circle cx="200" cy="200" r="184" stroke="rgba(32,230,208,0.12)" strokeWidth="0.8" />
      </svg>

      {showOrbits && (
        <svg viewBox="0 0 400 400" className="absolute inset-[-12%] h-[124%] w-[124%]" fill="none">
          <g className="orbit-spin">
            <ellipse
              cx="200"
              cy="200"
              rx="196"
              ry="86"
              stroke="rgba(32,230,208,0.22)"
              strokeWidth="0.9"
              strokeDasharray="300 620"
              transform="rotate(-18 200 200)"
            />
            <circle cx="396" cy="200" r="2" fill="#9ffff2" opacity="0.8" />
          </g>
          <g className="orbit-spin-reverse">
            <ellipse
              cx="200"
              cy="200"
              rx="186"
              ry="150"
              stroke="rgba(227,183,120,0.2)"
              strokeWidth="0.8"
              strokeDasharray="180 900"
              transform="rotate(32 200 200)"
            />
          </g>
          <ellipse
            cx="200"
            cy="200"
            rx="170"
            ry="196"
            stroke="rgba(90,220,210,0.14)"
            strokeWidth="0.7"
          />
        </svg>
      )}
    </div>
  );
};

export default Planet;
