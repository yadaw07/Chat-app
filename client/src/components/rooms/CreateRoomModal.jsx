import { useState } from 'react';

const CreateRoomModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;

    onCreate(trimmed);

    setName('');
    onClose();
  };

  return (
    <div className='fixed inset-0 bg-black/30 flex items-center justify-center z-50'>
      <form
        onSubmit={handleSubmit}
        className='bg-white rounded-xl shadow-lg p-6 w-80 flex flex-col gap-4'
      >
        <h2 className='text-sm font-semibold text-gray-900'>Create a room</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Room name'
          autoFocus
          maxLength={50}
          className='px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />

        <div className='flex justify-end gap-2 text-sm'>
          <button
            type='button'
            onClick={onClose}
            className='px-3 py-1.5 text-gray-600 hover:text-gray-900'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={!name.trim()}
            className='px-3 py-1.5 bg-indigo-600 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors'
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRoomModal;
