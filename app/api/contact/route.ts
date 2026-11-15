import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db, isDatabaseConfigured } from "@/lib/supabase-server";
import { sendNotification, notificationRecipient } from "@/lib/email";

export const runtime = "nodejs";

type ContactPayload = {
  fullName?: string;
  email?: string;
  organisation?: string;
  opportunityType?: string;
  subject?: string;
  message?: string;
};

const LIMITS = {
  fullName: 120,
  email: 254,
  organisation: 160,
  opportunityType: 80,
  subject: 200,
  message: 5000,
};

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const { userId } = await auth();

  // The portfolio is private, so contact is a signed-in channel.
  if (!userId) {
    return NextResponse.json(
      { error: "You need to be signed in to send a message.", code: "unauthenticated" },
      { status: 401 }
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body.", code: "bad_request" }, { status: 400 });
  }

  const fullName = clean(body.fullName, LIMITS.fullName);
  const email = clean(body.email, LIMITS.email);
  const organisation = clean(body.organisation, LIMITS.organisation);
  const opportunityType = clean(body.opportunityType, LIMITS.opportunityType) || "General";
  const subject = clean(body.subject, LIMITS.subject);
  const message = clean(body.message, LIMITS.message);

  if (!fullName || !email || !subject || !message) {
    return NextResponse.json(
      { error: "All required fields must be filled.", code: "validation" },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "Invalid email format.", code: "validation" }, { status: 400 });
  }

  if (message.length < 10) {
    return NextResponse.json(
      { error: "Please include a little more detail in your message.", code: "validation" },
      { status: 400 }
    );
  }

  // No database means no durable storage. Fail honestly instead of reporting a
  // success that silently discards the message.
  if (!isDatabaseConfigured || !db) {
    console.error("Contact submission rejected: Supabase is not configured");
    return NextResponse.json(
      {
        error:
          `Messaging is temporarily unavailable because storage is not configured. ` +
          `Please email ${notificationRecipient || "sanjanareddy2607@gmail.com"} directly.`,
        code: "storage_unavailable",
      },
      { status: 503 }
    );
  }

  const { data: visitor } = await db
    .from("visitors")
    .select("id, email, full_name")
    .eq("clerk_user_id", userId)
    .maybeSingle();

  const { data: inserted, error } = await db
    .from("contact_submissions")
    .insert({
      full_name: fullName,
      email,
      organisation: organisation || null,
      opportunity_type: opportunityType,
      subject,
      message,
      status: "new",
      visitor_id: visitor?.id ?? null,
      clerk_user_id: userId,
    })
    .select("id")
    .single();

  if (error || !inserted) {
    console.error("Contact submission could not be stored", error);
    return NextResponse.json(
      {
        error:
          `Your message could not be saved, so it has not been sent. ` +
          `Please try again shortly or email ${notificationRecipient || "sanjanareddy2607@gmail.com"} directly.`,
        code: "storage_failed",
      },
      { status: 503 }
    );
  }

  const notification = await sendNotification({
    kind: "contact_submission",
    entityId: inserted.id,
    subject: `Contact form — ${subject}`,
    lines: [
      { label: "From", value: `${fullName} <${email}>` },
      { label: "Organisation", value: organisation || "Not provided" },
      { label: "Opportunity", value: opportunityType },
      { label: "Subject", value: subject },
      { label: "Message", value: message },
      { label: "Signed-in account", value: userId },
      { label: "Submission id", value: inserted.id },
    ],
  });

  return NextResponse.json(
    {
      success: true,
      stored: true,
      id: inserted.id,
      emailNotified: notification.ok,
    },
    { status: 201 }
  );
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
