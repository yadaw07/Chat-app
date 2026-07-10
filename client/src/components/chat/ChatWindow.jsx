import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWindow = ({ messages, onSend }) => {
  return (
    <div className='flex flex-col h-screen max-w-xl mx-auto'>
      <MessageList messages={messages} />
      <MessageInput onSend={onSend} />
    </div>
  );
};

export default ChatWindow;
