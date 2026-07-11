import { useChat } from '../hooks/useChat';
import { useRooms } from '../hooks/useRooms';
import { usePresence } from '../hooks/usePresence';
import { useTyping } from '../hooks/useTyping';

import { EMPTY_MEMBERS, useChatStore } from '../store/chatStore';

import ChatWindow from '../components/chat/ChatWindow';
import Sidebar from '../components/layout/Sidebar';
import UserList from '../components/users/UserList';

const EMPTY_TYPING = [];

function ChatPage() {
  const { messages, sendMessage } = useChat();
  const { rooms, activeRoomId, joinRoom } = useRooms();
  const { notifyTyping, stopTyping } = useTyping(activeRoomId);

  usePresence();

  const members = useChatStore(
    (state) => state.membersByRoom[activeRoomId] ?? EMPTY_MEMBERS,
  );

  const typingUserIds = useChatStore(
    (state) => state.typingByRoom[activeRoomId] ?? EMPTY_TYPING,
  );

  return (
    <div className='flex'>
      <Sidebar
        rooms={rooms}
        activeRoomId={activeRoomId}
        onSelectRoom={joinRoom}
      />

      {activeRoomId ? (
        <>
          <ChatWindow
            messages={messages}
            onSend={sendMessage}
            typingUserIds={typingUserIds}
            onTyping={notifyTyping}
            onStopTyping={stopTyping}
          />
          <aside className='w-48 border-l border-gray-200 h-screen'>
            <h2 className='px-3 pt-4 pb-2 text-xs font-semibold uppercase text-gray-400'>
              Members of this room
            </h2>
            <UserList userIds={members} />
          </aside>
        </>
      ) : (
        <div className='flex-1 flex items-center justify-center text-gray-400'>
          Select a room to start chatting
        </div>
      )}
    </div>
  );
}

export default ChatPage;
