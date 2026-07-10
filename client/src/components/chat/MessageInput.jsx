import { useState } from 'react';

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setText('');
  };

  return (
    <form
      className='flex gap-2 p-4 border-t border-gray-200'
      onSubmit={handleSubmit}
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Type a message...'
        autoComplete='off'
        className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
      />
      <button
        type='submit'
        disabled={!text.trim()}
        className='px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors'
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
