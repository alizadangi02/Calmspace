import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user roles for demonstration
  // In a real app, this would come from your backend
  const mockUsers = {
    'patient@example.com': { role: 'patient', uid: '1' },
    'therapist@example.com': { role: 'therapist', uid: '2' },
    'admin@example.com': { role: 'admin', uid: '3' }
  };

  const login = async (email, password) => {
    // In a real app, this would be an API call
    if (mockUsers[email]) {
      setUser({ ...mockUsers[email], email });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (email, password, role = 'patient') => {
    // In a real app, this would be an API call
    if (!mockUsers[email]) {
      const newUser = {
        email,
        role,
        uid: Date.now().toString()
      };
      mockUsers[email] = newUser;
      setUser(newUser);
      return true;
    }
    return false;
  };

  const value = {
    user,
    login,
    logout,
    signup,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 