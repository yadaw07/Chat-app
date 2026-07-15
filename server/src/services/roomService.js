import { Room } from '../models/Room.js';

export async function getAllRooms() {
  const rooms = await Room.find();
  return rooms.map((room) => ({ id: room.id, name: room.name }));
}

export async function createRoom(id, name) {
  const existing = await Room.findOne({ id });

  if (existing) {
    return { id: existing.id, name: existing.name };
  }

  const room = await Room.create({ id, name });

  return { id: room.id, name: room.name };
}

export async function roomExists(id) {
  const room = await Room.findOne({ id });
  return !!room;
}

// Seed a couple of default rooms so there's something to join immediately
export async function seedDefaultRooms() {
  await createRoom('general', 'General');
  await createRoom('random', 'Random');
}
