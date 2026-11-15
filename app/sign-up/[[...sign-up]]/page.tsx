import type { Metadata } from "next";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Create access — Mummaka Sanjana Reddy",
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <div className="relative z-10 flex min-h-screen items-center">
      <div className="mx-auto grid w-full max-w-[1080px] gap-10 px-6 py-12 md:px-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <Link href="/" className="label-xs text-faint transition-colors hover:text-accent">
            ← Back to introduction
          </Link>
          <h1 className="display mt-8 text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98] text-ink">
            Request <span className="ink-accent italic">access.</span>
          </h1>
          <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-mist">
            Create access with your Google account to open the full portfolio. Registration is open
            to anyone reviewing the work — no approval step, no password to remember.
          </p>
          <ul className="mt-8 space-y-3 border-t border-line/70 pt-6">
            {[
              "One step with your existing Google account.",
              "Your name, email and sign-in time are recorded.",
              "You can request deletion of that data at any time.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-[12.5px] leading-relaxed text-faint">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[12px] leading-relaxed text-faint">
            Data questions:{" "}
            <a href={`mailto:${site.email}`} className="text-mist hover:text-accent">
              {site.email}
            </a>
          </p>
        </div>

        <div className="w-full">
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            fallbackRedirectUrl="/"
            appearance={clerkAppearance}
          />
        </div>
      </div>
    </div>
  );
}
