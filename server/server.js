import express from 'express';

const app = express();

import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendChatMsg', (data) => {
    io.to(data.room).emit('sendToAll', data);
    // console.log(data);
  });

  socket.on('joinRoom', (room) => {
    socket.join(room);
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
