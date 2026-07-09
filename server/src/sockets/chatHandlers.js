export function registerChatHandlers(io, socket) {
  socket.on('message:send', (payload) => {
    const message = {
      id: crypto.randomUUID(),
      text: payload.text,
      senderId: socket.id,
      timestamp: Date.now(),
    };

    io.emit('message:new', message);
  });
}