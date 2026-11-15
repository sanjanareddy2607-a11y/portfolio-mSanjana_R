import { Dot, PageShell } from "@/components/ui";
import { experience } from "@/lib/content";

export default function ExperienceLeadership() {
  return (
    <PageShell
      index="01 / Record"
      label="Experience & leadership"
      title={
        <>
          Responsibilities <span className="ink-accent italic">held.</span>
        </>
      }
      lead="Leadership and community roles held alongside the engineering work — design direction for a student technical club, and participation in a campus developer community."
      meta={
        <div className="space-y-2">
          <p className="label-xs flex items-center gap-2 text-accent">
            <Dot />
            Two active roles
          </p>
          <p>Bengaluru, India</p>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
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

      <div className="panel-flat mt-8 p-5">
        <p className="label-xs text-faint">
          GDG JU-FET is a campus developer community. Membership does not imply Google employment or
          official Google leadership.
        </p>
      </div>
    </PageShell>
  );
}
