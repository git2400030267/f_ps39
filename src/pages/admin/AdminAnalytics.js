import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis } from 'recharts';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import './AdminAnalytics.css';

const AREA_DATA = [
  { month: 'Sep', students: 12, projects: 8 }, { month: 'Oct', students: 18, projects: 14 },
  { month: 'Nov', students: 25, projects: 20 }, { month: 'Dec', students: 22, projects: 18 },
  { month: 'Jan', students: 30, projects: 26 }, { month: 'Feb', students: 38, projects: 32 },
  { month: 'Mar', students: 45, projects: 40 },
];

const RADAR_DATA = [
  { subject: 'Web Dev', A: 85 }, { subject: 'AI/ML', A: 70 }, { subject: 'Data Science', A: 60 },
  { subject: 'Mobile', A: 45 }, { subject: 'DevOps', A: 30 }, { subject: 'Security', A: 25 },
];

const TT_STYLE = { background: '#1e1e3a', border: '1px solid #2d2d5e', borderRadius: 8, color: '#e2e8f0' };

export default function AdminAnalytics() {
  const { projects, feedback } = useData();
  const { users } = useAuth();
  const students = users.filter(u => u.role === 'student');
  const avgProgress = Math.round(projects.reduce((s, p) => s + p.progress, 0) / (projects.length || 1));
  const avgRating = feedback.length ? (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1) : 'N/A';

  return (
    <div className="admin-analytics page-enter">
      <div className="page-header">
        <div><h1>Analytics</h1><p className="page-sub">Platform performance and insights</p></div>
      </div>

      <div className="analytics-kpis">
        {[
          { label: 'Avg Project Progress', value: `${avgProgress}%`, color: '#6366f1' },
          { label: 'Avg Feedback Rating', value: `${avgRating} ★`, color: '#f59e0b' },
          { label: 'Active Students', value: students.length, color: '#10b981' },
          { label: 'Total Feedback', value: feedback.length, color: '#06b6d4' },
        ].map(k => (
          <div key={k.label} className="kpi-card card">
            <div className="kpi-value" style={{ color: k.color }}>{k.value}</div>
            <div className="kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="analytics-charts">
        <div className="card chart-card">
          <h3 className="chart-title">Growth Over Time</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={AREA_DATA}>
              <defs>
                <linearGradient id="gStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gProjects" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={TT_STYLE} />
              <Area type="monotone" dataKey="students" stroke="#6366f1" fill="url(#gStudents)" strokeWidth={2} name="Students" />
              <Area type="monotone" dataKey="projects" stroke="#06b6d4" fill="url(#gProjects)" strokeWidth={2} name="Projects" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart-card">
          <h3 className="chart-title">Skills Distribution</h3>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="#2d2d5e" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <Radar dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <h3 className="chart-title">Project Status Breakdown</h3>
        <div className="status-breakdown">
          {['Completed', 'In Progress', 'Pending'].map(s => {
            const count = projects.filter(p => p.status === s).length;
            const pct = Math.round((count / (projects.length || 1)) * 100);
            return (
              <div key={s} className="status-row">
                <span className="status-name">{s}</span>
                <div className="status-bar-wrap">
                  <div className="status-bar">
                    <div style={{ width: `${pct}%`, background: s === 'Completed' ? '#10b981' : s === 'In Progress' ? '#6366f1' : '#f59e0b' }} />
                  </div>
                </div>
                <span className="status-count">{count} ({pct}%)</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
