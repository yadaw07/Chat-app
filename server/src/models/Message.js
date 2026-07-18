import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, index: true },
    text: { type: String, required: true, maxlength: 1000 },
    senderId: { type: String, required: true },
    senderName: { type: String, required: true },
    isEdited: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Message = mongoose.model('Message', messageSchema);
