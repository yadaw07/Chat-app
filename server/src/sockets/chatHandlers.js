import { isNonEmptyString, isValidRoomId } from '../utils/validators.js';
import { emitError } from '../utils/socketError.js';

export function registerChatHandlers(io, socket) {
  socket.on('message:send', ({ roomId, text }) => {
    if (!isValidRoomId(roomId) || !socket.rooms.has(roomId)) {
      emitError(
        socket,
        'NOT_IN_ROOM',
        'You must join a room before sending messages',
      );
      return;
    }

    if (!isNonEmptyString(text)) {
      emitError(socket, 'INVALID_MESSAGE', 'Message text is empty or too long');
      return;
    }

    const message = {
      id: crypto.randomUUID(),
      text: text.trim(),
      roomId,
      senderId: socket.id,
      timestamps: Date.now(),
    };

    io.to(roomId).emit('message:new', message);
  });
}
