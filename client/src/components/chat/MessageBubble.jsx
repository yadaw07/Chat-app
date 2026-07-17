import { useState } from 'react';

const MessageBubble = ({ message, isOwnMessage, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(message.text);

  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleSaveEdit = () => {
    const trimmed = draft.trim();
    if (!trimmed || trimmed === message.text) {
      setIsEditing(false);
      return;
    }
    onEdit(message.id, trimmed);
    setIsEditing(false);
  };

  if (message.isDeleted) {
    return (
      <div
        className={`max-w-[70%] px-3 py-2 rounded-xl italic text-sm ${
          isOwnMessage
            ? 'self-end bg-gray-100 text-gray-400'
            : 'self-start bg-gray-100 text-gray-400'
        }`}
      >
        This message was deleted
      </div>
    );
  }

  return (
    <div
      className={`max-w-[70%] flex flex-col px-3 py-2 rounded-xl ${
        isOwnMessage
          ? 'self-end bg-indigo-600 text-white'
          : 'self-start bg-gray-200 text-gray-900'
      }`}
    >
      {!isOwnMessage && (
        <span className='text-xs font-semibold opacity-70'>
          {message.senderName}
        </span>
      )}

      {isEditing ? (
        <div className='flex flex-col gap-1'>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
            autoFocus
            className='text-sm text-gray-900 px-2 py-1 rounded'
          />
          <div className='flex gap-2 text-[10px]'>
            <button onClick={handleSaveEdit} className='underline'>
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className='underline'>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className='text-sm'>{message.text}</p>
      )}

      <span className='text-[10px] opacity-60 self-end'>
        {message.isEdited && 'edited · '}
        {time}
      </span>

      {isOwnMessage && !isEditing && (
        <div className='hidden group-hover:flex gap-2 absolute -top-3 right-2 bg-white shadow rounded px-2 py-0.5 text-[10px] text-gray-600'>
          <button
            onClick={() => setIsEditing(true)}
            className='hover:opacity-70 transition-opacity'
            aria-label='Edit message'
          >
            <img src='/edit.png' alt='' className='w-3.5 h-3.5' />
          </button>
          <button
            onClick={() => onDelete(message.id)}
            className='hover:opacity-70 transition-opacity'
          >
            <img src='/delete.png' alt='' className='w-3.5 h-3.5' />
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
