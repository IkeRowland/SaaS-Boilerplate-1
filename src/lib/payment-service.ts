import type {
  LemonSqueezyCheckoutOptions,
  PaymentProvider,
  PaystackTransactionOptions,
  PriceInfo,
  StripeCheckoutOptions,
} from '@/types/payments';

import { createCheckout } from './lemonsqueezy';
import { createPaystackTransaction } from './paystack';
import { createCheckoutSession } from './stripe';

export async function createPaymentSession({
  provider,
  priceId,
  userId,
  email,
  successUrl,
  cancelUrl,
}: {
  provider: PaymentProvider;
  priceId: string;
  userId: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
}) {
  switch (provider) {
    case 'stripe': {
      const options: StripeCheckoutOptions = {
        priceId,
        userId,
        email,
        successUrl,
        cancelUrl,
      };
      return createCheckoutSession(options);
    }

    case 'lemonsqueezy': {
      const options: LemonSqueezyCheckoutOptions = {
        email,
        customData: { userId },
        successUrl,
        cancelUrl,
      };
      return createCheckout(options);
    }

    case 'paystack': {
      const priceInfo = getPriceInfo(provider, priceId);
      const options: PaystackTransactionOptions = {
        email,
        amount: priceInfo.amount,
        userId,
        metadata: { priceId },
      };
      return createPaystackTransaction(options);
    }

    default:
      throw new Error(`Unsupported payment provider: ${provider}`);
  }
}

export function getPriceInfo(provider: PaymentProvider, priceId: string): PriceInfo {
  // Implementation would fetch price info from the respective provider
  return {
    id: priceId,
    amount: 1000, // $10.00
    currency: 'USD',
    recurring: {
      interval: 'month',
      intervalCount: 1,
    },
  };
}
