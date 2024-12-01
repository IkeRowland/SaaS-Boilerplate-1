declare module 'next/server' {
  export type NextRequest = {
    auth: import('@clerk/nextjs/server').RequestAuth;
    nextUrl: {
      pathname: string;
    };
    url: string;
    json(): Promise<any>;
    text(): Promise<string>;
  };

  export class NextResponse {
    static json(
      body: any,
      init?: ResponseInit,
    ): NextResponse;

    static redirect(
      url: string | URL,
      init?: ResponseInit,
    ): NextResponse;

    static next(
      init?: ResponseInit,
    ): NextResponse;
  }

  export type { ResponseInit };
}
