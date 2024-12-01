import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Frown } from 'lucide-react';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  padding: 2rem;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  color: #1a365d;
  margin: 0;
  font-weight: bold;
  animation: ${float} 3s ease-in-out infinite;
  text-shadow: 2px 2px 0 #4c51bf;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #2d3748;
  margin: 1rem 0;
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: 0.2s;
  opacity: 0;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  max-width: 500px;
  margin: 1rem auto;
  line-height: 1.6;
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: 0.4s;
  opacity: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: 0.6s;
  opacity: 0;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.primary {
    background: #4c51bf;
    color: white;
    border: none;
    
    &:hover {
      background: #434190;
      transform: translateY(-2px);
    }
  }
  
  &.secondary {
    background: white;
    color: #4c51bf;
    border: 2px solid #4c51bf;
    
    &:hover {
      background: #f7fafc;
      transform: translateY(-2px);
    }
  }
`;

const IconContainer = styled.div`
  margin: 2rem 0;
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: 0.3s;
  color: #4c51bf;
`;

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <ErrorCode>404</ErrorCode>
      
      <IconContainer>
        <Frown size={64} />
      </IconContainer>
      
      <Title>Page Not Found</Title>
      
      <Description>
        Oops! It seems like the page you're looking for has disappeared into the
        digital void. Don't worry, you can find your way back home or return to
        the previous page.
      </Description>
      
      <ButtonContainer>
        <Button 
          className="primary"
          onClick={() => navigate('/')}
        >
          <Home size={20} />
          Go Home
        </Button>
        
        <Button 
          className="secondary"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
          Go Back
        </Button>
      </ButtonContainer>
    </NotFoundContainer>
  );
};

export default NotFound;