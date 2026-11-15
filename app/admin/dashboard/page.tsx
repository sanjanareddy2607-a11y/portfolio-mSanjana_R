import { PageShell } from "@/components/ui";
import { site } from "@/lib/content";

export default function AdminDashboard() {
  return (
    <PageShell
      index="Restricted / 00"
      label="Admin"
      title={
        <>
          Private <span className="ink-accent italic">dashboard.</span>
        </>
      }
      lead="This area is reserved for the portfolio owner. Contact submissions and portfolio management features are available upon authentication."
      meta={
        <div className="space-y-2">
          <p className="label-xs text-accent">Owner access only</p>
          <p className="break-all">{site.email}</p>
        </div>
      }
    >
      <div className="panel brackets relative max-w-2xl p-6 md:p-7">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          <span className="label-xs text-ember">Authentication required</span>
        </div>
        <p className="mt-4 text-[13.5px] leading-relaxed text-mist">
          Clerk authentication is required for access. Nothing on this page is publicly editable, and
          no submission data is exposed without a verified owner session.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="label-xs mt-5 inline-flex items-center gap-2 text-accent underline decoration-accent/30 underline-offset-4"
        >
          {site.email}
        </a>
      </div>
    </PageShell>
  );
}
