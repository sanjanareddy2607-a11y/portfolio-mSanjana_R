import Link from "next/link";
import { ArrowIcon, Dot, Section, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { internships } from "@/lib/content";

export const ExperienceSection = () => {
  return (
    <Section id="experience" className="py-20 md:py-28">
      <SectionHead
        index="01 / Field"
        label="Experience"
        title={
          <>
            Experience in <span className="accent-italic">practice.</span>
          </>
        }
        lead="Internships held alongside full-time study — shipping production applications, backend APIs and applied AI systems."
        meta={`${internships.length} internships`}
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {internships.map((role, index) => (
          <Reveal key={role.code} delay={index * 90}>
            <article className="panel brackets relative flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="label-xs text-accent">{role.role}</span>
                <span className="label-xs inline-flex shrink-0 items-center gap-2 text-faint">
                  <Dot />
                  {role.state}
                </span>
              </div>

              <h3 className="display mt-4 text-[1.4rem] leading-tight text-ink">{role.org}</h3>
              <p className="label-xs mt-2 text-faint">{role.period}</p>

              <p className="mt-4 text-[12.5px] leading-relaxed text-mist">{role.summary}</p>

              <ul className="mt-4 space-y-2 border-t border-line/70 pt-4">
                {role.bullets.slice(0, 2).map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 text-[12px] leading-relaxed text-mist"
                  >
                    <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="flex-1" />

              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line/70 pt-4">
                {role.stack.slice(0, 4).map((tech) => (
                  <span key={tech} className="label-xs border border-line px-2 py-1 text-faint">
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Link
        href="/experience-leadership"
        className="label-xs mt-8 inline-flex items-center gap-2 text-accent transition-all hover:gap-3"
      >
        Full experience &amp; leadership record
        <ArrowIcon className="h-3 w-3" />
      </Link>
    </Section>
  );
};

export default ExperienceSection;
