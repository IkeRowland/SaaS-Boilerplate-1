import { auth as clerkAuth } from '@clerk/nextjs';

export async function auth() {
  const { userId, sessionClaims } = await clerkAuth();
  return {
    userId,
    sessionClaims: sessionClaims as { role?: string } | null,
  };
}
