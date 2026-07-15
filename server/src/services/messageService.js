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

function formatMessage(message) {
  return {
    id: message._id.toString(),
    roomId: message.roomId,
    text: message.text,
    senderId: message.senderId,
    senderName: message.senderName,
    timestamp: message.createdAt.getTime(),
  };
}
