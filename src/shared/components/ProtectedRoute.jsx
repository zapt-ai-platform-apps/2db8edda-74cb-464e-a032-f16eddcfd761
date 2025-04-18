import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '@/modules/auth/components/AuthProvider';
import Loading from './Loading';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return <Loading message="جاري التحقق من تسجيل الدخول..." />;
  }

  if (!user) {
    // Redirect to login page with a redirect URL back to the current page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}