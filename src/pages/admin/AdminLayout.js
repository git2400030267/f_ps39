import React from 'react';
import { Outlet } from 'react-router-dom';
import { FiGrid, FiUsers, FiFolderPlus, FiMessageSquare, FiBarChart2, FiSettings } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import './AdminLayout.css';

const LINKS = [
  { to: '/admin', icon: FiGrid, label: 'Dashboard' },
  { to: '/admin/students', icon: FiUsers, label: 'Students' },
  { to: '/admin/projects', icon: FiFolderPlus, label: 'All Projects' },
  { to: '/admin/feedback', icon: FiMessageSquare, label: 'Feedback' },
  { to: '/admin/analytics', icon: FiBarChart2, label: 'Analytics' },
  { to: '/admin/settings', icon: FiSettings, label: 'Settings' },
];

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <Sidebar links={LINKS} title="Admin Panel" />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
