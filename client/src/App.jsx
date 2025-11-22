import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import SubmitGrievance from './pages/SubmitGrievance';
import AdminDashboard from './pages/AdminDashboard';
import Register from './pages/Register';

// Layout Wrapper
const DashboardLayout = () => (
  <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
    <Navbar />
    <div className="flex flex-1 max-w-7xl mx-auto w-full">
      <Sidebar />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full">
        <Outlet />
      </main>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{
         style: { background: '#1e293b', color: '#fff' },
      }} />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 

        {/* Protected Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/student/dashboard" element={
            <ProtectedRoute allowedRoles={['Student']}>
              <StudentDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/submit-grievance" element={
            <ProtectedRoute allowedRoles={['Student']}>
              <SubmitGrievance />
            </ProtectedRoute>
          } />
          
          <Route path="/admin/dashboard" element={
            <ProtectedRoute allowedRoles={['DeptAdmin', 'SuperAdmin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}