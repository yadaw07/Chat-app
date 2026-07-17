import MessageList from './MessageList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

function ChatWindow({
  messages,
  onSend,
  typingUserIds,
  onTyping,
  onStopTyping,
  onEdit = { onEdit },
  onDelete = { onDelete },
}) {
  return (
    <div className='flex flex-col h-screen flex-1'>
      <MessageList messages={messages} onEdit={onEdit} onDelete={onDelete} />
      <TypingIndicator typingUserIds={typingUserIds} />
      <MessageInput
        onSend={onSend}
        onTyping={onTyping}
        onStopTyping={onStopTyping}
      />
    </div>
  );
}

export default ChatWindow;
