import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, AlertCircle, Loader } from 'lucide-react';

// Styled components (all previous styled components remain the same)
const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  padding: 2rem;
`;

const AuthCard = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1a365d;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #4a5568;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid ${props => props.$error ? '#FC8181' : '#E2E8F0'};
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s;
  
  &:focus {
    outline: none;
    border-color: #4c51bf;
    box-shadow: 0 0 0 3px rgba(76, 81, 191, 0.1);
  }

  &::placeholder {
    color: #A0AEC0;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #A0AEC0;
`;

const ErrorMessage = styled.div`
  color: #E53E3E;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Button = styled.button`
  background: #4c51bf;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: #434190;
  }
  
  &:disabled {
    background: #A0AEC0;
    cursor: not-allowed;
  }
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #4A5568;
  
  a {
    color: #4c51bf;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await signUpUser(formData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/upload');
    } catch (error) {
      setGeneralError(error.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const signUpUser = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userData.email === 'existing@example.com') {
          reject(new Error('Email already exists'));
        } else {
          resolve({ token: 'mock-jwt-token' });
        }
      }, 1000);
    });
  };

  return (
    <AuthContainer>
      <AuthCard>
        <Title>Create Account</Title>
        <Subtitle>Join us to analyze your audio files</Subtitle>

        <Form onSubmit={handleSubmit}>
          {generalError && (
            <ErrorMessage>
              <AlertCircle size={16} />
              {generalError}
            </ErrorMessage>
          )}

          <FormGroup>
            <InputIcon>
              <User size={20} />
            </InputIcon>
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              $error={!!errors.name}
            />
            {errors.name && (
              <ErrorMessage>
                <AlertCircle size={16} />
                {errors.name}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <InputIcon>
              <Mail size={20} />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              $error={!!errors.email}
            />
            {errors.email && (
              <ErrorMessage>
                <AlertCircle size={16} />
                {errors.email}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              $error={!!errors.password}
            />
            {errors.password && (
              <ErrorMessage>
                <AlertCircle size={16} />
                {errors.password}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <InputIcon>
              <Lock size={20} />
            </InputIcon>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              $error={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <ErrorMessage>
                <AlertCircle size={16} />
                {errors.confirmPassword}
              </ErrorMessage>
            )}
          </FormGroup>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader size={20} className="animate-spin" />
                Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </Button>

          <LinkText>
            Already have an account? <Link to="/signin">Sign In</Link>
          </LinkText>
        </Form>
      </AuthCard>
    </AuthContainer>
  );
};

export default SignUp;