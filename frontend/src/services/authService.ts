import axios from 'axios';
import { AuthResponse } from '../types';

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

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/login', { email, password });
  return response.data;
};

export const register = async (
  first_name: string,
  middle_name: string | undefined,
  last_name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/register', { 
    first_name, 
    middle_name, 
    last_name, 
    email, 
    password 
  });
  return response.data;
};

