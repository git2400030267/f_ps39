import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiLogIn, FiUserPlus, FiLogOut, FiMenu, FiX, FiUser, FiGrid } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); setMenuOpen(false); };
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar glass">
      <Link to="/" className="navbar-brand">
        <div className="brand-icon">SP</div>
        <span className="brand-name">StudPort<span className="gradient-text">folio</span></span>
      </Link>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
          <FiHome /> Home
        </Link>
        {!user ? (
          <>
            <Link to="/login" className={`nav-link ${isActive('/login') ? 'active' : ''}`} onClick={() => setMenuOpen(false)}>
              <FiLogIn /> Login
            </Link>
            <Link to="/signup" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
              <FiUserPlus /> Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link to={user.role === 'admin' ? '/admin' : '/student'} className="nav-link" onClick={() => setMenuOpen(false)}>
              <FiGrid /> Dashboard
            </Link>
            <div className="nav-user">
              <div className="nav-avatar">{user.avatar}</div>
              <span>{user.name.split(' ')[0]}</span>
            </div>
            <button className="btn btn-outline" onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          </>
        )}
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
    </nav>
  );
}
