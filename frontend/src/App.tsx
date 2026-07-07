import { useContext, useState } from 'react';
import { TaskProvider } from './context/TaskProvider';
import { TaskContext } from './context/TaskContext';
import { SearchBar } from './components/SearchBar';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import type { Task } from './types/Task';

function TaskTrackerPage() {
  const context = useContext(TaskContext);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  if (!context) return null;
  const { createTask, updateTask } = context;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-[800px] mx-auto p-5">
        <h1 className="text-3xl font-bold text-center text-gray-800">Task Tracker</h1>

        <hr className="my-5 border-t border-gray-200" />

        <div className="mb-8">
          <TaskForm submitLabel="Add Task" onSubmit={createTask} />
        </div>

        <hr className="my-5 border-t border-gray-200" />

        <div className="mb-5">
          <SearchBar />
        </div>

        <TaskList onEdit={setEditingTask} />

        {editingTask && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-5">
              <h2 className="text-lg font-bold text-gray-800 mb-3">Update Task #{editingTask.id}</h2>
              <TaskForm
                initialTask={editingTask}
                submitLabel="Save Changes"
                onCancel={() => setEditingTask(null)}
                onSubmit={async (task) => {
                  if (editingTask.id !== undefined) {
                    await updateTask(editingTask.id, task);
                  }
                  setEditingTask(null);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <TaskProvider>
      <TaskTrackerPage />
    </TaskProvider>
  );
}
