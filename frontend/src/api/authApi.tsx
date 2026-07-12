import type { AuthRequest, AuthResponse } from '../types/Auth';
import { apiClient } from './axiosInstance';

const API_BASE_URL = '/api/auth';

export const authApi = {
  login: async (credentials: AuthRequest): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(`${API_BASE_URL}/login`, credentials);
    return response.data;
  },

  register: async (credentials: AuthRequest): Promise<void> => {
    await apiClient.post(`${API_BASE_URL}/register`, credentials);
  },
};
