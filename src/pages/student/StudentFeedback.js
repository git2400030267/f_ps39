import React from 'react';
import { FiMessageSquare, FiStar } from 'react-icons/fi';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import '../admin/AdminFeedback.css';

export default function StudentFeedback() {
  const { user } = useAuth();
  const { projects, feedback } = useData();
  const myProjects = projects.filter(p => p.userId === user.id);
  const myFeedback = feedback.filter(f => myProjects.some(p => p.id === f.projectId));

  const avgRating = myFeedback.length ? (myFeedback.reduce((s, f) => s + f.rating, 0) / myFeedback.length).toFixed(1) : null;

  return (
    <div className="student-feedback page-enter">
      <div className="page-header">
        <div><h1>My Feedback</h1><p className="page-sub">{myFeedback.length} feedback received</p></div>
        {avgRating && (
          <div className="avg-rating-badge">
            <FiStar color="#f59e0b" /> <span>{avgRating}</span> avg rating
          </div>
        )}
      </div>

      {myFeedback.length === 0 && (
        <div className="empty-state card" style={{ padding: 60, textAlign: 'center' }}>
          <FiMessageSquare size={40} color="var(--text3)" style={{ marginBottom: 16 }} />
          <h3 style={{ marginBottom: 8 }}>No feedback yet</h3>
          <p style={{ color: 'var(--text2)' }}>Your teacher will review your projects and provide feedback here.</p>
        </div>
      )}

      <div className="feedback-list">
        {[...myFeedback].reverse().map(fb => {
          const project = myProjects.find(p => p.id === fb.projectId);
          return (
            <div key={fb.id} className="card feedback-item" style={{ marginBottom: 16 }}>
              <div className="fb-header">
                <div>
                  <div className="fb-project">{project?.title}</div>
                  <div className="fb-student">From: {fb.adminName} · {fb.createdAt}</div>
                </div>
                <div>
                  <div className="fb-stars">{'★'.repeat(fb.rating)}{'☆'.repeat(5 - fb.rating)}</div>
                  <div style={{ fontSize: 12, color: 'var(--text3)', textAlign: 'right', marginTop: 2 }}>{fb.rating}/5</div>
                </div>
              </div>
              <p className="fb-text">{fb.text}</p>
              <div className="fb-project-info">
                <span className="badge badge-primary">{project?.category}</span>
                <span className={`badge ${project?.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{project?.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
