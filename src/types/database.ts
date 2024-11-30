import { Connection, Document } from 'mongoose';

export interface DatabaseConnection {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

export interface BaseDocument extends Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDocument extends BaseDocument {
  email: string;
  name?: string;
  role: 'user' | 'admin';
  subscriptionStatus: 'active' | 'inactive' | 'cancelled';
  subscriptionId?: string;
  customerId?: string;
} 