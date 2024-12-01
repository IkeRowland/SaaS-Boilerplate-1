import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { connectToDatabase } from '@/lib/db';
import { stripe } from '@/lib/stripe';
import { User } from '@/models/User';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 401 },
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    await connectToDatabase();

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        await User.findByIdAndUpdate(session.client_reference_id, {
          customerId: session.customer,
          subscriptionStatus: 'active',
          subscriptionId: session.subscription,
        });
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
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
        const subscription = event.data.object;
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

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json(
      { error: 'Webhook error' },
      { status: 400 },
    );
  }
}
