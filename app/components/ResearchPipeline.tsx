import { research } from "@/lib/content";

export const ResearchPipeline = () => {
  return (
    <div className="panel-flat relative overflow-hidden p-5 md:p-6">
      <div className="flex items-center justify-between">
        <span className="label-xs text-accent">Pipeline</span>
        <span className="label-xs text-faint">CAD → CNC</span>
      </div>

      <svg viewBox="0 0 220 96" className="mt-5 h-auto w-full" fill="none" aria-hidden>
        <g stroke="rgba(90,220,210,0.22)" strokeWidth="0.7">
          <path d="M28 26l38 10M66 36l34-12M100 24l32 22M132 46l32 14M66 36l34 26M100 62l32-16" />
        </g>
        <g fill="#20E6D0">
          <circle cx="28" cy="26" r="2.4" opacity="0.85" />
          <circle cx="66" cy="36" r="2.8" opacity="0.9" />
          <circle cx="100" cy="24" r="2.2" opacity="0.7" />
          <circle cx="100" cy="62" r="2" opacity="0.6" />
          <circle cx="132" cy="46" r="3" opacity="0.95" />
          <circle cx="164" cy="60" r="2.4" opacity="0.8" />
        </g>
        <g stroke="#20E6D0" strokeOpacity="0.18">
          <circle cx="132" cy="46" r="12" />
          <circle cx="132" cy="46" r="20" strokeDasharray="1 4" />
        </g>
        <text
          x="188"
          y="34"
          fill="#9AAEB5"
          style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 6.5, letterSpacing: 1 }}
        >
          GATv2
        </text>
        <text
          x="16"
          y="86"
          fill="#71868D"
          style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 6, letterSpacing: 1.2 }}
        >
          8,949 MODELS
        </text>
        <text
          x="128"
          y="86"
          fill="#71868D"
          style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 6, letterSpacing: 1.2 }}
        >
          268,982 FACES
        </text>
      </svg>

      <ol className="mt-6 space-y-0">
        {research.pipeline.map((step, index) => (
          <li key={step} className="flex items-stretch gap-3">
            <div className="flex flex-col items-center">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {index < research.pipeline.length - 1 && (
                <span className="my-1 w-px flex-1 bg-line-hi" />
              )}
            </div>
            <div className="flex flex-1 items-center justify-between gap-4 pb-3">
              <span className="text-[12.5px] text-mist">{step}</span>
              <span className="label-xs text-faint">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ResearchPipeline;
