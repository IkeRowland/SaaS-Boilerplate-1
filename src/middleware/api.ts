import type { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

import { errorResponse } from '@/lib/api-response';

export async function withErrorHandler(
  req: NextRequest,
  handler: (req: NextRequest) => Promise<NextResponse>,
): Promise<NextResponse> {
  try {
    return await handler(req);
  } catch (error) {
    console.error('API Error:', error);

    if (error instanceof ZodError) {
      return errorResponse(
        'Validation error',
        'VALIDATION_ERROR',
        400,
        error.errors,
      );
    }

    if (error instanceof Error) {
      return errorResponse(error.message);
    }

    return errorResponse('An unexpected error occurred');
  }
}
