import Link from "next/link";
import { Planet } from "@/components/Planet";
import { ArrowIcon, ExternalIcon } from "@/components/ui";
import { heroFacts, site } from "@/lib/content";

export const Hero = () => {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[1280px] flex-col justify-center px-6 pb-14 pt-12 md:px-10 md:pt-16 xl:px-16">
        {/* planetary focal point */}
        <div className="pointer-events-none absolute right-[-30%] top-[4%] w-[105vw] max-w-[760px] opacity-55 sm:right-[-14%] sm:opacity-70 lg:right-[-6%] lg:top-1/2 lg:w-[52vw] lg:-translate-y-1/2 lg:opacity-100">
          <Planet id="hero" className="w-full" />
        </div>

        {/* readability scrim */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(96deg, #020B12 8%, rgba(2,11,18,0.92) 34%, rgba(2,11,18,0.55) 58%, rgba(2,11,18,0.15) 80%, rgba(2,11,18,0.5) 100%)",
          }}
        />

        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="label text-accent">Portfolio // Mission Control</span>
            <span className="hidden h-px w-12 bg-line-hi sm:block" />
            <span className="label-xs text-faint">Build 2026.11</span>
          </div>

          <h1 className="wordmark display mt-5 text-[clamp(2.7rem,7.4vw,6.2rem)] leading-[0.9] md:mt-7">
            Mummaka
            <br />
            Sanjana <span className="ink-accent italic">Reddy</span>
          </h1>

          <div className="mt-7 flex items-center gap-3">
            <span className="h-px w-10 bg-accent/60" />
            <p className="label text-accent">
              AI/ML Engineering <span className="text-teal/70">·</span> Software Development{" "}
              <span className="text-teal/70">·</span> Research
            </p>
          </div>

          <p className="display mt-6 max-w-2xl text-[clamp(1.5rem,2.7vw,2.15rem)] leading-[1.22] text-ink md:mt-8">
            Engineering intelligent systems.{" "}
            <span className="accent-italic">Exploring beyond boundaries.</span>
          </p>

          <p className="mt-6 max-w-xl text-[14.5px] leading-relaxed text-mist md:text-[15px]">
            {site.heroIntro}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4 md:mt-9">
            <a href="#projects" className="btn btn-primary">
              Explore my work
              <ArrowIcon />
            </a>
            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              View résumé
              <ExternalIcon />
            </a>
          </div>

          <p className="label-xs mt-6 hidden text-faint sm:block md:mt-7">
            Direct line —{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-mist underline decoration-line-hi underline-offset-4 transition-colors hover:text-accent"
            >
              {site.email}
            </a>
          </p>
        </div>

        <div className="relative z-10 mt-10 border-t border-line/70 pt-5 md:mt-20">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
            {heroFacts.map((fact) => (
              <div key={fact.label}>
                <dt className="label-xs text-faint">{fact.label}</dt>
                <dd
                  className={`mt-1.5 text-[12.5px] leading-snug ${
                    fact.accent ? "text-accent" : "text-mist"
                  }`}
                >
                  {fact.value}
                </dd>
              </div>
            ))}
            <div className="hidden flex-col justify-end lg:flex">
              <span className="label-xs text-faint">Scroll</span>
              <span className="scroll-cue relative mt-2 block h-8 w-px bg-line/60" />
            </div>
          </dl>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 right-6 hidden items-center gap-3 md:flex">
        <span className="h-1 w-1 rounded-full bg-accent" />
        <span className="label-xs text-faint">Bengaluru · IST</span>
      </div>

      <Link href="#about" className="sr-only">
        Continue to about
      </Link>
    </section>
  );
};

export default Hero;
