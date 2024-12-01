import * as Sentry from '@sentry/nextjs';
import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

type ErrorLevel = 'error' | 'warning' | 'info';

interface ErrorLoggerOptions {
  context?: Record<string, unknown>;
  level?: ErrorLevel;
  shouldNotify?: boolean;
}

export class AppError extends Error {
  public readonly context?: Record<string, unknown>;
  public readonly code: string;
  public readonly statusCode: number;

  constructor(
    message: string,
    code = 'INTERNAL_ERROR',
    context?: Record<string, unknown>,
    statusCode = 500,
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.context = context;
    this.statusCode = statusCode;
  }
}

export const logError = (
  message: string,
  options: ErrorLoggerOptions & { error?: unknown } = {},
): void => {
  const { context = {}, level = 'error', shouldNotify = true, error } = options;

  // Handle different error types
  const errorObject = error instanceof Error ? error : new Error(String(error));
  const errorContext = error instanceof AppError ? error.context : {};

  // Merge contexts
  const fullContext = {
    ...errorContext,
    ...context,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error]:', {
      message,
      error: errorObject,
      context: fullContext,
      stack: errorObject.stack,
    });
  }

  // Send to error tracking service in production
  if (shouldNotify && process.env.NODE_ENV === 'production') {
    Sentry.withScope((scope) => {
      scope.setLevel(level);
      scope.setExtra('message', message);
      Object.entries(fullContext).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
      Sentry.captureException(errorObject);
    });
  }
};

export const handleApiError = (error: unknown): NextResponse => {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: 'Validation error',
        code: 'VALIDATION_ERROR',
        details: error.errors,
      },
      { status: 400 },
    );
  }

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        ...(error.context && { context: error.context }),
      },
      { status: error.statusCode },
    );
  }

  const message = error instanceof Error ? error.message : 'Internal Server Error';
  return NextResponse.json(
    { error: message, code: 'INTERNAL_ERROR' },
    { status: 500 },
  );
};
