import React, { useState } from 'react';
import { Task, Priority, Status } from '../types';

interface AddTaskModalProps {
  onAdd: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [tags, setTags] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
      status: 'todo' as Status,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>NEW TASK</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <label>TITLE</label>
          <input
            className="modal-input"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Task title..."
            autoFocus
          />

          <label>DESCRIPTION</label>
          <textarea
            className="modal-input modal-textarea"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="What needs to be done?"
          />

          <label>PRIORITY</label>
          <div className="priority-select">
            {(['low', 'medium', 'high', 'critical'] as Priority[]).map(p => (
              <button
                key={p}
                className={`priority-opt ${priority === p ? 'active' : ''}`}
                data-priority={p}
                onClick={() => setPriority(p)}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>

          <label>TAGS (comma separated)</label>
          <input
            className="modal-input"
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="frontend, api, bug..."
          />
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>CANCEL</button>
          <button className="btn-create" onClick={handleSubmit} disabled={!title.trim()}>
            CREATE TASK →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
