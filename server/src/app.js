import express from 'express';
import cors from 'cors';

import { CLIENT_URL } from './config/env.js';

import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);

export default app;
