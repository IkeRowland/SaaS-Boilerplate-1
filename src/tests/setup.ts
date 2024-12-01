import mongoose from 'mongoose';
import { afterAll, beforeAll } from 'vitest';

beforeAll(async () => {
  // Connect to test database
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
});

afterAll(async () => {
  // Clean up database connection
  await mongoose.connection.close();
});
