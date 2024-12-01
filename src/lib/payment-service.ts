import type {
  LemonSqueezyCheckoutOptions,
  PaymentProvider,
  PaystackTransactionOptions,
  PriceInfo,
  StripeCheckoutOptions,
} from '@/types/payments';
import { AppError, logError } from '@/utils/error-handling';

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
  try {
    switch (provider) {
      case 'stripe': {
        const options: StripeCheckoutOptions = {
          priceId,
          userId,
          email,
          successUrl,
          cancelUrl,
        };
        return await createCheckoutSession(options);
      }

      case 'lemonsqueezy': {
        const options: LemonSqueezyCheckoutOptions = {
          email,
          customData: { userId },
          successUrl,
          cancelUrl,
        };
        return await createCheckout(options);
      }

      case 'paystack': {
        const priceInfo = getPriceInfo(provider, priceId);
        const options: PaystackTransactionOptions = {
          email,
          amount: priceInfo.amount,
          userId,
          metadata: { priceId },
        };
        return await createPaystackTransaction(options);
      }

      default:
        throw new AppError(
          `Unsupported payment provider: ${provider}`,
          'INVALID_PAYMENT_PROVIDER',
          { provider },
        );
    }
  } catch (error) {
    logError(error, {
      context: {
        provider,
        priceId,
        userId,
        email,
      },
    });
    throw error;
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
