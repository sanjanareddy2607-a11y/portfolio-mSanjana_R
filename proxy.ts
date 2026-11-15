import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Public surface: the intro/gate screen, the Clerk sign-in and sign-up pages,
 * the privacy policy, and the signed Clerk webhook endpoint.
 * Everything else — portfolio sections, case studies, admin, API routes and the
 * résumé download — requires an authenticated session.
 */
const PUBLIC_EXACT = new Set(["/", "/privacy-policy", "/sign-in", "/sign-up"]);

function isPublicPath(pathname: string) {
  if (PUBLIC_EXACT.has(pathname)) return true;
  if (pathname.startsWith("/sign-in/") || pathname.startsWith("/sign-up/")) return true;
  if (pathname.startsWith("/api/webhooks/")) return true;
  return false;
}

export default clerkMiddleware(async (auth, request) => {
  const { pathname, search } = request.nextUrl;

  if (isPublicPath(pathname)) return;

  const { userId } = await auth();

  if (!userId) {
    // API clients get a machine-readable 401 rather than an HTML redirect. The
    // résumé route is a browser navigation target, so it keeps a sign-in redirect.
    if ((pathname.startsWith("/api/") || pathname.startsWith("/trpc")) && pathname !== "/api/resume") {
      return NextResponse.json(
        { error: "Authentication required", code: "unauthenticated" },
        { status: 401, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Redirect explicitly instead of relying on auth.protect(), which can lose the
    // sign-in URL on Next.js 16 (clerk/javascript#8302) and bounce back to the
    // current page. This also preserves the originally requested destination.
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect_url", `${pathname}${search}`);
    return NextResponse.redirect(signInUrl);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless they appear in search params.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
  ],
};
