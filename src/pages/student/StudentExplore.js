import React, { useState } from 'react';
import { FiSearch, FiHeart, FiEye, FiGithub } from 'react-icons/fi';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import '../admin/AdminProjects.css';
import './StudentExplore.css';

export default function StudentExplore() {
  const { projects, portfolios, likeProject } = useData();
  const { users } = useAuth();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('projects');

  const publicProjects = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  const publicPortfolios = portfolios.filter(p => p.isPublic);

  return (
    <div className="student-explore page-enter">
      <div className="page-header">
        <div><h1>Explore</h1><p className="page-sub">Discover projects and portfolios from all students</p></div>
      </div>

      <div className="explore-tabs">
        <button className={`tab-btn ${tab === 'projects' ? 'active' : ''}`} onClick={() => setTab('projects')}>
          Projects ({projects.length})
        </button>
        <button className={`tab-btn ${tab === 'portfolios' ? 'active' : ''}`} onClick={() => setTab('portfolios')}>
          Portfolios ({publicPortfolios.length})
        </button>
      </div>

      <div className="search-bar card" style={{ padding: '12px 16px', marginBottom: 24 }}>
        <FiSearch color="var(--text3)" />
        <input className="search-input" placeholder={`Search ${tab}...`} value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {tab === 'projects' && (
        <div className="projects-grid">
          {publicProjects.map(p => {
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
                  <div className="project-tech">{p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}</div>
                  <div className="project-footer">
                    <div className="project-student">
                      <div className="mini-avatar">{student?.avatar}</div>
                      <span>{student?.name}</span>
                    </div>
                    <button className="action-stat like-btn" onClick={() => likeProject(p.id)}>
                      <FiHeart size={13} /> {p.likes}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'portfolios' && (
        <div className="portfolios-grid">
          {publicPortfolios.map(port => {
            const student = users.find(u => u.id === port.userId);
            const studentProjects = projects.filter(p => p.userId === port.userId);
            return (
              <div key={port.id} className="portfolio-card card">
                <div className="port-header">
                  <div className="student-avatar-lg">{student?.avatar}</div>
                  <div>
                    <div className="port-name">{student?.name}</div>
                    <div className="port-dept">{student?.dept} · {student?.year}</div>
                  </div>
                </div>
                {port.bio && <p className="port-bio">{port.bio}</p>}
                <div className="port-skills">
                  {port.skills.slice(0, 5).map(s => <span key={s} className="tech-tag">{s}</span>)}
                  {port.skills.length > 5 && <span className="tech-tag">+{port.skills.length - 5}</span>}
                </div>
                <div className="port-footer">
                  <span style={{ fontSize: 13, color: 'var(--text2)' }}>{studentProjects.length} projects</span>
                  {port.github && <a href={`https://${port.github}`} target="_blank" rel="noreferrer" className="port-link"><FiGithub size={14} /></a>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
