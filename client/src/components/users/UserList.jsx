import UserAvatar from '../users/UserAvatar';

const UserList = ({ users }) => {
  if (users.length === 0) {
    return <p className='px-3 py-2 text-xs text-gray-400'>No one here yet</p>;
  }

  return (
    <ul className='flex flex-col gap-2 p-3'>
      {users.map((user) => (
        <li key={user.id} className='flex items-center gap-2'>
          <UserAvatar user={user.username} />
          <span className='text-sm text-gray-700'>{user.username}</span>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
