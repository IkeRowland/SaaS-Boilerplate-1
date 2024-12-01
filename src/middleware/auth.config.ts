import type { AuthConfig } from '@clerk/nextjs/server';

export const authConfig: AuthConfig = {
  debug: process.env.NODE_ENV === 'development',
  jwtKey: process.env.CLERK_JWT_KEY,
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
};

export const protectedPaths = [
  '/dashboard(.*)',
  '/account(.*)',
  '/billing(.*)',
  '/settings(.*)',
  '/api(?!/webhooks)(.*)',
];
