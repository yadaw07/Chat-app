import { SocketProvider } from './context/SocketContext';
import ChatPage from './pages/ChatPage';

export default function App() {
  return (
    <SocketProvider>
      <ChatPage />
    </SocketProvider>
  );
}
