import Link from "next/link";
import { Planet } from "@/components/Planet";
import { ArrowIcon, Dot, Section, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { aboutValues, site } from "@/lib/content";

const orbitLabels = [
  { text: "Ideas", position: "left-[2%] top-[18%]" },
  { text: "Systems", position: "right-[0%] top-[44%]" },
  { text: "Research", position: "left-[14%] bottom-[14%]" },
];

export const AboutSection = () => {
  return (
    <Section id="about" className="overflow-hidden py-20 md:py-28">
      <SectionHead
        index="01"
        label="Mission directive"
        title={
          <>
            Every intelligent system starts as a{" "}
            <em className="accent-italic">question.</em>
          </>
        }
        lead="I study how intelligent systems are built — not only what they produce. That means working from first principles, measuring honestly, and shipping systems that hold up outside a notebook."
        meta="Identity / Bengaluru"
      />

      <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Reveal>
          <div className="border-l border-line pl-6 md:pl-8">
            <p className="display text-[clamp(1.35rem,2.2vw,1.75rem)] leading-snug text-ink">
              I&apos;m Mummaka Sanjana Reddy, a second-year B.Tech Computer Science and Engineering
              student specialising in Artificial Intelligence and Machine Learning at Jain
              (Deemed-to-be) University, Bengaluru.
            </p>
            <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-mist">{site.intro}</p>

            <dl className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <div>
                <dt className="label text-accent">Academic identity</dt>
                <dd className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-mist">
                  <p>B.Tech Computer Science and Engineering — AI &amp; ML</p>
                  <p>Jain (Deemed-to-be) University, Bengaluru</p>
                  <p className="text-faint">Second Year, 2024–2028</p>
                </dd>
              </div>
              <div>
                <dt className="label text-accent">Location</dt>
                <dd className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-mist">
                  <p>Bengaluru, India</p>
                  <p className="text-faint">Asia/Kolkata · IST</p>
                </dd>
              </div>
              <div>
                <dt className="label text-accent">Social profiles</dt>
                <dd className="mt-3 space-y-1.5 text-[13px]">
                  {[
                    { label: "GitHub", href: site.github, external: true },
                    { label: "Hugging Face", href: site.huggingface, external: true },
                    { label: "Email", href: `mailto:${site.email}`, external: false },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-center gap-2 text-mist transition-colors hover:text-accent"
                    >
                      <span className="h-px w-4 bg-line-hi transition-colors group-hover:bg-accent" />
                      {link.label}
                    </a>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="label text-accent">Recent activity</dt>
                <dd className="mt-3 space-y-2 text-[13px] leading-relaxed text-mist">
                  {[
                    "SIH Internal Hackathon 2026 Winner",
                    "GRINOVA Ideathon 2026 Winner",
                    "GRINOVA MVP — JARVIS AI Operating System",
                  ].map((item) => (
                    <p key={item} className="flex items-start gap-2.5">
                      <span className="mt-[7px]">
                        <Dot tone="ember" />
                      </span>
                      {item}
                    </p>
                  ))}
                </dd>
              </div>
            </dl>

            <Link
              href="/about"
              className="label-xs mt-9 inline-flex items-center gap-2 text-accent transition-all hover:gap-3"
            >
              Full profile
              <ArrowIcon className="h-3 w-3" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto w-full max-w-[460px]">
            <Planet id="about" className="w-full" />
            <div className="pointer-events-none absolute inset-0">
              {orbitLabels.map((label) => (
                <span
                  key={label.text}
                  className={`absolute ${label.position} border border-line/80 bg-void/70 px-2.5 py-1 backdrop-blur-sm`}
                >
                  <span className="label-xs text-mist">{label.text}</span>
                </span>
              ))}
            </div>
            <div className="absolute inset-x-0 -bottom-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-line-hi" />
              <span className="label-xs text-faint">Intelligence · Systems · Research</span>
              <span className="h-px w-8 bg-line-hi" />
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-5 md:grid-cols-3">
        {aboutValues.map((value, index) => (
          <Reveal key={value.code} delay={index * 90}>
            <article className="group panel panel-hover brackets relative flex h-full flex-col overflow-hidden p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-9 w-9 items-center justify-center border border-line-hi text-accent">
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden>
                    {index === 0 && (
                      <>
                        <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.1" />
                        <circle cx="10" cy="10" r="2" fill="currentColor" />
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <path d="M10 2.5v15M2.5 10h15" stroke="currentColor" strokeWidth="1.1" />
                        <circle cx="10" cy="10" r="4.5" stroke="currentColor" strokeWidth="1.1" />
                      </>
                    )}
                    {index === 2 && (
                      <path
                        d="M3 15V7m4 8V4m4 11v-6m4 6V6"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    )}
                  </svg>
                </span>
                <span className="label-xs text-faint">{value.code}</span>
              </div>

              <p className="label-xs mt-6 text-accent">{value.label}</p>
              <h3 className="display mt-2 text-[1.45rem] leading-tight text-ink">{value.title}</h3>
              <p className="mt-3 text-[13px] leading-relaxed text-mist">{value.body}</p>

              <div className="flex-1" />

              <div className="mt-7 flex items-center justify-between border-t border-line/70 pt-4">
                <span className="label-xs text-faint">Directive {value.code}</span>
                <span className="label-xs inline-flex items-center gap-1.5 text-accent/70 transition-all group-hover:gap-3 group-hover:text-accent">
                  Applied
                  <ArrowIcon className="h-3 w-3" />
                </span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
};

export default AboutSection;
