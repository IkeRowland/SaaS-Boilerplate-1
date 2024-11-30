import { LemonSqueezy } from '@lemonsqueezy/lemonsqueezy.js';

if (!process.env.LEMON_SQUEEZY_API_KEY) {
  throw new Error('LEMON_SQUEEZY_API_KEY is not set');
}

export const lemonSqueezy = new LemonSqueezy(process.env.LEMON_SQUEEZY_API_KEY);

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
  const checkout = await lemonSqueezy.createCheckout({
    variantId,
    checkoutData: {
      email,
      custom: {
        user_id: userId,
      },
      successUrl,
      cancelUrl,
    },
  });

  return checkout;
} 