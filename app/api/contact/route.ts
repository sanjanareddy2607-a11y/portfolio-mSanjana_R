import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, organisation, opportunityType, subject, message } = body;

    // Server-side validation
    if (!fullName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const submissionPayload = {
      full_name: fullName,
      email,
      organisation: organisation || "",
      opportunity_type: opportunityType || "General",
      subject,
      message,
      created_at: new Date().toISOString(),
      status: "new",
    };

    // If Supabase is configured, persist to database
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from("contact_submissions")
        .insert([submissionPayload])
        .select()
        .single();

      if (error) {
        console.error("Supabase storage error:", error);
        return NextResponse.json(
          { error: "Failed to store submission in database" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { success: true, persisted: true, data },
        { status: 201 }
      );
    }

    // Controlled fallback when Supabase credentials are not provided
    console.warn("Contact submission received but database is not configured. Stored in memory / logged.");
    return NextResponse.json(
      {
        success: true,
        persisted: false,
        message: "Message received. (Database configuration pending)",
        data: submissionPayload,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}