import { roomExists, getAllRooms } from '../services/roomService.js';
import { getRecentMessages } from '../services/messageService.js';

import { isValidRoomId } from '../utils/validators.js';
import { emitError } from '../utils/socketError.js';

export async function registerRoomHandlers(io, socket) {
  const user = socket.data.user;

  socket.on('room:join', async ({ roomId }) => {
    if (!isValidRoomId(roomId)) {
      emitError(socket, 'INVALID_ROOM_ID', 'Room ID is missing or malformed');
      return;
    }

    if (!(await roomExists(roomId))) {
      emitError(socket, 'ROOM_NOT_FOUND', `Room "${roomId}" does not exist`);
      return;
    }

    socket.join(roomId);
    socket.data.currentRoom = roomId;

    socket.to(roomId).emit('room:userJoined', {
      roomId,
      user: { id: socket.data.user.id, username: socket.data.user.username },
    });

    // send the new joiner the current members of the room
    const members = getRoomMembers(io, roomId);
    socket.emit('room:members', { roomId, members });

    const messages = await getRecentMessages(roomId);
    socket.emit('message:history', { roomId, messages });
  });

  socket.on('room:leave', ({ roomId }) => {
    if (!isValidRoomId(roomId)) return;

    socket.leave(roomId);
    socket.to(roomId).emit('room:userLeft', { roomId, userId: user.id });

    if (socket.data.currentRoom === roomId) {
      socket.data.currentRoom = null;
    }
  });

  socket.on('room:list', async () => {
    const rooms = await getAllRoomsWithMemberCount(io);
    socket.emit('room:list', rooms);
  });
}

function getRoomMembers(io, roomId) {
  const room = io.sockets.adapter.rooms.get(roomId);
  if (!room) return [];

  const sockets = io.sockets.sockets;

  return Array.from(room)
    .map((socketId) => sockets.get(socketId))
    .filter(Boolean)
    .map((s) => ({ id: s.data.user.id, username: s.data.user.username }));
}

async function getAllRoomsWithMemberCount(io) {
  const rooms = await getAllRooms();

  return rooms.map((room) => ({
    ...room,
    memberCount: io.sockets.adapter.rooms.get(room.id)?.size || 0,
  }));
}
