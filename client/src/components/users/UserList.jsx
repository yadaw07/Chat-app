import UserAvatar from '../users/UserAvatar';

const UserList = ({ usersId }) => {
  if (usersId.length === 0) {
    return <p className='px-3 py-2 text-xs text-gray-400'>No one here yet</p>;
  }

  return (
    <ul className='flex flex-col gap-2 p-3'>
      {usersId.map((userId) => (
        <li key={userId} className='flex items-center gap-2'>
          <UserAvatar userId={userId} />
          <span className='text-sm text-gray-700'>{userId.slice(0, 8)}</span>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
