import { registerChatHandlers } from './chatHandlers.js';
import { registerRoomHandlers } from './roomHandlers.js';

export function registerSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    registerChatHandlers(io, socket);
    registerRoomHandlers(io, socket);

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
}
