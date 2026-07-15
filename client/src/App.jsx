import { SocketProvider, useSocket } from './context/SocketContext';
import { useAuthStore } from './store/authStore';

import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';

export default function App() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <LoginPage />;
  }
  return (
    <SocketProvider>
      <ChatPage />
    </SocketProvider>
  );
}
