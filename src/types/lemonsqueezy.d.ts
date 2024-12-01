declare module '@lemonsqueezy/lemonsqueezy.js' {
  export type LemonSqueezyConfig = {
    apiKey: string;
    storeId?: string;
    variantId?: string;
  };

  export type LemonSqueezyCheckoutOptions = {
    storeId?: string;
    variantId?: string;
    checkoutData?: {
      email?: string;
      name?: string;
      billingAddress?: {
        country?: string;
        zip?: string;
      };
      custom?: Record<string, unknown>;
    };
  };

  export type LemonSqueezyWebhookEvent = {
    meta: {
      event_name: string;
      custom_data?: Record<string, unknown>;
    };
    data: {
      id: string;
      type: string;
      attributes: {
        store_id: number;
        customer_id: number;
        order_id: number;
        product_id: number;
        variant_id: number;
        status: string;
        created_at: string;
        updated_at: string;
      };
    };
  };

  export class LemonSqueezy {
    constructor(config: LemonSqueezyConfig);
    createCheckout: (options: LemonSqueezyCheckoutOptions) => Promise<{
      url: string;
    }>;

    getSubscription: (subscriptionId: string) => Promise<any>;
    updateSubscription: (subscriptionId: string, data: any) => Promise<any>;
    cancelSubscription: (subscriptionId: string) => Promise<void>;
  }

  export default LemonSqueezy;
}
