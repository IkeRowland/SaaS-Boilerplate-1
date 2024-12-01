import { LemonSqueezy } from '@lemonsqueezy/lemonsqueezy.js';

if (!process.env.LEMON_SQUEEZY_API_KEY) {
  throw new Error('LEMON_SQUEEZY_API_KEY is not set');
}

const client = new LemonSqueezy({
  apiKey: process.env.LEMON_SQUEEZY_API_KEY,
  storeId: process.env.LEMON_SQUEEZY_STORE_ID,
  variantId: process.env.LEMON_SQUEEZY_VARIANT_ID,
});

export async function createCheckout(options: {
  email: string;
  name?: string;
  customData?: Record<string, unknown>;
  successUrl?: string;
  cancelUrl?: string;
}) {
  const { url } = await client.createCheckout({
    variantId: process.env.LEMON_SQUEEZY_VARIANT_ID!,
    checkoutData: {
      email: options.email,
      name: options.name,
      custom: options.customData,
    },
  });

  return url;
}

export async function getSubscription(subscriptionId: string) {
  return client.getSubscription(subscriptionId);
}

export async function updateSubscription(subscriptionId: string, data: any) {
  return client.updateSubscription(subscriptionId, data);
}

export async function cancelSubscription(subscriptionId: string) {
  return client.cancelSubscription(subscriptionId);
}

export { client as lemonSqueezy };
