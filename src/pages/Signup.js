import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiUserPlus, FiEye, FiEyeOff, FiBook } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const DEPTS = ['Computer Science', 'Data Science', 'Electronics', 'Mechanical', 'Civil', 'Business'];
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', dept: '', year: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password.length < 6) {
    setError('Password must be at least 6 characters');
    return;
  }

  setLoading(true);
  setError('');

  try {

    const response = await fetch("http://localhost:8081/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.text();

    if (response.ok) {
      alert(data);
      navigate('/login');
    } else {
      setError(data);
    }

  } catch (err) {
    setError("Server error");
  }

  setLoading(false);
};

  return (
    <div className="auth-page page-enter">
      <div className="auth-bg">
        <div className="auth-orb orb1" /><div className="auth-orb orb2" />
      </div>
      <div className="auth-card glass" style={{ maxWidth: 480 }}>
        <div className="auth-logo">
          <div className="brand-icon" style={{ width: 48, height: 48, fontSize: 18 }}>SP</div>
        </div>
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-sub">Join StudPortfolio as a student</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrap">
              <FiUser className="input-icon" />
              <input className="input-field input-with-icon" placeholder="John Doe"
                value={form.name} onChange={e => set('name', e.target.value)} required />
            </div>
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrap">
              <FiMail className="input-icon" />
              <input className="input-field input-with-icon" type="email" placeholder="you@example.com"
                value={form.email} onChange={e => set('email', e.target.value)} required />
            </div>
          </div>
          <div className="grid-2">
            <div className="form-group">
              <label>Department</label>
              <div className="input-wrap">
                <FiBook className="input-icon" />
                <select className="input-field input-with-icon" value={form.dept} onChange={e => set('dept', e.target.value)} required>
                  <option value="">Select dept</option>
                  {DEPTS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Year</label>
              <select className="input-field" value={form.year} onChange={e => set('year', e.target.value)} required>
                <option value="">Select year</option>
                {YEARS.map(y => <option key={y}>{y}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="input-wrap">
              <FiLock className="input-icon" />
              <input className="input-field input-with-icon" type={showPass ? 'text' : 'password'} placeholder="Min 6 characters"
                value={form.password} onChange={e => set('password', e.target.value)} required />
              <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
            {loading ? <span className="spinner" /> : <><FiUserPlus /> Create Account</>}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
