// src/contexts/NotificationContext.js

import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the NotificationContext
const NotificationContext = createContext();

// Custom hook to access the context
export const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    // Function to add a new notification
    const addNotification = useCallback((message, type = 'info', duration = 5000) => {
        const id = Date.now();
        const newNotification = { id, message, type };
        
        setNotifications((prevNotifications) => [...prevNotifications, newNotification]);

        // Remove notification after the specified duration
        setTimeout(() => {
            setNotifications((prevNotifications) =>
                prevNotifications.filter((notification) => notification.id !== id)
            );
        }, duration);
    }, []);

    // Function to manually remove a notification
    const removeNotification = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;
