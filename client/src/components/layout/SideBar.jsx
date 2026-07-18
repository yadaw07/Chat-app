import { useState } from 'react';

import RoomList from '../rooms/RoomList';
import CreateRoomModal from '../rooms/CreateRoomModal';

function Sidebar({
  rooms,
  activeRoomId,
  onSelectRoom,
  onCreateRoom,
  onEditRoom,
  onDeleteRoom,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <aside className='w-56 border-r border-gray-200 h-screen flex flex-col'>
      <div className='flex items-center justify-between px-3 pt-4 pb-2'>
        <h2 className='text-xs font-semibold uppercase text-gray-400'>Rooms</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className='text-xs text-indigo-600 hover:underline'
        >
          + New
        </button>
      </div>

      <RoomList
        rooms={rooms}
        activeRoomId={activeRoomId}
        onSelectRoom={onSelectRoom}
        onEditRoom={onEditRoom}
        onDeleteRoom={onDeleteRoom}
      />

      <CreateRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={onCreateRoom}
      />
    </aside>
  );
}

export default Sidebar;
