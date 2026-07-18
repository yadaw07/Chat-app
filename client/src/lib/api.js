const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function login(username, password) {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || 'Login failed');
  }
  return res.json();
}

export async function register(username, password) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const { error } = await res.json();
    console.log('server error:', error);
    throw new Error(error || 'Registration failed');
  }

  return res.json();
}
