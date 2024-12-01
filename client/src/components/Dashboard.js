import React from 'react';
import AudioUpload from './AudioUpload';
import PredictionDisplay from './PredictionDisplay';
import EmotionChart from './EmotionChart';
import ResultsHistory from './ResultsHistory';
import Settings from './Settings';
import styled from 'styled-components';

const Dashboard = () => {
    return (
        <DashboardContainer>
            <Header>
                <h1>Emotion Recognition Dashboard</h1>
                <p>Analyze, track, and manage audio-based emotion detection results.</p>
            </Header>

            <MainContent>
                <Section>
                    <SectionTitle>Quick Upload</SectionTitle>
                    <AudioUpload />
                </Section>

                <Section>
                    <SectionTitle>Last Prediction</SectionTitle>
                    <PredictionDisplay />
                </Section>

                <Section>
                    <SectionTitle>Emotion Distribution</SectionTitle>
                    <EmotionChart />
                </Section>
            </MainContent>

            <Sidebar>
                <Section>
                    <SectionTitle>Settings</SectionTitle>
                    <Settings />
                </Section>

                <Section>
                    <SectionTitle>Recent Results</SectionTitle>
                    <ResultsHistory />
                </Section>
            </Sidebar>
        </DashboardContainer>
    );
};

export default Dashboard;


// Styled Components

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Header = styled.header`
  width: 100%;
  padding: 20px;
  background-color: #3c4043;
  color: white;
  text-align: center;

  h1 {
    font-size: 2rem;
    margin: 0;
  }

  p {
    font-size: 1.1rem;
    margin-top: 5px;
  }
`;

const MainContent = styled.main`
  flex: 3;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Sidebar = styled.aside`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border-left: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Section = styled.section`
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  color: #3c4043;
  margin-bottom: 1rem;
  border-bottom: 2px solid #3c4043;
  padding-bottom: 0.5rem;
`;
