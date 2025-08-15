// client/src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { getUserProfile } from '../api/api';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const profile = await getUserProfile();
        // getUserProfile returns data (see your api.js). If it returns {user} adjust accordingly.
        setUser(profile?.user || profile);
      } catch (e) {
        // Not logged in or token invalid -> ignore
        setUser(null);
      }
    };
    load();
  }, []);

  const handleLogout = async () => {
    try {
      // backend endpoint for logout: POST /api/auth/logout (if implemented)
      await api.post('/auth/logout');
    } catch (e) {
      // ignore
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <nav className="w-full bg-white border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-lg">Airtable Form Builder</Link>
        <Link to="/form-builder" className="text-sm text-gray-600 hover:underline">Create Form</Link>
        <Link to="/forms" className="text-sm text-gray-600 hover:underline">My Forms</Link>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="text-sm text-gray-700">Hi, {user.name || user.email}</div>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="px-3 py-1 bg-blue-500 text-white rounded">Login</Link>
        )}
      </div>
    </nav>
  );
}
