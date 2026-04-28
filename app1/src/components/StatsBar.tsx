import React from 'react';

interface StatsBarProps {
  total: number;
  done: number;
  inProgress: number;
  todo: number;
}

const StatsBar: React.FC<StatsBarProps> = ({ total, done, inProgress, todo }) => {
  const pct = (n: number) => total ? Math.round((n / total) * 100) : 0;

  return (
    <div className="stats-bar">
      <div className="stat-item">
        <span className="stat-number" style={{ color: '#f43f5e' }}>{total}</span>
        <span className="stat-label">TOTAL</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-number" style={{ color: '#facc15' }}>{todo}</span>
        <span className="stat-label">TODO</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-number" style={{ color: '#fb923c' }}>{inProgress}</span>
        <span className="stat-label">ACTIVE</span>
      </div>
      <div className="stat-divider" />
      <div className="stat-item">
        <span className="stat-number" style={{ color: '#4ade80' }}>{done}</span>
        <span className="stat-label">DONE</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct(done)}%` }} />
        <span className="progress-label">{pct(done)}% complete</span>
      </div>
    </div>
  );
};

export default StatsBar;
