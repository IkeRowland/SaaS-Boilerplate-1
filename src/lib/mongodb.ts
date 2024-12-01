import type { Connection } from 'mongoose';
import mongoose from 'mongoose';

declare global {
  let mongooseConnection: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

if (!globalThis.mongooseConnection) {
  globalThis.mongooseConnection = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<Connection> {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  if (globalThis.mongooseConnection.conn) {
    return globalThis.mongooseConnection.conn;
  }

  if (!globalThis.mongooseConnection.promise) {
    globalThis.mongooseConnection.promise = mongoose.connect(process.env.MONGODB_URI).then(m => m.connection);
  }

  try {
    globalThis.mongooseConnection.conn = await globalThis.mongooseConnection.promise;
  } catch (e) {
    globalThis.mongooseConnection.promise = null;
    throw e;
  }

  return globalThis.mongooseConnection.conn;
}
