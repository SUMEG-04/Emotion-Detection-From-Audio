// src/components/LoadingSpinner.styled.js
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
    0% {
        transform: rotate(0deg);
        opacity: 0.3;
    }
    50% {
        transform: rotate(180deg);
        opacity: 0.6;
    }
    100% {
        transform: rotate(360deg);
        opacity: 1;
    }
`;

export const SpinnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.05); /* Optional overlay */
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
`;

export const Spinner = styled.div`
    width: 50px;
    height: 50px;
    border: 4px solid transparent;
    border-top: 4px solid #e94560; /* Spinner color */
    border-radius: 50%;
    animation: ${spinAnimation} 1s linear infinite;
`;
