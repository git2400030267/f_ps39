import React, { useState } from 'react';
import { FiSearch, FiUser, FiFolder, FiEye } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import './AdminStudents.css';

export default function AdminStudents() {
  const { users } = useAuth();
  const { projects, portfolios } = useData();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const students = users.filter(u => u.role === 'student' && u.name.toLowerCase().includes(search.toLowerCase()));

  const getStudentProjects = (id) => projects.filter(p => p.userId === id);
  const getPortfolio = (id) => portfolios.find(p => p.userId === id);

  return (
    <div className="admin-students page-enter">
      <div className="page-header">
        <div><h1>Students</h1><p className="page-sub">Manage all registered students</p></div>
      </div>

      <div className="search-bar card" style={{ padding: '14px 18px', marginBottom: 20 }}>
        <FiSearch color="var(--text3)" />
        <input className="search-input" placeholder="Search students by name..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="students-grid">
        {students.map(s => {
          const sProjects = getStudentProjects(s.id);
          const portfolio = getPortfolio(s.id);
          const completed = sProjects.filter(p => p.status === 'Completed').length;
          return (
            <div key={s.id} className="student-card card" onClick={() => setSelected(s)}>
              <div className="student-card-header">
                <div className="student-avatar-lg">{s.avatar}</div>
                <div>
                  <div className="student-card-name">{s.name}</div>
                  <div className="student-card-email">{s.email}</div>
                </div>
              </div>
              <div className="student-meta">
                {s.dept && <span className="badge badge-primary">{s.dept}</span>}
                {s.year && <span className="badge badge-info">{s.year}</span>}
              </div>
              <div className="student-stats">
                <div className="s-stat"><FiFolder size={14} /><span>{sProjects.length} Projects</span></div>
                <div className="s-stat"><span style={{ color: 'var(--success)' }}>✓</span><span>{completed} Done</span></div>
                <div className="s-stat"><FiUser size={14} /><span>{portfolio ? 'Portfolio ✓' : 'No Portfolio'}</span></div>
              </div>
              <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>
                <FiEye /> View Details
              </button>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="student-avatar-lg" style={{ width: 56, height: 56, fontSize: 20 }}>{selected.avatar}</div>
              <div>
                <h2>{selected.name}</h2>
                <p style={{ color: 'var(--text2)', fontSize: 14 }}>{selected.email}</p>
              </div>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="detail-row"><span>Department</span><span>{selected.dept || '—'}</span></div>
              <div className="detail-row"><span>Year</span><span>{selected.year || '—'}</span></div>
              <div className="detail-row"><span>Projects</span><span>{getStudentProjects(selected.id).length}</span></div>
              <div className="detail-row"><span>Portfolio</span><span>{getPortfolio(selected.id) ? 'Created' : 'Not created'}</span></div>
              <h4 style={{ marginTop: 16, marginBottom: 10 }}>Projects</h4>
              {getStudentProjects(selected.id).map(p => (
                <div key={p.id} className="modal-project">
                  <span>{p.title}</span>
                  <span className={`badge ${p.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
