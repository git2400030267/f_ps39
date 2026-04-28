import React, { useState } from 'react';
import { FiPlus, FiCheck, FiTrash2, FiFlag, FiX } from 'react-icons/fi';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import './StudentMilestones.css';

export default function StudentMilestones() {
  const { user } = useAuth();
  const { projects, milestones, addMilestone, toggleMilestone, deleteMilestone } = useData();
  const [selectedProject, setSelectedProject] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ projectId: '', title: '', desc: '', dueDate: '' });

  const myProjects = projects.filter(p => p.userId === user.id);
  const myMilestones = milestones.filter(m => myProjects.some(p => p.id === m.projectId));
  const filtered = selectedProject === 'all' ? myMilestones : myMilestones.filter(m => m.projectId === Number(selectedProject));
  const done = filtered.filter(m => m.completed).length;

  const handleAdd = (e) => {
    e.preventDefault();
    addMilestone({ ...form, projectId: Number(form.projectId), completed: false });
    setForm({ projectId: '', title: '', desc: '', dueDate: '' });
    setShowForm(false);
  };

  return (
    <div className="student-milestones page-enter">
      <div className="page-header">
        <div>
          <h1>Milestones</h1>
          <p className="page-sub">{done}/{filtered.length} completed</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}><FiPlus /> Add Milestone</button>
      </div>

      <div className="milestone-progress-bar-wrap card" style={{ padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontWeight: 700 }}>Overall Milestone Progress</span>
          <span style={{ color: 'var(--primary-light)', fontWeight: 700 }}>{filtered.length ? Math.round((done / filtered.length) * 100) : 0}%</span>
        </div>
        <div className="progress-bar" style={{ height: 10 }}>
          <div style={{ width: `${filtered.length ? (done / filtered.length) * 100 : 0}%` }} />
        </div>
      </div>

      <div className="project-filter">
        <button className={`filter-btn ${selectedProject === 'all' ? 'active' : ''}`} onClick={() => setSelectedProject('all')}>All Projects</button>
        {myProjects.map(p => (
          <button key={p.id} className={`filter-btn ${selectedProject === String(p.id) ? 'active' : ''}`} onClick={() => setSelectedProject(String(p.id))}>
            {p.title}
          </button>
        ))}
      </div>

      {myProjects.filter(p => selectedProject === 'all' || p.id === Number(selectedProject)).map(proj => {
        const projMilestones = filtered.filter(m => m.projectId === proj.id);
        if (projMilestones.length === 0) return null;
        return (
          <div key={proj.id} className="milestone-group">
            <div className="milestone-group-header">
              <FiFlag size={16} color="var(--primary-light)" />
              <span>{proj.title}</span>
              <span className="badge badge-primary">{projMilestones.filter(m => m.completed).length}/{projMilestones.length}</span>
            </div>
            <div className="milestones-list">
              {projMilestones.map(m => (
                <div key={m.id} className={`milestone-item card ${m.completed ? 'done' : ''}`}>
                  <button className={`ms-check ${m.completed ? 'checked' : ''}`} onClick={() => toggleMilestone(m.id)}>
                    {m.completed && <FiCheck size={14} />}
                  </button>
                  <div className="ms-content">
                    <div className="ms-title">{m.title}</div>
                    {m.desc && <div className="ms-desc">{m.desc}</div>}
                    {m.dueDate && <div className="ms-due">Due: {m.dueDate}</div>}
                  </div>
                  <button className="icon-btn danger" onClick={() => deleteMilestone(m.id)}><FiTrash2 size={13} /></button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && <div className="empty-state">No milestones yet. Add one to track your progress!</div>}

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-box card" onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ marginBottom: 20 }}>
              <h2>Add Milestone</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}><FiX /></button>
            </div>
            <form onSubmit={handleAdd} className="auth-form" style={{ gap: 14 }}>
              <div className="form-group">
                <label>Project</label>
                <select className="input-field" value={form.projectId} onChange={e => setForm({ ...form, projectId: e.target.value })} required>
                  <option value="">Select project</option>
                  {myProjects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Milestone Title</label>
                <input className="input-field" placeholder="e.g. Complete UI Design" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input className="input-field" placeholder="Brief description..." value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Due Date</label>
                <input className="input-field" type="date" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Add Milestone</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
