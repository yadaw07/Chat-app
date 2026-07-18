import { useState } from 'react';

import RoomList from '../rooms/RoomList';
import CreateRoomModal from '../rooms/CreateRoomModal';

function SideBar({
  rooms,
  activeRoomId,
  onSelectRoom,
  onCreateRoom,
  onEditRoom,
  onDeleteRoom,
  onLogout,
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
      <div className='flex-1 overflow-y-auto'>
        <RoomList
          rooms={rooms}
          activeRoomId={activeRoomId}
          onSelectRoom={onSelectRoom}
          onEditRoom={onEditRoom}
          onDeleteRoom={onDeleteRoom}
        />
      </div>
      <button
        onClick={onLogout}
        className='m-3 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-colors'
      >
        Log out
      </button>
      <CreateRoomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={onCreateRoom}
      />
    </aside>
  );
}

export default SideBar;
