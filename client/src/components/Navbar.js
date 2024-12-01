// src/components/Navbar.js
import React from 'react';
import { NavContainer, Logo, NavLinks, NavLink, NavButton } from './Navbar.styled';

const Navbar = () => {
    return (
        <NavContainer>
            <Logo>EmotionApp</Logo>
            <NavLinks>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/dashboard">Dashboard</NavLink>
                <NavLink href="/profile">Profile</NavLink>
            </NavLinks>
            <NavButton>Sign In</NavButton>
        </NavContainer>
    );
};

export default Navbar;
