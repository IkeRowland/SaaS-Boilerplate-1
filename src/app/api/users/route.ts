import type { NextRequest } from 'next/server';

import { errorResponse, successResponse } from '@/lib/api-response';
import { auth } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { userSchema } from '@/lib/validations/api';
import { withErrorHandler } from '@/middleware/api';
import { User } from '@/models/User';

export async function GET(req: NextRequest) {
  return withErrorHandler(req, async () => {
    const { userId } = await auth();
    if (!userId) {
      return errorResponse('Unauthorized', 'UNAUTHORIZED', 401);
    }

    await connectToDatabase();
    const users = await User.find().select('-__v').lean();

    return successResponse(users);
  });
}

export async function POST(req: NextRequest) {
  return withErrorHandler(req, async () => {
    const { userId, sessionClaims } = await auth();
    if (!userId || sessionClaims?.role !== 'admin') {
      return errorResponse('Unauthorized', 'UNAUTHORIZED', 401);
    }

    const body = await req.json();
    const validatedData = userSchema.parse(body);

    await connectToDatabase();
    const user = await User.create(validatedData);

    return successResponse(user, 'User created successfully');
  });
}
