import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import type { Task } from '../types/Task';
import { taskApi } from '../api/api';
import { TaskContext } from './TaskContext';
import { AuthContext } from './AuthContext';

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const authContext = useContext(AuthContext);
  const canManage = (authContext?.hasRole('client_admin') ?? false) || (authContext?.hasRole('client_manager') ?? false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = canManage ? await taskApi.getAllTasks() : await taskApi.getMyTasks();
      setTasks(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Görevler yüklenirken beklenmedik bir hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const loadInitialData = async () => {
      setLoading(true);
      try {
        const data = canManage ? await taskApi.getAllTasks() : await taskApi.getMyTasks();
        if (isMounted) setTasks(data);
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Yükleme hatası');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, [canManage]);

  const createTask = async (newTask: Task) => {
    setLoading(true);
    setError(null);
    try {
      const created = await taskApi.createTask(newTask);
      setTasks((prev) => [...prev, created]);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Görev eklenirken bir hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: number, updatedFields: Task) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await taskApi.updateTask(id, updatedFields);
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Görev güncellenirken bir hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await taskApi.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Görev silinirken bir hata oluştu.');
      }
    } finally {
      setLoading(false);
    }
  };

  const searchTaskById = async (searchId: string) => {
    if (!searchId.trim()) {
      await fetchTasks();
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const numericId = parseInt(searchId, 10);
      if (isNaN(numericId)) {
        setTasks([]);
        return;
      }

      const foundTask = canManage
        ? await taskApi.getTaskById(numericId)
        : await taskApi.getMyTaskById(numericId);
      setTasks(foundTask ? [foundTask] : []);
    } catch (err: unknown) {
      setTasks([]);
      if (axios.isAxiosError(err) && err.response?.status !== 404 && err.response?.status !== 403) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, searchTaskById, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}