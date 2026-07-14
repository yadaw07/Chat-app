import { isValidRoomId } from '../utils/validators.js';

export function registerTypingHandlers(io, socket) {
  socket.on('typing:start', ({ roomId }) => {
    if (!isValidRoomId(roomId) || !socket.rooms.has(roomId)) return;

    socket.to(roomId).emit('typing:update', {
      roomId,
      userId: socket.id,
      isTyping: true,
    });
  });

  socket.on('typing:stop', ({ roomId }) => {
    if (!isValidRoomId(roomId) || !socket.rooms.has(roomId)) return;

    socket.to(roomId).emit('typing:update', {
      roomId,
      userId: socket.id,
      isTyping: false,
    });
  });
}
