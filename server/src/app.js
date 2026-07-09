import express from 'express';
import cors from 'cors';

import { CLIENT_URL } from './config/env.js';

const app = express();

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

export default app;
