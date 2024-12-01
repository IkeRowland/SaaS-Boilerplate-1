import type { Connection } from 'mongoose';
import mongoose from 'mongoose';

import { dbConfig, getMongoUri } from './db.config';

type DatabaseConnection = {
  conn: Connection | null;
  promise: Promise<Connection> | null;
};

// Add mongoose to globalThis type
declare global {
  type CustomGlobalThis = typeof globalThis & {
    _mongooseConnection?: DatabaseConnection;
  };
}

// Initialize the global connection object
if (!(globalThis as CustomGlobalThis)._mongooseConnection) {
  (globalThis as CustomGlobalThis)._mongooseConnection = {
    conn: null,
    promise: null,
  };
}

export async function connectToDatabase(): Promise<Connection> {
  const connection = (globalThis as CustomGlobalThis)._mongooseConnection!;

  // If we have a connection, return it
  if (connection.conn) {
    return connection.conn;
  }

  // If we don't have a promise to connect, create one
  if (!connection.promise) {
    const uri = getMongoUri();

    connection.promise = mongoose
      .connect(uri, dbConfig)
      .then(m => m.connection);
  }

  try {
    // Wait for the connection
    connection.conn = await connection.promise;
  } catch (error) {
    // If connection fails, clear the promise so we can try again
    connection.promise = null;
    throw error;
  }

  return connection.conn;
}
