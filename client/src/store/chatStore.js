import { create } from 'zustand';

const EMPTY_MESSAGES = [];
const EMPTY_MEMBERS = [];

export const useChatStore = create((set) => ({
  rooms: [],
  activeRoomId: null,
  messagesByRoom: {}, // { [roomId]: Message[] }
  onlineUsers: [],
  membersByRoom: {},
  typingByRoom: {}, // { [roomId]: Set-like array of userIds currently typing }

  setRooms: (rooms) => set({ rooms }),
  setActiveRoom: (roomId) => set({ activeRoomId: roomId }),

  setOnlineUsers: (users) => set({ onlineUsers: users }),

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

  updatePresence: ({ userId, status }) =>
    set((state) => {
      if (status === 'online') {
        if (state.onlineUsers.some((u) => u.id === userId)) return state;
        return { onlineUsers: [...state.onlineUsers, { id: userId }] };
      }
      return {
        onlineUsers: state.onlineUsers.filter((u) => u.id !== userId),
      };
    }),

  setRoomMembers: (roomId, members) =>
    set((state) => ({
      membersByRoom: { ...state.membersByRoom, [roomId]: members },
    })),

  setRoomHistory: (roomId, messages) =>
    set((state) => ({
      messagesByRoom: { ...state.messagesByRoom, [roomId]: messages },
    })),

  addRoomMember: (roomId, userId) =>
    set((state) => {
      const existing = state.membersByRoom[roomId] || [];
      if (existing.includes(userId)) return state;
      return {
        membersByRoom: {
          ...state.membersByRoom,
          [roomId]: [...existing, userId],
        },
      };
    }),

  removeRoomMember: (roomId, userId) =>
    set((state) => ({
      membersByRoom: {
        ...state.membersByRoom,
        [roomId]: (state.membersByRoom[roomId] || []).filter(
          (id) => id !== userId,
        ),
      },
    })),

  setTyping: (roomId, userId, isTyping) =>
    set((state) => {
      const current = state.typingByRoom[roomId] || [];
      const next = isTyping
        ? current.includes(userId)
          ? current
          : [...current, userId]
        : current.filter((id) => id !== userId);

      return {
        typingByRoom: { ...state.typingByRoom, [roomId]: next },
      };
    }),
}));

export { EMPTY_MESSAGES, EMPTY_MEMBERS };
