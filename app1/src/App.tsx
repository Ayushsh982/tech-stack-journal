import React, { useState } from 'react';
import { useTasks } from './hooks/useTasks';
import TaskCard from './components/TaskCard';
import StatsBar from './components/StatsBar';
import AddTaskModal from './components/AddTaskModal';
import { Status } from './types';
import './App.css';

const FILTERS: { label: string; value: Status | 'all' }[] = [
  { label: 'ALL', value: 'all' },
  { label: 'TODO', value: 'todo' },
  { label: 'IN PROGRESS', value: 'in-progress' },
  { label: 'DONE', value: 'done' },
];

const App: React.FC = () => {
  const { tasks, stats, filter, setFilter, search, setSearch, addTask, updateStatus, deleteTask } = useTasks();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <div className="logo-mark">TF</div>
          <div>
            <h1 className="app-title">TASKFLOW</h1>
            <p className="app-subtitle">Project Dashboard · App 1</p>
          </div>
        </div>
        <button className="btn-new-task" onClick={() => setShowModal(true)}>
          + NEW TASK
        </button>
      </header>

      <main className="app-main">
        <StatsBar {...stats} />

        <div className="controls">
          <div className="filter-group">
            {FILTERS.map(f => (
              <button
                key={f.value}
                className={`filter-btn ${filter === f.value ? 'active' : ''}`}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input
              className="search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tasks or tags..."
            />
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">◈</div>
            <p>No tasks match your filter.</p>
          </div>
        ) : (
          <div className="task-grid">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={updateStatus}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <AddTaskModal onAdd={addTask} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default App;
