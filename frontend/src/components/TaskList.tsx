import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { TaskCard } from './TaskCard';
import type { Task } from '../types/Task';

interface TaskListProps {
  onEdit: (task: Task) => void;
}

export function TaskList({ onEdit }: TaskListProps) {
  const context = useContext(TaskContext);
  if (!context) return null;

  const { tasks, loading, error, deleteTask } = context;

  return (
    <div className="flex flex-col gap-2">
      {loading && <p className="text-sm text-gray-500 text-center">Loading...</p>}
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}
      {!loading && !error && tasks.length === 0 && (
        <p className="text-sm text-gray-500 text-center italic">No tasks found.</p>
      )}

      <div className="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-1">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={deleteTask} />
        ))}
      </div>
    </div>
  );
}
