import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = '7d';
