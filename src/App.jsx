import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/modules/auth/components/AuthProvider';
import Navbar from '@/shared/components/Navbar';
import Footer from '@/shared/components/Footer';
import HomePage from '@/app/pages/HomePage';
import ProfilePage from '@/app/pages/ProfilePage';
import SharedPage from '@/app/pages/SharedPage';
import LoginPage from '@/app/pages/LoginPage';
import ProtectedRoute from '@/shared/components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-secondary-50">
          <Navbar />
          <main className="flex-grow py-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shared" element={<SharedPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}