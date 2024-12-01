import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  role: z.enum(['user', 'admin']).default('user'),
});

export const subscriptionSchema = z.object({
  planId: z.string(),
  customerId: z.string(),
  status: z.enum(['active', 'cancelled', 'past_due']),
  currentPeriodEnd: z.string().datetime(),
});

export const webhookSchema = z.object({
  type: z.string(),
  data: z.record(z.unknown()),
  signature: z.string(),
});
