import { isNonEmptyString, isValidRoomId } from '../utils/validators.js';
import { emitError } from '../utils/socketError.js';

import { saveMessage } from '../services/messageService.js';

export function registerChatHandlers(io, socket) {
  socket.on('message:send', async ({ roomId, text }) => {
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

    try {
      const message = await saveMessage({
        roomId,
        text: text.trim(),
        senderId: socket.data.user.id,
        senderName: socket.data.user.username,
      });

      io.to(roomId).emit('message:new', message);
    } catch (err) {
      console.error('Failed to save message:', err.message);
      emitError(
        socket,
        'SEND_FAILED',
        'Could not send message, please try again',
      );
    }
  });

  socket.on('message:edit', async ({ messageId, text }) => {
    if (!isNonEmptyString(text)) {
      emitError(socket, 'INVALID_MESSAGE', 'Message text is empty or too long');
      return;
    }

    try {
      const message = await editMessage(
        messageId,
        socket.data.user.id,
        text.trim(),
      );
      io.to(message.roomId).emit('message:updated', message);
    } catch (err) {
      handleMessageError(socket, err);
    }
  });

  socket.on('message:delete', async ({ messageId }) => {
    try {
      const message = await deleteMessage(messageId, socket.data.user.id);
      io.to(message.roomId).emit('message:updated', message);
    } catch (err) {
      handleMessageError(socket, err);
    }
  });

  function handleMessageError(socket, err) {
    const map = {
      MESSAGE_NOT_FOUND: 'That message no longer exists',
      NOT_YOUR_MESSAGE: 'You can only edit or delete your own messages',
      MESSAGE_DELETED: 'That message has already been deleted',
    };

    emitError(socket, err.message, map[err.message] || 'Something went wrong');
  }
}
