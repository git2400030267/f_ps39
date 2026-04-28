import React, { useState } from 'react';
import { FiSend, FiStar } from 'react-icons/fi';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import './AdminFeedback.css';

export default function AdminFeedback() {
  const { projects, feedback, addFeedback } = useData();
  const { user, users } = useAuth();
  const [form, setForm] = useState({ projectId: '', text: '', rating: 5 });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.projectId || !form.text) return;
    addFeedback({ ...form, projectId: Number(form.projectId), adminId: user.id, adminName: user.name });
    setForm({ projectId: '', text: '', rating: 5 });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="admin-feedback page-enter">
      <div className="page-header">
        <div><h1>Feedback</h1><p className="page-sub">Review and provide feedback on student projects</p></div>
      </div>

      <div className="feedback-layout">
        <div className="card feedback-form-card">
          <h3 style={{ marginBottom: 20 }}>Give Feedback</h3>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Select Project</label>
              <select className="input-field" value={form.projectId} onChange={e => setForm({ ...form, projectId: e.target.value })} required>
                <option value="">Choose a project...</option>
                {projects.map(p => {
                  const student = users.find(u => u.id === p.userId);
                  return <option key={p.id} value={p.id}>{p.title} — {student?.name}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Rating</label>
              <div className="star-rating">
                {[1,2,3,4,5].map(n => (
                  <button key={n} type="button" className={`star-btn ${n <= form.rating ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, rating: n })}>
                    <FiStar size={22} />
                  </button>
                ))}
                <span className="rating-label">{form.rating}/5</span>
              </div>
            </div>
            <div className="form-group">
              <label>Feedback Comments</label>
              <textarea className="input-field" rows={5} placeholder="Write detailed feedback for the student..."
                value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} required />
            </div>
            {success && <div className="success-msg">✓ Feedback submitted successfully!</div>}
            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center' }}>
              <FiSend /> Submit Feedback
            </button>
          </form>
        </div>

        <div className="feedback-list">
          <h3 style={{ marginBottom: 16 }}>Recent Feedback ({feedback.length})</h3>
          {feedback.length === 0 && <div className="empty-state">No feedback given yet</div>}
          {[...feedback].reverse().map(fb => {
            const project = projects.find(p => p.id === fb.projectId);
            const student = users.find(u => u.id === project?.userId);
            return (
              <div key={fb.id} className="card feedback-item">
                <div className="fb-header">
                  <div>
                    <div className="fb-project">{project?.title || 'Unknown Project'}</div>
                    <div className="fb-student">Student: {student?.name}</div>
                  </div>
                  <div className="fb-stars">
                    {'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}
                  </div>
                </div>
                <p className="fb-text">{fb.text}</p>
                <div className="fb-meta">By {fb.adminName} · {fb.createdAt}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
