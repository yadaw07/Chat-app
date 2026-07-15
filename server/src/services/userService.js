import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

export async function createUser(username, password) {
  const exsiting = await User.findOne({ username });

  if (exsiting) {
    throw new Error('USERNAME_TAKEN');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({ username, passwordHash: hashedPassword });

  return { id: user._id.toString(), username: user.username };
}

export async function verifyCredentials(username, password) {
  const user = await User.findOne({ username });

  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.passwordHash);

  return isValid ? { id: user._id.toString(), username: user.username } : null;
}

export async function getUserById(id) {
  const user = await User.findById(id).catch(() => null);

  if (!user) {
    return null;
  }

  return { id: user._id.toString(), username: user.username };
}
