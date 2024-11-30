import mongoose from 'mongoose';
import { dbConfig, getMongoUri } from './db.config';
import type { DatabaseConnection } from '@/types/database';

declare global {
  var mongoose: DatabaseConnection;
}

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    const uri = getMongoUri();
    global.mongoose.promise = mongoose.connect(uri, dbConfig).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    global.mongoose.conn = await global.mongoose.promise;
  } catch (e) {
    global.mongoose.promise = null;
    throw e;
  }

  return global.mongoose.conn;
} 