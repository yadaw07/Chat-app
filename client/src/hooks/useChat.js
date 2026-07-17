import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { useChatStore, EMPTY_MESSAGES } from '../store/chatStore';

export function useChat() {
  const { socket } = useSocket();

  const activeRoomId = useChatStore((state) => state.activeRoomId);
  const setRoomHistory = useChatStore((state) => state.setRoomHistory);

  const addMessage = useChatStore((state) => state.addMessage);
  const updateMessage = useChatStore((state) => state.updateMessage);
  const messages = useChatStore(
    (state) => state.messagesByRoom[activeRoomId] ?? EMPTY_MESSAGES,
  );

  useEffect(() => {
    const handleNewMessage = (message) => {
      addMessage(message);
    };
    const handleHistory = ({ roomId, messages }) =>
      setRoomHistory(roomId, messages);
    const handleUpdated = (message) => updateMessage(message);

    socket.on('message:new', handleNewMessage);
    socket.on('message:history', handleHistory);
    socket.on('message:updated', handleUpdated);

    return () => {
      socket.off('message:new', handleNewMessage);
      socket.off('message:history', handleHistory);
      socket.off('message:updated', handleUpdated);
    };
  }, [socket, addMessage, setRoomHistory, updateMessage]);

  const sendMessage = (text) => {
    if (!text.trim() || !activeRoomId) return;
    socket.emit('message:send', { roomId: activeRoomId, text });
  };

  const editMessage = (messageId, text) => {
    if (!text.trim()) return;
    socket.emit('message:edit', { messageId, text });
  };

  const deleteMessage = (messageId) => {
    socket.emit('message:delete', { messageId });
  };

  return { messages, sendMessage, editMessage, deleteMessage };
}
