// src/components/Profile.js

import React, { useState } from 'react';
import styled from 'styled-components';
import ErrorNotification from './ErrorNotification';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: ''
  });
  const [error, setError] = useState('');

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!userInfo.name || !userInfo.email) {
      setError('Name and email are required');
      return;
    }
    setIsEditing(false);
    setError('Profile updated successfully!');
  };

  return (
    <ProfileContainer>
      <Header>Profile</Header>

      {error && <ErrorNotification message={error} />}

      <Section>
        <Avatar src="https://via.placeholder.com/100" alt="Profile Picture" />
        <ProfileDetails>
          <Label>Name</Label>
          {isEditing ? (
            <Input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
            />
          ) : (
            <Text>{userInfo.name}</Text>
          )}

          <Label>Email</Label>
          {isEditing ? (
            <Input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
            />
          ) : (
            <Text>{userInfo.email}</Text>
          )}
        </ProfileDetails>
      </Section>

      <ButtonContainer>
        {isEditing ? (
          <>
            <Button onClick={handleSave}>Save</Button>
            <Button secondary onClick={handleEditToggle}>
              Cancel
            </Button>
          </>
        ) : (
          <Button onClick={handleEditToggle}>Edit Profile</Button>
        )}
      </ButtonContainer>

      <Section>
        <Label>Password</Label>
        {isEditing ? (
          <Input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={userInfo.password}
            onChange={handleChange}
          />
        ) : (
          <Text>********</Text>
        )}
      </Section>

      <ButtonContainer>
        <SignOutButton>Sign Out</SignOutButton>
      </ButtonContainer>
    </ProfileContainer>
  );
};

export default Profile;

// Styled Components

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  font-size: 2rem;
  text-align: center;
  color: #333;
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`;

const ProfileDetails = styled.div`
  flex: 1;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  color: #555;
  margin: 5px 0;
`;

const Text = styled.p`
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: ${(props) => (props.secondary ? '#555' : '#fff')};
  background-color: ${(props) => (props.secondary ? '#eee' : '#007bff')};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.secondary ? '#ddd' : '#0056b3')};
  }
`;

const SignOutButton = styled(Button)`
  background-color: #ff4d4d;

  &:hover {
    background-color: #ff3333;
  }
`;
