// src/components/Settings.js

import React, { useState } from 'react';
import styled from 'styled-components';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('Light');
  const [modelAccuracy, setModelAccuracy] = useState('Standard');

  const handleToggleNotifications = () => setNotifications(!notifications);
  const handleThemeChange = (e) => setTheme(e.target.value);
  const handleAccuracyChange = (e) => setModelAccuracy(e.target.value);

  return (
    <SettingsContainer>
      <Title>Settings</Title>
      <SettingItem>
        <Label>Enable Notifications</Label>
        <ToggleSwitch onClick={handleToggleNotifications} active={notifications}>
          <ToggleCircle active={notifications} />
        </ToggleSwitch>
      </SettingItem>
      <SettingItem>
        <Label>Select Theme</Label>
        <Dropdown value={theme} onChange={handleThemeChange}>
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
        </Dropdown>
      </SettingItem>
      <SettingItem>
        <Label>Prediction Accuracy Level</Label>
        <Dropdown value={modelAccuracy} onChange={handleAccuracyChange}>
          <option value="Standard">Standard</option>
          <option value="High">High</option>
        </Dropdown>
      </SettingItem>
    </SettingsContainer>
  );
};

export default Settings;

// Styled Components

const SettingsContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 20px auto;
  padding: 1.5rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #444;
  flex: 1;
`;

const ToggleSwitch = styled.div`
  width: 50px;
  height: 25px;
  background-color: ${({ active }) => (active ? '#4CAF50' : '#ccc')};
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const ToggleCircle = styled.div`
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: ${({ active }) => (active ? '25px' : '2px')};
  transition: left 0.3s ease;
`;

const Dropdown = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
  font-size: 1rem;
  color: #444;
  cursor: pointer;
  outline: none;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #4CAF50;
  }
`;
