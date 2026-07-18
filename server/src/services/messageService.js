import { Message } from '../models/Message.js';

const PAGE_SIZE = 50;

export async function saveMessage({ roomId, text, senderId, senderName }) {
  const message = await Message.create({ roomId, text, senderId, senderName });
  return formatMessage(message);
}

export async function getRecentMessages(roomId) {
  const messages = await Message.find({ roomId })
    .sort({ createdAt: -1 })
    .limit(PAGE_SIZE);

  return messages.reverse().map(formatMessage);
}

export async function editMessage(messageId, userId, newText) {
  const message = await Message.findById(messageId).catch(() => null);

  if (!message) throw new Error('MESSAGE_NOT_FOUND');
  if (message.senderId !== userId) throw new Error('NOT_YOUR_MESSAGE');
  if (message.isDeleted) throw new Error('MESSAGE_DELETED');

  message.text = newText;
  message.isEdited = true;
  await message.save();

  return formatMessage(message);
}

export async function deleteMessage(messageId, userId) {
  const message = await Message.findById(messageId).catch(() => null);
  if (!message) throw new Error('MESSAGE_NOT_FOUND');
  if (message.senderId !== userId) throw new Error('NOT_YOUR_MESSAGE');

  message.isDeleted = true;
  // message.text = '';
  await message.save();

  return formatMessage(message);
}

function formatMessage(message) {
  return {
    id: message._id.toString(),
    roomId: message.roomId,
    text: message.isDeleted ? '': message.text,
    senderId: message.senderId,
    senderName: message.senderName,
    isEdited: message.isEdited,
    isDeleted: message.isDeleted,
    timestamp: message.createdAt.getTime(),
  };
}
