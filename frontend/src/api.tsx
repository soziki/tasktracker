//api 5
import axios from 'axios';
import type { Task } from './types';

//base address 
const API_BASE_URL = '/api/tasks';

//one master api for 5 different apis 
export const taskApi = {
  //GET /api/tasks
  getAllTasks: async (): Promise<Task[]> => {
    const response = await axios.get<Task[]>(`${API_BASE_URL}/`);
    return response.data;
  },

  //GET /api/tasks/{id}
  getTaskById: async (id: number): Promise<Task> => {
    const response = await axios.get<Task>(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  //POST /api/tasks
  createTask: async (task: Task): Promise<Task> => {
    const response = await axios.post<Task>(`${API_BASE_URL}/`, task);
    return response.data;
  },

  //PUT /api/tasks/{id}
  updateTask: async (id: number, task: Task): Promise<Task> => {
    const response = await axios.put<Task>(`${API_BASE_URL}/${id}`, task);
    return response.data;
  },

  //DELETE /api/tasks/{id}
  deleteTask: async (id: number): Promise<Task> => {
    const response = await axios.delete<Task>(`${API_BASE_URL}/${id}`);
    return response.data;
  }
};