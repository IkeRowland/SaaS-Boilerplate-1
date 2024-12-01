import { withClerkMiddleware } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { protectedPaths } from '@/middleware/auth.config';

export default withClerkMiddleware((req: NextRequest) => {
  const { userId } = req.auth;
  const path = req.nextUrl.pathname;

  // Check if the path is protected
  const isProtected = protectedPaths.some((pattern) => {
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(path);
  });

  if (isProtected && !userId) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', path);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
