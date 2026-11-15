/**
 * Administrator authorization is decided on the server from an environment
 * variable holding the owner's Clerk user id. No client-supplied role, email or
 * metadata is ever trusted for this decision.
 */
export const adminUserId = (process.env.ADMIN_CLERK_USER_ID ?? "").trim();

export const isAdminConfigured = adminUserId.length > 0;

export function isAdminUser(userId: string | null | undefined): boolean {
  return Boolean(userId && adminUserId && userId === adminUserId);
}
