import { interests } from "@/lib/content";

export const Constellation = () => {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden>
      <div className="absolute inset-[6%] rounded-full border border-line/70" />
      <div className="absolute inset-[19%] rounded-full border border-dashed border-line/60" />
      <div className="absolute inset-[32%] rounded-full border border-line/40" />

      <div
        className="absolute inset-[10%] rounded-full opacity-70 blur-2xl"
        style={{
          background: "radial-gradient(circle, rgba(32,230,208,0.16) 0%, transparent 66%)",
        }}
      />

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none">
        <g stroke="rgba(90,220,210,0.22)" strokeWidth="0.3">
          {interests.map((interest) => (
            <line
              key={interest.label}
              x1="50"
              y1="50"
              x2={interest.x}
              y2={interest.y}
              strokeDasharray="1 2"
            />
          ))}
        </g>
        <g className="orbit-spin" style={{ transformOrigin: "50px 50px" }}>
          <ellipse
            cx="50"
            cy="50"
            rx="44"
            ry="17"
            stroke="rgba(32,230,208,0.28)"
            strokeWidth="0.25"
            strokeDasharray="26 60"
          />
        </g>
        <circle cx="50" cy="50" r="2.2" fill="#20E6D0" />
        <circle cx="50" cy="50" r="5" stroke="rgba(32,230,208,0.4)" strokeWidth="0.25" />
      </svg>

      {interests.map((interest) => (
        <div
          key={interest.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${interest.x}%`, top: `${interest.y}%` }}
        >
          <span className="block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(32,230,208,0.8)]" />
          <span className="label-xs absolute left-1/2 top-full mt-2 w-max max-w-[130px] -translate-x-1/2 whitespace-normal text-center text-[9.5px] leading-tight text-mist">
            {interest.label}
          </span>
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-6 text-center">
        <span className="label-xs bg-void/80 px-2 py-1 text-accent">Curiosity</span>
      </div>
    </div>
  );
};

export default Constellation;
