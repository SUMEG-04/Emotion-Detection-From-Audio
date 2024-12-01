import React, { useState } from 'react';
import styled from 'styled-components';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  padding: 2rem;
`;

const AuthWrapper = styled.div`
  width: 100%;
  max-width: 28rem;
`;

const TabContainer = styled.div`
  background: white;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  overflow: hidden;
`;

const TabGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const TabButton = styled.button`
  padding: 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s;
  
  ${props => props.$active ? `
    background-color: #4f46e5;
    color: white;
  ` : `
    background-color: #f3f4f6;
    color: #4b5563;
    
    &:hover {
      background-color: #e5e7eb;
    }
  `}
`;

const FormContainer = styled.div`
  background: white;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const FormWrapper = styled.div`
  padding: 2rem;
`;

const FormTransition = styled.div`
  transition: opacity 0.2s;
`;

const AdditionalInfo = styled.div`
  margin-top: 1.5rem;
  text-align: center;
  color: #4b5563;
  font-size: 0.875rem;
`;

const StyledLink = styled.a`
  color: #4f46e5;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const AuthenticationPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  console.log(isSignIn);
  return (
    <Container>
      <AuthWrapper>
        <TabContainer>
          <TabGrid>
            <TabButton
              onClick={() => setIsSignIn(true)}
              $active={isSignIn} //true
            >
              Sign In
            </TabButton>
            <TabButton
              onClick={() => setIsSignIn(false)}
              $active={!isSignIn} //false
            >
              Sign Up
            </TabButton>
          </TabGrid>
        </TabContainer>

        <FormContainer>
          <FormWrapper>
            <FormTransition>
              {isSignIn ? <SignIn /> : <SignUp />}
            </FormTransition>
          </FormWrapper>
        </FormContainer>

        <AdditionalInfo>
          <p>
            By continuing, you agree to our{' '}
            <StyledLink href="/terms">
              Terms of Service
            </StyledLink>{' '}
            and{' '}
            <StyledLink href="/privacy">
              Privacy Policy
            </StyledLink>
          </p>
        </AdditionalInfo>
      </AuthWrapper>
    </Container>
  );
};

export default AuthenticationPage;