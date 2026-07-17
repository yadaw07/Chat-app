import { verifyToken } from '../services/authService.js';
import { getUserById } from '../services/userService.js';

export async function socketAuthMiddleware(socket, next) {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error('No token provided'));
  }

  const payload = verifyToken(token);

  if (!payload) {
    return next(new Error('Invalid or expired token'));
  }

  const user = await getUserById(payload.sub);

  if (!user) {
    return next(new Error('User no longer exists'));
  }

  socket.data.user = user;
  next();
}
