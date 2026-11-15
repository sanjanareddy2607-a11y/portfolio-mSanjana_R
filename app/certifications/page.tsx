import { Dot, PageShell } from "@/components/ui";
import { certifications } from "@/lib/content";

export default function Certifications() {
  return (
    <PageShell
      index="01 / Record"
      label="Certifications"
      title={
        <>
          Credential <span className="ink-accent italic">register.</span>
        </>
      }
      lead="Completed programmes and certifications relevant to applied AI/ML and cloud practice."
      meta={
        <div className="space-y-2">
          <p className="label-xs flex items-center gap-2 text-accent">
            <Dot />
            {certifications.length} credentials
          </p>
          <p>Issued 2024</p>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {certifications.map((item) => (
          <article
            key={item.code}
            className="panel panel-hover brackets group relative overflow-hidden p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-11 w-11 items-center justify-center border border-line-hi bg-panel/60 text-accent">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <circle cx="10" cy="8" r="4.6" stroke="currentColor" strokeWidth="1.1" />
                  <path d="M6.6 12.2 5.4 17l4.6-2.2L14.6 17l-1.2-4.8" stroke="currentColor" strokeWidth="1.1" />
                </svg>
              </span>
              <span className="label-xs text-faint">{item.code}</span>
            </div>

            <h2 className="display mt-6 text-[1.4rem] leading-tight text-ink">{item.title}</h2>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line/70 pt-4">
              <span className="label-xs text-accent">{item.issuer}</span>
              <span className="label-xs text-faint">Issued {item.year}</span>
            </div>

            <span className="label-xs mt-4 flex items-center gap-2 text-faint">
              <Dot tone="mist" />
              Credential recorded
            </span>
          </article>
        ))}
      </div>

      <p className="label-xs mt-8 text-faint">
        Verification links appear here once a public credential URL is available.
      </p>
    </PageShell>
  );
}
