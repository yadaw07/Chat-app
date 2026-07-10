import { useEffect } from 'react';

import { useSocket } from '../context/SocketContext';
import { useChatStore } from '../store/chatStore';

export function useRooms() {
  const { socket } = useSocket();
  const rooms = useChatStore((state) => state.rooms);
  const activeRoomId = useChatStore((state) => state.activeRoomId);
  const setRooms = useChatStore((state) => state.setRooms);
  const setActiveRoom = useChatStore((state) => state.setActiveRoom);

  useEffect(() => {
    const handleRoomList = (rooms) => {
      console.log('received rooms from server:', rooms);
      setRooms(rooms);
    };

    const requestRooms = () => {
      socket.emit('room:list');
    };

    socket.on('room:list', handleRoomList);
    console.log('requesting room list, socket connected?', socket.connected);

    socket.on('connect', requestRooms);

    if (socket.connected) {
      requestRooms();
    }

    return () => {
      socket.off('room:list', handleRoomList);
      socket.off('connect', requestRooms);
    };
  }, [socket, setRooms]);

  const joinRoom = (roomId) => {
    if (activeRoomId) {
      socket.emit('room:leave', { roomId: activeRoomId });
    }

    socket.emit('room:join', { roomId });
    setActiveRoom(roomId);
  };

  return { rooms, activeRoomId, joinRoom };
}
