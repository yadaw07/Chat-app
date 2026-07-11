import { roomExists, getAllRooms } from '../services/roomService.js';

export function registerRoomHandlers(io, socket) {
  socket.on('room:join', ({ roomId }) => {
    if (!roomExists(roomId)) {
      socket.emit('error', { message: `Room ${roomId} does not exist` });
      return;
    }

    socket.join(roomId);
    socket.data.currentRoom = roomId;

    socket.to(roomId).emit('room:userJoined', { roomId, userId: socket.id });

    // send the new joiner the current members of the room
    const members = getRoomMembers(io, roomId);
    socket.emit('room:members', { roomId, members });
  });

  socket.on('room:leave', ({ roomId }) => {
    socket.leave(roomId);
    socket.to(roomId).emit('room:userLeft', { roomId, userId: socket.id });

    if (socket.data.currentRoom === roomId) {
      socket.data.currentRoom = null;
    }
  });

  socket.on('room:list', () => {
    socket.emit('room:list', getAllRoomsWithMemberCount(io));
  });
}

function getRoomMembers(io, roomId) {
  const room = io.sockets.adapter.rooms.get(roomId);
  return room ? Array.from(room) : [];
}

function getAllRoomsWithMemberCount(io) {
  return getAllRooms().map((room) => ({
    ...room,
    memberCount: io.sockets.adapter.rooms.get(room.id)?.size || 0,
  }));
}
