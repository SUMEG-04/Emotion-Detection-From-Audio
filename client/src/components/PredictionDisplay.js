// src/components/PredictionDisplay.js
import React from 'react';
import { PredictionContainer, EmotionText, ConfidenceText, InsightsContainer } from './PredictionDisplay.styled';
import LoadingSpinner from './LoadingSpinner'
import { usePrediction } from '../context/PredictionContext';

const PredictionDisplay = ({ predictedEmotion, confidence, insights }) => {
    const {prediction}=usePrediction()
        return (
            <PredictionContainer>
                <EmotionText>Predicted Emotion: {prediction?predictedEmotion:<LoadingSpinner/>}</EmotionText>
                {confidence && <ConfidenceText>Confidence: {Math.round(confidence * 100)}%</ConfidenceText>}
                {insights && (
                    <InsightsContainer>
                        {insights}
                    </InsightsContainer>
                )}
            </PredictionContainer>
        );
    
};

export default PredictionDisplay;
