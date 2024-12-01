import mongoose from 'mongoose';
import { dbConfig, getMongoUri } from './db.config';

type DatabaseConnection = {
  mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
};

declare global {
  let mongooseConnection: DatabaseConnection['mongoose'];
}

if (!globalThis.mongooseConnection) {
  globalThis.mongooseConnection = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<mongoose.Connection> {
  if (globalThis.mongooseConnection.conn) {
    return globalThis.mongooseConnection.conn;
  }

  if (!globalThis.mongooseConnection.promise) {
    const uri = getMongoUri();
    globalThis.mongooseConnection.promise = mongoose
      .connect(uri, dbConfig)
      .then(m => m.connection);
  }

  try {
    globalThis.mongooseConnection.conn = await globalThis.mongooseConnection.promise;
  } catch (e) {
    globalThis.mongooseConnection.promise = null;
    throw e;
  }

  return globalThis.mongooseConnection.conn;
} 