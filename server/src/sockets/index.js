import { registerChatHandlers } from './chatHandlers.js';
import { registerRoomHandlers } from './roomHandlers.js';
import { registerPresenceHandlers } from './presenceHandlers.js';
import { registerTypingHandlers } from './typingHandlers.js';

export function registerSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    registerChatHandlers(io, socket);
    registerRoomHandlers(io, socket);
    registerPresenceHandlers(io, socket);
    registerTypingHandlers(io, socket);

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
}
