import { NextResponse, type NextRequest } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/lib/supabase-server";
import { sendNotification } from "@/lib/email";

export const runtime = "nodejs";

function fullName(first?: string | null, last?: string | null) {
  return [first, last].filter(Boolean).join(" ").trim() || null;
}

function formatTime(iso?: string | null) {
  if (!iso) return new Date().toISOString();
  return new Date(iso).toISOString().replace("T", " ").slice(0, 19) + " UTC";
}

export async function POST(request: NextRequest) {
  let event;

  try {
    event = await verifyWebhook(request);
  } catch (error) {
    console.error("Clerk webhook signature verification failed", error);
    return new NextResponse("Invalid webhook signature", { status: 400 });
  }

  const payload = event.data as { id?: string };
  const eventKey = `${event.type}:${payload?.id ?? "unknown"}`;

  // Without a database we cannot guarantee idempotency, so we refuse rather than
  // risk duplicate notification emails on a webhook retry.
  if (!db) {
    console.warn(`Clerk webhook ${event.type} ignored: database is not configured`);
    return NextResponse.json({ received: true, stored: false, reason: "database_not_configured" });
  }

  const claim = await db.from("webhook_events").insert({ id: eventKey, type: event.type });
  if (claim.error) {
    if (claim.error.code === "23505") {
      return NextResponse.json({ received: true, duplicate: true });
    }
    console.error("Could not record webhook event", claim.error);
    return NextResponse.json({ error: "storage_unavailable" }, { status: 500 });
  }

  try {
    if (event.type === "user.created") {
      const user = event.data;
      const email = user.email_addresses?.[0]?.email_address ?? null;
      const name = fullName(user.first_name, user.last_name);

      await db.from("visitors").upsert(
        {
          clerk_user_id: user.id,
          email,
          full_name: name,
          image_url: user.image_url ?? null,
          last_seen_at: new Date().toISOString(),
        },
        { onConflict: "clerk_user_id" }
      );

      await sendNotification({
        kind: "visitor_registered",
        entityId: eventKey,
        subject: `New visitor registered — ${email ?? user.id}`,
        lines: [
          { label: "Name", value: name ?? "Not provided" },
          { label: "Email", value: email ?? "Not provided" },
          { label: "Clerk user", value: user.id },
          { label: "Registered", value: formatTime(user.created_at ? new Date(user.created_at).toISOString() : null) },
        ],
      });
    }

    if (event.type === "session.created") {
      const session = event.data;
      const clerkUserId = session.user_id;
      const signedInAt = session.created_at
        ? new Date(session.created_at).toISOString()
        : new Date().toISOString();

      await db.from("visitors").upsert(
        { clerk_user_id: clerkUserId, last_seen_at: signedInAt },
        { onConflict: "clerk_user_id", ignoreDuplicates: true }
      );

      const { data: visitor } = await db
        .from("visitors")
        .select("id, email, full_name, first_seen_at")
        .eq("clerk_user_id", clerkUserId)
        .maybeSingle();

      let email = visitor?.email ?? null;
      let name = visitor?.full_name ?? null;

      if (!email) {
        try {
          const client = await clerkClient();
          const user = await client.users.getUser(clerkUserId);
          email = user.emailAddresses?.[0]?.emailAddress ?? null;
          name = fullName(user.firstName, user.lastName);
          await db
            .from("visitors")
            .update({ email, full_name: name })
            .eq("clerk_user_id", clerkUserId);
        } catch (error) {
          console.error("Could not resolve Clerk user for session", error);
        }
      }

      const eventInsert = await db.from("login_events").insert({
        clerk_event_id: eventKey,
        visitor_id: visitor?.id ?? null,
        clerk_user_id: clerkUserId,
        clerk_session_id: session.id,
        email,
      });

      if (eventInsert.error && eventInsert.error.code !== "23505") {
        console.error("login_events insert failed", eventInsert.error);
      }

      await db.from("visitors").update({ last_seen_at: signedInAt }).eq("clerk_user_id", clerkUserId);

      // The first session arrives within seconds of `user.created`, which already
      // sent the registration email. Skip the duplicate sign-in email for it.
      const firstSeen = visitor?.first_seen_at ? new Date(visitor.first_seen_at).getTime() : 0;
      const isFirstSession = firstSeen > 0 && Date.now() - firstSeen < 5 * 60 * 1000;

      if (!isFirstSession) {
        await sendNotification({
          kind: "visitor_signed_in",
          entityId: eventKey,
          subject: `Portfolio sign-in — ${email ?? clerkUserId}`,
          lines: [
            { label: "Name", value: name ?? "Not provided" },
            { label: "Email", value: email ?? "Not provided" },
            { label: "Clerk user", value: clerkUserId },
            { label: "Session", value: session.id },
            { label: "Signed in", value: formatTime(signedInAt) },
          ],
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`Clerk webhook ${event.type} handler failed`, error);
    // Release the claim so Clerk's retry can be processed.
    await db.from("webhook_events").delete().eq("id", eventKey);
    return NextResponse.json({ error: "handler_failed" }, { status: 500 });
  }
}
