import React from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiFolder, FiMessageSquare, FiTrendingUp, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../../components/StatCard';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

const BAR_DATA = [
  { month: 'Oct', projects: 8 }, { month: 'Nov', projects: 14 }, { month: 'Dec', projects: 10 },
  { month: 'Jan', projects: 18 }, { month: 'Feb', projects: 22 }, { month: 'Mar', projects: 16 },
];
const PIE_DATA = [
  { name: 'Web Dev', value: 35 }, { name: 'AI/ML', value: 28 }, { name: 'Data Science', value: 20 }, { name: 'Mobile', value: 17 },
];
const PIE_COLORS = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b'];

export default function AdminDashboard() {
  const { projects, feedback } = useData();
  const { users } = useAuth();
  const students = users.filter(u => u.role === 'student');
  const completed = projects.filter(p => p.status === 'Completed').length;
  const pending = projects.filter(p => p.status === 'In Progress').length;

  const recentProjects = [...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <div className="admin-dashboard page-enter">
      <div className="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="page-sub">Overview of all student projects and portfolios</p>
        </div>
        <Link to="/admin/feedback" className="btn btn-primary"><FiMessageSquare /> Give Feedback</Link>
      </div>

      <div className="grid-4" style={{ marginBottom: 28 }}>
        <StatCard icon={FiUsers} label="Total Students" value={students.length} color="linear-gradient(135deg,#6366f1,#8b5cf6)" trend={12} />
        <StatCard icon={FiFolder} label="Total Projects" value={projects.length} color="linear-gradient(135deg,#06b6d4,#3b82f6)" trend={8} />
        <StatCard icon={FiCheckCircle} label="Completed" value={completed} color="linear-gradient(135deg,#10b981,#06b6d4)" trend={5} />
        <StatCard icon={FiClock} label="In Progress" value={pending} color="linear-gradient(135deg,#f59e0b,#ef4444)" />
      </div>

      <div className="admin-charts">
        <div className="card chart-card">
          <h3 className="chart-title">Projects Submitted (Monthly)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={BAR_DATA}>
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#1e1e3a', border: '1px solid #2d2d5e', borderRadius: 8, color: '#e2e8f0' }} />
              <Bar dataKey="projects" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart-card">
          <h3 className="chart-title">Projects by Category</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                {PIE_DATA.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1e1e3a', border: '1px solid #2d2d5e', borderRadius: 8, color: '#e2e8f0' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pie-legend">
            {PIE_DATA.map((d, i) => (
              <div key={d.name} className="legend-item">
                <span className="legend-dot" style={{ background: PIE_COLORS[i] }} />
                <span>{d.name}</span>
                <span className="legend-val">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 24 }}>
        <div className="table-header">
          <h3>Recent Projects</h3>
          <Link to="/admin/projects" className="btn btn-outline" style={{ padding: '7px 16px', fontSize: 13 }}>View All</Link>
        </div>
        <table className="data-table">
          <thead>
            <tr><th>Project</th><th>Student</th><th>Category</th><th>Status</th><th>Progress</th></tr>
          </thead>
          <tbody>
            {recentProjects.map(p => {
              const student = users.find(u => u.id === p.userId);
              return (
                <tr key={p.id}>
                  <td><strong>{p.title}</strong></td>
                  <td>{student?.name || 'Unknown'}</td>
                  <td><span className="badge badge-primary">{p.category}</span></td>
                  <td>
                    <span className={`badge ${p.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <div className="progress-wrap">
                      <div className="progress-bar"><div style={{ width: `${p.progress}%` }} /></div>
                      <span>{p.progress}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
