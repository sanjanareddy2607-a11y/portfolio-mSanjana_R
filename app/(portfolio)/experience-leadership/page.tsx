import { Dot, PageShell } from "@/components/ui";
import { experience, internships } from "@/lib/content";

export default function ExperienceLeadership() {
  return (
    <PageShell
      index="01 / Record"
      label="Experience"
      title={
        <>
          Experience &amp; <span className="ink-accent italic">leadership.</span>
        </>
      }
      lead="Internships and working roles held alongside full-time study — backend and API development, AI for sustainability, full-stack delivery, and design roles in campus communities."
      meta={
        <div className="space-y-2">
          <p className="label-xs flex items-center gap-2 text-accent">
            <Dot />
            {internships.length} internships · {experience.length} roles
          </p>
          <p>Bengaluru, India</p>
        </div>
      }
    >
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/70 pb-4">
          <span className="label text-accent">Professional experience</span>
          <span className="label-xs text-faint">Most recent first</span>
        </div>

        <div className="mt-6 space-y-5">
          {internships.map((role) => (
            <article key={role.code} className="panel brackets relative p-6 md:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="label-xs text-accent">{role.role}</span>
                  <h2 className="display mt-2 text-[1.75rem] leading-tight text-ink">
                    {role.org}
                  </h2>
                  <p className="label-xs mt-2 text-faint">
                    {role.period} · {role.location}
                  </p>
                </div>
                <span className="label-xs inline-flex items-center gap-2 border border-accent/35 px-2.5 py-1 text-accent">
                  <Dot />
                  {role.state}
                </span>
              </div>

              <p className="mt-5 max-w-2xl text-[13.5px] leading-relaxed text-mist">
                {role.summary}
              </p>

              <ul className="mt-5 space-y-3 border-t border-line/70 pt-5">
                {role.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-[13px] leading-relaxed text-mist"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {role.stack.map((tech) => (
                  <span
                    key={tech}
                    className="label-xs border border-line px-2 py-1 text-mist"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {role.outcome && (
                <p className="label-xs mt-5 flex items-center gap-2 border-t border-line/60 pt-4 text-faint">
                  <Dot tone="ember" />
                  {role.outcome}
                </p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/70 pb-4">
          <span className="label text-accent">Leadership &amp; community</span>
          <span className="label-xs text-faint">{experience.length} active roles</span>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {experience.map((role) => (
            <article key={role.code} className="panel brackets relative p-6 md:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="label-xs text-accent">{role.code}</span>
                <span className="label-xs inline-flex items-center gap-2 text-faint">
                  <Dot />
                  {role.state}
                </span>
              </div>

              <h2 className="display mt-5 text-[1.7rem] leading-tight text-ink">{role.org}</h2>
              <p className="label-xs mt-2 text-mist">{role.role}</p>

              <ul className="mt-6 space-y-3 border-t border-line/70 pt-5">
                {role.paragraphs.map((paragraph) => (
                  <li
                    key={paragraph}
                    className="flex items-start gap-3 text-[13px] leading-relaxed text-mist"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                    {paragraph}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <div className="panel-flat mt-8 p-5">
        <p className="label-xs text-faint">
          GDG JU-FET is a campus developer community. Membership does not imply Google employment or
          official Google leadership.
        </p>
      </div>
    </PageShell>
  );
}
