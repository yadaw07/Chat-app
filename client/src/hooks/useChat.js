import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

export function useChat() {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('message:new', handleNewMessage);

    return () => {
      socket.off('message:new', handleNewMessage);
    };
  }, [socket]);

  const sendMessage = (text) => {
    socket.emit('message:send', { text });
  };

  return { messages, sendMessage };
}
