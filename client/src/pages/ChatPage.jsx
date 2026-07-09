import { useState } from 'react';
import { useChat } from '../hooks/useChat';

const ChatPage = () => {
  const [input, setInput] = useState('');

  const { messages, sendMessage } = useChat();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendMessage(input);
    setInput('');
  };

  return (
    <div>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <strong>{msg.senderId.slice(0, 5)}:</strong> {msg.text}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type a message...'
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
