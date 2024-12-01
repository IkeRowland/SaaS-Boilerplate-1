import type { ConnectOptions } from 'mongoose';

export const dbConfig: ConnectOptions = {
  bufferCommands: false,
};

export function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }
  return uri;
}
