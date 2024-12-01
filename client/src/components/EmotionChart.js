import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const EmotionChart = ({ emotionData }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        // Destroy the chart instance if it already exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Prepare data for the chart
        const labels = Object.keys(emotionData);
        const dataValues = Object.values(emotionData);

        // Render the new chart
        chartInstance.current = new Chart(chartRef.current, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Emotion Intensity',
                        data: dataValues,
                        backgroundColor: [
                            '#e94560', '#f9d342', '#4caf50', '#2196f3', '#ff9800', '#673ab7'
                        ],
                        borderColor: '#333',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Emotion Distribution',
                    },
                },
            },
        });

        // Cleanup function to destroy the chart instance on unmount
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [emotionData]); // Re-run this effect if emotionData changes

    return <canvas ref={chartRef} />;
};

export default EmotionChart;
