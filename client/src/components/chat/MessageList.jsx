import { useEffect, useRef } from 'react';

import MessageBubble from './MessageBubble';
import { useAuthStore } from '../../store/authStore';

const MessageList = ({ messages, onEdit, onDelete }) => {
  const currentUserId = useAuthStore((state) => state.user?.id);
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
          isOwnMessage={message.senderId === currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
