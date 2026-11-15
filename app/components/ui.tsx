import type { ReactNode } from "react";

export const Dot = ({ tone = "accent" }: { tone?: "accent" | "ember" | "mist" }) => {
  const color =
    tone === "ember" ? "bg-ember" : tone === "mist" ? "bg-faint" : "bg-accent";
  return (
    <span className="relative inline-flex h-1.5 w-1.5 shrink-0">
      <span className={`absolute inset-0 rounded-full ${color}`} />
      {tone === "accent" && (
        <span className={`ping-ring absolute inset-0 rounded-full ${color} opacity-60`} />
      )}
    </span>
  );
};

export const Label = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => <span className={`label ${className}`}>{children}</span>;

export const Corners = ({ accent = false }: { accent?: boolean }) => (
  <span
    aria-hidden
    className={accent ? "brackets brackets-accent absolute inset-0" : "brackets absolute inset-0"}
  />
);

export const SectionHead = ({
  index,
  label,
  title,
  lead,
  meta,
  align = "left",
}: {
  index?: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  meta?: ReactNode;
  align?: "left" | "center";
}) => (
  <div
    className={`relative border-t border-line/80 pt-6 ${
      align === "center" ? "text-center" : ""
    }`}
  >
    <div
      className={`flex flex-wrap items-center gap-3 ${
        align === "center" ? "justify-center" : "justify-between"
      }`}
    >
      <div className="flex items-center gap-3">
        {index && <span className="label text-faint">{index}</span>}
        <span className="h-px w-8 bg-line-hi" />
        <Label>{label}</Label>
      </div>
      {meta && <span className="label-xs hidden text-faint sm:block">{meta}</span>}
    </div>

    <h2
      className={`display mt-6 max-w-4xl text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.04] text-ink ${
        align === "center" ? "mx-auto" : ""
      }`}
    >
      {title}
    </h2>

    {lead && (
      <p
        className={`mt-5 max-w-2xl text-sm leading-relaxed text-mist md:text-[15px] ${
          align === "center" ? "mx-auto" : ""
        }`}
      >
        {lead}
      </p>
    )}
  </div>
);

export const Section = ({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) => (
  <section id={id} className={`relative scroll-mt-24 ${className}`}>
    <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10 xl:px-16">{children}</div>
  </section>
);

export const PageShell = ({
  index,
  label,
  title,
  lead,
  meta,
  children,
}: {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
}) => (
  <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-28 pt-20 md:px-10 md:pt-28 xl:px-16">
    <div className="flex items-center gap-3">
      <span className="label text-faint">{index}</span>
      <span className="h-px w-10 bg-line-hi" />
      <Label>{label}</Label>
    </div>
    <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
      <h1 className="display text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[0.98] text-ink">
        {title}
      </h1>
      {meta && (
        <div className="border-l border-line pl-5 text-[13px] leading-relaxed text-faint lg:mb-2">
          {meta}
        </div>
      )}
    </div>
    {lead && (
      <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-mist md:text-base">{lead}</p>
    )}
    <div className="mt-14">{children}</div>
  </div>
);

export const Metric = ({
  value,
  label,
  tone = "accent",
}: {
  value: string;
  label: string;
  tone?: "accent" | "ink";
}) => (
  <div className="border-t border-line/80 pt-3">
    <p
      className={`display text-[clamp(1.4rem,2.3vw,1.9rem)] leading-none ${
        tone === "accent" ? "text-accent" : "text-ink"
      }`}
    >
      {value}
    </p>
    <p className="label-xs mt-2 text-faint">{label}</p>
  </div>
);

export const ArrowIcon = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const ExternalIcon = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M6 3h7v7M13 3 5 11M11 9v4H3V5h4" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);
