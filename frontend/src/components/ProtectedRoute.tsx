'use client'

// src/components/ProtectedRoute.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles = [] }: ProtectedRouteProps) => {
  const { currentUser, userRole, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (!currentUser) {
    router.push('/login');
    return null; // Return null or redirect handled differently
  }

  if (allowedRoles.length > 0 && userRole && !allowedRoles.includes(userRole)) {
    router.push('/'); // Or a "not authorized" page
    return null;
  }

  return children;
};

export default ProtectedRoute;
