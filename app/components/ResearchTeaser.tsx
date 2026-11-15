import Link from "next/link";
import { ResearchPipeline } from "@/components/ResearchPipeline";
import { ArrowIcon, Metric, Section, SectionHead } from "@/components/ui";
import { research } from "@/lib/content";

export const ResearchTeaser = () => {
  return (
    <Section id="research" className="py-20 md:py-28">
      <SectionHead
        index="03"
        label="Research file"
        title={
          <>
            Research, documented <em className="accent-italic">honestly.</em>
          </>
        }
        lead="One abstract under review, reported with its benchmark numbers and its unresolved limitations side by side."
        meta={research.venue}
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.55fr_0.45fr]">
        <div className="panel brackets relative p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label-xs border border-accent/30 bg-accent/10 px-2 py-1 text-accent">
              {research.venue}
            </span>
            <span className="label-xs text-faint">Submitted abstract</span>
            <span className="label-xs text-faint">{research.code}</span>
          </div>

          <h3 className="display mt-6 max-w-2xl text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.12] text-ink">
            {research.title}
          </h3>

          <p className="label-xs mt-5 text-mist">{research.authors}</p>
          <p className="mt-2 text-[13px] leading-relaxed text-mist">{research.venueFull}</p>

          <p className="mt-6 max-w-2xl border-l border-line pl-4 text-[13.5px] leading-relaxed text-mist">
            {research.overview}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {research.metrics.map((metric) => (
              <Metric key={metric.label} value={metric.value} label={metric.label} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line/70 pt-5">
            <p className="label-xs text-faint">Macro F1 {research.macroF1}</p>
            <Link href="/research" className="label-xs inline-flex items-center gap-2 text-accent transition-all hover:gap-3">
              Read the research dossier
              <ArrowIcon className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <ResearchPipeline />

          <div className="border-l-2 border-ember/60 bg-deep/40 px-4 py-4">
            <p className="label-xs text-ember">Stated limitations</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-mist">{research.limitations}</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ResearchTeaser;
