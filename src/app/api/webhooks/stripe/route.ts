import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';
import type Stripe from 'stripe';

import { errorResponse, successResponse } from '@/lib/api-response';
import { connectToDatabase } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { withErrorHandler } from '@/middleware/api';
import { User } from '@/models/User';

export async function POST(req: NextRequest) {
  return withErrorHandler(async () => {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    if (!signature) {
      return errorResponse('No signature', 'INVALID_SIGNATURE', 401);
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );
    } catch (err) {
      return errorResponse(
        'Invalid signature',
        'INVALID_SIGNATURE',
        401,
      );
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await connectToDatabase();

        await User.findByIdAndUpdate(session.client_reference_id, {
          customerId: session.customer,
          subscriptionStatus: 'active',
          subscriptionId: session.subscription,
        });

        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await connectToDatabase();

        await User.findOneAndUpdate(
          { customerId: subscription.customer },
          {
            subscriptionStatus: subscription.status,
            subscriptionId: subscription.id,
          },
        );

        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await connectToDatabase();

        await User.findOneAndUpdate(
          { customerId: subscription.customer },
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
