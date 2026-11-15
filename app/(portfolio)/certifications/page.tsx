import { Dot, PageShell } from "@/components/ui";
import { certifications } from "@/lib/content";

const completed = certifications.filter((item) => item.status === "completed").length;
const pending = certifications.filter((item) => item.status === "pending").length;

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
      lead="Completed programmes, certifications and badges in applied AI/ML, agentic systems and cloud practice. Pending credentials are labelled rather than presented as issued."
      meta={
        <div className="space-y-2">
          <p className="label-xs flex items-center gap-2 text-accent">
            <Dot />
            {certifications.length} credentials
          </p>
          <p>
            {completed} issued · {pending} pending
          </p>
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
              <span className="label-xs text-faint">{item.date}</span>
            </div>

            {item.note && (
              <p className="mt-3 text-[12.5px] leading-relaxed text-mist">{item.note}</p>
            )}

            <span
              className={`label-xs mt-4 flex items-center gap-2 ${
                item.status === "pending" ? "text-ember" : "text-faint"
              }`}
            >
              <Dot tone={item.status === "pending" ? "ember" : "mist"} />
              {item.status === "pending" ? "Certificate pending issue" : "Credential completed"}
            </span>
          </article>
        ))}
      </div>

      <p className="label-xs mt-8 text-faint">
        Verification links appear here once a public credential URL is available. Credential
        identifiers are published only where the issuer provided one.
      </p>
    </PageShell>
  );
}
