import Link from "next/link";
import { Planet } from "@/components/Planet";
import { ArrowIcon, Dot, ExternalIcon, PageShell } from "@/components/ui";
import { aboutValues, site } from "@/lib/content";

const record = [
  { label: "Callsign", value: site.name },
  { label: "Discipline", value: "AI & Machine Learning" },
  { label: "Program", value: "B.Tech CSE — AI & ML" },
  { label: "Cohort", value: "Second Year, 2024–2028" },
  { label: "Base", value: "Bengaluru, India" },
  { label: "Status", value: "Open to AI/ML opportunities" },
];

const indexLinks = [
  { href: "/technical-skills", label: "Technical skills" },
  { href: "/experience-leadership", label: "Experience & leadership" },
  { href: "/achievements", label: "Achievements" },
  { href: "/certifications", label: "Certifications" },
  { href: "/github-integration", label: "Public repositories" },
];

export default function About() {
  return (
    <PageShell
      index="01 / Identity"
      label="About"
      title={
        <>
          Mummaka Sanjana <span className="ink-accent">Reddy</span>
        </>
      }
      lead={
        <>
          A second-year B.Tech Computer Science and Engineering student specialising in Artificial
          Intelligence and Machine Learning at Jain (Deemed-to-be) University, Bengaluru.{" "}
          {site.intro}
        </>
      }
      meta={
        <div className="space-y-2">
          <p className="label-xs flex items-center gap-2 text-accent">
            <Dot />
            Available for AI/ML work
          </p>
          <p>{site.university}</p>
          <p>Asia/Kolkata · IST</p>
        </div>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1.32fr_0.68fr] lg:gap-10">
        <div className="space-y-8">
          <section className="panel brackets relative p-6 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="label text-accent">Academic identity</span>
              <span className="label-xs text-faint">Record 01</span>
            </div>
            <dl className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {record.slice(0, 4).map((item) => (
                <div key={item.label} className="border-t border-line/70 pt-3">
                  <dt className="label-xs text-faint">{item.label}</dt>
                  <dd className="mt-1.5 text-[13.5px] text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 grid gap-8 border-t border-line/70 pt-6 sm:grid-cols-2">
              <div>
                <h2 className="label text-accent">Social profiles</h2>
                <ul className="mt-3 space-y-2">
                  {[
                    { label: "GitHub", href: site.github, external: true },
                    { label: "Hugging Face", href: site.huggingface, external: true },
                    { label: "LinkedIn", href: site.linkedin, external: true },
                    { label: "Email", href: `mailto:${site.email}`, external: false },
                  ].map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group inline-flex items-center gap-2 text-[13px] text-mist transition-colors hover:text-accent"
                      >
                        <span className="h-px w-4 bg-line-hi transition-colors group-hover:bg-accent" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="label text-accent">Recent activity</h2>
                <ul className="mt-3 space-y-2.5">
                  {[
                    "SIH Internal Hackathon 2026 Winner",
                    "GRINOVA Ideathon 2026 Winner",
                    "GRINOVA MVP — JARVIS AI Operating System",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-mist">
                      <span className="mt-[7px]">
                        <Dot tone="ember" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between gap-3">
              <span className="label text-accent">Operating directives</span>
              <span className="label-xs text-faint">03 principles</span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {aboutValues.map((value) => (
                <article key={value.code} className="panel-flat panel-hover p-5">
                  <span className="label-xs text-faint">{value.code}</span>
                  <h2 className="display mt-3 text-[1.35rem] leading-tight text-ink">
                    {value.title}
                  </h2>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-mist">{value.body}</p>
                </article>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="panel brackets relative overflow-hidden p-5">
            <Planet id="about-page" className="mx-auto w-full max-w-[280px]" />
            <p className="label-xs mt-4 text-center text-faint">
              Bengaluru · 12.97° N, 77.59° E
            </p>
          </div>

          <div className="panel-flat p-5">
            <h2 className="label text-accent">Portfolio index</h2>
            <ul className="mt-3 divide-y divide-line/60">
              {indexLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between gap-3 py-2.5 text-[13px] text-mist transition-colors hover:text-accent"
                  >
                    {link.label}
                    <ArrowIcon className="h-3 w-3 text-faint transition-colors group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel-flat p-5">
            <h2 className="label text-accent">Direct line</h2>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 block break-all text-[12.5px] text-mist transition-colors hover:text-accent"
            >
              {site.email}
            </a>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="label-xs mt-4 inline-flex items-center gap-2 text-accent"
            >
              Résumé (PDF)
              <ExternalIcon className="h-3 w-3" />
            </a>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
