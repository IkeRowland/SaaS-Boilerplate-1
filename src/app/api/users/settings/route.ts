import { auth } from '@clerk/nextjs';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { errorResponse, successResponse } from '@/lib/api-response';
import { connectToDatabase } from '@/lib/db';
import { withErrorHandler } from '@/middleware/api';
import { User } from '@/models/User';

const settingsSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
  }).optional(),
});

export async function GET() {
  return withErrorHandler(async () => {
    const { userId } = auth();
    if (!userId) {
      return errorResponse('Unauthorized', 'UNAUTHORIZED', 401);
    }

    await connectToDatabase();
    const user = await User.findById(userId).select('-__v').lean();

    if (!user) {
      return errorResponse('User not found', 'NOT_FOUND', 404);
    }

    return successResponse(user);
  });
}

export async function PATCH(req: NextRequest) {
  return withErrorHandler(async () => {
    const { userId } = auth();
    if (!userId) {
      return errorResponse('Unauthorized', 'UNAUTHORIZED', 401);
    }

    const body = await req.json();
    const validatedData = settingsSchema.parse(body);

    await connectToDatabase();
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: validatedData },
      { new: true },
    ).select('-__v').lean();

    if (!user) {
      return errorResponse('User not found', 'NOT_FOUND', 404);
    }

    return successResponse(user, 'Settings updated successfully');
  });
}
