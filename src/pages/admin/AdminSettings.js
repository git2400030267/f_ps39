import React, { useState } from 'react';
import { FiSave, FiBell, FiShield, FiGlobe } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './AdminSettings.css';

export default function AdminSettings() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '', dept: user?.dept || '' });
  const [notifs, setNotifs] = useState({ newProject: true, feedback: true, milestone: false });
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="admin-settings page-enter">
      <div className="page-header">
        <div><h1>Settings</h1><p className="page-sub">Manage your account and platform preferences</p></div>
      </div>

      <div className="settings-grid">
        <div className="card settings-card">
          <div className="settings-section-title"><FiShield size={16} /> Profile Settings</div>
          <div className="auth-form" style={{ gap: 16 }}>
            <div className="form-group">
              <label>Full Name</label>
              <input className="input-field" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input className="input-field" type="email" value={profile.email} onChange={e => setProfile({ ...profile, email: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Department</label>
              <input className="input-field" value={profile.dept} onChange={e => setProfile({ ...profile, dept: e.target.value })} />
            </div>
            {saved && <div className="success-msg">✓ Settings saved!</div>}
            <button className="btn btn-primary" onClick={save}><FiSave /> Save Changes</button>
          </div>
        </div>

        <div className="card settings-card">
          <div className="settings-section-title"><FiBell size={16} /> Notifications</div>
          <div className="notif-list">
            {[
              { key: 'newProject', label: 'New project submitted', desc: 'Get notified when a student submits a project' },
              { key: 'feedback', label: 'Feedback responses', desc: 'When students respond to your feedback' },
              { key: 'milestone', label: 'Milestone updates', desc: 'When students complete milestones' },
            ].map(n => (
              <div key={n.key} className="notif-item">
                <div>
                  <div className="notif-label">{n.label}</div>
                  <div className="notif-desc">{n.desc}</div>
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={notifs[n.key]} onChange={() => setNotifs(p => ({ ...p, [n.key]: !p[n.key] }))} />
                  <span className="toggle-slider" />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="card settings-card">
          <div className="settings-section-title"><FiGlobe size={16} /> Platform Info</div>
          <div className="info-list">
            <div className="detail-row"><span>Role</span><span className="badge badge-primary">Admin</span></div>
            <div className="detail-row"><span>Account ID</span><span>#{user?.id}</span></div>
            <div className="detail-row"><span>Platform Version</span><span>v1.0.0</span></div>
            <div className="detail-row"><span>Status</span><span className="badge badge-success">Active</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
