import { useEffect, useRef } from 'react';

import MessageBubble from './MessageBubble';
import { useSocket } from '../../context/SocketContext';

const MessageList = ({ messages }) => {
  const { socket } = useSocket();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='flex-1 overflow-y-auto p-4 flex flex-col gap-2'>
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isOwnMessage={message.senderId === socket.id}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
