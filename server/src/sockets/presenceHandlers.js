import {
  getOnlineUsers,
  addUser,
  removeUser,
} from '../services/presenceService.js';

export function registerPresenceHandlers(io, socket) {
  const user = socket.data.user;

  addUser(user.id, user.username);

  // tell everyone else this user came online
  socket.broadcast.emit('presence:update', {
    userId: user.id,
    username: user.username,
    status: 'online',
  });

  // tell the newly connected user who's already online
  socket.emit('presence:list', getOnlineUsers());

  socket.on('disconnect', () => {
    removeUser(user.id);
    socket.broadcast.emit('presence:update', {
      userId: user.id,
      status: 'offline',
    });
  });
}
