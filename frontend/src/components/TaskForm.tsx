import React, { useId, useState } from 'react';
import type { Task, TaskStatus } from '../types/Task';

const emptyTask: Task = {
  taskName: '',
  taskDescription: '',
  taskAssignedPerson: '',
  taskDueDate: '',
  taskStatus: 'IN_PROGRESS',
};

interface TaskFormProps {
  initialTask?: Task;
  submitLabel?: string;
  onSubmit: (task: Task) => Promise<void> | void;
  onCancel?: () => void;
}

export function TaskForm({ initialTask, submitLabel = 'Add Task', onSubmit, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState<Task>(initialTask ?? emptyTask);
  const [submitting, setSubmitting] = useState(false);
  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(formData);
      if (!initialTask) setFormData(emptyTask);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldId('taskName')} className="text-sm font-bold text-gray-700">Task Name</label>
        <input
          id={fieldId('taskName')}
          name="taskName"
          type="text"
          required
          value={formData.taskName}
          onChange={handleChange}
          className="w-full p-2.5 text-sm border border-gray-300 rounded bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldId('taskDescription')} className="text-sm font-bold text-gray-700">Description</label>
        <textarea
          id={fieldId('taskDescription')}
          name="taskDescription"
          required
          rows={3}
          value={formData.taskDescription}
          onChange={handleChange}
          className="w-full p-2.5 text-sm border border-gray-300 rounded bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border resize-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={fieldId('taskAssignedPerson')} className="text-sm font-bold text-gray-700">Assigned Person</label>
        <input
          id={fieldId('taskAssignedPerson')}
          name="taskAssignedPerson"
          type="text"
          required
          value={formData.taskAssignedPerson}
          onChange={handleChange}
          className="w-full p-2.5 text-sm border border-gray-300 rounded bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border"
        />
      </div>

      <div className="flex gap-3">
        <div className="flex flex-col gap-1.5 flex-1">
          <label htmlFor={fieldId('taskDueDate')} className="text-sm font-bold text-gray-700">Due Date</label>
          <input
            id={fieldId('taskDueDate')}
            name="taskDueDate"
            type="date"
            required
            value={formData.taskDueDate}
            onChange={handleChange}
            className="w-full p-2.5 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border"
          />
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <label htmlFor={fieldId('taskStatus')} className="text-sm font-bold text-gray-700">Status</label>
          <select
            id={fieldId('taskStatus')}
            name="taskStatus"
            value={formData.taskStatus}
            onChange={(e) => setFormData((prev) => ({ ...prev, taskStatus: e.target.value as TaskStatus }))}
            className="w-full p-2.5 text-sm border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border"
          >
            <option value="IN_PROGRESS">In Progress</option>
            <option value="PAUSED">Paused</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2 mt-1">
        <button
          type="submit"
          disabled={submitting}
          className="flex-1 p-2.5 text-sm font-bold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Saving...' : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 p-2.5 text-sm font-bold text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
