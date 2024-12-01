import React from 'react';
import styled from 'styled-components';

// Styled Components using the provided color palette
const PageContainer = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const ContentWrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  padding: 2rem;
`;

const PageTitle = styled.h1`
  color: #1a365d;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const SectionTitle = styled.h2`
  color: #1a365d;
  border-bottom: 2px solid #4c51bf;
  padding-bottom: 0.5rem;
  margin: 1.5rem 0 1rem;
`;

const Paragraph = styled.p`
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const FeatureCard = styled.div`
  background-color: #f5f7fa;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e4e9f2;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureTitle = styled.h3`
  color: #1a365d;
  margin-bottom: 0.5rem;
`;

const TeamSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const TeamMember = styled.div`
  text-align: center;
  max-width: 200px;
`;

const Button = styled.a`
  display: inline-block;
  background-color: #4c51bf;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  margin-top: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #434190;
  }
`;

const AboutPage = () => {
  return (
    <PageContainer>
      <ContentWrapper>
        <PageTitle>Emotion Recognition AI</PageTitle>
        
        <SectionTitle>About Our Project</SectionTitle>
        <Paragraph>
          Our Emotion Recognition AI is a cutting-edge application that leverages advanced machine learning 
          technologies to analyze audio and detect emotional states. By processing voice characteristics, 
          our AI provides insights into human emotions with remarkable accuracy.
        </Paragraph>

        <SectionTitle>Key Features</SectionTitle>
        <FeatureGrid>
          <FeatureCard>
            <FeatureTitle>Advanced AI Analysis</FeatureTitle>
            <Paragraph>
              Utilize state-of-the-art machine learning models to detect emotional nuances in audio recordings.
            </Paragraph>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>Multi-Emotion Detection</FeatureTitle>
            <Paragraph>
              Identify a wide range of emotions including happiness, sadness, anger, fear, and more.
            </Paragraph>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>Easy Upload</FeatureTitle>
            <Paragraph>
              Simple and intuitive interface for uploading audio files from various sources.
            </Paragraph>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureTitle>Detailed Insights</FeatureTitle>
            <Paragraph>
              Comprehensive emotion breakdown with percentage confidence levels.
            </Paragraph>
          </FeatureCard>
        </FeatureGrid>

        <SectionTitle>Our Team</SectionTitle>
        <TeamSection>
          <TeamMember>
            <h3 style={{ color: '#1a365d' }}>Jane Doe</h3>
            <Paragraph>AI Research Lead</Paragraph>
          </TeamMember>
          <TeamMember>
            <h3 style={{ color: '#1a365d' }}>John Smith</h3>
            <Paragraph>Machine Learning Engineer</Paragraph>
          </TeamMember>
          <TeamMember>
            <h3 style={{ color: '#1a365d' }}>Emily Chen</h3>
            <Paragraph>Data Scientist</Paragraph>
          </TeamMember>
        </TeamSection>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginTop: '2rem' 
        }}>
          <Button href="/upload">Start Emotion Analysis</Button>
        </div>
      </ContentWrapper>
    </PageContainer>
  );
};

export default AboutPage;