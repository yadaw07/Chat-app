import { Room } from '../models/Room.js';

export async function getAllRooms() {
  const rooms = await Room.find();
  return rooms.map((room) => ({ id: room.id, name: room.name }));
}

export async function createRoom(name) {
  const id = await generateUniqueSlug(name);
  const room = await Room.create({ id, name });

  return { id: room.id, name: room.name };
}

export async function roomExists(id) {
  const room = await Room.findOne({ id });
  return !!room;
}

export async function seedDefaultRooms() {
  if (!(await roomExists('general'))) {
    await Room.create({ id: 'general', name: 'General' });
  }
  if (!(await roomExists('random'))) {
    await Room.create({ id: 'random', name: 'Random' });
  }
}

async function generateUniqueSlug(name) {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40);

  let slug = base || 'room';
  let suffix = 1;

  while (await roomExists(slug)) {
    slug = `${base}-${suffix}`;
    suffix++;
  }

  return slug;
}
