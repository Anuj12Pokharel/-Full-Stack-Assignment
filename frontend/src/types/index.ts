export type Priority = 'low' | 'medium' | 'high';

export interface User {
  id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  email: string;
}

export interface Task {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  priority: Priority;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaskInput {
  title: string;
  description?: string;
  priority?: Priority;
  end_date?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface TasksResponse {
  tasks: Task[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

