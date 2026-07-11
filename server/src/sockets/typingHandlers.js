export function registerTypingHandlers(io, socket) {
  socket.on('typing:start', ({ roomId }) => {
    socket.to(roomId).emit('typing:update', {
      roomId,
      userId: socket.id,
      isTyping: true,
    });
  });

  socket.on('typing:stop', ({ roomId }) => {
    socket.to(roomId).emit('typing:update', {
      roomId,
      userId: socket.id,
      isTyping: false,
    });
  });
}
