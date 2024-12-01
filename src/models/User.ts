import mongoose from 'mongoose';

import type { UserDocument } from '@/types/database';

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    subscriptionId: { type: String },
    customerId: { type: String },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.models.User as mongoose.Model<UserDocument>
  || mongoose.model<UserDocument>('User', userSchema);
