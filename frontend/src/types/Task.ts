export type TaskStatus = 'IN_PROGRESS' | 'PAUSED';  

export interface Task{
  id?: number;
  taskName: string;
  taskDescription: string;
  taskStartDate?: string;
  taskDueDate: string;
  taskAssignedPerson: string;
  taskStatus: TaskStatus;
}