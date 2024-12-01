import React, { useEffect, useState } from 'react';
import PredictionDisplay from '../components/PredictionDisplay';
import { usePrediction } from '../context/PredictionContext';
import { useAudio } from '../context/AudioContext';

const PredictionPage = () => {
    const { fileId } = useAudio();
    const [prediction, setPrediction] = useState("");
    const { fetchPrediction } = usePrediction();

    const sampleConfidence = 0.87;
    const sampleInsights = "This prediction indicates a positive emotion with high confidence, suggesting an uplifting or cheerful tone.";

    useEffect(() => {
        async function fetchPredictionData() {
            if (fileId) {  // Only fetch if fileId is set and prediction hasn't been fetched
                try {
                    const response = await fetchPrediction(fileId);
                    console.log(response);
                } catch (error) {
                    console.error("Error fetching prediction:", error);
                }
            }
        }

        fetchPredictionData();
        
    }, [fileId]);
    

    return (
        <div>
            <h1>Emotion Prediction Result</h1>
            <PredictionDisplay
                predictedEmotion={prediction}
                confidence={sampleConfidence}
                insights={sampleInsights}
            />
        </div>
    );
};

export default PredictionPage;
