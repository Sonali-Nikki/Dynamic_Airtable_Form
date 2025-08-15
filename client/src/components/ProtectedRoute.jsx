// client/src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from './Loader';
import { getUserProfile } from '../api/api';

/*
  Use this to wrap pages that require a logged-in user:
  <ProtectedRoute><YourPage/></ProtectedRoute>
*/
export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState({ loading: true, ok: false });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        if (!cancelled) setStatus({ loading: false, ok: false });
        return;
      }
      try {
        // If your getUserProfile returns the object differently adjust accordingly
        await getUserProfile();
        if (!cancelled) setStatus({ loading: false, ok: true });
      } catch (e) {
        if (!cancelled) setStatus({ loading: false, ok: false });
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (status.loading) return <Loader />;
  if (!status.ok) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
