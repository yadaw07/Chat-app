import { Router } from 'express';

import { createUser, verifyCredentials } from '../services/userService.js';
import { signToken } from '../services/authService.js';
import { isNonEmptyString } from '../utils/validators.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!isNonEmptyString(username, 30) || !isNonEmptyString(password, 50)) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  try {
    const user = await createUser(username, password);
    const token = signToken(user);

    res.status(201).json({ token, user });
  } catch (err) {
    if (err.message === 'USERNAME_TAKEN') {
      return res.status(409).json({ error: 'Username already taken' });
    }
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!isNonEmptyString(username, 30) || !isNonEmptyString(password, 50)) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const user = await verifyCredentials(username, password);
  if (!user) {
    return res.status(400).json({ error: 'Invalid username or password' });
  }

  const token = signToken(user);

  res.json({ token, user });
});

export default router;
