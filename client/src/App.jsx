import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';

// connect to backend
const socket = io('http://localhost:5000');

export default function App() {
  const [msg, setMsg] = useState('');
  const [users, setUsers] = useState([]);
  const [room, setRoom] = useState('');
  const [userName, setUserName] = useState('');
  const [serverMsg, setServerMsg] = useState([]);

  useEffect(() => {
    const name = prompt('enter your username');
    setUserName(name);
    setUsers((prevUsers) => [...prevUsers, name]);
  }, [socket]);

  const sendMessage = () => {
    socket.emit('sendChatMsg', {
      text: msg,
      room: room,
      username: userName,
      users: users,
    });

    setMsg('');
  };

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('joinRoom', room);
    }
  };

  useEffect(() => {
    socket.on('sendToAll', (data) => {
      setServerMsg((prev) => [...prev, data]); // append new message
    });

    return () => socket.off('sendToAll');
  }, [socket]);

  return (
    <div className='app'>
      <div className='chat-box'>
        <h2>Online user {userName}</h2>

        <ul>
          {serverMsg.map((msg, i) => (
            <li key={i}>
              <strong>{msg.username}: </strong>
              {msg.text}
            </li>
          ))}
        </ul>
      </div>
      <label>Message</label>
      <input type='text' onChange={(e) => setMsg(e.target.value)} value={msg} />
      <button onClick={sendMessage}>Send</button>

      <label>Room</label>
      <input
        type='text'
        onChange={(e) => setRoom(e.target.value)}
        value={room}
      />
      <button onClick={joinRoom}>Join</button>
    </div>
  );
}
