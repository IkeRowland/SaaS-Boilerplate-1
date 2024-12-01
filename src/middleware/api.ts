import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { handleApiError, logError } from '@/utils/error-handling';

export async function withErrorHandling(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>,
): Promise<NextResponse> {
  try {
    return await handler(req);
  } catch (error) {
    logError('API Error:', { context: error });
    return handleApiError(error);
  }
}

export async function withAuthentication(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>,
  session: unknown,
): Promise<NextResponse> {
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return withErrorHandling(req, handler);
}
