declare module 'next/server' {
  type NextRequest = {
    json: () => Promise<any>;
    text: () => Promise<string>;
    headers: Headers;
    method: string;
    body: ReadableStream<Uint8Array> | null;
    nextUrl: {
      pathname: string;
    };
    url: string;
  };

  class NextResponse<T = any> {
    static json<T>(body: T, init?: ResponseInit): NextResponse<T>;
    static redirect(url: string | URL, init?: ResponseInit): NextResponse;
    static next(init?: ResponseInit): NextResponse;
    json(): Promise<T>;
    status: number;
  }

  type ResponseInit = {
    status?: number;
    headers?: Record<string, string>;
  };
}
