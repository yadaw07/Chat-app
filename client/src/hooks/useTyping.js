import { useEffect, useRef } from 'react';

import { useSocket } from '../context/SocketContext';
import { useChatStore } from '../store/chatStore';

const TYPING_TIMEOUT = 2000;

export function useTyping(roomId) {
  const { socket } = useSocket();

  const setTyping = useChatStore((state) => state.setTyping);
  const stopTimeoutRef = useRef(null);

  useEffect(() => {
    const handleTypingUpdate = ({ roomId: eventRoomId, userId, isTyping }) => {
      setTyping(eventRoomId, userId, isTyping);
    };

    socket.on('typing:update', handleTypingUpdate);
    return () => socket.off('typing:update', handleTypingUpdate);
  }, [socket, setTyping]);

  const notifyTyping = () => {
    if (!roomId) return;

    socket.emit('typing:start', { roomId });

    if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
    // typing:stop only fires once the user pauses for 2 seconds
    stopTimeoutRef.current = setTimeout(() => {
      socket.emit('typing:stop', { roomId });
    }, TYPING_TIMEOUT);
  };

  // stop typing immediately (e.g. on message send)
  const stopTyping = () => {
    if (!roomId) return;
    if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
    socket.emit('typing:stop', { roomId });
  };

  return { notifyTyping, stopTyping };
}
