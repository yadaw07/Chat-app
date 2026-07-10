import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { useChatStore, EMPTY_MESSAGES } from '../store/chatStore';

export function useChat() {
  const { socket } = useSocket();

  const addMessage = useChatStore((state) => state.addMessage);
  const activeRoomId = useChatStore((state) => state.activeRoomId);
  const messages = useChatStore(
    (state) => state.messagesByRoom[activeRoomId] ?? EMPTY_MESSAGES,
  );

  useEffect(() => {
    const handleNewMessage = (message) => {
      addMessage(message);
    };

    socket.on('message:new', handleNewMessage);

    return () => {
      socket.off('message:new', handleNewMessage);
    };
  }, [socket, addMessage]);

  const sendMessage = (text) => {
    if (!text.trim() || !activeRoomId) return;
    socket.emit('message:send', { roomId: activeRoomId, text });
  };

  return { messages, sendMessage };
}
