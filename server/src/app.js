import express from 'express';
import cors from 'cors';

import { CLIENT_URL, DEV_CLIENT_URL } from './config/env.js';

import authRoutes from './routes/authRoutes.js';

const app = express();

const allowedOrigins = [CLIENT_URL, DEV_CLIENT_URL];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g. curl, server-to-server, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);

export default app;
