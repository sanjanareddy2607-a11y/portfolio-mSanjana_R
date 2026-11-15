import { auth } from "@clerk/nextjs/server";
import { PageShell } from "@/components/ui";
import { site } from "@/lib/content";
import { isAdminConfigured, isAdminUser } from "@/lib/auth";
import { isDatabaseConfigured } from "@/lib/supabase-server";
import { isEmailConfigured } from "@/lib/email";

const StatusRow = ({ label, ok, detail }: { label: string; ok: boolean; detail: string }) => (
  <div className="flex items-start justify-between gap-4 border-b border-line/60 py-3 last:border-b-0">
    <span className="label-xs text-faint">{label}</span>
    <span className="text-right">
      <span className={`label-xs ${ok ? "text-accent" : "text-ember"}`}>
        {ok ? "Configured" : "Missing"}
      </span>
      <span className="mt-1 block text-[12px] text-mist">{detail}</span>
    </span>
  </div>
);

export default async function AdminDashboard() {
  const { userId } = await auth();
  const authorized = isAdminUser(userId);

  return (
    <PageShell
      index="Restricted / 00"
      label="Admin"
      title={
        <>
          Private <span className="ink-accent italic">dashboard.</span>
        </>
      }
      lead={
        authorized
          ? "Owner session verified. Submission review, visitor records and document management arrive in the next stage; the configuration checks below confirm this stage is wired correctly."
          : "This area is reserved for the portfolio owner. Access is decided on the server from the configured administrator account."
      }
      meta={
        <div className="space-y-2">
          <p className="label-xs text-accent">Owner access only</p>
          <p className="break-all">{site.email}</p>
        </div>
      }
    >
      {!authorized ? (
        <div className="panel brackets relative max-w-2xl p-6 md:p-7">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            <span className="label-xs text-ember">Not authorised</span>
          </div>
          <p className="mt-4 text-[13.5px] leading-relaxed text-mist">
            {!isAdminConfigured
              ? "ADMIN_CLERK_USER_ID is not set yet, so no account is recognised as the administrator. Sign in, copy your Clerk user id, and add it to the environment."
              : "You are signed in, but this account is not the configured administrator. Only the owner account may open this page."}
          </p>
          <p className="mt-4 text-[12px] leading-relaxed text-faint">
            Signed-in Clerk user id:{" "}
            <span className="break-all font-mono text-mist">{userId ?? "none"}</span>
          </p>
          {!isAdminConfigured && userId && (
            <p className="mt-3 text-[12px] leading-relaxed text-faint">
              To authorise this account, set <span className="font-mono text-mist">ADMIN_CLERK_USER_ID</span>{" "}
              to the id above and restart the server.
            </p>
          )}
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="panel brackets relative p-6">
            <span className="label text-accent">Stage 2 status</span>
            <div className="mt-4">
              <StatusRow
                label="Administrator"
                ok={isAdminConfigured}
                detail="ADMIN_CLERK_USER_ID matched this session"
              />
              <StatusRow
                label="Database"
                ok={isDatabaseConfigured}
                detail={
                  isDatabaseConfigured
                    ? "Supabase service role client available"
                    : "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
                }
              />
              <StatusRow
                label="Email"
                ok={isEmailConfigured}
                detail={
                  isEmailConfigured
                    ? "Resend key and recipient present"
                    : "Set RESEND_API_KEY and NOTIFICATION_EMAIL"
                }
              />
            </div>
          </div>

          <div className="panel-flat p-6">
            <span className="label text-accent">Next stage</span>
            <p className="mt-3 text-[13px] leading-relaxed text-mist">
              Contact submissions, visitor sign-in records and private certificate storage are
              collected from this stage onward. Their review interfaces are built in the career
              management stage, so nothing here is editable yet.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="label-xs mt-5 inline-flex items-center gap-2 text-accent underline decoration-accent/30 underline-offset-4"
            >
              {site.email}
            </a>
          </div>
        </div>
      )}
    </PageShell>
  );
}
