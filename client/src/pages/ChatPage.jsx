import { useChat } from '../hooks/useChat';
import { useRooms } from '../hooks/useRooms';
import { usePresence } from '../hooks/usePresence';
import { useTyping } from '../hooks/useTyping';

import { EMPTY_MEMBERS, useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';

import ChatWindow from '../components/chat/ChatWindow';
import Sidebar from '../components/layout/Sidebar';
import UserList from '../components/users/UserList';

import { useSocketErrors } from '../hooks/useSocketErrors';
import ErrorToast from '../components/layout/ErrorToast';
import { useSocket } from '../context/SocketContext';

const EMPTY_TYPING = [];

function ChatPage() {
  const { messages, sendMessage, editMessage, deleteMessage } = useChat();
  const { rooms, activeRoomId, joinRoom, createRoom, deleteRoom, editRoom } =
    useRooms();
  const { notifyTyping, stopTyping } = useTyping(activeRoomId);

  usePresence();

  const clearAuth = useAuthStore((state) => state.clearAuth);

  const { error, clearError } = useSocketErrors();

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
        onCreateRoom={createRoom}
        onEditRoom={editRoom}
        onDeleteRoom={deleteRoom}
      />

      {activeRoomId ? (
        <>
          <ChatWindow
            messages={messages}
            onSend={sendMessage}
            typingUserIds={typingUserIds}
            onTyping={notifyTyping}
            onStopTyping={stopTyping}
            onEdit={editMessage}
            onDelete={deleteMessage}
          />
          <aside className='w-48 border-l border-gray-200 h-screen'>
            <h2 className='px-3 pt-4 pb-2 text-xs font-semibold uppercase text-gray-400'>
              Members of this room
            </h2>
            <UserList users={members} />
          </aside>
        </>
      ) : (
        <div className='flex-1 flex items-center justify-center text-gray-400'>
          Select a room to start chatting
        </div>
      )}
      <button onClick={clearAuth}>Log out</button>

      <ErrorToast error={error} onClear={clearError} />
    </div>
  );
}

export default ChatPage;
