import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { authApi } from '../api/authApi';
import { setUnauthorizedHandler, TOKEN_STORAGE_KEY } from '../api/axiosInstance';
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUnauthorizedHandler(() => setToken(null));
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authApi.login({ username, password });
      if (!response?.token) {
        // Backend currently returns 200 with an empty body on bad credentials
        // instead of a 401, so a missing token also means "login failed".
        throw new Error('Invalid username or password.');
      }
      localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
      setToken(response.token);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.status === 401 ? 'Invalid username or password.' : err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while logging in.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      await authApi.register({ username, password });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.status === 409 ? 'Username already taken.' : err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while registering.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
