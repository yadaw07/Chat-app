import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = '7d';

export const MONGODB_URI = process.env.MONGODB_URI;

export const NODE_ENV = process.env.NODE_ENV || 'development';

if (!JWT_SECRET || !MONGODB_URI) {
  throw new Error(
    'Missing required environment variables: JWT_SECRET and/or MONGODB_URI',
  );
}
