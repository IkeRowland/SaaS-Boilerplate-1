import type { Connection, Document } from 'mongoose';

export type DatabaseConnection = {
  conn: Connection | null;
  promise: Promise<Connection> | null;
};

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
};
