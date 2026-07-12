import React, { useContext, useId, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

type Mode = 'login' | 'register';

export function LoginForm() {
  const context = useContext(AuthContext);
  const [mode, setMode] = useState<Mode>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const uid = useId();

  if (!context) return null;
  const { login, register, loading, error } = context;

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode);
    setPassword('');
    setSuccessMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    try {
      if (mode === 'login') {
        await login(username, password);
      } else {
        await register(username, password);
        setMode('login');
        setPassword('');
        setSuccessMessage('Account created. Please log in.');
      }
    } catch {
      // error is surfaced via context.error; nothing else to do here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Task Tracker</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${uid}-username`} className="text-sm font-bold text-gray-700">Username</label>
            <input
              id={`${uid}-username`}
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2.5 text-sm border border-gray-300 rounded bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${uid}-password`} className="text-sm font-bold text-gray-700">Password</label>
            <input
              id={`${uid}-password`}
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2.5 text-sm border border-gray-300 rounded bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 p-2.5 text-sm font-bold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? (mode === 'login' ? 'Logging in...' : 'Registering...')
              : (mode === 'login' ? 'Log In' : 'Register')}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          {mode === 'login' ? (
            <>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('register')}
                className="text-blue-600 font-bold hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => switchMode('login')}
                className="text-blue-600 font-bold hover:underline"
              >
                Log In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
