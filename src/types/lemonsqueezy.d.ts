declare module '@lemonsqueezy/lemonsqueezy.js' {
  export type LemonSqueezyClient = {
    createCheckout: (options: {
      variantId: string;
      email?: string;
      customData?: Record<string, unknown>;
      successUrl?: string;
      cancelUrl?: string;
    }) => Promise<{
      url: string;
    }>;
  };

  export function createClient(options: { apiKey: string }): LemonSqueezyClient;
}
