import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onEditClick: (id: number) => void;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, updatedTask: Task) => void;
}

export default function TaskCard({ task, onEditClick, onDelete, onStatusChange }: TaskCardProps) {
  const toggleStatus = () => {
    if (!task.id) return;
    const nextStatus = task.taskStatus === 'IN_PROGRESS' ? 'PAUSED' : 'IN_PROGRESS';
    onStatusChange(task.id, { ...task, taskStatus: nextStatus });
  };

  return (
    <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-xl shadow-md space-y-3 hover:border-slate-700 transition">
      <div className="flex justify-between items-start">
        <span className="text-xs font-mono font-bold bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-850">
          ID: {task.id}
        </span>
        <div className="flex gap-2">
          <button onClick={() => task.id && onEditClick(task.id)} className="text-xs text-amber-400 hover:underline">Düzenle</button>
          <button onClick={() => task.id && onDelete(task.id)} className="text-xs text-rose-400 hover:underline">Sil</button>
        </div>
      </div>
      <div>
        <h4 className="font-bold text-slate-200 text-sm">{task.taskName}</h4>
        <p className="text-xs text-slate-400 mt-1 line-clamp-2">{task.taskDescription}</p>
      </div>
      <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-850 space-y-0.5">
        <p>👤 Sorumlu: <span className="text-slate-300">{task.taskAssignedPerson}</span></p>
        <p>📅 Bitiş: <span className="text-slate-300">{task.taskDueDate.substring(0,10)}</span></p>
      </div>
      <button 
        onClick={toggleStatus} 
        className={`w-full text-xs py-1.5 rounded-lg font-bold border transition duration-200 ${
          task.taskStatus === 'IN_PROGRESS' 
            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20' 
            : 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20'
        }`}
      >
        {task.taskStatus === 'IN_PROGRESS' ? '⏸️ Duraklat (PAUSED yap)' : '▶️ Başlat (IN_PROGRESS yap)'}
      </button>
    </div>
  );
}