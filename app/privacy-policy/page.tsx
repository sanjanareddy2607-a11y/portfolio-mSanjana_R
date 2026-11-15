import { PageShell } from "@/components/ui";
import { site } from "@/lib/content";

const blocks: { title: string; body?: string; items?: string[] }[] = [
  {
    title: "Information we collect",
    body: "When you use this portfolio website, we collect certain information as described below.",
  },
  {
    title: "Contact form information",
    body: "If you submit the contact form, we collect the information you provide:",
    items: [
      "Full name",
      "Email address",
      "Organisation (optional)",
      "Opportunity type",
      "Subject",
      "Message content",
    ],
  },
  {
    title: "Authentication",
    body: "Visitors may optionally authenticate using Google sign-in (via Clerk). No personal data is stored unless you create an account.",
  },
  {
    title: "Database storage",
    body: "Contact form submissions may be stored in a database for record-keeping purposes. Only appropriate information is collected and retained. Anonymous analytics events may also be stored in aggregated form.",
  },
  {
    title: "Analytics",
    body: "We may collect anonymous analytics about site usage to improve the user experience. No personally identifiable information is collected through analytics.",
  },
  {
    title: "Third-party services",
    body: "The site may integrate with third-party services such as:",
    items: ["Cloudflare (hosting and DNS)", "GitHub (repository hosting)", "Vercel (deployments)"],
  },
  {
    title: "Data retention",
    body: "Contact form submissions are retained unless a deletion request is made. Analytics data is retained in aggregated form. Authentication sessions are managed per the provider's policy.",
  },
  {
    title: "Your rights",
    body: "You have the right to:",
    items: [
      "Request deletion of your personal data",
      "Opt-out of analytics tracking",
      "Access your stored data",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <PageShell
      index="06 / Legal"
      label="Privacy policy"
      title={
        <>
          Privacy <span className="ink-accent italic">policy.</span>
        </>
      }
      lead="How information submitted through this portfolio is collected, stored and retained."
      meta={
        <div className="space-y-2">
          <p className="label-xs text-accent">Last updated · November 2025</p>
          <p className="break-all">{site.email}</p>
        </div>
      }
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_0.6fr]">
        <div className="space-y-7">
          {blocks.map((block) => (
            <section key={block.title}>
              <h2 className="text-[15px] font-medium text-ink">{block.title}</h2>
              {block.body && (
                <p className="mt-2 text-[13.5px] leading-relaxed text-mist">{block.body}</p>
              )}
              {block.items && (
                <ul className="mt-3 space-y-2">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[13px] leading-relaxed text-mist"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <section>
            <h2 className="text-[15px] font-medium text-ink">Contact</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-mist">
              If you have questions about this privacy policy, contact:
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-2 inline-block break-all text-[13.5px] text-accent underline decoration-accent/30 underline-offset-4"
            >
              {site.email}
            </a>
          </section>
        </div>

        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div className="panel-flat p-5">
            <h2 className="label text-accent">At a glance</h2>
            <ul className="mt-4 space-y-3 text-[12.5px] leading-relaxed text-mist">
              <li>Contact submissions are used for correspondence only.</li>
              <li>No analytics data is tied to an individual visitor.</li>
              <li>You can request deletion of stored data at any time.</li>
            </ul>
          </div>
          <div className="panel-flat p-5">
            <h2 className="label text-accent">Data requests</h2>
            <a
              href={`mailto:${site.email}?subject=Data%20request`}
              className="label-xs mt-3 inline-flex text-accent underline decoration-accent/30 underline-offset-4"
            >
              Request deletion
            </a>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
