import RoomList from '../rooms/RoomList';

const SideBar = ({ rooms, activeRoomId, onSelectRoom }) => {
  return (
    <aside className='w-56 border-r border-gray-200 h-screen'>
      <h2 className='px-3 pt-4 pb-2 text-xs font-semibold uppercase text-gray-400'>
        Rooms
      </h2>

      <RoomList
        rooms={rooms}
        activeRoomId={activeRoomId}
        onSelectRoom={onSelectRoom}
      />
    </aside>
  );
};

export default SideBar;
