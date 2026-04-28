import React, { useState } from 'react';
import { FiSearch, FiFilter, FiEye, FiHeart, FiTrash2 } from 'react-icons/fi';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import '../admin/AdminStudents.css';
import './AdminProjects.css';

const STATUSES = ['All', 'In Progress', 'Completed', 'Pending'];
const CATEGORIES = ['All', 'Web Dev', 'AI/ML', 'Data Science', 'Mobile', 'Other'];

export default function AdminProjects() {
  const { projects, deleteProject } = useData();
  const { users } = useAuth();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [category, setCategory] = useState('All');

  const filtered = projects.filter(p =>
    (status === 'All' || p.status === status) &&
    (category === 'All' || p.category === category) &&
    (p.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="admin-projects page-enter">
      <div className="page-header">
        <div><h1>All Projects</h1><p className="page-sub">{projects.length} total projects</p></div>
      </div>

      <div className="filters-row">
        <div className="search-bar card" style={{ padding: '12px 16px', flex: 1 }}>
          <FiSearch color="var(--text3)" />
          <input className="search-input" placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="filter-group">
          <FiFilter size={14} />
          <select className="input-field" value={status} onChange={e => setStatus(e.target.value)} style={{ width: 140 }}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <select className="input-field" value={category} onChange={e => setCategory(e.target.value)} style={{ width: 140 }}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="projects-grid">
        {filtered.map(p => {
          const student = users.find(u => u.id === p.userId);
          return (
            <div key={p.id} className="project-card card">
              {p.thumbnail && <img src={p.thumbnail} alt={p.title} className="project-thumb" />}
              <div className="project-card-body">
                <div className="project-card-top">
                  <span className="badge badge-primary">{p.category}</span>
                  <span className={`badge ${p.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span>
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                </div>
                <div className="project-progress">
                  <div className="progress-bar"><div style={{ width: `${p.progress}%` }} /></div>
                  <span>{p.progress}%</span>
                </div>
                <div className="project-footer">
                  <div className="project-student">
                    <div className="mini-avatar">{student?.avatar}</div>
                    <span>{student?.name}</span>
                  </div>
                  <div className="project-actions">
                    <span className="action-stat"><FiHeart size={13} /> {p.likes}</span>
                    <button className="icon-btn danger" onClick={() => deleteProject(p.id)}><FiTrash2 size={14} /></button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && <div className="empty-state">No projects found</div>}
    </div>
  );
}
