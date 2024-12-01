// src/components/ErrorNotification.js

import React from 'react';
import styled from 'styled-components';
import { FiAlertCircle, FiX } from 'react-icons/fi';

const ErrorNotification = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <NotificationContainer>
      <AlertIcon />
      <Message>{message}</Message>
      <CloseButton onClick={onClose}>
        <FiX size={20} />
      </CloseButton>
    </NotificationContainer>
  );
};

export default ErrorNotification;

// Styled Components

const NotificationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const AlertIcon = styled(FiAlertCircle)`
  margin-right: 10px;
  font-size: 1.5rem;
  color: #721c24;
`;

const Message = styled.div`
  flex: 1;
  font-size: 0.95rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #721c24;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.2s ease;

  &:hover {
    color: #f5c6cb;
  }
`;
