import type { Task } from '../types/Task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  canManage: boolean;
}

const statusStyles: Record<Task['taskStatus'], string> = {
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  PAUSED: 'bg-amber-100 text-amber-700',
};

const statusLabels: Record<Task['taskStatus'], string> = {
  IN_PROGRESS: 'In Progress',
  PAUSED: 'Paused',
};

export function TaskCard({ task, onEdit, onDelete, canManage }: TaskCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col gap-2 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-xs font-bold text-gray-400">#{task.id}</span>
          <h3 className="text-base font-bold text-gray-800">{task.taskName}</h3>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap ${statusStyles[task.taskStatus]}`}>
          {statusLabels[task.taskStatus]}
        </span>
      </div>

      <p className="text-sm text-gray-600">{task.taskDescription}</p>

      <div className="text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
        <span>Assigned to: <strong className="text-gray-700">{task.taskAssignedPerson}</strong></span>
        <span>Start: <strong className="text-gray-700">{task.taskStartDate}</strong></span>
        <span>Due: <strong className="text-gray-700">{task.taskDueDate}</strong></span>
      </div>

      {canManage && (
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 rounded hover:bg-blue-100"
          >
            Update
          </button>
          <button
            onClick={() => task.id !== undefined && onDelete(task.id)}
            className="px-3 py-1.5 text-xs font-bold text-red-700 bg-red-50 rounded hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
