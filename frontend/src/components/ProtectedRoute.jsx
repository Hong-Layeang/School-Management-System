import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { auth, loading } = useContext(AuthContext);

  if (loading) {
    // Optionally show a loading spinner or null
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
} 