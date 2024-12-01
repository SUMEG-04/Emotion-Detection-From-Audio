// src/pages/ChartPage.js
import React from 'react';
import EmotionChart from '../components/EmotionChart';

const ChartPage = () => {
    const sampleEmotionData = {
        Happy: 10,
        Sad: 7,
        Angry: 5,
        Fearful: 4,
        Neutral: 8,
        Disgust: 3,
    };

    return (
        <div>
            <h1>Emotion Analysis Chart</h1>
            <EmotionChart emotionData={sampleEmotionData} />
        </div>
    );
};

export default ChartPage;
