const UserAvatar = ({ userId, size = 'sm' }) => {
  const dimensions = size === 'sm' ? 'w-6 h-6 text-[10px]' : 'w-8 h-8 text-xs';

  return (
    <div
      className={`${dimensions} rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold relative`}
      title={userId}
    >
      {userId.slice(0, 2)}
      <span className='absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full ring-2 ring-white' />
    </div>
  );
};

export default UserAvatar;
