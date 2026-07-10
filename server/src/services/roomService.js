const rooms = new Map();

export function getAllRooms() {
  return Array.from(rooms.values());
}

export function createRoom(id, name) {
  if (!rooms.has(id)) {
    rooms.set(id, { id, name });
  }

  return rooms.get(id);
}

export function roomExists(id) {
  return rooms.has(id);
}

// Seed a couple of default rooms so there's something to join immediately
createRoom('general', 'General');
createRoom('random', 'Random');
