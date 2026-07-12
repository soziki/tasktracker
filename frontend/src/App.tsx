import { useContext, useState } from 'react';
import { AuthProvider } from './context/AuthProvider';
import { AuthContext } from './context/AuthContext';
import { TaskProvider } from './context/TaskProvider';
import { TaskContext } from './context/TaskContext';
import { LoginForm } from './components/LoginForm';
import { SearchBar } from './components/SearchBar';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import type { Task } from './types/Task';

function TaskTrackerPage() {
  const taskContext = useContext(TaskContext);
  const authContext = useContext(AuthContext);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  if (!taskContext || !authContext) return null;
  const { createTask, updateTask } = taskContext;
  const { logout } = authContext;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-[800px] mx-auto p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Task Tracker</h1>
          <button
            onClick={logout}
            className="px-3 py-1.5 text-sm font-bold text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
          >
            Log Out
          </button>
        </div>

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

function AuthGate() {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;

  if (!authContext.token) {
    return <LoginForm />;
  }

  return (
    <TaskProvider>
      <TaskTrackerPage />
    </TaskProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}
