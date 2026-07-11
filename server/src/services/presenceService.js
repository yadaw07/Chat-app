const onlineUsers = new Map(); // socketId -> { id, joinedAt }

export function addUser(socketId) {
  onlineUsers.set(socketId, { id: socketId, joinedAt: Date.now() });
  return onlineUsers.get(socketId);
}

export function removeUser(socketId) {
  onlineUsers.delete(socketId);
}

export function getOnlineUsers() {
  return Array.from(onlineUsers.values());
}
