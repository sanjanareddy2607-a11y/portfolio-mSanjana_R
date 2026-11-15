import { ContactForm } from "@/components/ContactForm";
import { ArrowIcon, Dot, ExternalIcon, PageShell } from "@/components/ui";
import { site } from "@/lib/content";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
  { label: "GitHub", value: site.githubLabel, href: site.github, external: true },
  { label: "Hugging Face", value: site.huggingfaceLabel, href: site.huggingface, external: true },
  { label: "LinkedIn", value: "linkedin.com/in/sanjanareddy2607", href: site.linkedin, external: true },
];

export default function Contact() {
  return (
    <PageShell
      index="06 / Contact"
      label="Uplink"
      title={
        <>
          Get in <span className="ink-accent italic">touch.</span>
        </>
      }
      lead="Have an interesting engineering challenge, research collaboration, or AI/ML opportunity? I'd love to connect."
      meta={
        <div className="space-y-2">
          <p className="label-xs flex items-center gap-2 text-accent">
            <Dot />
            Channel open
          </p>
          <p>Bengaluru, Karnataka, India</p>
          <p>Typically responds within 24–48 hours</p>
        </div>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
        <aside className="space-y-6">
          <div className="panel-flat p-5">
            <div className="flex items-center justify-between gap-3 border-b border-line/70 pb-3">
              <h2 className="label text-accent">Direct channels</h2>
              <span className="label-xs text-faint">04 lines</span>
            </div>
            <ul className="mt-2 divide-y divide-line/60">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center justify-between gap-3 py-3"
                  >
                    <span>
                      <span className="label-xs block text-faint">{channel.label}</span>
                      <span className="mt-1 block break-all text-[12.5px] text-mist transition-colors group-hover:text-accent">
                        {channel.value}
                      </span>
                    </span>
                    {channel.external ? (
                      <ExternalIcon className="h-3 w-3 shrink-0 text-faint transition-colors group-hover:text-accent" />
                    ) : (
                      <ArrowIcon className="h-3 w-3 shrink-0 text-faint transition-colors group-hover:text-accent" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel brackets relative p-5">
            <h2 className="label text-accent">Availability</h2>
            <dl className="mt-4 space-y-3">
              <div className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-2.5">
                <dt className="label-xs text-faint">Location</dt>
                <dd className="text-[12.5px] text-mist">{site.location}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-2.5">
                <dt className="label-xs text-faint">Open to</dt>
                <dd className="text-[12.5px] text-accent">AI/ML opportunities</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="label-xs text-faint">Response</dt>
                <dd className="text-[12.5px] text-mist">24–48 hours</dd>
              </div>
            </dl>
          </div>

          <a
            href={site.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost w-full px-5 py-2.5"
          >
            View résumé
            <ExternalIcon className="h-3 w-3" />
          </a>
        </aside>

        <ContactForm />
      </div>
    </PageShell>
  );
}
