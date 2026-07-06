import { useState } from 'react';
import { useTasks } from '../TaskContext';
import TaskCard from './TaskCard';
import TaskFormModal from './TaskFormModal';
import type { Task, TaskStatus } from '../types';

export default function KanbanBoard() {
  const { tasks, loading, error, createTask, updateTask, deleteTask, getTaskById } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const columns: { title: string; status: TaskStatus; color: string }[] = [
    { title: '⚡ IN PROGRESS', status: 'IN_PROGRESS', color: 'border-t-amber-500 bg-amber-500/5' },
    { title: '⏸️ PAUSED', status: 'PAUSED', color: 'border-t-purple-500 bg-purple-500/5' },
  ];

  const handleEditClick = async (id: number) => {
    const freshTask = await getTaskById(id);
    if (freshTask) {
      setEditingTask(freshTask);
      setIsModalOpen(true);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingTask(undefined);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-100">Task Tracker</h1>
          <p className="text-xs text-slate-400">Faz 1</p>
        </div>
        <button onClick={handleOpenCreateModal} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded-xl text-sm font-bold transition">
          + Yeni Görev Ekle
        </button>
      </div>

      {error && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-xs font-mono">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10 text-slate-500 text-sm">Görev yükleniyor...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {columns.map(col => {
            const filteredTasks = tasks.filter(t => t.taskStatus === col.status);
            return (
              <div key={col.status} className={`border-t-4 ${col.color} bg-slate-900/20 border border-slate-850 rounded-xl p-4 min-h-[450px] flex flex-col space-y-3`}>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider">{col.title}</h3>
                  <span className="text-[11px] font-bold bg-slate-900 border border-slate-800 text-slate-400 px-2 py-0.5 rounded-full">{filteredTasks.length}</span>
                </div>
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {filteredTasks.map(task => (
                    <TaskCard 
                      key={task.id} 
                      task={task} 
                      onEditClick={handleEditClick} 
                      onDelete={deleteTask} 
                      onStatusChange={updateTask} 
                    />
                  ))}
                  {filteredTasks.length === 0 && <div className="text-center py-12 text-[11px] text-slate-600 border border-dashed border-slate-850 rounded-xl">Görev bulunmuyor.</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <TaskFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={(data) => data.id ? updateTask(data.id, data) : createTask(data)} 
        taskToEdit={editingTask} 
      />
    </div>
  );
}