import { useState, useEffect, use } from 'react';

import { useSocket } from '../context/SocketContext';

export const useSocketErrors = () => {
  const { socket } = useSocket();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleError = ({ code, message }) => {
      setError({ code, message, id: Date.now() });
    };

    socket.on('error', handleError);
    return () => socket.off('error', handleError);
  }, [socket]);

  const clearError = () => setError(null);

  return { error, clearError };
};