import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    // Test database connection
    await connectToDatabase();

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
      },
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
