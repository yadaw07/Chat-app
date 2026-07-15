import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { useChatStore, EMPTY_MESSAGES } from '../store/chatStore';

export function useChat() {
  const { socket } = useSocket();

  const activeRoomId = useChatStore((state) => state.activeRoomId);
  const setRoomHistory = useChatStore((state) => state.setRoomHistory);

  const addMessage = useChatStore((state) => state.addMessage);
  const messages = useChatStore(
    (state) => state.messagesByRoom[activeRoomId] ?? EMPTY_MESSAGES,
  );

  useEffect(() => {
    const handleNewMessage = (message) => {
      addMessage(message);
    };
    const handleHistory = ({ roomId, messages }) =>
      setRoomHistory(roomId, messages);

    socket.on('message:new', handleNewMessage);
    socket.on('message:history', handleHistory);

    return () => {
      socket.off('message:new', handleNewMessage);
      socket.off('message:history', handleHistory);
    };
  }, [socket, addMessage, setRoomHistory]);

  const sendMessage = (text) => {
    if (!text.trim() || !activeRoomId) return;
    socket.emit('message:send', { roomId: activeRoomId, text });
  };

  return { messages, sendMessage };
}
