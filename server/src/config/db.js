import mongoose from 'mongoose';
import { MONGODB_URI } from './env.js';

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set');
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Mongodb connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
}
