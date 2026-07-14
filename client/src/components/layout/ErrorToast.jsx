import { useEffect } from 'react';

const ErrorToast = ({ error, onClear }) => {
  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(onClear, 4000);
    return () => clearTimeout(timer);
  }, [error, onClear]);

  if (!error) return null;

  return (
    <div className='fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-lg text-sm max-w-xs'>
      {error.message}
    </div>
  );
};

export default ErrorToast;
