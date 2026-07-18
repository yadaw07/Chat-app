import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

const RoomList = ({
  rooms,
  activeRoomId,
  onSelectRoom,
  onEditRoom,
  onDeleteRoom,
}) => {
  const currentUserId = useAuthStore((state) => state.user?.id);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState('');

  const startEdit = (room) => {
    setEditingId(room.id);
    setDraft(room.name);
  };

  const saveEdit = (roomId) => {
    const trimmed = draft.trim();
    if (trimmed) onEditRoom(roomId, trimmed);
    setEditingId(null);
  };

  return (
    <ul className='flex flex-col gap-1 p-2'>
      {rooms.map((room) => {
        const isOwner = room.createdBy === currentUserId;
        const isEditing = editingId === room.id;
        return (
          <li key={room.id} className='group flex items-center gap-1'>
            {isEditing ? (
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && saveEdit(room.id)}
                onBlur={() => saveEdit(room.id)}
                autoFocus
                className='flex-1 px-2 py-1 text-sm rounded border border-indigo-300'
              />
            ) : (
              <button
                onClick={() => onSelectRoom(room.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  room.id === activeRoomId
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {room.name}
              </button>
            )}

            {isOwner && !isEditing && (
              <div className='hidden group-hover:flex gap-1'>
                <button
                  onClick={() => startEdit(room)}
                  aria-label='Edit room'
                  className='text-xs text-gray-400 hover:text-indigo-600'
                >
                  <img src='/edit.png' alt='' className='w-3 h-3' />
                </button>
                <button
                  onClick={() => onDeleteRoom(room.id)}
                  aria-label='Delete room'
                  className='text-xs text-gray-400 hover:text-red-600'
                >
                  <img src='/delete.png' alt='' className='w-3 h-3' />
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default RoomList;
