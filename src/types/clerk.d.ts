declare module '@clerk/nextjs/server' {
  export type AuthConfig = {
    debug?: boolean;
    jwtKey?: string;
    publishableKey?: string;
    secretKey?: string;
  };

  export function withClerkMiddleware(
    handler: (req: import('next/server').NextRequest) => Promise<import('next/server').NextResponse> | import('next/server').NextResponse,
  ): (req: import('next/server').NextRequest) => Promise<import('next/server').NextResponse>;

  export type RequestAuth = {
    userId: string | null;
    sessionClaims: Record<string, unknown> | null;
  };
}

declare module '@clerk/nextjs' {
  export function auth(): Promise<{
    userId: string | null;
    sessionClaims: Record<string, unknown> | null;
  }>;

  export function currentUser(): Promise<{
    id: string;
    emailAddresses: Array<{ emailAddress: string }>;
    firstName?: string;
    lastName?: string;
  } | null>;

  export function ClerkProvider(props: {
    children: React.ReactNode;
  }): JSX.Element;
}

declare module 'next/server' {
  type NextRequest = {
    auth: import('@clerk/nextjs/server').RequestAuth;
  };
}
