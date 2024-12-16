import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    role: localStorage.getItem('role') || null,
    username: localStorage.getItem('username') || null,
    userId: localStorage.getItem('userId') || null, // Use userId
  });

  useEffect(() => {
    if (auth.role) {
      localStorage.setItem('role', auth.role);
      localStorage.setItem('username', auth.username);
      localStorage.setItem('userId', auth.userId); // Save userId correctly
    } else {
      localStorage.removeItem('role');
      localStorage.removeItem('username');
      localStorage.removeItem('userId'); // Remove userId when logged out
    }
  }, [auth]);

  const login = (role, username, userId) => {
    setAuth({ role, username, userId }); // Make sure userId is included in login
  };

  const logout = () => {
    setAuth({ role: null, username: null, userId: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
