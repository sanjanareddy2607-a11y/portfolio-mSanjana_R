import Link from "next/link";
import { ArrowIcon, Dot, ExternalIcon, Metric, PageShell } from "@/components/ui";
import { projects, trajectory } from "@/lib/content";

const register = projects.slice(0, 4);

const tone = (kind: (typeof projects)[number]["statusKind"]) =>
  kind === "award" ? "ember" : kind === "completed" ? "mist" : "accent";

const toneClass: Record<string, string> = {
  ember: "text-ember",
  mist: "text-mist",
  accent: "text-accent",
};

export default function EngineeringLab() {
  return (
    <PageShell
      index="04 / Engineering Lab"
      label="Build register"
      title={
        <>
          The lab is where ideas <span className="ink-accent italic">get tested.</span>
        </>
      }
      lead="A research-and-development register for continuous experimentation: what is currently building, what is in progress, and what has shipped. Every state below comes from the project data."
      meta={
        <div className="space-y-2">
          <p className="label-xs flex items-center gap-2 text-accent">
            <Dot />
            {register.length} tracked builds
          </p>
          <p>Autonomous systems · Applied AI · Language tooling</p>
        </div>
      }
    >
      <div className="grid gap-4">
        {register.map((project) => (
          <article
            key={project.slug}
            className="panel panel-hover brackets group relative overflow-hidden p-5 md:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-6">
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
                  {project.featured && (
                    <span className="label-xs border border-line px-2 py-0.5 text-faint">
                      Featured
                    </span>
                  )}
                </div>

                <h2 className="display mt-3 text-[1.6rem] leading-none text-ink">
                  {project.title}
                </h2>
                <p className="mt-2.5 max-w-2xl text-[13px] leading-relaxed text-mist">
                  {project.summary}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid shrink-0 grid-cols-2 gap-x-6 gap-y-3">
                <div>
                  <p className="label-xs text-faint">Opened</p>
                  <p className="mt-1 text-[12.5px] text-mist">{project.start}</p>
                </div>
                <div>
                  <p className="label-xs text-faint">Last updated</p>
                  <p className="mt-1 text-[12.5px] text-mist">{project.updated}</p>
                </div>
                <div className="col-span-2">
                  <p className="label-xs text-faint">Status</p>
                  <p className={`mt-1 text-[12.5px] ${toneClass[tone(project.statusKind)]}`}>
                    {project.status}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-4">
              <span className="label-xs text-faint">
                {project.specs[0].label} — {project.specs[0].value}
              </span>
              <div className="flex flex-wrap items-center gap-4">
                {project.links.slice(0, 2).map((link) => (
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

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <div className="flex items-center justify-between gap-3">
            <h2 className="label text-accent">Current trajectory</h2>
            <span className="label-xs text-faint">05 focus areas</span>
          </div>
          <ul className="mt-5 space-y-4">
            {trajectory.map((item, index) => (
              <li key={item.label} className="relative border-l border-line pl-4">
                <span className="absolute -left-[3px] top-1.5 h-1.5 w-1.5 rounded-full bg-accent/70" />
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[13.5px] font-medium text-ink">{item.label}</p>
                  <span className="label-xs text-faint">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-faint">{item.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <div className="panel brackets relative p-6">
            <h2 className="label text-accent">Instrumentation</h2>
            <p className="mt-3 text-[13px] leading-relaxed text-mist">
              Status labels, start dates and update dates are conservative records of the project
              data. No progress percentage is displayed where a measurable progress value does not
              exist.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-4">
              <Metric value="04" label="Tracked builds" />
              <Metric value="02" label="Awarded" />
              <Metric value="02" label="Shipped" />
            </div>
          </div>

          <div className="panel-flat flex flex-wrap items-center justify-between gap-3 p-4">
            <span className="label-xs text-faint">All systems</span>
            <span className="label-xs inline-flex items-center gap-2 text-accent">
              <Dot />
              Nominal
            </span>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
