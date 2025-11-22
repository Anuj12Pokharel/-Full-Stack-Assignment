import React, { useState, useRef, useEffect } from 'react';
import { Task, Priority } from '../types';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onPriorityChange: (id: number, priority: Priority) => void;
}

const priorityColors: Record<Priority, string> = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const priorityLabels: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, onPriorityChange }) => {
  const [editingPriority, setEditingPriority] = useState<number | null>(null);
  const [updatingPriority, setUpdatingPriority] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setEditingPriority(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setEditingPriority(null);
      }
    };

    if (editingPriority !== null) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [editingPriority]);

  const handlePriorityChange = async (taskId: number, newPriority: Priority) => {
    setUpdatingPriority(taskId);
    try {
      await onPriorityChange(taskId, newPriority);
      setEditingPriority(null);
    } catch (error) {
      console.error('Failed to update priority:', error);
    } finally {
      setUpdatingPriority(null);
    }
  };

  const isOverdue = (endDate: string | null): boolean => {
    if (!endDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
    const dueDate = new Date(endDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today; // Task is overdue if due date is before today
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="water-card text-center py-16 sm:py-20 bg-gradient-to-br from-white/90 to-blue-50/50 rounded-xl shadow-lg border-2 border-dashed border-gray-300">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg sm:text-xl font-semibold">No tasks found</p>
          <p className="text-gray-500 text-sm sm:text-base">Create your first task to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {tasks.map((task, index) => {
        const overdue = isOverdue(task.end_date);
        const isEditingThisPriority = editingPriority === task.id;
        const isUpdatingThisPriority = updatingPriority === task.id;

        return (
          <div
            key={task.id}
            className={`water-card bg-gradient-to-br from-white/95 to-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 relative transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 animate-fade-in ${
              overdue ? 'border-l-4 border-red-500 bg-gradient-to-br from-red-50/90 to-white/80' : 'border-l-4 border-transparent'
            } ${isEditingThisPriority ? 'overflow-visible' : ''}`}
            style={{ 
              zIndex: isEditingThisPriority ? 1000 : 'auto',
              animationDelay: `${index * 50}ms`
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3 gap-2">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-1 h-full min-h-[60px] rounded-full ${
                      task.priority === 'high' ? 'bg-gradient-to-b from-red-500 to-red-600' :
                      task.priority === 'medium' ? 'bg-gradient-to-b from-yellow-500 to-yellow-600' :
                      'bg-gradient-to-b from-green-500 to-green-600'
                    }`}></div>
                    <div className="flex-1">
                      <h3 className={`text-lg sm:text-xl font-bold break-words mb-1 ${overdue ? 'text-red-700' : 'text-gray-800'}`}>
                        {task.title}
                      </h3>
                      {overdue && (
                        <span className="inline-flex items-center gap-1 text-xs bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full font-bold shadow-md animate-pulse">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          OVERDUE
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {task.description && (
                  <p className="text-sm sm:text-base text-gray-600 mb-4 break-words line-clamp-2 pl-4">{task.description}</p>
                )}
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 text-sm pl-4">
                  <div className="flex items-center gap-2 relative" ref={isEditingThisPriority ? dropdownRef : null}>
                    <span className="text-gray-600 font-semibold whitespace-nowrap flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Priority:
                    </span>
                    {isEditingThisPriority ? (
                      <div className="relative z-[9999]" style={{ isolation: 'isolate' }}>
                        <select
                          value={task.priority}
                          onChange={(e) => handlePriorityChange(task.id, e.target.value as Priority)}
                          disabled={isUpdatingThisPriority}
                          className={`px-4 py-2 rounded-lg border-2 border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm font-bold bg-white shadow-xl ${
                            priorityColors[task.priority]
                          } ${isUpdatingThisPriority ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          autoFocus
                        >
                          <option value="low" className="bg-green-100 text-green-800">Low</option>
                          <option value="medium" className="bg-yellow-100 text-yellow-800">Medium</option>
                          <option value="high" className="bg-red-100 text-red-800">High</option>
                        </select>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingPriority(task.id)}
                        disabled={isUpdatingThisPriority}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-110 flex items-center gap-1.5 shadow-md ${
                          priorityColors[task.priority]
                        } ${isUpdatingThisPriority ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}`}
                      >
                        {priorityLabels[task.priority]}
                        {!isUpdatingThisPriority && (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                        {isUpdatingThisPriority && <span className="animate-pulse">...</span>}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-semibold whitespace-nowrap flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Due Date:
                    </span>
                    <span className={`${overdue ? 'text-red-600 font-bold' : 'text-gray-700 font-semibold'} whitespace-nowrap`}>
                      {formatDate(task.end_date)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 lg:flex-col lg:items-stretch lg:min-w-[120px]">
                <button
                  onClick={() => onEdit(task)}
                  className="flex-1 lg:flex-none px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 text-sm font-bold shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  className="flex-1 lg:flex-none px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 text-sm font-bold shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

