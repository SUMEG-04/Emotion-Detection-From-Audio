// src/services/authService.js

import axios from 'axios';

// Base URL for authentication API endpoints
const BASE_URL = process.env.REACT_APP_API_URL || 'https://api.yourapp.com';

const authService = {
    // Login method
    login: async (email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
            const { token, user } = response.data;

            // Store token in local storage for persistence
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            return { success: true, user };
        } catch (error) {
            console.error('Login failed', error);
            return { success: false, message: error.response?.data?.message || 'Login error' };
        }
    },

    // Signup method
    signup: async (name, email, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/auth/signup`, { name, email, password });
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Signup failed', error);
            return { success: false, message: error.response?.data?.message || 'Signup error' };
        }
    },

    // Logout method
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // You may also want to clear other user-specific data here if needed
    },

    // Method to get the current authenticated user
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Method to get the authentication token
    getToken: () => {
        return localStorage.getItem('token');
    },

    // Method to check if the user is authenticated
    isAuthenticated: () => {
        return !!authService.getToken();
    }
};

export default authService;
