import Link from "next/link";
import { ProjectDossier } from "@/components/ProjectDossier";
import { ArrowIcon, Section, SectionHead } from "@/components/ui";
import { featuredProjects, projects } from "@/lib/content";

export const SelectedWork = () => {
  return (
    <Section id="projects" className="relative py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-gradient-to-b from-transparent via-deep/20 to-transparent"
      />
      <SectionHead
        index="02"
        label="Selected work"
        title={
          <>
            Dossiers, not <em className="accent-italic">thumbnails.</em>
          </>
        }
        lead="Five builds across autonomous navigation, emergency coordination, local AI tooling and language intelligence. Each dossier carries its stack, its status and — where it exists — its measured result."
        meta={`${String(projects.length).padStart(2, "0")} Projects logged`}
      />

      <div className="mt-12">
        <ProjectDossier
          items={featuredProjects}
          footer={
            <Link href="/projects" className="btn btn-ghost">
              All {projects.length} project dossiers
              <ArrowIcon />
            </Link>
          }
        />
      </div>
    </Section>
  );
};

export default SelectedWork;
