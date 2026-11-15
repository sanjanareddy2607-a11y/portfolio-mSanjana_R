import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ArrowIcon, ExternalIcon, Section, SectionHead } from "@/components/ui";
import { site } from "@/lib/content";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
  { label: "GitHub", value: site.githubLabel, href: site.github, external: true },
  { label: "Hugging Face", value: site.huggingfaceLabel, href: site.huggingface, external: true },
  { label: "LinkedIn", value: "linkedin.com/in/sanjanareddy2607", href: site.linkedin, external: true },
];

export const FinalCTA = () => {
  return (
    <Section id="contact" className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-1/4 bottom-0 -z-10 h-[480px] w-[480px] rounded-full opacity-60 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(32,230,208,0.16), transparent 68%)" }}
      />

      <SectionHead
        index="06"
        label="Contact / Uplink"
        title={
          <>
            Have an interesting <em className="accent-italic">engineering challenge?</em>
          </>
        }
        lead="I'm open to collaborations on AI/ML projects, research opportunities, software engineering roles, and technical challenges that push the boundaries of intelligent systems. Let's connect and build something meaningful together."
        meta="Response within 24–48h"
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10">
        <div className="space-y-8">
          <div className="panel-flat p-5">
            <div className="flex items-center justify-between gap-3 border-b border-line/70 pb-3">
              <span className="label text-accent">Direct channels</span>
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
                    className="group flex items-center justify-between gap-3 py-3 transition-colors"
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
            <span className="label text-accent">Current status</span>
            <dl className="mt-4 space-y-3">
              <div className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-2.5">
                <dt className="label-xs text-faint">Location</dt>
                <dd className="text-[12.5px] text-mist">{site.location}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-2.5">
                <dt className="label-xs text-faint">Availability</dt>
                <dd className="text-[12.5px] text-accent">Open to AI/ML opportunities</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="label-xs text-faint">Response</dt>
                <dd className="text-[12.5px] text-mist">24–48 hours</dd>
              </div>
            </dl>
            <p className="mt-4 text-[12px] leading-relaxed text-faint">
              I typically respond within 24–48 hours for engineering inquiries and collaborations.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost px-5 py-2.5"
            >
              Résumé
              <ExternalIcon className="h-3 w-3" />
            </a>
            <Link href="/projects" className="btn btn-ghost px-5 py-2.5">
              Project dossiers
              <ArrowIcon className="h-3 w-3" />
            </Link>
          </div>
        </div>

        <ContactForm />
      </div>
    </Section>
  );
};

export default FinalCTA;
