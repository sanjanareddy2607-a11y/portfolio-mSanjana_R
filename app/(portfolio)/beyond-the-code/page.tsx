import { Constellation } from "@/components/Constellation";
import { PageShell } from "@/components/ui";
import { beyondQuote, interests } from "@/lib/content";

export default function BeyondTheCode() {
  return (
    <PageShell
      index="05 / Off-duty"
      label="Beyond the code"
      title={
        <>
          A wider <span className="ink-accent italic">orbit.</span>
        </>
      }
      lead="The inputs behind the engineering: sound, speculative futures, deep space, another language, and a great deal of visual storytelling."
      meta={
        <div className="space-y-2">
          <p className="label-xs text-accent">05 constellations</p>
          <p>Music · Fiction · Space · Language · Storytelling</p>
        </div>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
        <div className="relative">
          <Constellation />
          <div className="mt-4 text-center">
            <span className="label-xs text-faint">Fig. 01 — Personal constellation</span>
          </div>
        </div>

        <div>
          <div className="space-y-3">
            {interests.map((interest, index) => (
              <article
                key={interest.label}
                className="panel panel-hover brackets group relative overflow-hidden p-5"
              >
                <div className="flex items-start gap-5">
                  <span className="label-xs mt-1 shrink-0 text-accent/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="display text-[1.4rem] leading-tight text-ink">
                      {interest.label}
                    </h2>
                    <p className="mt-2 text-[13px] leading-relaxed text-mist">{interest.body}</p>
                  </div>
                </div>
                <span className="absolute right-4 top-4 h-1 w-1 rounded-full bg-line-hi transition-colors group-hover:bg-accent" />
              </article>
            ))}
          </div>

          <blockquote className="mt-8 border-l border-accent/40 pl-5">
            <p className="display text-[clamp(1.25rem,2vw,1.6rem)] italic leading-snug text-mist">
              &ldquo;{beyondQuote}&rdquo;
            </p>
            <footer className="label-xs mt-3 text-faint">A working assumption</footer>
          </blockquote>

          <p className="mt-8 max-w-xl text-[13px] leading-relaxed text-faint">
            Everything above feeds the engineering rather than competing with it — the same instinct
            for systems, structure and narrative that shows up in the project dossiers.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
