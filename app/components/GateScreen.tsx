import Link from "next/link";
import { Dot } from "@/components/ui";
import { site } from "@/lib/content";

const inside = [
  { code: "01", label: "Overview", body: "The research direction, current focus and working principles behind the portfolio." },
  { code: "02", label: "Projects", body: "Five engineering dossiers — NavGhost, N.E.X.U.S, JARVIS, EchoIntel and NexusProbe." },
  { code: "03", label: "Research", body: "The CAD-to-CNC feature-recognition pipeline submitted to ICAIMLE-2027." },
  { code: "04", label: "Engineering Lab", body: "Build logs, prototypes and the systems currently in progress." },
  { code: "05", label: "Beyond the Code", body: "Music, science fiction, astrophysics and the constellation of interests." },
  { code: "06", label: "Contact", body: "A direct channel for internships, research collaboration and technical work." },
];

const recorded = [
  "Your name, email address and profile photo URL, as provided by Google through Clerk.",
  "The time of each successful sign-in, linked to your account identifier.",
  "Nothing else — no page-view tracking, no click tracking, no advertising identifiers.",
];

export const GateScreen = () => (
  <div className="relative flex min-h-screen flex-col">
    <header className="relative z-10 mx-auto flex w-full max-w-[1180px] items-center justify-between gap-4 px-6 py-6 md:px-10">
      <div className="flex items-center gap-3">
        <span className="relative flex h-9 w-9 items-center justify-center border border-line-hi bg-panel/60 font-mono text-[10px] tracking-[0.14em] text-accent">
          {site.initials}
          <span className="absolute -right-px -top-px h-1.5 w-1.5 border-r border-t border-accent/70" />
          <span className="absolute -bottom-px -left-px h-1.5 w-1.5 border-b border-l border-accent/70" />
        </span>
        <span className="label-xs hidden text-faint sm:block">Private portfolio · Access required</span>
      </div>
      <Link
        href="/privacy-policy"
        className="label-xs text-mist transition-colors hover:text-accent"
      >
        Privacy &amp; data
      </Link>
    </header>

    <main id="main" className="relative z-10 flex flex-1 items-center">
      <div className="mx-auto w-full max-w-[1180px] px-6 pb-16 pt-6 md:px-10 md:pb-24 md:pt-10">
        <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="label text-accent">Restricted transmission</span>
              <span className="h-px w-10 bg-line-hi" />
              <span className="label-xs text-faint">Bengaluru · 12.97° N, 77.59° E</span>
            </div>

            <h1 className="display mt-7 text-[clamp(2.6rem,6.2vw,4.9rem)] leading-[0.94] text-ink">
              Mummaka Sanjana <span className="ink-accent italic">Reddy</span>
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-mist">
              AI/ML engineering student working on autonomous navigation, agentic systems and
              applied machine learning. This portfolio is kept private: the dossiers, research
              notes, lab logs and downloadable résumé are available after a verified sign-in.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/sign-in" className="btn btn-primary px-7 py-3.5">
                Sign in to enter
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </Link>
              <Link href="/privacy-policy" className="btn btn-ghost px-6 py-3.5">
                What is recorded
              </Link>
            </div>

            <p className="mt-5 max-w-md text-[12px] leading-relaxed text-faint">
              Google sign-in is handled by Clerk. Your password is never shared with this site, and
              access is free.
            </p>

            <dl className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-5 border-t border-line/70 pt-6">
              {[
                { label: "Program", value: "B.Tech CSE — AI & ML" },
                { label: "Institution", value: "Jain (Deemed-to-be) University" },
                { label: "Focus", value: "Intelligent systems" },
                { label: "Status", value: "Open to AI/ML work" },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="label-xs text-faint">{item.label}</dt>
                  <dd className="mt-1.5 text-[13px] text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-4">
            <div className="panel brackets brackets-accent relative p-5 md:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-line/70 pb-4">
                <span className="label text-accent">Inside the archive</span>
                <span className="label-xs inline-flex items-center gap-2 text-faint">
                  <Dot />
                  06 sectors
                </span>
              </div>
              <ul className="mt-1 divide-y divide-line/50">
                {inside.map((item) => (
                  <li key={item.code} className="flex gap-4 py-3">
                    <span className="label-xs mt-1 text-faint">{item.code}</span>
                    <span>
                      <span className="block text-[13px] text-ink">{item.label}</span>
                      <span className="mt-0.5 block text-[12px] leading-relaxed text-faint">
                        {item.body}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel-flat p-5 md:p-6">
              <div className="flex items-center gap-3">
                <Dot tone="ember" />
                <span className="label text-ember">Access &amp; privacy</span>
              </div>
              <p className="mt-3 text-[12.5px] leading-relaxed text-mist">
                Access requires a Google account. Signing in records the details below against your
                account so the owner knows who has viewed the portfolio.
              </p>
              <ul className="mt-4 space-y-2.5">
                {recorded.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[12px] leading-relaxed text-faint">
                    <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-line/60 pt-3 text-[12px] leading-relaxed text-faint">
                Data is processed by Clerk (authentication), Supabase (database and private
                documents), Resend (notification email) and Vercel (hosting). You can request
                deletion at{" "}
                <a
                  href={`mailto:${site.email}?subject=Data%20request`}
                  className="text-mist underline decoration-line-hi underline-offset-4 hover:text-accent"
                >
                  {site.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer className="relative z-10 border-t border-line/50">
      <div className="mx-auto flex w-full max-w-[1180px] flex-wrap items-center justify-between gap-3 px-6 py-5 md:px-10">
        <span className="label-xs text-faint">© {new Date().getFullYear()} {site.name}</span>
        <span className="label-xs flex items-center gap-2 text-faint">
          <Dot />
          Encrypted session · Clerk
        </span>
      </div>
    </footer>
  </div>
);

export default GateScreen;
