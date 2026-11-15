import { PageShell } from "@/components/ui";
import { skills } from "@/lib/content";

const levelClass: Record<string, string> = {
  Advanced: "border-accent/45 text-accent",
  Proficient: "border-teal/40 text-teal",
  Familiar: "border-line text-faint",
};

export default function TechnicalSkills() {
  return (
    <PageShell
      index="01 / Record"
      label="Technical skills"
      title={
        <>
          Working <span className="ink-accent italic">instrumentation.</span>
        </>
      }
      lead="Tools and fundamentals in active use. Levels are qualitative — advanced, proficient or familiar — rather than invented percentages."
      meta={
        <div className="space-y-2">
          <p className="label-xs text-accent">04 capability groups</p>
          <p>Python · PyTorch · FastAPI · Docker · Ollama</p>
        </div>
      }
    >
      <div className="grid gap-5 md:grid-cols-2">
        {skills.map((group) => (
          <section key={group.code} className="panel brackets relative p-6">
            <div className="flex items-center justify-between gap-3 border-b border-line/70 pb-4">
              <h2 className="display text-[1.35rem] leading-none text-ink">{group.group}</h2>
              <span className="label-xs text-faint">{group.code}</span>
            </div>

            <ul className="mt-2 divide-y divide-line/50">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-center justify-between gap-4 py-3">
                  <span className="text-[13px] text-mist">{item.name}</span>
                  <span
                    className={`label-xs shrink-0 border px-2 py-1 ${
                      levelClass[item.level] ?? levelClass.Familiar
                    }`}
                  >
                    {item.level}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line/70 pt-5">
        <span className="label-xs text-faint">Legend</span>
        {["Advanced", "Proficient", "Familiar"].map((level) => (
          <span
            key={level}
            className={`label-xs border px-2 py-1 ${levelClass[level]}`}
          >
            {level}
          </span>
        ))}
      </div>
    </PageShell>
  );
}
