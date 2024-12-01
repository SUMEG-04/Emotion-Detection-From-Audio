import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader } from 'lucide-react';

// Styled Components
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

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
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
      // Replace this with your actual authentication API call
      const response = await signInUser(formData);
      
      // Store the token in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('isLoggedIn', 'true');
      
      // Redirect to the upload page or dashboard
      navigate('/upload');
    } catch (error) {
      setGeneralError(error.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock authentication function - replace with your actual auth implementation
  const signInUser = async (credentials) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
          resolve({ token: 'mock-jwt-token' });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  return (
    <AuthContainer>
      <AuthCard>
        <Title>Welcome Back</Title>
        <Subtitle>Sign in to your account</Subtitle>

        <Form onSubmit={handleSubmit}>
          {generalError && (
            <ErrorMessage>
              <AlertCircle size={16} />
              {generalError}
            </ErrorMessage>
          )}

          <FormGroup>
            <InputIcon>
              <Mail size={20} />
            </InputIcon>
            <Input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              $error={errors.email}
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
              $error={errors.password}
            />
            {errors.password && (
              <ErrorMessage>
                <AlertCircle size={16} />
                {errors.password}
              </ErrorMessage>
            )}
          </FormGroup>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader size={20} className="animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </Form>

        <LinkText>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </LinkText>
      </AuthCard>
    </AuthContainer>
  );
};

export default SignIn;