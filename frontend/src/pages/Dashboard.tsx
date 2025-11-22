import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Task, TaskInput } from '../types';
import * as taskService from '../services/taskService';
import { TaskList } from '../components/TaskList';
import { TaskModal } from '../components/TaskModal';
import { formatFullName } from '../utils/nameUtils';

export const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<'end_date' | 'priority' | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const limit = 10;

  const fetchTasks = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await taskService.getTasks(currentPage, limit, sortBy, sortOrder);
      setTasks(response.tasks);
      setTotalPages(response.pagination.totalPages);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [currentPage, sortBy, sortOrder]);

  const handleCreateTask = async (taskData: TaskInput | Partial<TaskInput>) => {
    try {
      await taskService.createTask(taskData as TaskInput);
      setIsModalOpen(false);
      fetchTasks();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (id: number, taskData: Partial<TaskInput>) => {
    try {
      await taskService.updateTask(id, taskData);
      setIsModalOpen(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        fetchTasks();
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to delete task');
      }
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const overdueTasks = tasks.filter(task => {
    if (!task.end_date) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.end_date);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  }).length;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high').length;

  return (
    <div className="min-h-screen auth-background relative">
      {/* Abstract background shapes */}
      <div className="auth-shape-1"></div>
      <div className="auth-shape-2"></div>
      <div className="auth-shape-3"></div>

      <nav className="water-card bg-gradient-to-r from-white/20 via-blue-50/30 to-cyan-50/30 backdrop-blur-md shadow-lg relative z-10 sticky top-0 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between h-auto sm:h-16 py-3 sm:py-0 items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg transform hover:rotate-6 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-700 to-blue-700 bg-clip-text text-transparent">Task Manager</h1>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
              <span className="text-sm sm:text-base text-gray-700 font-medium whitespace-nowrap">Welcome, <span className="text-indigo-600 font-semibold">{formatFullName(user)}</span></span>
              <button
                onClick={logout}
                className="px-4 sm:px-5 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition duration-200 text-sm sm:text-base w-full sm:w-auto shadow-md hover:shadow-lg transform hover:scale-105 font-semibold"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8 relative z-10">
          {error && (
            <div className="water-card mb-4 p-3 sm:p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-fade-in">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm sm:text-base">{error}</span>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        {!isLoading && tasks.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 animate-fade-in">
            <div className="water-card bg-gradient-to-br from-blue-50 to-cyan-50 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-5 transform hover:scale-105 hover:shadow-xl transition-all duration-300 border-2 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-blue-700 font-semibold mb-1">Total Tasks</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 mt-1">{totalTasks}</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="water-card bg-gradient-to-br from-red-50 to-rose-50 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-5 transform hover:scale-105 hover:shadow-xl transition-all duration-300 border-2 border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-red-700 font-semibold mb-1">Overdue</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-red-600 mt-1">{overdueTasks}</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="water-card bg-gradient-to-br from-orange-50 to-amber-50 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-5 transform hover:scale-105 hover:shadow-xl transition-all duration-300 border-2 border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-orange-700 font-semibold mb-1">High Priority</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-orange-600 mt-1">{highPriorityTasks}</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="water-card mb-4 sm:mb-6 p-4 sm:p-5 bg-gradient-to-r from-white/95 to-blue-50/50 backdrop-blur-sm rounded-xl shadow-lg border border-indigo-100/50">
          <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-3 sm:gap-4">
            <button
              onClick={openCreateModal}
              className="px-5 sm:px-7 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700 transition-all duration-300 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
            >
              <svg className="w-5 h-5 transform hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              <span>Create New Task</span>
            </button>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <label className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Sort by:</label>
                <select
                  value={sortBy || ''}
                  onChange={(e) => setSortBy(e.target.value as 'end_date' | 'priority' | undefined)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm bg-white flex-1 sm:flex-none"
                >
                  <option value="">None</option>
                  <option value="end_date">Due Date</option>
                  <option value="priority">Priority</option>
                </select>
              </div>

              {sortBy && (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Order:</label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm bg-white flex-1 sm:flex-none"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

          {isLoading ? (
            <div className="water-card text-center py-12 sm:py-16 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <div className="text-base sm:text-lg text-gray-600">Loading tasks...</div>
            </div>
          </div>
        ) : (
          <>
            <TaskList
              tasks={tasks}
              onEdit={openEditModal}
              onDelete={handleDeleteTask}
              onPriorityChange={(id, priority) => handleUpdateTask(id, { priority })}
            />

              {totalPages > 1 && (
                <div className="water-card mt-4 sm:mt-6 p-3 sm:p-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-md">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 sm:px-5 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition duration-200 text-sm sm:text-base w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                  <div className="flex items-center gap-2 px-4 py-2">
                    <span className="text-sm sm:text-base text-gray-700 font-medium">
                      Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 sm:px-5 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition duration-200 text-sm sm:text-base w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {isModalOpen && (
          <TaskModal
            task={editingTask}
            onClose={closeModal}
            onSubmit={editingTask ? (data) => handleUpdateTask(editingTask.id, data) : handleCreateTask}
          />
        )}
      </div>
    </div>
  );
};

