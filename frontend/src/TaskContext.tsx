import { createContext, useContext, useState, useEffect} from 'react';
import type {ReactNode} from 'react';
import type { Task } from './types';
import { taskApi } from './api';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  getAllTasks: () => Promise<void>;
  getTaskById: (id: number) => Promise<Task | undefined>;
  createTask: (task: Task) => Promise<void>;
  updateTask: (id: number, updatedTask: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getAllTasks = async () => {
    setLoading(true);
    try {
      const data = await taskApi.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err: any) {
      setError('Backend bağlantısı sağlanamadı.');
    } finally {
      setLoading(false);
    }
  };

  const getTaskById = async (id: number): Promise<Task | undefined> => {
    try {
      // Doğrudan backend'deki endpoint'e gidip en güncel halini çekiyoruz
      return await taskApi.getTaskById(id);
    } catch (err) {
      console.error(`${id} ID'li görev getirilirken hata oluştu`, err);
      // Backend'e erişilemezse fallback olarak yerel state'den bulmayı dener
      return tasks.find(t => t.id === id);
    }
  };

  const createTask = async (task: Task) => {
    try {
      const newTask = await taskApi.createTask(task);
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error('Görev eklenirken hata oluştu', err);
    }
  };

  const updateTask = async (id: number, updatedTask: Task) => {
    try {
      const data = await taskApi.updateTask(id, updatedTask);
      setTasks((prev) => prev.map((t) => (t.id === id ? data : t)));
    } catch (err) {
      console.error('Görev güncellenirken hata oluştu', err);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await taskApi.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Görev silinirken hata oluştu', err);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, error, getAllTasks, getTaskById, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks mutlaka TaskProvider içinde kullanılmalıdır!');
  return context;
};