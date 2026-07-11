import React from 'react';

const TypingIndicator = ({ typingUserIds }) => {
  if (typingUserIds.length === 0) return null;

  const label =
    typingUserIds.length === 1
      ? `${typingUserIds[0].slice(0, 5)} is typing...`
      : `${typingUserIds.length} people are typing...`;

  return (
    <div className='px-4 py-1 text-xs text-gray-600 italic h-8'>{label}</div>
  );
};

export default TypingIndicator;
