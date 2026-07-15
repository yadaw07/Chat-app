import bcrypt from 'bcrypt';

const users = new Map();

export async function createUser(username, password) {
  if (users.has(username)) {
    throw new Error('USERNAME_TAKEN');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = { id: crypto.randomUUID(), username, hashedPassword };
  users.set(username, user);

  return { id: user.id, username: user.username };
}

export async function verifyCredentials(username, password) {
  const user = users.get(username);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.hashedPassword);

  return isValid ? { id: user.id, username: user.username } : null;
}

export function getUserById(id) {
  for (const user of users.values()) {
    if (user.id === id) {
      return { id: user.id, username: user.username };
    }
  }

  return null;
}
