import type { Document } from 'mongoose';

export type BaseDocument = Document & {
  createdAt: Date;
  updatedAt: Date;
};

export type UserDocument = BaseDocument & {
  email: string;
  name?: string;
  role: 'user' | 'admin';
  subscriptionId?: string;
  customerId?: string;
  subscriptionStatus?: 'active' | 'cancelled' | 'past_due';
};
