export type PaymentProvider = 'stripe' | 'lemonsqueezy' | 'paystack';

export type PriceInfo = {
  id: string;
  amount: number;
  currency: string;
  recurring?: {
    interval: 'day' | 'week' | 'month' | 'year';
    intervalCount?: number;
  };
};

export type PaystackTransactionOptions = {
  email: string;
  amount: number;
  userId: string;
  metadata?: Record<string, unknown>;
};

export type StripeCheckoutOptions = {
  priceId: string;
  userId: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
};

export type LemonSqueezyCheckoutOptions = {
  email: string;
  customData?: Record<string, unknown>;
  successUrl?: string;
  cancelUrl?: string;
};
