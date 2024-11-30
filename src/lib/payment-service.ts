import { PaymentProvider, PriceInfo } from '@/types/payments';
import { createCheckoutSession } from './stripe';
import { createLemonCheckout } from './lemonsqueezy';
import { createPaystackTransaction } from './paystack';

export const activeProviders: PaymentProvider[] = [
  { name: 'stripe', active: true },
  { name: 'lemonsqueezy', active: true },
  { name: 'paystack', active: true },
];

export async function createPaymentSession({
  provider,
  priceInfo,
  userId,
  email,
  successUrl,
  cancelUrl,
}: {
  provider: PaymentProvider['name'];
  priceInfo: PriceInfo;
  userId: string;
  email: string;
  successUrl: string;
  cancelUrl: string;
}) {
  switch (provider) {
    case 'stripe':
      return createCheckoutSession({
        priceId: priceInfo.id,
        userId,
        email,
        successUrl,
        cancelUrl,
      });
    case 'lemonsqueezy':
      return createLemonCheckout({
        variantId: priceInfo.id,
        email,
        userId,
        successUrl,
        cancelUrl,
      });
    case 'paystack':
      return createPaystackTransaction({
        email,
        amount: priceInfo.amount,
        userId,
      });
    default:
      throw new Error(`Payment provider ${provider} not supported`);
  }
} 