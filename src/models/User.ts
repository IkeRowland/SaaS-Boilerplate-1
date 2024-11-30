import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name?: string;
  role: 'user' | 'admin';
  subscriptionStatus: 'active' | 'inactive' | 'cancelled';
  subscriptionId?: string;
  customerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'inactive', 'cancelled'],
    default: 'inactive',
  },
  subscriptionId: String,
  customerId: String,
}, {
  timestamps: true,
});

export const User: Model<IUser> = mongoose.models.User || mongoose.model('User', UserSchema); 