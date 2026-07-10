const MessageBubble = ({ message, isOwnMessage }) => {
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

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
          {message.senderId.slice(0, 5)}
        </span>
      )}
      <p className='text-sm'>{message.text}</p>
      <span className='text-[10px] opacity-60 self-end'>{time}</span>
    </div>
  );
};

export default MessageBubble;
