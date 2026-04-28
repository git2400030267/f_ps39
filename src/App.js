import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminStudents from './pages/admin/AdminStudents';
import AdminProjects from './pages/admin/AdminProjects';
import AdminFeedback from './pages/admin/AdminFeedback';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';

import StudentLayout from './pages/student/StudentLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProjects from './pages/student/StudentProjects';
import StudentMilestones from './pages/student/StudentMilestones';
import StudentPortfolio from './pages/student/StudentPortfolio';
import StudentFeedback from './pages/student/StudentFeedback';
import StudentExplore from './pages/student/StudentExplore';

function ProtectedRoute({ children, role }) {

  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return (
      <Navigate
        to={user.role === 'ADMIN' ? '/admin' : '/student'}
        replace
      />
    );
  }

  return children;
}

function PublicRoute({ children }) {

  const { user } = useAuth();

  if (user) {
    return (
      <Navigate
        to={user.role === 'ADMIN' ? '/admin' : '/student'}
        replace
      />
    );
  }

  return children;
}

function AppRoutes() {

  return (
    <Routes>

      {/* Public */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <Home />
          </>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <>
              <Navbar />
              <Login />
            </>
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <>
              <Navbar />
              <Signup />
            </>
          </PublicRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="students" element={<AdminStudents />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="feedback" element={<AdminFeedback />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Student */}
      <Route
        path="/student"
        element={
          <ProtectedRoute role="STUDENT">
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="projects" element={<StudentProjects />} />
        <Route path="milestones" element={<StudentMilestones />} />
        <Route path="portfolio" element={<StudentPortfolio />} />
        <Route path="feedback" element={<StudentFeedback />} />
        <Route path="explore" element={<StudentExplore />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}