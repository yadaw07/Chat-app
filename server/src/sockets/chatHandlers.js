export function registerChatHandlers(io, socket) {
  socket.on('message:send', ({ roomId, text }) => {
    if (!roomId || !socket.rooms.has(roomId)) {
      socket.emit('error', {
        message: `You must join a room before sending messages`,
      });
      return;
    }

    const message = {
      id: crypto.randomUUID(),
      text,
      roomId,
      senderId: socket.id,
      timestamps: Date.now(),
    };

    io.to(roomId).emit('message:new', message);
  });
}
