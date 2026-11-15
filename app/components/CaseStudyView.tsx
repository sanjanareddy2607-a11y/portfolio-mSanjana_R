import Link from "next/link";
import type { Project } from "@/lib/content";
import { ProjectVisual } from "@/components/ProjectVisual";
import { ArrowIcon, Dot, ExternalIcon, Metric, PageShell } from "@/components/ui";

const tone = (kind: Project["statusKind"]) =>
  kind === "award" ? "ember" : kind === "completed" ? "mist" : "accent";

const toneClass: Record<string, string> = {
  ember: "text-ember",
  mist: "text-mist",
  accent: "text-accent",
};

export const CaseStudyView = ({ project, index }: { project: Project; index: string }) => {
  return (
    <PageShell
      index={`DOSSIER ${index}`}
      label="Project case study"
      title={
        <>
          {project.title}
          <span className="ink-accent">.</span>
        </>
      }
      lead={project.subtitle}
      meta={
        <div className="space-y-3">
          <p
            className={`label-xs inline-flex items-center gap-2 ${
              toneClass[tone(project.statusKind)]
            }`}
          >
            <Dot tone={tone(project.statusKind) as "accent" | "ember" | "mist"} />
            {project.status}
          </p>
          <p className="label-xs text-faint">
            {project.code} · {project.category}
          </p>
          <p className="label-xs text-faint">
            {project.start} — {project.updated}
          </p>
        </div>
      }
    >
      <div className="relative aspect-[16/7] overflow-hidden border border-line/80">
        <ProjectVisual
          variant={project.visual}
          accent={project.accent}
          code={project.code}
          className="h-full w-full"
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_0.5fr]">
        <div className="space-y-9">
          <section>
            <h2 className="label text-accent">Overview</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-mist">{project.overview}</p>
          </section>

          {project.problem && (
            <section>
              <h2 className="label text-accent">Problem statement</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-mist">{project.problem}</p>
            </section>
          )}

          {project.role && (
            <section>
              <h2 className="label text-accent">My role</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-mist">{project.role}</p>
            </section>
          )}

          {project.capabilities && project.capabilities.length > 0 && (
            <section>
              <h2 className="label text-accent">
                {project.slug === "jarvis" ? "Tools & modules" : "Capabilities"}
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.capabilities.map((capability) => (
                  <div
                    key={capability.label}
                    className="panel-flat panel-hover border-line/80 p-4"
                  >
                    <h3 className="text-sm font-medium text-ink">{capability.label}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-mist">{capability.body}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.metrics.length > 0 && (
            <section>
              <h2 className="label text-accent">Reported measurements</h2>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                {project.metrics.map((metric) => (
                  <Metric key={metric.label} value={metric.value} label={metric.label} />
                ))}
              </div>
            </section>
          )}

          {project.notes.length > 0 && (
            <section className="space-y-3">
              {project.notes.map((note) => {
                const caution =
                  note.label.toLowerCase().includes("simulated") ||
                  note.label.toLowerCase().includes("measurement") ||
                  note.label.toLowerCase().includes("ip");
                return (
                  <div
                    key={note.label}
                    className={`border-l-2 bg-deep/40 px-4 py-3.5 ${
                      caution ? "border-ember/60" : "border-accent/50"
                    }`}
                  >
                    <p className={`label-xs ${caution ? "text-ember" : "text-accent"}`}>
                      {note.label}
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-mist">{note.body}</p>
                  </div>
                );
              })}
            </section>
          )}
        </div>

        <aside className="space-y-8">
          <div className="panel brackets relative p-5">
            <h2 className="label text-accent">Specification</h2>
            <dl className="mt-4 divide-y divide-line/60 border-t border-line/60">
              {project.specs.map((spec) => (
                <div key={spec.label} className="py-2.5">
                  <dt className="label-xs text-faint">{spec.label}</dt>
                  <dd className="mt-1 text-[13px] text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="label text-accent">Stack</h2>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label text-accent">Links</h2>
            <ul className="mt-3 space-y-2">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-3 border border-line/80 bg-panel/40 px-3.5 py-2.5 text-[12.5px] text-mist transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {link.label}
                    <ExternalIcon className="h-3 w-3 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-line/70 pt-4">
            <Link
              href="/projects"
              className="label-xs inline-flex items-center gap-2 text-faint transition-colors hover:text-accent"
            >
              <ArrowIcon className="h-3 w-3 rotate-180" />
              All projects
            </Link>
          </div>
        </aside>
      </div>
    </PageShell>
  );
};

export default CaseStudyView;
