// src/components/AudioUpload.styled.js
import styled from 'styled-components';

export const UploadContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 2px dashed #e94560;
    border-radius: 8px;
    background-color: #f9f9f9;
    width: 100%;
    max-width: 400px;
    margin: 20px auto;
`;

export const UploadLabel = styled.label`
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
`;

export const FileInput = styled.input`
    display: none;
`;

export const SelectedFile = styled.p`
    margin-top: 10px;
    font-size: 0.9rem;
    color: #666;
`;

export const UploadButton = styled.button`
    margin-top: 15px;
    padding: 10px 20px;
    background-color: #e94560;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #d6344a;
    }

    &:disabled {
        background-color: #aaa;
        cursor: not-allowed;
    }
`;
