const onlineUsers = new Map(); // socketId -> { id, username, joinedAt }

export function addUser(userId, username) {
  onlineUsers.set(userId, { id: userId, username, joinedAt: Date.now() });
  return onlineUsers.get(userId);
}

export function removeUser(userId) {
  onlineUsers.delete(userId);
}

export function getOnlineUsers() {
  return Array.from(onlineUsers.values());
}
