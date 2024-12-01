// src/components/Navbar.styled.js
import styled from 'styled-components';

export const NavContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #1a1a2e;
    color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 1rem;
    }
`;

export const Logo = styled.h1`
    font-size: 1.5rem;
    color: #e94560;
    cursor: pointer;

    &:hover {
        color: #0f3460;
    }

    @media (max-width: 768px) {
        font-size: 1.3rem;
    }
`;

export const NavLinks = styled.div`
    display: flex;
    gap: 1.5rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem;
    }
`;

export const NavLink = styled.a`
    text-decoration: none;
    color: #ffffff;
    font-size: 1rem;
    transition: color 0.3s ease;

    &:hover {
        color: #e94560;
    }
`;

export const NavButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #e94560;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0f3460;
    }
`;
