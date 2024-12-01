import React from 'react';
import { usePrediction } from '../context/PredictionContext';
import styled from 'styled-components';

const ResultsHistory = () => {
    const { resultsHistory } = usePrediction();

    return (
        <HistoryContainer>
            <Title>Prediction History</Title>
            {resultsHistory.length === 0 ? (
                <NoResults>No previous results available.</NoResults>
            ) : (
                resultsHistory.map((result, index) => (
                    <ResultItem key={index}>
                        <FileName>{result.fileName}</FileName>
                        <PredictionDetails>
                            <TimeStamp>{new Date(result.timestamp).toLocaleString()}</TimeStamp>
                            <Emotion>{result.emotion}</Emotion>
                        </PredictionDetails>
                    </ResultItem>
                ))
            )}
        </HistoryContainer>
    );
};

export default ResultsHistory;

// Styled Components

const HistoryContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
`;

const NoResults = styled.p`
  text-align: center;
  color: #666;
  font-size: 1rem;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const FileName = styled.div`
  font-weight: 500;
  color: #444;
`;

const PredictionDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TimeStamp = styled.div`
  font-size: 0.85rem;
  color: #888;
  margin-bottom: 0.25rem;
`;

const Emotion = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #007bff;
`;
