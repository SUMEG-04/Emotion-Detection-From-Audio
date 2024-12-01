import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AudioUpload from '../components/AudioUpload';
import { Upload, AlertCircle } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
`;

const UploadSection = styled.section`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #1a365d;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Description = styled.p`
  text-align: center;
  color: #4a5568;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const ProcessingContainer = styled.div`
  text-align: center;
  margin-top: 2rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  margin: 1rem 0;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    width: ${props => props.$progress}%;
    height: 100%;
    background: #4c51bf;
    transition: width 0.3s ease;
  }
`;

const Status = styled.p`
  color: #4a5568;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    animation: ${props => props.$loading ? 'spin 1s linear infinite' : 'none'};
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
`;

const AuthButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.signin {
    background: #4c51bf;
    color: white;
    border: none;
    
    &:hover {
      background: #434190;
    }
  }
  
  &.signup {
    background: white;
    color: #4c51bf;
    border: 2px solid #4c51bf;
    
    &:hover {
      background: #f7fafc;
    }
  }
`;

const UploadPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with your auth logic
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {handleFileUpload}=useAudio();


  // Simulating auth check - Replace with your actual auth check
  useEffect(() => {
    // Example: Check if user is logged in
    const checkAuth = async () => {
      // Replace with your actual auth check
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsAuthenticated(isLoggedIn);
    };

    checkAuth();
  }, []);

  //   const handleFileUpload = async (file, onProgress) => {
  //     try {
  //         const formData = new FormData();
  //         formData.append('audio', file);

  //         const response = await axios.post('/api/upload', formData, {
  //             headers: {
  //                 'Content-Type': 'multipart/form-data',
  //             },
  //             onUploadProgress: onProgress
  //         });

  //         return response.data;
  //     } catch (error) {
  //         throw new Error('Upload failed. Please try again.');
  //     }
  // };

  if (!isAuthenticated) {
    return (
      <PageContainer>
        <UploadSection>
          <Title>Authentication Required</Title>
          <Description>
            Please sign in or create an account to upload and analyze audio files.
          </Description>
          <AuthButtons>
            <AuthButton 
              className="signin"
              onClick={() => navigate('/signin')}
            >
              Sign In
            </AuthButton>
            <AuthButton 
              className="signup"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </AuthButton>
          </AuthButtons>
        </UploadSection>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <UploadSection>
        <Title>Upload Your Audio</Title>
        <Description>
          Upload your audio file to analyze its emotional content. 
          We support various audio formats including MP3, WAV, and M4A.
        </Description>

        <AudioUpload onFileUpload={handleFileUpload} />

        {error && (
          <ErrorMessage>
            <AlertCircle size={20} />
            {error}
          </ErrorMessage>
        )}

        {isProcessing && (
          <ProcessingContainer>
            <ProgressBar $progress={progress} />
            <Status $loading={true}>
              <Upload size={20} />
              Processing your audio file...
            </Status>
          </ProcessingContainer>
        )}
      </UploadSection>
    </PageContainer>
  );
};

export default UploadPage;