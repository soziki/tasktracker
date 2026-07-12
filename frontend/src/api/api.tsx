import type { Task } from '../types/Task';
import { apiClient } from './axiosInstance';

const API_BASE_URL = "/api/tasks";

export const taskApi = {

  getAllTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>(`${API_BASE_URL}/`);
    return response.data;
  },


  getTaskById: async (id: number): Promise<Task> => {
    const response = await apiClient.get<Task>(`${API_BASE_URL}/${id}`);
    return response.data;
  },


  createTask: async (task: Task): Promise<Task> => {
    const response = await apiClient.post<Task>(`${API_BASE_URL}/`, task);
    return response.data;
  },


  updateTask: async (id: number, task: Task): Promise<Task> => {
    const response = await apiClient.put<Task>(`${API_BASE_URL}/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: number): Promise<Task> => {
    const response = await apiClient.delete<Task>(`${API_BASE_URL}/${id}`);
    return response.data;
  }
};
