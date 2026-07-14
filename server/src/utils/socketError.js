export function emitError(socket, code, message) {
  socket.emit('error', { code, message });
}
