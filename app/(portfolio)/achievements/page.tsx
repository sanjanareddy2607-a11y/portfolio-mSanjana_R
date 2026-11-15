import { Dot, Metric, PageShell } from "@/components/ui";
import { achievements } from "@/lib/content";

const tier: Record<string, { label: string; className: string }> = {
  win: { label: "Winner", className: "border-ember/40 text-ember" },
  honour: { label: "Runner-up", className: "border-accent/40 text-accent" },
  entry: { label: "Participation", className: "border-line text-faint" },
};

const wins = achievements.filter((item) => item.kind === "win").length;
const honours = achievements.filter((item) => item.kind === "honour").length;
const entries = achievements.filter((item) => item.kind === "entry").length;

export default function Achievements() {
  return (
    <PageShell
      index="01 / Record"
      label="Achievements"
      title={
        <>
          Recognition <span className="ink-accent italic">log.</span>
        </>
      }
      lead="Hackathons, ideathons and competitions entered while building the project portfolio. Wins and participations are listed separately rather than blended into one claim."
      meta={
        <div className="space-y-2">
          <p className="label-xs flex items-center gap-2 text-ember">
            <Dot tone="ember" />
            {String(wins).padStart(2, "0")} wins recorded
          </p>
          <p>{achievements.length} entries total</p>
        </div>
      }
    >
      <div className="grid gap-5 sm:grid-cols-3">
        <Metric value={String(wins).padStart(2, "0")} label="Winning entries" />
        <Metric value={String(honours).padStart(2, "0")} label="Runner-up" />
        <Metric value={String(entries).padStart(2, "0")} label="Competitions entered" />
      </div>

      <div className="panel brackets relative mt-10 p-5 md:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/70 pb-4">
          <span className="label text-accent">Competition record</span>
          <span className="label-xs text-faint">Most recent first</span>
        </div>

        <ol className="divide-y divide-line/60">
          {achievements.map((item, index) => {
            const badge = tier[item.kind] ?? tier.entry;
            return (
              <li
                key={item.title}
                className="grid gap-x-5 gap-y-2 py-4 sm:grid-cols-[56px_1fr_auto] sm:items-center"
              >
                <span className="label-xs text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-[13.5px] font-medium text-ink">{item.title}</h2>
                  <p className="mt-1 text-[12.5px] text-faint">{item.detail}</p>
                </div>
                <span
                  className={`label-xs w-fit border px-2 py-1 ${badge.className}`}
                >
                  {badge.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </PageShell>
  );
}
