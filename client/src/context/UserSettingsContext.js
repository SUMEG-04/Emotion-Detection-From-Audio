// src/contexts/UserSettingsContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the UserSettingsContext
const UserSettingsContext = createContext();

// Custom hook for accessing the context
export const useUserSettings = () => useContext(UserSettingsContext);

const UserSettingsProvider = ({ children }) => {
    // Default settings (can be expanded based on app requirements)
    const defaultSettings = {
        theme: 'light',      // Options could be 'light' or 'dark'
        notifications: true, // Toggle in-app notifications
    };

    // Load settings from local storage or fallback to defaults
    const getInitialSettings = () => {
        const savedSettings = localStorage.getItem('userSettings');
        return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    };

    const [settings, setSettings] = useState(getInitialSettings);

    // Save settings to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('userSettings', JSON.stringify(settings));
    }, [settings]);

    // Function to update settings
    const updateSettings = (newSettings) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            ...newSettings,
        }));
    };

    return (
        <UserSettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </UserSettingsContext.Provider>
    );
};

export default UserSettingsProvider;
