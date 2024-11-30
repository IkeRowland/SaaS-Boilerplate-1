import { Paystack } from 'paystack-sdk';

if (!process.env.PAYSTACK_SECRET_KEY) {
  throw new Error('PAYSTACK_SECRET_KEY is not set');
}

export const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY);

export async function createPaystackTransaction({
  email,
  amount,
  userId,
  metadata,
}: {
  email: string;
  amount: number;
  userId: string;
  metadata?: Record<string, unknown>;
}) {
  const transaction = await paystack.transaction.initialize({
    email,
    amount: amount * 100, // Convert to lowest currency unit
    metadata: {
      user_id: userId,
      ...metadata,
    },
  });

  return transaction;
} 