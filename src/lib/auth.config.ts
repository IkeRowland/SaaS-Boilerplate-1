import { AuthConfig } from '@clerk/nextjs/server';

export const authConfig: AuthConfig = {
  debug: process.env.NODE_ENV === 'development',
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
};

export const publicRoutes = [
  '/',
  '/api/webhooks(.*)',
  '/blog(.*)',
  '/pricing',
  '/about',
  '/contact',
];

export const protectedRoutes = [
  '/dashboard(.*)',
  '/settings(.*)',
  '/api(?!/webhooks)(.*)',
]; 