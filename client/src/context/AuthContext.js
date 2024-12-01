// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/apiConfig'; // Assuming an API service for authentication requests

// Create the context
const AuthContext = createContext();

// Custom hook for accessing the auth context easily
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to initialize user state based on a stored token
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api
        .get('/auth/validateToken', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem('authToken');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      // Store the token and update the user state
      localStorage.setItem('authToken', token);
      setUser(user);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error('Invalid credentials');
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login');
  };

  // Function to register a new user
  const register = async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;

      // Store the token and update the user state
      localStorage.setItem('authToken', token);
      setUser(user);
      navigate('/dashboard');
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error('Registration failed');
    }
  };

  // Refresh user session or token
  const refreshSession = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await api.get('/auth/refresh', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (error) {
        logout();
      }
    }
  };

  // Auth context value to be shared with all components
  const authContextValue = {
    user,
    login,
    logout,
    register,
    refreshSession,
    isAuthenticated: !!user,
    loading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
