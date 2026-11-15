import Link from "next/link";
import { ProjectDossier } from "@/components/ProjectDossier";
import { ArrowIcon, Dot, PageShell } from "@/components/ui";
import { projects } from "@/lib/content";

export default function Projects() {
  return (
    <PageShell
      index="02 / Archive"
      label="Projects"
      title={
        <>
          Engineering <span className="ink-accent">dossiers.</span>
        </>
      }
      lead="Five projects, each documented with its architecture, stack, status and — where it exists — its measured result. Estimates and simulated results are labelled as such inside every dossier."
      meta={
        <div className="space-y-2">
          <p className="label-xs flex items-center gap-2 text-accent">
            <Dot />
            {projects.length} dossiers logged
          </p>
          <p>Autonomous navigation · Emergency coordination · Local AI · NLP · Monitoring</p>
        </div>
      }
    >
      <ProjectDossier items={projects} />

      <div className="mt-14 border-t border-line/70 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="label-xs text-faint">
            Prefer the source? Public repositories are indexed separately.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/github-integration" className="btn btn-ghost px-5 py-2.5">
              Public repositories
              <ArrowIcon className="h-3 w-3" />
            </Link>
            <Link href="/engineering-lab" className="btn btn-ghost px-5 py-2.5">
              Engineering lab
              <ArrowIcon className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
