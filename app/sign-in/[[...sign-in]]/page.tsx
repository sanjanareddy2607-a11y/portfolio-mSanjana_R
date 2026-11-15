import type { Metadata } from "next";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { clerkAppearance } from "@/lib/clerk-appearance";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sign in — Mummaka Sanjana Reddy",
  robots: { index: false, follow: false },
};

export default function SignInPage() {
  return (
    <div className="relative z-10 flex min-h-screen items-center">
      <div className="mx-auto grid w-full max-w-[1080px] gap-10 px-6 py-12 md:px-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <Link href="/" className="label-xs text-faint transition-colors hover:text-accent">
            ← Back to introduction
          </Link>
          <h1 className="display mt-8 text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98] text-ink">
            Access <span className="ink-accent italic">control.</span>
          </h1>
          <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-mist">
            Sign in with Google to open the portfolio: project dossiers, research notes, the
            engineering lab and the downloadable résumé.
          </p>
          <ul className="mt-8 space-y-3 border-t border-line/70 pt-6">
            {[
              "Free access — no subscription or application form.",
              "Your name, email and sign-in time are recorded.",
              "Google credentials are handled by Clerk, never by this site.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-[12.5px] leading-relaxed text-faint">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[12px] leading-relaxed text-faint">
            Details are documented in the{" "}
            <Link
              href="/privacy-policy"
              className="text-mist underline decoration-line-hi underline-offset-4 hover:text-accent"
            >
              privacy policy
            </Link>
            . Data questions:{" "}
            <a href={`mailto:${site.email}`} className="text-mist hover:text-accent">
              {site.email}
            </a>
            .
          </p>
        </div>

        <div className="w-full">
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            fallbackRedirectUrl="/"
            appearance={clerkAppearance}
          />
        </div>
      </div>
    </div>
  );
}
