import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    createdBy: { type: String, default: null },
  },
  { timestamps: true },
);

export const Room = mongoose.model('Room', roomSchema);
