const RoomList = ({ rooms, activeRoomId, onSelectRoom }) => {
  return (
    <ul className='flex flex-col gap-1 p-2'>
      {rooms.map((room) => (
        <li key={room.id}>
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
        </li>
      ))}
    </ul>
  );
};

export default RoomList;
