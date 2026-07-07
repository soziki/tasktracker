import axios from 'axios';
import type { Task } from '../types/Task';

const API_BASE_URL = "/api/tasks";

export const taskApi = {

  getAllTasks: async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(`${API_BASE_URL}/`);
    return response.data;
  },


  getTaskById: async (id: number): Promise<Task> => {
    const response = await axios.get<Task>(`${API_BASE_URL}/${id}`);
    return response.data;
  },


  createTask: async (task: Task): Promise<Task> => {
    const response = await axios.post<Task>(`${API_BASE_URL}/`, task);
    return response.data;
  },


  updateTask: async (id: number, task: Task): Promise<Task> => {
    const response = await axios.put<Task>(`${API_BASE_URL}/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: number): Promise<Task> => {
    const response = await axios.delete<Task>(`${API_BASE_URL}/${id}`);
    return response.data;
  }
};