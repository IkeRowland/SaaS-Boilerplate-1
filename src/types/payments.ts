export type PaymentProvider = {
  name: 'stripe' | 'lemonsqueezy' | 'paystack';
  active: boolean;
};

export type PriceInfo = {
  id: string;
  name: string;
  description?: string;
  amount: number;
  currency: string;
  interval?: 'month' | 'year' | 'one-time';
  provider: PaymentProvider['name'];
};

export type SubscriptionInfo = {
  id: string;
  status: 'active' | 'cancelled' | 'past_due' | 'incomplete';
  currentPeriodEnd: Date;
  priceId: string;
  provider: PaymentProvider['name'];
};
