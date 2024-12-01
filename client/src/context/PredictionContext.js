// PredictionContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchPrediction, fetchResultsHistory, fetchEmotionData } from '../services/predictionService';

const PredictionContext = createContext();

export const usePrediction = () => useContext(PredictionContext);

export const PredictionProvider = ({ children }) => {
    const [prediction, setPrediction] = useState(null);
    const [resultsHistory, setResultsHistory] = useState([]);
    const [emotionData, setEmotionData] = useState({});

    // Function to fetch and set prediction
    const getPrediction = async (fileId) => {
        try {
            const data = await fetchPrediction(fileId);
            setPrediction(data);
        } catch (error) {
            console.error("Error in getPrediction:", error);
        }
    };

    // Function to fetch and set results history
    const loadResultsHistory = async () => {
        try {
            const historyData = await fetchResultsHistory();
            setResultsHistory(historyData);
        } catch (error) {
            console.error("Error in loadResultsHistory:", error);
        }
    };

    // Function to fetch and set emotion data
    const loadEmotionData = async () => {
        try {
            const emotionData = await fetchEmotionData();
            setEmotionData(emotionData);
        } catch (error) {
            console.error("Error in loadEmotionData:", error);
        }
    };

    useEffect(() => {
        // Load results history and emotion data on component mount
        loadResultsHistory();
        loadEmotionData();
    }, []);

    return (
        <PredictionContext.Provider
            value={{
                prediction,
                resultsHistory,
                emotionData,
                getPrediction,
                loadResultsHistory,
                loadEmotionData,
            }}
        >
            {children}
        </PredictionContext.Provider>
    );
};
