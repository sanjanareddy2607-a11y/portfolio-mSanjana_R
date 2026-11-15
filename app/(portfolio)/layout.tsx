import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PortfolioChrome } from "@/components/PortfolioChrome";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Defence in depth: proxy.ts already redirects unauthenticated requests, but the
  // layout re-checks on the server so a matcher miss can never expose a page.
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <PortfolioChrome>{children}</PortfolioChrome>;
}
