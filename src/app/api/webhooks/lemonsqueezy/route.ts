import crypto from 'node:crypto';

import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';

import { errorResponse, successResponse } from '@/lib/api-response';
import { connectToDatabase } from '@/lib/db';
import { webhookSchema } from '@/lib/validations/api';
import { withErrorHandler } from '@/middleware/api';
import { User } from '@/models/User';

function verifySignature(payload: string, signature: string): boolean {
  const hmac = crypto.createHmac(
    'sha256',
    process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!,
  );
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest),
  );
}

export async function POST(req: NextRequest) {
  return withErrorHandler(async () => {
    const body = await req.text();
    const signature = headers().get('x-signature');

    if (!signature || !verifySignature(body, signature)) {
      return errorResponse('Invalid signature', 'INVALID_SIGNATURE', 401);
    }

    const event = webhookSchema.parse(JSON.parse(body));

    switch (event.type) {
      case 'subscription_created':
      case 'subscription_updated': {
        const { customer_id, status, subscription_id } = event.data as any;
        await connectToDatabase();

        await User.findOneAndUpdate(
          { customerId: customer_id },
          {
            subscriptionStatus: status,
            subscriptionId: subscription_id,
          },
        );

        break;
      }

      case 'subscription_cancelled': {
        const { customer_id } = event.data as any;
        await connectToDatabase();

        await User.findOneAndUpdate(
          { customerId: customer_id },
          {
            subscriptionStatus: 'cancelled',
            subscriptionId: null,
          },
        );

        break;
      }
    }

    return successResponse({ received: true });
  });
}
