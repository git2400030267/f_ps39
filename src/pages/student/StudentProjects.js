import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiHeart } from 'react-icons/fi';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import '../admin/AdminProjects.css';
import './StudentProjects.css';

const CATEGORIES = ['Web Dev', 'AI/ML', 'Data Science', 'Mobile', 'Other'];
const STATUSES = ['In Progress', 'Completed', 'Pending'];
const EMPTY = { title: '', desc: '', tech: '', category: 'Web Dev', status: 'In Progress', progress: 0, thumbnail: '' };

export default function StudentProjects() {
  const { user } = useAuth();
  const { projects, addProject, updateProject, deleteProject, likeProject } = useData();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const myProjects = projects.filter(p => p.userId === user.id);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const openAdd = () => { setForm(EMPTY); setEditing(null); setShowForm(true); };
  const openEdit = (p) => { setForm({ ...p, tech: p.tech.join(', ') }); setEditing(p.id); setShowForm(true); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form, tech: form.tech.split(',').map(t => t.trim()).filter(Boolean), progress: Number(form.progress), userId: user.id };
    if (editing) updateProject(editing, data);
    else addProject(data);
    setShowForm(false);
  };

  return (
    <div className="student-projects page-enter">
      <div className="page-header">
        <div><h1>My Projects</h1><p className="page-sub">{myProjects.length} projects</p></div>
        <button className="btn btn-primary" onClick={openAdd}><FiPlus /> Add Project</button>
      </div>

      {myProjects.length === 0 && (
        <div className="empty-cta card">
          <div className="empty-icon">📁</div>
          <h3>No projects yet</h3>
          <p>Start by adding your first project to showcase your work</p>
          <button className="btn btn-primary" onClick={openAdd}><FiPlus /> Add First Project</button>
        </div>
      )}

      <div className="projects-grid">
        {myProjects.map(p => (
          <div key={p.id} className="project-card card">
            {p.thumbnail && <img src={p.thumbnail} alt={p.title} className="project-thumb" />}
            <div className="project-card-body">
              <div className="project-card-top">
                <span className="badge badge-primary">{p.category}</span>
                <span className={`badge ${p.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span>
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tech">{p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}</div>
              <div className="project-progress">
                <div className="progress-bar"><div style={{ width: `${p.progress}%` }} /></div>
                <span>{p.progress}%</span>
              </div>
              <div className="project-footer">
                <button className="action-stat" style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer' }} onClick={() => likeProject(p.id)}>
                  <FiHeart size={13} /> {p.likes}
                </button>
                <div className="project-actions">
                  <button className="icon-btn" style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--primary-light)' }} onClick={() => openEdit(p)}><FiEdit2 size={14} /></button>
                  <button className="icon-btn danger" onClick={() => deleteProject(p.id)}><FiTrash2 size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-box card" style={{ maxWidth: 560 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header" style={{ marginBottom: 20 }}>
              <h2>{editing ? 'Edit Project' : 'Add New Project'}</h2>
              <button className="modal-close" onClick={() => setShowForm(false)}><FiX /></button>
            </div>
            <form onSubmit={handleSubmit} className="auth-form" style={{ gap: 14 }}>
              <div className="form-group">
                <label>Project Title</label>
                <input className="input-field" placeholder="My Awesome Project" value={form.title} onChange={e => set('title', e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="input-field" rows={3} placeholder="Describe your project..." value={form.desc} onChange={e => set('desc', e.target.value)} required />
              </div>
              <div className="grid-2">
                <div className="form-group">
                  <label>Category</label>
                  <select className="input-field" value={form.category} onChange={e => set('category', e.target.value)}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select className="input-field" value={form.status} onChange={e => set('status', e.target.value)}>
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Technologies (comma separated)</label>
                <input className="input-field" placeholder="React, Node.js, MongoDB" value={form.tech} onChange={e => set('tech', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Progress: {form.progress}%</label>
                <input type="range" min={0} max={100} value={form.progress} onChange={e => set('progress', e.target.value)} className="range-input" />
              </div>
              <div className="form-group">
                <label>Thumbnail URL (optional)</label>
                <input className="input-field" placeholder="https://..." value={form.thumbnail} onChange={e => set('thumbnail', e.target.value)} />
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>{editing ? 'Update' : 'Add Project'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
