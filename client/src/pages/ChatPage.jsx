import { useChat } from '../hooks/useChat';
import { useRooms } from '../hooks/useRooms';
import ChatWindow from '../components/chat/ChatWindow';
import Sidebar from '../components/layout/Sidebar';

function ChatPage() {
  const { messages, sendMessage } = useChat();
  const { rooms, activeRoomId, joinRoom } = useRooms();

  return (
    <div className='flex'>
      <Sidebar
        rooms={rooms}
        activeRoomId={activeRoomId}
        onSelectRoom={joinRoom}
      />

      {activeRoomId ? (
        <ChatWindow messages={messages} onSend={sendMessage} />
      ) : (
        <div className='flex-1 flex items-center justify-center text-gray-400'>
          Select a room to start chatting
        </div>
      )}
    </div>
  );
}

export default ChatPage;
