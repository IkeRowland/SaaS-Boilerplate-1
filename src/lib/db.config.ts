import { ConnectionOptions } from 'mongoose';

export const dbConfig: ConnectionOptions = {
  bufferCommands: false,
  autoIndex: true,
  autoCreate: true,
};

export const getMongoUri = (): string => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }
  return uri;
}; 