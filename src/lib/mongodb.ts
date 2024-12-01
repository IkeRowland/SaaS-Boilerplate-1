import mongoose from 'mongoose';

import { dbConfig, getMongoUri } from './db.config';

type DatabaseConnection = {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
};

// Extend the globalThis interface instead of using declare global
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConnection: DatabaseConnection | undefined;
}

// Initialize the global connection object
if (!globalThis._mongooseConnection) {
  globalThis._mongooseConnection = {
    conn: null,
    promise: null,
  };
}

export async function connectToDatabase(): Promise<mongoose.Connection> {
  const connection = globalThis._mongooseConnection!;

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
