import MessageList from './MessageList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

function ChatWindow({
  messages,
  onSend,
  typingUserIds,
  onTyping,
  onStopTyping,
}) {
  return (
    <div className='flex flex-col h-screen flex-1'>
      <MessageList messages={messages} />
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
