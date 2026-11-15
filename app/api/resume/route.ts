import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { auth } from "@clerk/nextjs/server";

export const runtime = "nodejs";

/**
 * The résumé lives outside /public so the raw file URL cannot bypass
 * authentication. Access always passes through this authenticated handler.
 */
export async function GET(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect_url", "/api/resume");
    return NextResponse.redirect(signInUrl);
  }

  try {
    const filePath = path.join(process.cwd(), "private", "resume.pdf");
    const file = await readFile(filePath);

    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="Mummaka-Sanjana-Reddy-Resume.pdf"',
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Résumé could not be read", error);
    return NextResponse.json({ error: "Résumé is temporarily unavailable." }, { status: 404 });
  }
}
