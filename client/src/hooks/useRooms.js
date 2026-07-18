import { useEffect } from 'react';

import { useSocket } from '../context/SocketContext';
import { useChatStore } from '../store/chatStore';

export function useRooms() {
  const { socket } = useSocket();

  const updateRoom = useChatStore((state) => state.updateRoom);
  const removeRoom = useChatStore((state) => state.removeRoom);
  const rooms = useChatStore((state) => state.rooms);
  const addRoom = useChatStore((state) => state.addRoom);

  const activeRoomId = useChatStore((state) => state.activeRoomId);
  const setRooms = useChatStore((state) => state.setRooms);
  const setActiveRoom = useChatStore((state) => state.setActiveRoom);

  const setRoomMembers = useChatStore((state) => state.setRoomMembers);
  const addRoomMember = useChatStore((state) => state.addRoomMember);
  const removeRoomMember = useChatStore((state) => state.removeRoomMember);

  useEffect(() => {
    const handleRoomList = (rooms) => {
      setRooms(rooms);
    };

    const requestRooms = () => {
      socket.emit('room:list');
    };

    const handleRoomUpdated = (room) => updateRoom(room);
    const handleRoomDeleted = ({ roomId }) => removeRoom(roomId);
    const handleRoomCreated = (room) => addRoom(room);
    const handleMembers = ({ roomId, members }) =>
      setRoomMembers(roomId, members);
    const handleUserJoined = ({ roomId, user }) => addRoomMember(roomId, user);
    const handleUserLeft = ({ roomId, userId }) =>
      removeRoomMember(roomId, userId);

    socket.on('room:created', handleRoomCreated);
    socket.on('room:list', handleRoomList);
    socket.on('room:members', handleMembers);
    socket.on('room:userJoined', handleUserJoined);
    socket.on('room:userLeft', handleUserLeft);
    socket.on('room:updated', handleRoomUpdated);
    socket.on('room:deleted', handleRoomDeleted);

    socket.on('connect', requestRooms);

    if (socket.connected) requestRooms();

    return () => {
      socket.off('room:list', handleRoomList);
      socket.off('room:created', handleRoomCreated);
      socket.off('room:members', handleMembers);
      socket.off('room:userJoined', handleUserJoined);
      socket.off('room:userLeft', handleUserLeft);
      socket.off('room:updated', handleRoomUpdated);
      socket.off('room:deleted', handleRoomDeleted);
      socket.off('connect', requestRooms);
    };
  }, [
    socket,
    setRooms,
    addRoom,
    setRoomMembers,
    addRoomMember,
    removeRoomMember,
    addRoomMember,
    removeRoomMember,
  ]);

  const joinRoom = (roomId) => {
    if (activeRoomId) {
      socket.emit('room:leave', { roomId: activeRoomId });
    }

    socket.emit('room:join', { roomId });
    setActiveRoom(roomId);
  };

  const createRoom = (name) => {
    socket.emit('room:create', { name });
  };

  const editRoom = (roomId, name) => {
    socket.emit('room:update', { roomId, name });
  };

  const deleteRoomAction = (roomId) => {
    socket.emit('room:delete', { roomId });
  };

  return {
    rooms,
    activeRoomId,
    joinRoom,
    createRoom,
    editRoom,
    deleteRoom: deleteRoomAction,
  };
}
