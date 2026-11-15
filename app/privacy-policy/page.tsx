import { PageShell } from "@/components/ui";
import { site } from "@/lib/content";

const blocks: { title: string; body?: string; items?: string[] }[] = [
  {
    title: "Who runs this site",
    body: "This is the personal engineering portfolio of Mummaka Sanjana Reddy. It is a private portfolio: the project dossiers, research notes, engineering lab and résumé require a signed-in session.",
  },
  {
    title: "Access and authentication",
    body: "Sign-in is handled by Clerk using Google. Google verifies your identity and Clerk issues this site a session; your Google password is never shared with this site and no password is stored here.",
    items: [
      "Your name, email address and profile photo URL, as provided by Google",
      "A Clerk account identifier for your session",
      "The date and time of each successful sign-in",
    ],
  },
  {
    title: "Sign-in records",
    body: "Each successful sign-in is recorded in this site's database with your account identifier and timestamp. This exists so the owner knows who has accessed the portfolio. Page views, clicks, scroll behaviour and reading time are not tracked.",
  },
  {
    title: "Contact form information",
    body: "If you submit the contact form, the following is stored and sent to the owner by email:",
    items: [
      "Full name",
      "Email address",
      "Organisation (optional)",
      "Opportunity type",
      "Subject",
      "Message content",
      "The account identifier of the signed-in session that submitted it",
    ],
  },
  {
    title: "Documents and certificates",
    body: "Certificates and supporting documents are stored in private storage and are not publicly listable or downloadable. They are served only through authenticated server routes to the owner.",
  },
  {
    title: "Email delivery records",
    body: "Notification emails are sent through Resend. For each attempt, the site records the notification type, recipient, provider message id and delivery status — not the email body.",
  },
  {
    title: "Third-party processors",
    body: "The following services process data on this site's behalf:",
    items: [
      "Clerk — authentication and session management",
      "Google — identity provider for sign-in",
      "Supabase — database and private document storage",
      "Resend — notification email delivery",
      "Vercel — application hosting",
    ],
  },
  {
    title: "Cookies and sessions",
    body: "Clerk sets the cookies required to keep you signed in. There are no advertising, analytics or cross-site tracking cookies on this site.",
  },
  {
    title: "Data retention",
    body: "Sign-in records and contact submissions are retained for correspondence and access records until you request deletion. Access is free and no payment data is collected anywhere on this site.",
  },
  {
    title: "Your rights",
    body: "You can request the following at any time by email:",
    items: [
      "A copy of the personal data stored about you",
      "Deletion of your sign-in records and any submissions",
      "Correction of inaccurate details",
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
      lead="What this portfolio records when you sign in, submit a message, or request your data."
      meta={
        <div className="space-y-2">
          <p className="label-xs text-accent">Last updated · November 2026</p>
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
              If you have questions about this privacy policy or the data stored about you, contact:
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
              <li>Signing in records your name, email and sign-in times.</li>
              <li>No page-view, click or advertising tracking is used.</li>
              <li>Contact messages are stored and emailed to the owner.</li>
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
