import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { lemonSqueezy } from '@/lib/lemonsqueezy';
import { paystack } from '@/lib/paystack';
import { User } from '@/models/User';
import { connectToDatabase } from '@/lib/db';

export async function POST(req: Request) {
  const headersList = headers();
  const signature = headersList.get('stripe-signature') || 
                   headersList.get('x-lemon-signature') ||
                   headersList.get('x-paystack-signature');
  
  if (!signature) {
    return new NextResponse('No signature', { status: 401 });
  }

  try {
    const body = await req.text();
    let event;

    // Determine which provider sent the webhook
    if (headersList.get('stripe-signature')) {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } else if (headersList.get('x-lemon-signature')) {
      // Verify Lemon Squeezy webhook
      event = JSON.parse(body);
    } else if (headersList.get('x-paystack-signature')) {
      // Verify PayStack webhook
      event = JSON.parse(body);
    } else {
      throw new Error('Unknown webhook provider');
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
      case 'subscription_created':
      case 'charge.success':
        await connectToDatabase();
        
        const userId = event.data.object.metadata.userId;
        await User.findByIdAndUpdate(userId, {
          subscriptionStatus: 'active',
          subscriptionId: event.data.object.subscription,
          customerId: event.data.object.customer,
        });
        break;
      // Add other event types as needed
    }

    return new NextResponse('Webhook processed', { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new NextResponse('Webhook error', { status: 400 });
  }
} 