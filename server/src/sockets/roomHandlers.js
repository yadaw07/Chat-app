import {
  roomExists,
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from '../services/roomService.js';
import { getRecentMessages } from '../services/messageService.js';

import { isValidRoomId, isNonEmptyString } from '../utils/validators.js';
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

  socket.on('room:create', async ({ name }) => {
    if (!isNonEmptyString(name, 50)) {
      emitError(
        socket,
        'INVALID_ROOM_NAME',
        'Room name must be between 1 and 50 characters',
      );
      return;
    }

    try {
      const room = await createRoom(name.trim());
      io.emit('room:created', room);
    } catch (err) {
      console.error('Failed to create room:', err.message);
      emitError(
        socket,
        'CREATE_FAILED',
        'Could not create room, please try again',
      );
    }
  });

  socket.on('room:update', async ({ roomId, name }) => {
    if (!isValidRoomId(roomId) || !isNonEmptyString(name, 50)) {
      emitError(
        socket,
        'INVALID_ROOM_NAME',
        'Room name must be between 1 and 50 characters',
      );
      return;
    }

    try {
      const room = await updateRoom(roomId, socket.data.user.id, name.trim());
      io.emit('room:updated', room);
    } catch (err) {
      handleRoomError(socket, err);
    }
  });

  socket.on('room:delete', async ({ roomId }) => {
    if (!isValidRoomId(roomId)) return;

    try {
      await deleteRoom(roomId, socket.data.user.id);
      io.socketsLeave(roomId); // force everyone currently in it out
      io.emit('room:deleted', { roomId });
    } catch (err) {
      handleRoomError(socket, err);
    }
  });
}

function handleRoomError(socket, err) {
  const map = {
    ROOM_NOT_FOUND: 'That room no longer exists',
    NOT_ROOM_OWNER: 'You can only edit or delete rooms you created',
  };
  emitError(socket, err.message, map[err.message] || 'Something went wrong');
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
