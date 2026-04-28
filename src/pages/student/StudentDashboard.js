import React from 'react';
import { Link } from 'react-router-dom';
import { FiFolder, FiFlag, FiMessageSquare, FiTrendingUp, FiPlus, FiCheckCircle } from 'react-icons/fi';
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts';
import StatCard from '../../components/StatCard';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import '../admin/AdminDashboard.css';
import './StudentDashboard.css';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { projects, milestones, feedback } = useData();

  const myProjects = projects.filter(p => p.userId === user.id);
  const myMilestones = milestones.filter(m => myProjects.some(p => p.id === m.projectId));
  const myFeedback = feedback.filter(f => myProjects.some(p => p.id === f.projectId));
  const completed = myProjects.filter(p => p.status === 'Completed').length;
  const avgProgress = myProjects.length ? Math.round(myProjects.reduce((s, p) => s + p.progress, 0) / myProjects.length) : 0;
  const doneMilestones = myMilestones.filter(m => m.completed).length;

  const radialData = [{ name: 'Progress', value: avgProgress, fill: '#6366f1' }];

  return (
    <div className="student-dashboard page-enter">
      <div className="page-header">
        <div>
          <h1>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className="page-sub">{user.dept} · {user.year}</p>
        </div>
        <Link to="/student/projects" className="btn btn-primary"><FiPlus /> New Project</Link>
      </div>

      <div className="grid-4" style={{ marginBottom: 28 }}>
        <StatCard icon={FiFolder} label="My Projects" value={myProjects.length} color="linear-gradient(135deg,#6366f1,#8b5cf6)" />
        <StatCard icon={FiCheckCircle} label="Completed" value={completed} color="linear-gradient(135deg,#10b981,#06b6d4)" />
        <StatCard icon={FiFlag} label="Milestones Done" value={`${doneMilestones}/${myMilestones.length}`} color="linear-gradient(135deg,#f59e0b,#ef4444)" />
        <StatCard icon={FiMessageSquare} label="Feedback Received" value={myFeedback.length} color="linear-gradient(135deg,#ec4899,#8b5cf6)" />
      </div>

      <div className="student-overview">
        <div className="card progress-overview">
          <h3 className="chart-title">Overall Progress</h3>
          <div className="radial-wrap">
            <ResponsiveContainer width="100%" height={180}>
              <RadialBarChart innerRadius="60%" outerRadius="90%" data={radialData} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" cornerRadius={8} background={{ fill: '#1a1a2e' }} />
                <Tooltip contentStyle={{ background: '#1e1e3a', border: '1px solid #2d2d5e', borderRadius: 8, color: '#e2e8f0' }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="radial-center">
              <div className="radial-pct">{avgProgress}%</div>
              <div className="radial-label">Avg Progress</div>
            </div>
          </div>
        </div>

        <div className="card my-projects-list">
          <div className="table-header">
            <h3>My Projects</h3>
            <Link to="/student/projects" className="btn btn-outline" style={{ padding: '7px 16px', fontSize: 13 }}>Manage</Link>
          </div>
          {myProjects.length === 0 && <div className="empty-state" style={{ padding: 30 }}>No projects yet. <Link to="/student/projects" style={{ color: 'var(--primary-light)' }}>Add one!</Link></div>}
          {myProjects.map(p => (
            <div key={p.id} className="my-project-row">
              <div>
                <div className="mp-title">{p.title}</div>
                <div className="mp-cat">{p.category}</div>
              </div>
              <div className="mp-right">
                <div className="progress-wrap" style={{ width: 120 }}>
                  <div className="progress-bar"><div style={{ width: `${p.progress}%` }} /></div>
                  <span>{p.progress}%</span>
                </div>
                <span className={`badge ${p.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {myFeedback.length > 0 && (
        <div className="card" style={{ marginTop: 24 }}>
          <div className="table-header">
            <h3>Latest Feedback</h3>
            <Link to="/student/feedback" className="btn btn-outline" style={{ padding: '7px 16px', fontSize: 13 }}>View All</Link>
          </div>
          {myFeedback.slice(-2).reverse().map(fb => {
            const proj = projects.find(p => p.id === fb.projectId);
            return (
              <div key={fb.id} className="feedback-preview">
                <div className="fp-header">
                  <span className="fp-project">{proj?.title}</span>
                  <span className="fp-stars">{'★'.repeat(fb.rating)}</span>
                </div>
                <p className="fp-text">{fb.text}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
