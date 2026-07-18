import { Room } from '../models/Room.js';
import { Message } from '../models/Message.js';

export async function getAllRooms() {
  const rooms = await Room.find();
  return rooms.map(formatRoom);
}

export async function createRoom(name, createdBy) {
  const id = await generateUniqueSlug(name);
  const room = await Room.create({ id, name, createdBy });

  console.log('roomId', id);

  return formatRoom(room);
}

export async function roomExists(id) {
  const room = await Room.findOne({ id });
  return !!room;
}

export async function updateRoom(roomId, userId, newName) {
  const room = await Room.findOne({ id: roomId });
  if (!room) throw new Error('ROOM_NOT_FOUND');
  if (room.createdBy !== userId) throw new Error('NOT_ROOM_OWNER');

  room.name = newName;
  await room.save();
  return formatRoom(room);
}

export async function deleteRoom(roomId, userId) {
  const room = await Room.findOne({ id: roomId });
  if (!room) throw new Error('ROOM_NOT_FOUND');
  if (room.createdBy !== userId) throw new Error('NOT_ROOM_OWNER');

  await Message.deleteMany({ roomId });
  await Room.deleteOne({ id: roomId });
}

export async function seedDefaultRooms() {
  if (!(await roomExists('general'))) {
    await Room.create({ id: 'general', name: 'General', createdBy: null });
  }
}

function formatRoom(room) {
  return { id: room.id, name: room.name, createdBy: room.createdBy };
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
