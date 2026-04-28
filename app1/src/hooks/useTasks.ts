import { useState, useCallback } from 'react';
import { Task, Priority, Status } from '../types';

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design System Architecture',
    description: 'Plan the microservices layout for the new backend platform.',
    priority: 'critical',
    status: 'in-progress',
    tags: ['backend', 'architecture'],
    createdAt: new Date('2024-01-10'),
    dueDate: new Date('2024-02-01'),
  },
  {
    id: '2',
    title: 'Write Unit Tests',
    description: 'Achieve 90% code coverage across all modules.',
    priority: 'high',
    status: 'todo',
    tags: ['testing', 'quality'],
    createdAt: new Date('2024-01-12'),
    dueDate: new Date('2024-01-30'),
  },
  {
    id: '3',
    title: 'Deploy to Staging',
    description: 'Push latest build to the staging environment.',
    priority: 'medium',
    status: 'done',
    tags: ['devops', 'deployment'],
    createdAt: new Date('2024-01-08'),
  },
  {
    id: '4',
    title: 'Update API Documentation',
    description: 'Sync Swagger docs with the latest endpoint changes.',
    priority: 'low',
    status: 'todo',
    tags: ['docs', 'api'],
    createdAt: new Date('2024-01-14'),
  },
  {
    id: '5',
    title: 'Performance Audit',
    description: 'Run Lighthouse and fix all critical performance issues.',
    priority: 'high',
    status: 'in-progress',
    tags: ['performance', 'frontend'],
    createdAt: new Date('2024-01-11'),
    dueDate: new Date('2024-01-25'),
  },
  {
    id: '6',
    title: 'Security Vulnerability Scan',
    description: 'Run OWASP ZAP against production endpoints.',
    priority: 'critical',
    status: 'todo',
    tags: ['security'],
    createdAt: new Date('2024-01-15'),
  },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<Status | 'all'>('all');
  const [search, setSearch] = useState('');

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
  }, []);

  const updateStatus = useCallback((id: string, status: Status) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, status } : t)));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: tasks.length,
    done: tasks.filter(t => t.status === 'done').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
  };

  return { tasks: filteredTasks, stats, filter, setFilter, search, setSearch, addTask, updateStatus, deleteTask };
}
