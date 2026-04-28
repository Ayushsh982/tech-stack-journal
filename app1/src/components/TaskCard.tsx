import React from 'react';
import { Task, Status } from '../types';

interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
}

const PRIORITY_CONFIG = {
  low: { color: '#4ade80', label: 'LOW', bg: 'rgba(74,222,128,0.1)' },
  medium: { color: '#facc15', label: 'MED', bg: 'rgba(250,204,21,0.1)' },
  high: { color: '#fb923c', label: 'HIGH', bg: 'rgba(251,146,60,0.1)' },
  critical: { color: '#f43f5e', label: 'CRIT', bg: 'rgba(244,63,94,0.1)' },
};

const STATUS_NEXT: Record<Status, Status> = {
  todo: 'in-progress',
  'in-progress': 'done',
  done: 'todo',
};

const STATUS_LABELS: Record<Status, string> = {
  todo: 'TODO',
  'in-progress': 'IN PROGRESS',
  done: 'DONE',
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onDelete }) => {
  const priority = PRIORITY_CONFIG[task.priority];

  return (
    <div className="task-card" style={{ '--accent': priority.color } as React.CSSProperties}>
      <div className="task-card-header">
        <div className="priority-badge" style={{ color: priority.color, background: priority.bg }}>
          {priority.label}
        </div>
        <div className="task-status-pill" data-status={task.status}>
          {STATUS_LABELS[task.status]}
        </div>
      </div>

      <h3 className="task-title">{task.title}</h3>
      <p className="task-desc">{task.description}</p>

      <div className="task-tags">
        {task.tags.map(tag => (
          <span key={tag} className="tag">#{tag}</span>
        ))}
      </div>

      <div className="task-footer">
        <button
          className="btn-advance"
          onClick={() => onStatusChange(task.id, STATUS_NEXT[task.status])}
          style={{ borderColor: priority.color, color: priority.color }}
        >
          → {STATUS_LABELS[STATUS_NEXT[task.status]]}
        </button>
        <button className="btn-delete" onClick={() => onDelete(task.id)}>✕</button>
      </div>
    </div>
  );
};

export default TaskCard;
