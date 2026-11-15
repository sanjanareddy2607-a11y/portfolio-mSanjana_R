import Link from "next/link";
import { ArrowIcon, Dot, ExternalIcon, Section, SectionHead } from "@/components/ui";
import { projects, trajectory } from "@/lib/content";

const tone = (kind: (typeof projects)[number]["statusKind"]) =>
  kind === "award" ? "ember" : kind === "completed" ? "mist" : "accent";

const toneClass: Record<string, string> = {
  ember: "text-ember",
  mist: "text-mist",
  accent: "text-accent",
};

const labProjects = projects.slice(0, 4);

export const CurrentlyExploring = () => {
  return (
    <Section id="lab" className="relative py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-deep/25 to-transparent"
      />
      <SectionHead
        index="04"
        label="Engineering lab"
        title={
          <>
            The lab is where ideas <em className="accent-italic">get tested.</em>
          </>
        }
        lead="A live register of what is being built, what is in progress and what has shipped. Status labels reflect the project data — nothing is animated to look busier than it is."
        meta="4 tracked builds"
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.55fr_0.85fr]">
        <div className="space-y-4">
          {labProjects.map((project) => (
            <article
              key={project.slug}
              className="panel panel-hover brackets group relative overflow-hidden p-5 md:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`label-xs inline-flex items-center gap-2 ${
                        toneClass[tone(project.statusKind)]
                      }`}
                    >
                      <Dot tone={tone(project.statusKind) as "accent" | "ember" | "mist"} />
                      {project.labCategory}
                    </span>
                    <span className="label-xs text-faint">{project.code}</span>
                  </div>
                  <h3 className="display mt-3 text-[1.55rem] leading-none text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 max-w-xl text-[13px] leading-relaxed text-mist">
                    {project.summary}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="label-xs text-faint">Last updated</p>
                  <p className="mt-1 text-[12.5px] text-mist">{project.updated}</p>
                  <p className="label-xs mt-3 text-faint">Opened</p>
                  <p className="mt-1 text-[12.5px] text-mist">{project.start}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line/70 pt-4">
                <ul className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4">
                  {project.links.slice(0, 1).map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="label-xs inline-flex items-center gap-1.5 text-mist transition-colors hover:text-accent"
                    >
                      {link.label}
                      <ExternalIcon className="h-3 w-3" />
                    </a>
                  ))}
                  <Link
                    href={`/project/${project.slug}`}
                    className="label-xs inline-flex items-center gap-1.5 text-accent transition-all group-hover:gap-2.5"
                  >
                    Case study
                    <ArrowIcon className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit lg:sticky lg:top-24">
          <div className="panel brackets relative p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="label text-accent">Current trajectory</span>
              <span className="label-xs text-faint">05 focus areas</span>
            </div>

            <ul className="mt-6 space-y-5">
              {trajectory.map((item, index) => (
                <li key={item.label} className="relative border-l border-line pl-4">
                  <span className="absolute -left-[3px] top-1.5 h-1.5 w-1.5 rounded-full bg-accent/70" />
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[13px] font-medium text-ink">{item.label}</p>
                    <span className="label-xs text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-faint">{item.body}</p>
                </li>
              ))}
            </ul>

            <div className="mt-7 border-t border-line/70 pt-4">
              <Link
                href="/engineering-lab"
                className="label-xs inline-flex items-center gap-2 text-accent transition-all hover:gap-3"
              >
                Open the lab
                <ArrowIcon className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="panel-flat mt-4 flex items-center justify-between gap-3 p-4">
            <span className="label-xs text-faint">All systems</span>
            <span className="label-xs inline-flex items-center gap-2 text-accent">
              <Dot />
              Nominal
            </span>
          </div>
        </aside>
      </div>
    </Section>
  );
};

export default CurrentlyExploring;
