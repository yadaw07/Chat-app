import {
  getOnlineUsers,
  addUser,
  removeUser,
} from '../services/presenceService.js';

export function registerPresenceHandlers(io, socket) {
  addUser(socket.id);

  // tell everyone else this user came online
  socket.broadcast.emit('presence:update', {
    userId: socket.id,
    status: 'online',
  });

  // tell the newly connected user who's already online
  socket.emit('presence:list', getOnlineUsers());

  socket.on('disconnect', () => {
    removeUser(socket.id);
    socket.broadcast.emit('presence:update', {
      userId: socket.id,
      status: 'offline',
    });
  });
}
