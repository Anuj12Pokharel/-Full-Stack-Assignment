import axios from 'axios';
import { Task, TaskInput, TasksResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTasks = async (
  page: number = 1,
  limit: number = 10,
  sortBy?: 'end_date' | 'priority',
  sortOrder?: 'asc' | 'desc'
): Promise<TasksResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  if (sortBy) params.append('sortBy', sortBy);
  if (sortOrder) params.append('sortOrder', sortOrder);

  const response = await api.get<TasksResponse>(`/tasks?${params.toString()}`);
  return response.data;
};

export const createTask = async (taskData: TaskInput): Promise<Task> => {
  const response = await api.post<{ message: string; task: Task }>('/tasks', taskData);
  return response.data.task;
};

export const updateTask = async (id: number, taskData: Partial<TaskInput>): Promise<Task> => {
  const response = await api.put<{ message: string; task: Task }>(`/tasks/${id}`, taskData);
  return response.data.task;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

