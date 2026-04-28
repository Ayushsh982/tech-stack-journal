export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  tags: string[];
  createdAt: Date;
  dueDate?: Date;
}

export interface Stats {
  total: number;
  done: number;
  inProgress: number;
  todo: number;
}
