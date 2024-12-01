// src/components/EmotionChart.styled.js
import styled from 'styled-components';

export const ChartContainer = styled.div`
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f7fa;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        padding: 15px;
        max-width: 100%;
    }
`;
