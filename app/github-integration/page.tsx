import { ExternalIcon, PageShell } from "@/components/ui";
import { projects, site } from "@/lib/content";

const repos = projects.filter((project) => project.links.some((link) => link.kind === "repo"));

export default function GitHubIntegration() {
  return (
    <PageShell
      index="02 / Source"
      label="GitHub"
      title={
        <>
          Public <span className="ink-accent italic">repositories.</span>
        </>
      }
      lead="Selected public repositories. Each project dossier on this portfolio links back to the corresponding source or release."
      meta={
        <div className="space-y-2">
          <p className="label-xs text-accent">{repos.length} repositories linked</p>
          <p className="break-all">{site.githubLabel}</p>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {repos.map((project) => {
          const repo = project.links.find((link) => link.kind === "repo");
          if (!repo) return null;
          return (
            <article
              key={project.slug}
              className="panel panel-hover brackets group relative overflow-hidden p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-10 w-10 items-center justify-center border border-line-hi text-accent">
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                    <path
                      d="M10 2.6a7.4 7.4 0 0 0-2.34 14.42c.37.07.5-.16.5-.36v-1.3c-2.06.45-2.5-.99-2.5-.99-.34-.86-.83-1.09-.83-1.09-.68-.46.05-.45.05-.45.75.05 1.14.77 1.14.77.67 1.14 1.75.81 2.18.62.07-.48.26-.81.47-1-1.64-.19-3.37-.82-3.37-3.65 0-.81.29-1.47.76-1.98-.08-.19-.33-.94.07-1.96 0 0 .62-.2 2.03.76a7 7 0 0 1 3.7 0c1.4-.96 2.02-.76 2.02-.76.4 1.02.15 1.77.07 1.96.47.51.76 1.17.76 1.98 0 2.84-1.74 3.46-3.39 3.64.27.23.5.68.5 1.37v2.03c0 .2.13.44.51.36A7.4 7.4 0 0 0 10 2.6Z"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </svg>
                </span>
                <span className="label-xs text-faint">{project.code}</span>
              </div>

              <h2 className="display mt-5 text-[1.45rem] leading-none text-ink">
                {project.title}
              </h2>
              <p className="mt-2.5 text-[13px] leading-relaxed text-mist">{project.summary}</p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 3).map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>

              <a
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label-xs mt-5 inline-flex items-center gap-2 border-t border-line/70 pt-4 text-accent transition-all group-hover:gap-3"
              >
                View repository
                <ExternalIcon className="h-3 w-3" />
              </a>
            </article>
          );
        })}
      </div>
    </PageShell>
  );
}
