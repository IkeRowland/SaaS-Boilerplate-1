import { createClient } from '@lemonsqueezy/lemonsqueezy.js';

const client = createClient({
  apiKey: process.env.LEMON_SQUEEZY_API_KEY!,
});

export async function createLemonCheckout({
  variantId,
  email,
  userId,
  successUrl,
  cancelUrl,
}: {
  variantId: string;
  email: string;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const checkout = await client.createCheckout({
    variantId,
    email,
    customData: {
      userId,
    },
    successUrl,
    cancelUrl,
  });

  return checkout;
}
