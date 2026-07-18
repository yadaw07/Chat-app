import { useEffect } from 'react';

import { useSocket } from '../context/SocketContext';
import { useChatStore } from '../store/chatStore';

export const usePresence = () => {
  const { socket } = useSocket();
  const onlineUsers = useChatStore((state) => state.onlineUsers);
  const setOnlineUsers = useChatStore((state) => state.setOnlineUsers);
  const updatePresence = useChatStore((state) => state.updatePresence);

  useEffect(() => {
    const handlePresenceList = (users) => setOnlineUsers(users);
    const handlePresenceUpdate = (payload) => updatePresence(payload);

    socket.on('presence:list', handlePresenceList);
    socket.on('presence:update', handlePresenceUpdate);

    return () => {
      socket.off('presence:list', handlePresenceList);
      socket.off('presence:update', handlePresenceUpdate);
    };
  }, [socket, setOnlineUsers, updatePresence]);

  return { onlineUsers };
};
