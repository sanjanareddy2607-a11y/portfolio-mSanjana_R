import { ResearchPipeline } from "@/components/ResearchPipeline";
import { Dot, Metric, PageShell } from "@/components/ui";
import { research } from "@/lib/content";

export default function Research() {
  return (
    <PageShell
      index="03 / Research"
      label="Research file"
      title={
        <>
          Research, documented <span className="ink-accent italic">honestly.</span>
        </>
      }
      lead="One submitted abstract, reported with the benchmark numbers it claims and the validations it has not yet received."
      meta={
        <div className="space-y-2">
          <p className="label-xs flex items-center gap-2 text-accent">
            <Dot />
            {research.status}
          </p>
          <p>{research.venueFull}</p>
        </div>
      }
    >
      <article className="panel brackets relative p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="label-xs border border-accent/30 bg-accent/10 px-2 py-1 text-accent">
            {research.venue}
          </span>
          <span className="label-xs text-faint">{research.code}</span>
          <span className="label-xs text-faint">Submitted abstract</span>
        </div>

        <h2 className="display mt-6 max-w-3xl text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.1] text-ink">
          {research.title}
        </h2>

        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
          <p className="label-xs text-mist">Authors — {research.authors}</p>
          <p className="label-xs text-faint">{research.venue}</p>
        </div>

        <p className="mt-6 max-w-3xl border-l border-line pl-4 text-[14px] leading-relaxed text-mist">
          {research.overview}
        </p>

        <div className="mt-9 grid gap-5 border-t border-line/70 pt-7 sm:grid-cols-2 lg:grid-cols-4">
          {research.metrics.map((metric) => (
            <Metric key={metric.label} value={metric.value} label={metric.label} />
          ))}
        </div>
      </article>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="space-y-8">
          <section>
            <h2 className="label text-accent">Technical approach</h2>
            <ul className="mt-4 space-y-3">
              {research.approach.map((item, index) => (
                <li key={item} className="flex items-start gap-4 border-t border-line/70 pt-3">
                  <span className="label-xs shrink-0 text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[13.5px] leading-relaxed text-mist">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="label text-accent">Additional reported results</h2>
            <ul className="mt-4 space-y-3">
              {research.findings.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[13.5px] leading-relaxed text-mist"
                >
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-l-2 border-ember/60 bg-deep/40 px-5 py-5">
            <h2 className="label text-ember">Limitations &amp; future work</h2>
            <p className="mt-3 text-[13.5px] leading-relaxed text-mist">{research.limitations}</p>
          </section>
        </div>

        <aside className="space-y-6">
          <ResearchPipeline />

          <div className="panel-flat p-5">
            <h2 className="label text-accent">Benchmark</h2>
            <dl className="mt-4 divide-y divide-line/60 border-t border-line/60">
              <div className="flex items-center justify-between gap-3 py-2.5">
                <dt className="label-xs text-faint">Dataset</dt>
                <dd className="text-[12.5px] text-ink">MFCAD++</dd>
              </div>
              <div className="flex items-center justify-between gap-3 py-2.5">
                <dt className="label-xs text-faint">Accuracy</dt>
                <dd className="text-[12.5px] text-accent">98.63%</dd>
              </div>
              <div className="flex items-center justify-between gap-3 py-2.5">
                <dt className="label-xs text-faint">Macro F1</dt>
                <dd className="text-[12.5px] text-ink">{research.macroF1}</dd>
              </div>
              <div className="flex items-center justify-between gap-3 py-2.5">
                <dt className="label-xs text-faint">Feature classes</dt>
                <dd className="text-[12.5px] text-ink">25</dd>
              </div>
            </dl>
          </div>

          <div className="panel-flat p-5">
            <h2 className="label text-accent">Status</h2>
            <p className="mt-3 text-[12.5px] leading-relaxed text-mist">
              Submitted abstract for {research.venue}. No publication or acceptance is claimed. The
              figures above are as reported in the abstract.
            </p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
