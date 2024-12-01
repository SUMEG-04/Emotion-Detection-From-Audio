import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Mic } from 'lucide-react';

// Styled Components
const HomeContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
`;

const Hero = styled.section`
  max-width: 1200px;
  margin: 4rem auto;
  text-align: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #1a365d;
  margin-bottom: 1.5rem;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #4a5568;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background: #4c51bf;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
    background: #434190;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 2rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #4a5568;
  line-height: 1.6;
`;

const HomePage = () => {
  return (
    <HomeContainer>
      <Hero>
        <Title>Audio Emotion Analysis</Title>
        <Subtitle>
          Upload your audio files and discover the emotional patterns within. 
          Our advanced AI helps you understand the emotional content of any speech or conversation.
        </Subtitle>
        <CTAButton to="/upload">
          <Mic size={24} />
          Analyze Audio Now
        </CTAButton>
      </Hero>

      <FeaturesGrid>
        <FeatureCard>
          <FeatureTitle>Quick Analysis</FeatureTitle>
          <FeatureDescription>
            Get instant emotion analysis results for your audio files. 
            Our system processes your content in seconds and provides detailed insights.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Multiple Emotions</FeatureTitle>
          <FeatureDescription>
            Detect various emotions including happiness, sadness, anger, fear, 
            and more with high accuracy and detailed breakdowns.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Visual Reports</FeatureTitle>
          <FeatureDescription>
            View your results through intuitive charts and graphs. 
            Track emotional patterns and changes over time with our visualization tools.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>
    </HomeContainer>
  );
};

export default HomePage;