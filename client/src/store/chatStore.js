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

  updateMessage: (updatedMessage) =>
    set((state) => {
      const roomMessages = state.messagesByRoom[updatedMessage.roomId];
      if (!roomMessages) return state;

      return {
        messagesByRoom: {
          ...state.messagesByRoom,
          [updatedMessage.roomId]: roomMessages.map((msg) =>
            msg.id === updatedMessage.id ? updatedMessage : msg,
          ),
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

  addRoom: (room) =>
    set((state) => {
      if (state.rooms.some((r) => r.id === room.id)) return state;
      return { rooms: [...state.rooms, room] };
    }),

  updateRoom: (room) =>
    set((state) => ({
      rooms: state.rooms.map((r) => (r.id === room.id ? room : r)),
    })),

  removeRoom: (roomId) =>
    set((state) => {
      const { [roomId]: _, ...restMessages } = state.messagesByRoom;
      const { [roomId]: __, ...restMembers } = state.membersByRoom;
      return {
        rooms: state.rooms.filter((r) => r.id !== roomId),
        messagesByRoom: restMessages,
        membersByRoom: restMembers,
        activeRoomId: state.activeRoomId === roomId ? null : state.activeRoomId,
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

  addRoomMember: (roomId, user) =>
    set((state) => {
      const existing = state.membersByRoom[roomId] || [];
      if (existing.some((m) => m.id === user.id)) return state;

      return {
        membersByRoom: {
          ...state.membersByRoom,
          [roomId]: [...existing, user],
        },
      };
    }),

  removeRoomMember: (roomId, userId) =>
    set((state) => ({
      membersByRoom: {
        ...state.membersByRoom,
        [roomId]: (state.membersByRoom[roomId] || []).filter(
          (m) => m.id !== userId,
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
