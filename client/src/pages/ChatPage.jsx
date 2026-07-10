import { useChat } from '../hooks/useChat';
import ChatWindow from '../components/chat/ChatWindow';

function ChatPage() {
  const { messages, sendMessage } = useChat();

  return (
    <div className='chat-page'>
      <ChatWindow messages={messages} onSend={sendMessage} />
    </div>
  );
}

export default ChatPage;
