"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/content";
import { ProjectVisual } from "@/components/ProjectVisual";
import { ArrowIcon, Dot, ExternalIcon } from "@/components/ui";

const statusTone = (kind: Project["statusKind"]) =>
  kind === "award" ? "ember" : kind === "completed" ? "mist" : "accent";

const toneText = (kind: Project["statusKind"]) =>
  kind === "award" ? "text-ember" : kind === "completed" ? "text-mist" : "text-accent";

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="group panel panel-hover brackets relative flex flex-col overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line/80">
        <ProjectVisual
          variant={project.visual}
          accent={project.accent}
          code={project.code}
          className="h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent opacity-80" />
        <span className="label-xs pointer-events-none absolute left-4 top-4 text-mist">
          {project.category}
        </span>
        <span className="label-xs pointer-events-none absolute right-4 top-4 text-faint">
          {project.index}
        </span>
        <span
          className={`label-xs pointer-events-none absolute bottom-3.5 left-4 inline-flex items-center gap-2 ${toneText(
            project.statusKind
          )}`}
        >
          <Dot tone={statusTone(project.statusKind) as "accent" | "ember" | "mist"} />
          {project.status}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="display text-[1.65rem] leading-none text-ink">{project.title}</h3>
        <p className="mt-2.5 text-[13px] leading-relaxed text-mist">{project.subtitle}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-line/70 pt-4">
          <span className="label-xs text-faint">Updated {project.updated}</span>
          <span className="label-xs inline-flex items-center gap-1.5 text-accent transition-all duration-300 group-hover:gap-3">
            Open dossier
            <ArrowIcon className="h-3 w-3" />
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open project dossier — ${project.title}`}
        className="absolute inset-0 z-10 cursor-pointer"
      />
    </article>
  );
}

function DossierModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto overscroll-contain p-4 sm:p-6 md:p-10">
      <button
        type="button"
        aria-label="Close dossier"
        onClick={onClose}
        className="modal-veil fixed inset-0 cursor-default bg-void/85 backdrop-blur-md"
        tabIndex={-1}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dossier-title"
        className="modal-panel panel brackets brackets-accent relative z-10 mx-auto my-6 w-full max-w-3xl md:my-10"
      >
        <header className="border-b border-line/80 px-5 pb-6 pt-5 md:px-8 md:pt-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="label-xs border border-accent/30 bg-accent/10 px-2 py-1 text-accent">
                {project.code}
              </span>
              <span className="label-xs text-faint">Project dossier</span>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project dossier"
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-line-hi text-mist transition-colors hover:border-accent/60 hover:text-accent"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>

          <h2 id="dossier-title" className="display mt-5 text-[clamp(1.9rem,4vw,2.9rem)] leading-[1.02] text-ink">
            {project.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-mist">{project.subtitle}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span
              className={`label-xs inline-flex items-center gap-2 ${toneText(project.statusKind)}`}
            >
              <Dot tone={statusTone(project.statusKind) as "accent" | "ember" | "mist"} />
              {project.status}
            </span>
            <span className="label-xs text-faint">{project.category}</span>
            <span className="label-xs text-faint">
              {project.start} — {project.updated}
            </span>
          </div>
        </header>

        <div className="px-5 py-6 md:px-8 md:py-8">
          <div className="relative aspect-[16/6] overflow-hidden border border-line/80">
            <ProjectVisual
              variant={project.visual}
              accent={project.accent}
              code={project.code}
              className="h-full w-full"
            />
          </div>

          <div className="mt-7 grid gap-7 md:grid-cols-[1.45fr_0.55fr]">
            <div className="space-y-6">
              <div>
                <h3 className="label text-accent">Overview</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-mist">{project.overview}</p>
              </div>

              {project.problem && (
                <div>
                  <h3 className="label text-accent">Problem</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-mist">{project.problem}</p>
                </div>
              )}

              {project.role && (
                <div>
                  <h3 className="label text-accent">My role</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-mist">{project.role}</p>
                </div>
              )}

              {project.capabilities && project.capabilities.length > 0 && (
                <div>
                  <h3 className="label text-accent">
                    {project.slug === "jarvis" ? "Tools" : "Capabilities"}
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {project.capabilities.map((capability) => (
                      <li
                        key={capability.label}
                        className="border-l border-accent/30 pl-3.5 text-[13px] leading-relaxed text-mist"
                      >
                        <span className="text-ink">{capability.label}</span> — {capability.body}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="label text-accent">Specification</h3>
                <dl className="mt-3 divide-y divide-line/60 border-t border-line/60">
                  {project.specs.map((spec) => (
                    <div key={spec.label} className="flex flex-col gap-0.5 py-2">
                      <dt className="label-xs text-faint">{spec.label}</dt>
                      <dd className="text-[13px] text-ink">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="label text-accent">Stack</h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {project.metrics.length > 0 && (
            <div className="mt-8 border-t border-line/70 pt-6">
              <h3 className="label text-accent">Reported measurements</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="border-t border-line/80 pt-3">
                    <p className="display text-[1.45rem] leading-none text-accent">{metric.value}</p>
                    <p className="label-xs mt-2 text-faint">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {project.notes.length > 0 && (
            <div className="mt-8 space-y-3">
              {project.notes.map((note) => {
                const caution =
                  note.label.toLowerCase().includes("simulated") ||
                  note.label.toLowerCase().includes("measurement") ||
                  note.label.toLowerCase().includes("ip");
                return (
                  <div
                    key={note.label}
                    className={`border-l-2 bg-deep/40 px-4 py-3 ${
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
            </div>
          )}
        </div>

        <footer className="flex flex-col gap-4 border-t border-line/80 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p className="label-xs text-faint">
            {project.code} · Index {project.index} · Updated {project.updated}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/project/${project.slug}`} className="btn btn-ghost px-5 py-2.5">
              Full case study
              <ArrowIcon className="h-3 w-3" />
            </Link>
            {project.links.slice(0, 1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary px-5 py-2.5"
              >
                {link.label}
                <ExternalIcon className="h-3 w-3" />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

export const ProjectDossier = ({
  items,
  footer,
}: {
  items: Project[];
  footer?: React.ReactNode;
}) => {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((project) => (
          <ProjectCard key={project.slug} project={project} onOpen={() => setActive(project)} />
        ))}
      </div>

      {footer && <div className="mt-10 flex justify-center">{footer}</div>}

      {active && <DossierModal project={active} onClose={() => setActive(null)} />}
    </>
  );
};

export default ProjectDossier;
