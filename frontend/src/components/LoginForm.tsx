import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export function LoginForm() {
  const context = useContext(AuthContext);
  if (!context) return null;
  const { login, register } = context;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">Task Tracker</h1>
        <p className="text-sm text-gray-600 text-center">
          Sign in with your account to view and manage tasks.
        </p>

        <button
          onClick={login}
          className="p-2.5 text-sm font-bold text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Log In
        </button>

        <button
          onClick={register}
          className="p-2.5 text-sm font-bold text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
        >
          Create an Account
        </button>
      </div>
    </div>
  );
}
