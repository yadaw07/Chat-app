import { useEffect } from 'react';

import { useSocket } from '../context/SocketContext';
import { useChatStore } from '../store/chatStore';

export function useRooms() {
  const { socket } = useSocket();

  const rooms = useChatStore((state) => state.rooms);
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

    const handleMembers = ({ roomId, members }) =>
      setRoomMembers(roomId, members);
    const handleUserJoined = ({ roomId, user }) => addRoomMember(roomId, user);
    const handleUserLeft = ({ roomId, userId }) =>
      removeRoomMember(roomId, userId);

    socket.on('room:list', handleRoomList);
    socket.on('room:members', handleMembers);
    socket.on('room:userJoined', handleUserJoined);
    socket.on('room:userLeft', handleUserLeft);

    socket.on('connect', requestRooms);

    if (socket.connected) {
      requestRooms();
    }

    return () => {
      socket.off('room:list', handleRoomList);
      socket.off('room:members', handleMembers);
      socket.off('room:userJoined', handleUserJoined);
      socket.off('room:userLeft', handleUserLeft);
      socket.off('connect', requestRooms);
    };
  }, [socket, setRooms, setRoomMembers, addRoomMember, removeRoomMember]);

  const joinRoom = (roomId) => {
    if (activeRoomId) {
      socket.emit('room:leave', { roomId: activeRoomId });
    }

    socket.emit('room:join', { roomId });
    setActiveRoom(roomId);
  };

  return { rooms, activeRoomId, joinRoom };
}
