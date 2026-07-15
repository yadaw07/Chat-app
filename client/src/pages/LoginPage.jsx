import { useState } from 'react';

import { login, register } from '../lib/api';
import { useAuthStore } from '../store/authStore';

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const action = isRegistering ? register : login;
      const { user, token } = await action(username, password);
      setAuth(user, token);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-50'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-xl shadow-sm w-80 flex flex-col gap-4'
      >
        <h1 className='text-lg font-semibold text-gray-900'>
          {isRegistering ? 'Create an account' : 'Log in'}
        </h1>

        <input
          value={username}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          autoComplete='username'
          className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />

        <input
          value={password}
          placeholder='Password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isRegistering ? 'new-password' : 'current-password'}
          className='px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />

        {error && <p className='text-sm text-red-600'>{error}</p>}

        <button
          type='submit'
          disabled={isSubmitting || !username.trim() || !password.trim()}
          className='px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors'
        >
          {isSubmitting
            ? 'Please wait...'
            : isRegistering
              ? 'Register'
              : 'Log in'}
        </button>
        <button
          type='button'
          onClick={() => setIsRegistering((prev) => !prev)}
          className='text-sm text-indigo-600 hover:underline'
        >
          {isRegistering
            ? 'Already have an account? Log in'
            : "Don't have an account? Register"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
