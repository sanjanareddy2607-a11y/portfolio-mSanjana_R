import Link from "next/link";
import { Constellation } from "@/components/Constellation";
import { ArrowIcon, Section, SectionHead } from "@/components/ui";
import { beyondQuote, interests } from "@/lib/content";

export const BeyondSection = () => {
  return (
    <Section id="beyond" className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-1/4 top-1/4 -z-10 h-[520px] w-[520px] rounded-full opacity-60 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(32,230,208,0.14), transparent 68%)" }}
      />

      <SectionHead
        index="05"
        label="Beyond the code"
        title={
          <>
            Beyond the code, a wider <em className="accent-italic">orbit.</em>
          </>
        }
        lead="The references behind the engineering: sound, speculative futures, deep space, another language and a lot of visual storytelling."
        meta="Off-duty signal"
      />

      <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="order-2 lg:order-1">
          <ul className="space-y-3">
            {interests.map((interest, index) => (
              <li key={interest.label}>
                <article className="group panel panel-hover relative overflow-hidden p-4 md:p-5">
                  <div className="flex items-start gap-4">
                    <span className="label-xs mt-1 shrink-0 text-accent/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-[13.5px] font-medium text-ink">{interest.label}</h3>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-mist">
                        {interest.body}
                      </p>
                    </div>
                    <span className="ml-auto mt-1 h-1 w-1 shrink-0 rounded-full bg-line-hi transition-colors group-hover:bg-accent" />
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <blockquote className="mt-8 border-l border-accent/40 pl-4">
            <p className="display text-[1.15rem] italic leading-snug text-mist">
              &ldquo;{beyondQuote}&rdquo;
            </p>
            <footer className="label-xs mt-2 text-faint">A working assumption</footer>
          </blockquote>

          <Link
            href="/beyond-the-code"
            className="label-xs mt-7 inline-flex items-center gap-2 text-accent transition-all hover:gap-3"
          >
            The full constellation
            <ArrowIcon className="h-3 w-3" />
          </Link>
        </div>

        <div className="order-1 lg:order-2">
          <Constellation />
        </div>
      </div>
    </Section>
  );
};

export default BeyondSection;
