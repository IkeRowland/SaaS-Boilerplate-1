declare module 'next/server' {
  export type NextRequest = {
    auth: import('@clerk/nextjs/server').RequestAuth;
    nextUrl: {
      pathname: string;
    };
    url: string;
    json: () => Promise<any>;
    text: () => Promise<string>;
    headers: Headers;
    method: string;
    body: ReadableStream<Uint8Array> | null;
  };

  export class NextResponse<T = any> {
    static json<T>(
      body: T,
      init?: ResponseInit,
    ): NextResponse<T>;

    static redirect(
      url: string | URL,
      init?: ResponseInit,
    ): NextResponse;

    static next(
      init?: ResponseInit,
    ): NextResponse;

    json: () => Promise<T>;
    status: number;
  }

  export type { ResponseInit };
}
