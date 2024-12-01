// src/services/userService.js

import {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    syncProblems
} from './api';

// Function to register a new user
export const registerNewUser = async (userData) => {
    try {
        const response = await registerUser(userData);
        return response; // Returns the user registration data (including the token)
    } catch (error) {
        console.error('Error registering user:', error.message);
        throw new Error('Failed to register user.');
    }
};

// Function to log in a user
export const loginUserService = async (userData) => {
    try {
        const response = await loginUser(userData);
        return response; // Returns user authentication data (including the token)
    } catch (error) {
        console.error('Error logging in user:', error.message);
        throw new Error('Failed to log in user.');
    }
};

// Function to get the user's profile
export const fetchUserProfile = async () => {
    try {
        const response = await getUserProfile();
        
        return response; // Returns user profile data
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        throw new Error('Failed to fetch user profile.');
    }
};

// Function to update the user's profile
export const updateProfileService = async (userData) => {
    try {
        const response = await updateUserProfile(userData);
        return response; // Returns updated user profile data
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        throw new Error('Failed to update user profile.');
    }
};
