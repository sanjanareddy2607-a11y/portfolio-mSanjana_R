import type { VisualVariant } from "@/lib/content";

type ProjectVisualProps = {
  variant: VisualVariant;
  accent: string;
  code: string;
  className?: string;
};

const gridLines = Array.from({ length: 9 }, (_, index) => 24 + index * 34);
const horizontalLines = Array.from({ length: 5 }, (_, index) => 26 + index * 38);

export const ProjectVisual = ({ variant, accent, code, className = "" }: ProjectVisualProps) => {
  const id = `${variant}-${code.toLowerCase().replace(/[^a-z0-9]/g, "")}`;

  return (
    <svg
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      fill="none"
      role="presentation"
      aria-hidden
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#082730" />
          <stop offset="55%" stopColor="#04161d" />
          <stop offset="100%" stopColor="#020b12" />
        </linearGradient>
        <radialGradient id={`${id}-halo`} cx="0.62" cy="0.4" r="0.6">
          <stop offset="0%" stopColor={accent} stopOpacity="0.24" />
          <stop offset="60%" stopColor={accent} stopOpacity="0.05" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent} stopOpacity="0" />
          <stop offset="45%" stopColor={accent} stopOpacity="0.85" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <rect width="320" height="200" fill={`url(#${id}-bg)`} />
      <rect width="320" height="200" fill={`url(#${id}-halo)`} />

      <g stroke="rgba(90,220,210,0.08)" strokeWidth="0.6">
        {gridLines.map((x) => (
          <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="200" />
        ))}
        {horizontalLines.map((y) => (
          <line key={`h-${y}`} x1="0" y1={y} x2="320" y2={y} />
        ))}
      </g>

      {variant === "orbit" && (
        <g>
          <g className="orbit-spin" style={{ transformOrigin: "160px 100px" }}>
            <ellipse
              cx="160"
              cy="100"
              rx="106"
              ry="42"
              stroke={accent}
              strokeOpacity="0.34"
              strokeWidth="0.9"
              strokeDasharray="180 320"
            />
            <circle cx="266" cy="100" r="2.2" fill={accent} />
          </g>
          <ellipse
            cx="160"
            cy="100"
            rx="78"
            ry="76"
            stroke={accent}
            strokeOpacity="0.16"
            strokeWidth="0.8"
          />
          <circle cx="160" cy="100" r="34" fill="#03131a" stroke={accent} strokeOpacity="0.5" />
          <circle cx="160" cy="100" r="34" fill={`url(#${id}-halo)`} />
          <path
            d="M150 100h20M160 90v20"
            stroke={accent}
            strokeOpacity="0.7"
            strokeWidth="0.8"
          />
          <circle cx="160" cy="100" r="2.6" fill={accent} />
          <g stroke={accent} strokeOpacity="0.28" strokeWidth="0.7">
            <line x1="160" y1="66" x2="160" y2="34" />
            <line x1="194" y1="100" x2="240" y2="100" strokeDasharray="3 4" />
            <line x1="126" y1="100" x2="92" y2="100" strokeDasharray="3 4" />
          </g>
          <circle cx="160" cy="32" r="1.8" fill={accent} opacity="0.8" />
          <circle cx="242" cy="100" r="1.8" fill={accent} opacity="0.6" />
          <circle cx="90" cy="100" r="1.8" fill={accent} opacity="0.6" />
        </g>
      )}

      {variant === "signal" && (
        <g>
          <path
            d="M12 150h34l10-18 12 34 14-56 12 74 12-34 10-16h28"
            stroke={`url(#${id}-fade)`}
            strokeWidth="1.6"
            fill="none"
          />
          <path
            d="M12 168h60l8-10 10 20 12-34 12 44 12-20 8-10h60"
            stroke={accent}
            strokeOpacity="0.22"
            strokeWidth="1"
            fill="none"
          />
          <g fill={accent} opacity="0.55">
            {[40, 92, 140, 188, 236, 284].map((x, index) => (
              <rect
                key={x}
                x={x}
                y={54 + (index % 3) * 16}
                width="3"
                height={28 - (index % 3) * 6}
                opacity="0.7"
              />
            ))}
          </g>
          <g stroke={accent} strokeOpacity="0.3" strokeWidth="0.8" strokeDasharray="2 5">
            <line x1="0" y1="88" x2="320" y2="88" />
            <line x1="0" y1="132" x2="320" y2="132" />
          </g>
          <circle cx="252" cy="70" r="18" stroke={accent} strokeOpacity="0.4" fill="none" />
          <circle cx="252" cy="70" r="3" fill={accent} />
          <path d="M252 46v-12M252 94v10M228 70h-12M276 70h12" stroke={accent} strokeOpacity="0.35" strokeWidth="0.8" />
        </g>
      )}

      {variant === "graph" && (
        <g>
          <g stroke={accent} strokeOpacity="0.24" strokeWidth="0.8">
            <line x1="90" y1="62" x2="160" y2="100" />
            <line x1="160" y1="100" x2="232" y2="58" />
            <line x1="160" y1="100" x2="120" y2="150" />
            <line x1="160" y1="100" x2="214" y2="146" />
            <line x1="160" y1="100" x2="66" y2="112" />
            <line x1="232" y1="58" x2="262" y2="104" />
            <line x1="120" y1="150" x2="70" y2="164" />
          </g>
          <g>
            {[
              [90, 62, 4],
              [232, 58, 3.4],
              [120, 150, 3],
              [214, 146, 3.6],
              [66, 112, 2.6],
              [262, 104, 2.4],
              [70, 164, 2.2],
            ].map(([x, y, r]) => (
              <g key={`${x}-${y}`}>
                <circle cx={x} cy={y} r={r} fill={accent} opacity="0.85" />
                <circle cx={x} cy={y} r={Number(r) + 6} stroke={accent} strokeOpacity="0.22" fill="none" />
              </g>
            ))}
            <circle cx="160" cy="100" r="16" fill="#03131a" stroke={accent} strokeOpacity="0.55" />
            <circle cx="160" cy="100" r="4" fill={accent} />
          </g>
        </g>
      )}

      {variant === "mesh" && (
        <g>
          <g fill={accent}>
            {[
              [78, 74],
              [92, 62],
              [106, 78],
              [88, 92],
              [120, 68],
              [70, 96],
              [104, 104],
            ].map(([x, y], index) => (
              <circle key={`a-${index}`} cx={x} cy={y} r={index % 3 === 0 ? 2 : 1.4} opacity="0.75" />
            ))}
            {[
              [206, 126],
              [222, 112],
              [238, 128],
              [222, 146],
              [254, 118],
              [196, 146],
              [240, 152],
            ].map(([x, y], index) => (
              <circle key={`b-${index}`} cx={x} cy={y} r={index % 3 === 0 ? 2 : 1.4} opacity="0.65" />
            ))}
            {[
              [196, 62],
              [214, 54],
              [230, 66],
              [212, 78],
              [248, 62],
            ].map(([x, y], index) => (
              <circle key={`c-${index}`} cx={x} cy={y} r="1.3" opacity="0.5" />
            ))}
          </g>
          <g fill="none" stroke={accent} strokeOpacity="0.26" strokeWidth="0.7">
            <ellipse cx="94" cy="84" rx="42" ry="30" strokeDasharray="3 4" />
            <ellipse cx="226" cy="132" rx="44" ry="30" strokeDasharray="3 4" />
            <ellipse cx="220" cy="64" rx="34" ry="20" strokeDasharray="3 4" />
          </g>
          <g stroke={accent} strokeOpacity="0.35" strokeWidth="0.8">
            <line x1="160" y1="30" x2="160" y2="170" strokeDasharray="2 6" />
          </g>
          <circle cx="160" cy="100" r="2.4" fill={accent} opacity="0.9" />
        </g>
      )}

      {variant === "pulse" && (
        <g>
          <g stroke={accent} strokeOpacity="0.16" strokeWidth="0.8" strokeDasharray="3 5">
            <line x1="0" y1="70" x2="320" y2="70" />
            <line x1="0" y1="140" x2="320" y2="140" />
          </g>
          <path
            d="M8 108h44l8-6 6 14 8-44 10 66 10-30 8-12h30l6 8 8-16 8 24 10-16h42l8 6 8-10 8 18 10-14h64"
            stroke={`url(#${id}-fade)`}
            strokeWidth="1.8"
            fill="none"
            strokeLinejoin="round"
          />
          <g fill={accent}>
            <circle cx="90" cy="78" r="2.2" />
            <circle cx="226" cy="96" r="2.2" />
          </g>
          <g stroke={accent} strokeOpacity="0.4" strokeWidth="0.7">
            <line x1="90" y1="78" x2="90" y2="46" />
            <line x1="226" y1="96" x2="226" y2="60" />
          </g>
          <g fill={accent} opacity="0.65">
            <rect x="86" y="38" width="8" height="8" />
            <rect x="222" y="52" width="8" height="8" />
          </g>
          <path d="M0 178h320" stroke={accent} strokeOpacity="0.2" strokeWidth="0.7" />
        </g>
      )}

      {/* frame + telemetry ticks */}
      <g stroke={accent} strokeOpacity="0.36" strokeWidth="1">
        <path d="M0 12V0h12" fill="none" />
        <path d="M308 0h12v12" fill="none" />
        <path d="M320 188v12h-12" fill="none" />
        <path d="M12 200H0v-12" fill="none" />
      </g>
      <g stroke={accent} strokeOpacity="0.3" strokeWidth="0.7">
        {Array.from({ length: 14 }, (_, index) => (
          <line key={`t-${index}`} x1={12 + index * 8} y1="192" x2={12 + index * 8} y2={index % 4 === 0 ? 186 : 189} />
        ))}
      </g>
      <text
        x="14"
        y="182"
        fill={accent}
        fillOpacity="0.72"
        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 6, letterSpacing: 1.4 }}
      >
        {code} · TELEMETRY
      </text>
    </svg>
  );
};

export default ProjectVisual;
