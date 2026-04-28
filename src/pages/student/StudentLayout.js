import React from 'react';
import { Outlet } from 'react-router-dom';
import { FiGrid, FiFolder, FiUser, FiFlag, FiMessageSquare, FiGlobe } from 'react-icons/fi';
import Sidebar from '../../components/Sidebar';
import '../admin/AdminLayout.css';

const LINKS = [
  { to: '/student', icon: FiGrid, label: 'Dashboard' },
  { to: '/student/projects', icon: FiFolder, label: 'My Projects' },
  { to: '/student/milestones', icon: FiFlag, label: 'Milestones' },
  { to: '/student/portfolio', icon: FiUser, label: 'My Portfolio' },
  { to: '/student/feedback', icon: FiMessageSquare, label: 'Feedback' },
  { to: '/student/explore', icon: FiGlobe, label: 'Explore' },
];

export default function StudentLayout() {
  return (
    <div className="admin-layout">
      <Sidebar links={LINKS} title="Student Panel" />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
