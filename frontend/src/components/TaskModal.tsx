import { Task, TaskInput } from '../types';
import { TaskForm } from './TaskForm';

interface TaskModalProps {
  task: Task | null;
  onClose: () => void;
  onSubmit: (data: TaskInput | Partial<TaskInput>) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ task, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="auth-card rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">
              {task ? 'Edit Task' : 'Create New Task'}
            </h2>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white text-3xl font-bold transition"
            >
              ×
            </button>
          </div>
          <TaskForm task={task} onSubmit={onSubmit} onCancel={onClose} />
        </div>
      </div>
    </div>
  );
};

