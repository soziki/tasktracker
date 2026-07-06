import React, { useState, useEffect } from 'react';
import type { Task, TaskStatus } from '../types';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task) => void;
  taskToEdit?: Task; 
}

export default function TaskFormModal({ isOpen, onClose, onSubmit, taskToEdit }: TaskFormModalProps) {
  const [taskName, setName] = useState('');
  const [taskDescription, setDescription] = useState('');
  const [taskAssignedPerson, setAssignedTeam] = useState('');
  const [taskDueDate, setDueDate] = useState('');
  const [taskStatus, setStatus] = useState<TaskStatus>('IN_PROGRESS');

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.taskName);
      setDescription(taskToEdit.taskDescription);
      setAssignedTeam(taskToEdit.taskAssignedPerson);
      setDueDate(taskToEdit.taskDueDate.substring(0, 10)); // Tarih inputu için YYYY-MM-DD formatı
      setStatus(taskToEdit.taskStatus);
    } else {
      setName('');
      setDescription('');
      setAssignedTeam('');
      setDueDate('');
      setStatus('IN_PROGRESS');
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const taskData: Task = {
      ...(taskToEdit && { id: taskToEdit.id, taskStartDate: taskToEdit.taskStartDate }),
      taskName,
      taskDescription,
      taskAssignedPerson,
      taskDueDate: taskDueDate,
      taskStatus,
    };
    onSubmit(taskData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-bold text-slate-100 mb-4">
          {taskToEdit ? `Görev Düzenle (ID: ${taskToEdit.id})` : 'Yeni Görev Ekle'}
        </h2>
        
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Görev Adı</label>
            <input type="text" required value={taskName} onChange={e => setName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Açıklama</label>
            <textarea required value={taskDescription} onChange={e => setDescription(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 h-20 resize-none focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Atanan Kişi (Task Assigned Person)</label>
            <input type="text" required value={taskAssignedPerson} onChange={e => setAssignedTeam(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
              Bitiş Tarihi
            </label>
            <input 
              type="text" 
              required 
              placeholder='YYYY-MM-DD'
              pattern="\d{4}-\d{2}-\d{2}"
              maxLength={10}
              value={taskDueDate} 
              onChange={e => {
                let val = e.target.value.replace(/[^0-9-]/g, '');
                if ((val.length === 4 || val.length === 7) && val.length > taskDueDate.length) {
                  val += '-';
                }
                setDueDate(val);
              }} 
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500 font-mono text-sm" 
            />
          </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Durum (Status)</label>
              <select value={taskStatus} onChange={e => setStatus(e.target.value as TaskStatus)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500">
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="PAUSED">PAUSED</option>
              </select>
            </div>
          </div>

          {taskToEdit && (
            <div className="bg-slate-950 p-3 rounded-lg border border-slate-850 text-xs text-slate-500 space-y-1">
              <p>🚫 ID: {taskToEdit.id} (Değiştirilemez)</p>
              <p>📅 Başlangıç Tarihi: {new Date(taskToEdit.taskStartDate || '').toLocaleString()} (Değiştirilemez)</p>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-sm transition hover:bg-slate-700">İptal</button>
            <button type="submit" className="px-4 py-2 bg-emerald-600 text-slate-950 rounded-lg text-sm font-bold transition hover:bg-emerald-500">{taskToEdit ? 'Kaydet' : 'Ekle'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}