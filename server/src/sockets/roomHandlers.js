import { getAllRooms, roomExists } from '../services/roomService.js';

export function registerRoomHandlers(io, socket) {
  socket.on('room:list', () => {
    const rooms = getAllRooms();
    socket.emit('room:list', rooms);
  });

  socket.on('room:join', ({ roomId }) => {
    if (!roomExists(roomId)) {
      socket.emit('error', { message: `Room ${roomId} does not exist` });
      return;
    }

    socket.join(roomId);
    socket.data.currentRoom = roomId;

    socket.to(roomId).emit('room:userJoined', {
      roomId,
      userId: socket.id,
    });
  });

  socket.on('room:leave', ({ roomId }) => {
    socket.leave(roomId);
    socket.to(roomId).emit('userLeft', {
      roomId,
      userId: socket.id,
    });

    if (socket.data.currentRoom === roomId) {
      socket.data.currentRoom = null;
    }
  });
}
