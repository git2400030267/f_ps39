import React, { useState } from 'react';
import { FiSave, FiGithub, FiLinkedin, FiGlobe, FiPlus, FiX, FiEye } from 'react-icons/fi';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import './StudentPortfolio.css';

export default function StudentPortfolio() {
  const { user } = useAuth();
  const { portfolios, savePortfolio, projects } = useData();
  const existing = portfolios.find(p => p.userId === user.id);
  const myProjects = projects.filter(p => p.userId === user.id);

  const [form, setForm] = useState({
    bio: existing?.bio || '',
    skills: existing?.skills || [],
    github: existing?.github || '',
    linkedin: existing?.linkedin || '',
    website: existing?.website || '',
    isPublic: existing?.isPublic ?? true,
  });
  const [skillInput, setSkillInput] = useState('');
  const [saved, setSaved] = useState(false);
  const [preview, setPreview] = useState(false);

  const addSkill = () => {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      setForm(f => ({ ...f, skills: [...f.skills, skillInput.trim()] }));
      setSkillInput('');
    }
  };
  const removeSkill = (s) => setForm(f => ({ ...f, skills: f.skills.filter(sk => sk !== s) }));

  const handleSave = () => {
    savePortfolio(user.id, form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (preview) return (
    <div className="portfolio-preview page-enter">
      <div className="page-header">
        <h1>Portfolio Preview</h1>
        <button className="btn btn-outline" onClick={() => setPreview(false)}><FiX /> Close Preview</button>
      </div>
      <div className="preview-card card">
        <div className="preview-header">
          <div className="preview-avatar">{user.avatar}</div>
          <div>
            <h2>{user.name}</h2>
            <p style={{ color: 'var(--text2)', fontSize: 14 }}>{user.dept} · {user.year}</p>
            <div className="preview-links">
              {form.github && <a href={`https://${form.github}`} target="_blank" rel="noreferrer" className="preview-link"><FiGithub /> {form.github}</a>}
              {form.linkedin && <a href={`https://${form.linkedin}`} target="_blank" rel="noreferrer" className="preview-link"><FiLinkedin /> LinkedIn</a>}
              {form.website && <a href={`https://${form.website}`} target="_blank" rel="noreferrer" className="preview-link"><FiGlobe /> {form.website}</a>}
            </div>
          </div>
        </div>
        {form.bio && <p className="preview-bio">{form.bio}</p>}
        {form.skills.length > 0 && (
          <div className="preview-section">
            <h3>Skills</h3>
            <div className="project-tech">{form.skills.map(s => <span key={s} className="tech-tag">{s}</span>)}</div>
          </div>
        )}
        <div className="preview-section">
          <h3>Projects ({myProjects.length})</h3>
          <div className="preview-projects">
            {myProjects.map(p => (
              <div key={p.id} className="preview-project card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <strong>{p.title}</strong>
                  <span className={`badge ${p.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 8 }}>{p.desc}</p>
                <div className="project-tech">{p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="student-portfolio page-enter">
      <div className="page-header">
        <div><h1>My Portfolio</h1><p className="page-sub">Build your professional portfolio</p></div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-outline" onClick={() => setPreview(true)}><FiEye /> Preview</button>
          <button className="btn btn-primary" onClick={handleSave}><FiSave /> Save Portfolio</button>
        </div>
      </div>

      {saved && <div className="success-msg" style={{ marginBottom: 20 }}>✓ Portfolio saved successfully!</div>}

      <div className="portfolio-grid">
        <div className="card portfolio-section">
          <h3 className="section-title">About Me</h3>
          <div className="form-group">
            <label>Bio</label>
            <textarea className="input-field" rows={4} placeholder="Tell the world about yourself, your interests, and goals..."
              value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
          </div>
          <div className="form-group" style={{ marginTop: 16 }}>
            <label>Visibility</label>
            <div className="visibility-toggle">
              <label className="toggle">
                <input type="checkbox" checked={form.isPublic} onChange={() => setForm(f => ({ ...f, isPublic: !f.isPublic }))} />
                <span className="toggle-slider" />
              </label>
              <span style={{ fontSize: 14, color: 'var(--text2)' }}>{form.isPublic ? 'Public Portfolio' : 'Private Portfolio'}</span>
            </div>
          </div>
        </div>

        <div className="card portfolio-section">
          <h3 className="section-title">Social Links</h3>
          <div className="auth-form" style={{ gap: 14 }}>
            <div className="form-group">
              <label><FiGithub size={13} /> GitHub</label>
              <input className="input-field" placeholder="github.com/username" value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} />
            </div>
            <div className="form-group">
              <label><FiLinkedin size={13} /> LinkedIn</label>
              <input className="input-field" placeholder="linkedin.com/in/username" value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} />
            </div>
            <div className="form-group">
              <label><FiGlobe size={13} /> Website</label>
              <input className="input-field" placeholder="yourwebsite.com" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} />
            </div>
          </div>
        </div>

        <div className="card portfolio-section" style={{ gridColumn: '1 / -1' }}>
          <h3 className="section-title">Skills</h3>
          <div className="skill-input-row">
            <input className="input-field" placeholder="Add a skill (e.g. React, Python...)" value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())} />
            <button className="btn btn-primary" onClick={addSkill}><FiPlus /> Add</button>
          </div>
          <div className="skills-display">
            {form.skills.map(s => (
              <span key={s} className="skill-chip">
                {s}
                <button onClick={() => removeSkill(s)}><FiX size={12} /></button>
              </span>
            ))}
            {form.skills.length === 0 && <span style={{ color: 'var(--text3)', fontSize: 13 }}>No skills added yet</span>}
          </div>
        </div>

        <div className="card portfolio-section" style={{ gridColumn: '1 / -1' }}>
          <h3 className="section-title">Projects in Portfolio ({myProjects.length})</h3>
          {myProjects.length === 0 && <p style={{ color: 'var(--text3)', fontSize: 14 }}>Add projects from the Projects section to include them here.</p>}
          <div className="portfolio-projects-list">
            {myProjects.map(p => (
              <div key={p.id} className="portfolio-project-row">
                <div>
                  <strong>{p.title}</strong>
                  <span style={{ color: 'var(--text3)', fontSize: 12, marginLeft: 10 }}>{p.category}</span>
                </div>
                <span className={`badge ${p.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
