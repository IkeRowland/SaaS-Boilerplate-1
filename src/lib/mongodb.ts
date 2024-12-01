import mongoose from 'mongoose';

import { dbConfig } from './db.config';

declare global {
  interface GlobalThis {
    mongoose: {
      conn: mongoose.Connection | null;
      promise: Promise<mongoose.Connection> | null;
    } | undefined;
  }
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached?.conn) {
    return cached.conn;
  }

  if (!cached?.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, dbConfig);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
