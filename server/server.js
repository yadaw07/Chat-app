import http from 'http';
import { Server } from 'socket.io';

import { registerSocketHandlers } from './src/sockets/index.js';
import { CLIENT_URL, PORT } from './src/config/env.js';

import { socketAuthMiddleware } from './src/middleware/socketAuth.js';
import app from './src/app.js';

import { connectDB } from './src/config/db.js';
import { seedDefaultRooms } from './src/services/roomService.js';

async function startServer() {
  await connectDB();
  await seedDefaultRooms();

  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: CLIENT_URL,
      methods: ['GET', 'POST'],
    },
  });

  io.use(socketAuthMiddleware);
  registerSocketHandlers(io);

  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
