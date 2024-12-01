// src/services/analyticsService.js

import api from './apiConfig';

// Fetch usage analytics for a specific user or overall app analytics
export const fetchUserAnalytics = async (userId) => {
  try {
    const response = await api.get(`/analytics/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user analytics:", error);
    throw new Error("Could not fetch user analytics.");
  }
};

// Fetch overall emotion analytics based on predictions
export const fetchEmotionAnalytics = async () => {
  try {
    const response = await api.get('/analytics/emotion');
    return response.data;
  } catch (error) {
    console.error("Error fetching emotion analytics:", error);
    throw new Error("Could not fetch emotion analytics.");
  }
};
