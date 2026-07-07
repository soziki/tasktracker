import { createContext } from 'react';
import type { Task } from '../types/Task';

export interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  searchTaskById: (id: string) => Promise<void>;
  createTask: (task: Task) => Promise<void>;
  updateTask: (id: number, task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);