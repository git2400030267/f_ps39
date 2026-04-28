import React from 'react';
import './StatCard.css';

export default function StatCard({ icon: Icon, label, value, color, trend }) {
  return (
    <div className="stat-card card">
      <div className="stat-icon" style={{ background: color || 'var(--gradient)' }}>
        <Icon size={22} />
      </div>
      <div className="stat-info">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {trend && <div className={`stat-trend ${trend > 0 ? 'up' : 'down'}`}>{trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% this month</div>}
      </div>
    </div>
  );
}
