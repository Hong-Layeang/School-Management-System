import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext({
  auth: null,
  setAuth: () => {},
  loading: true,
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Optionally check for token expiration
        if (decoded.exp && decoded.exp * 1000 < Date.now()) {
          setAuth(null);
          localStorage.removeItem('token');
        } else {
          setAuth({ ...decoded, token });
        }
      } catch (err) {
        setAuth(null);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}; 