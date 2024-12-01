// src/components/Footer.styled.js
import styled from 'styled-components';

export const FooterContainer = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background-color: #1a1a2e;
    color: #ffffff;
    text-align: center;
`;

export const FooterLogo = styled.h2`
    font-size: 1.5rem;
    color: #e94560;
    margin-bottom: 1rem;
`;

export const FooterLinks = styled.div`
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 0.8rem;
    }
`;

export const FooterLink = styled.a`
    text-decoration: none;
    color: #ffffff;
    font-size: 1rem;
    transition: color 0.3s ease;

    &:hover {
        color: #e94560;
    }
`;

export const FooterSocialIcons = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
`;

export const FooterSocialIcon = styled.a`
    color: #ffffff;
    font-size: 1.2rem;
    transition: color 0.3s ease;

    &:hover {
        color: #e94560;
    }
`;

export const FooterCopyright = styled.p`
    font-size: 0.9rem;
    color: #ffffff;
`;
