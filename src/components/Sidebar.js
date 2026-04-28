import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

export default function Sidebar({ links, title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <aside className="sidebar glass">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="brand-icon">SP</div>
          <span style={{ fontWeight: 800, fontSize: 16 }}>StudPortfolio</span>
        </div>
        <div className="sidebar-role">{title}</div>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-avatar">{user?.avatar}</div>
        <div>
          <div className="sidebar-name">{user?.name}</div>
          <div className="sidebar-email">{user?.email}</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        <FiLogOut size={18} /> Logout
      </button>
    </aside>
  );
}
