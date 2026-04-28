import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUpload, FiTrendingUp, FiMessageSquare, FiAward, FiUsers, FiFolder, FiStar, FiCheckCircle } from 'react-icons/fi';
import './Home.css';

const FEATURES = [
  { icon: FiUpload, title: 'Project Uploads', desc: 'Upload projects with descriptions, images, and tech stacks. Showcase your work beautifully.', color: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  { icon: FiTrendingUp, title: 'Progress Tracking', desc: 'Set milestones, track completion, and visualize your project journey with interactive charts.', color: 'linear-gradient(135deg,#06b6d4,#3b82f6)' },
  { icon: FiMessageSquare, title: 'Expert Feedback', desc: 'Receive detailed feedback and ratings from teachers and mentors on your submissions.', color: 'linear-gradient(135deg,#10b981,#06b6d4)' },
  { icon: FiAward, title: 'Portfolio Builder', desc: 'Build a professional portfolio with skills, bio, and social links to impress recruiters.', color: 'linear-gradient(135deg,#f59e0b,#ef4444)' },
  { icon: FiUsers, title: 'Admin Management', desc: 'Teachers can manage all student submissions, review progress, and provide structured feedback.', color: 'linear-gradient(135deg,#ec4899,#8b5cf6)' },
  { icon: FiFolder, title: 'Media Gallery', desc: 'Attach screenshots, demos, and documents to make your projects stand out.', color: 'linear-gradient(135deg,#14b8a6,#6366f1)' },
];

const STATS = [
  { value: '500+', label: 'Students' },
  { value: '1,200+', label: 'Projects' },
  { value: '50+', label: 'Institutions' },
  { value: '98%', label: 'Satisfaction' },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Create Account', desc: 'Sign up as a student or admin in seconds.' },
  { step: '02', title: 'Upload Projects', desc: 'Add your projects with descriptions and media.' },
  { step: '03', title: 'Track Progress', desc: 'Set milestones and monitor your journey.' },
  { step: '04', title: 'Get Feedback', desc: 'Receive expert reviews and improve your work.' },
];

export default function Home() {
  return (
    <div className="home page-enter">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb orb1" />
          <div className="hero-orb orb2" />
          <div className="hero-orb orb3" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <FiStar size={12} /> The #1 Student Portfolio Platform
          </div>
          <h1 className="hero-title">
            Showcase Your Work,<br />
            <span className="gradient-text">Track Your Growth</span>
          </h1>
          <p className="hero-desc">
            StudPortfolio is the ultimate platform for students to display projects, track milestones,
            and receive expert feedback — all in one beautiful dashboard.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn btn-primary hero-btn">
              Get Started Free <FiArrowRight />
            </Link>
            <Link to="/login" className="btn btn-outline hero-btn">
              Sign In
            </Link>
          </div>
          <div className="hero-demo-creds">
            <span>Demo: <strong>admin@edu.com</strong> / admin123 &nbsp;|&nbsp; <strong>alice@student.com</strong> / pass123</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card-float card1">
            <div className="hc-header">
              <div className="hc-dot green" /><span>AI Chatbot</span>
            </div>
            <div className="hc-progress-bar"><div style={{ width: '65%' }} /></div>
            <span className="hc-pct">65% Complete</span>
          </div>
          <div className="hero-card-float card2">
            <FiCheckCircle color="#10b981" size={20} />
            <span>Milestone Achieved!</span>
          </div>
          <div className="hero-card-float card3">
            <div className="hc-stars">★★★★★</div>
            <span>Teacher Feedback</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        {STATS.map(s => (
          <div key={s.label} className="stat-item">
            <div className="stat-num gradient-text">{s.value}</div>
            <div className="stat-lbl">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="section-header">
          <h2>Everything You Need to <span className="gradient-text">Succeed</span></h2>
          <p>Powerful tools designed for students and educators</p>
        </div>
        <div className="features-grid">
          {FEATURES.map(f => (
            <div key={f.title} className="feature-card card">
              <div className="feature-icon" style={{ background: f.color }}>
                <f.icon size={24} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="how-section">
        <div className="section-header">
          <h2>How It <span className="gradient-text">Works</span></h2>
          <p>Get started in 4 simple steps</p>
        </div>
        <div className="how-grid">
          {HOW_IT_WORKS.map((h, i) => (
            <div key={h.step} className="how-card">
              <div className="how-step">{h.step}</div>
              <h3>{h.title}</h3>
              <p>{h.desc}</p>
              {i < HOW_IT_WORKS.length - 1 && <div className="how-arrow">→</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-box glass">
          <h2>Ready to Build Your <span className="gradient-text">Portfolio?</span></h2>
          <p>Join thousands of students already showcasing their work</p>
          <Link to="/signup" className="btn btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
            Start for Free <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-brand">
          <div className="brand-icon">SP</div>
          <span style={{ fontWeight: 700 }}>StudPortfolio</span>
        </div>
        <p>© 2024 StudPortfolio. Built for students, by educators.</p>
      </footer>
    </div>
  );
}
