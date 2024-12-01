// predictionService.js

import api from '../api/apiConfig';

// Function to fetch prediction for a specific file
export const fetchPrediction = async (fileId) => {
    try {
        const response = await api.get(`/predictions/${fileId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching prediction:", error);
        throw error;
    }
};

// Function to fetch results history for the current user
export const fetchResultsHistory = async () => {
    try {
        const response = await api.get('/predictions/history');
        return response.data;
    } catch (error) {
        console.error("Error fetching results history:", error);
        throw error;
    }
};

// Function to fetch emotion distribution data
export const fetchEmotionData = async () => {
    try {
        const response = await api.get('/predictions/emotion-data');
        return response.data;
    } catch (error) {
        console.error("Error fetching emotion data:", error);
        throw error;
    }
};
