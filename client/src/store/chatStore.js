import { create } from 'zustand';

const EMPTY_MESSAGES = [];

export const useChatStore = create((set) => ({
  rooms: [],
  activeRoomId: null,
  messagesByRoom: {}, // { [roomId]: Message[] }

  setRooms: (rooms) => set({ rooms }),

  setActiveRoom: (roomId) => set({ activeRoomId: roomId }),

  addMessage: (message) =>
    set((state) => {
      const existing = state.messagesByRoom[message.roomId] || [];
      return {
        messagesByRoom: {
          ...state.messagesByRoom,
          [message.roomId]: [...existing, message],
        },
      };
    }),

  addRoomEvent: () => {
    // placeholder for room join/leave system messages, if we want them later
  },
}));

export { EMPTY_MESSAGES };
