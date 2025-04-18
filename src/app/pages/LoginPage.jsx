import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthUI from '@/modules/auth/components/AuthUI';
import { useAuthContext } from '@/modules/auth/components/AuthProvider';

export default function LoginPage() {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to home
  const from = location.state?.from?.pathname || '/';
  
  useEffect(() => {
    if (user && !loading) {
      // Redirect to the page they came from or to home
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, from]);
  
  // If user is already logged in, don't show the login page
  if (user) {
    return null;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <AuthUI />
    </div>
  );
}