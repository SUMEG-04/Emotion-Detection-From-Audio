// src/components/AudioUpload.js
import React, { useState } from 'react';
import { UploadContainer, UploadLabel, FileInput, UploadButton, SelectedFile } from './AudioUpload.styled';
import { useAudio } from '../context/AudioContext';

const AudioUpload = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const {handleFileUpload,}=useAudio()


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const fileUpload = async (file) => {
        if (!file) return;  // Avoid running if file is empty
        try {
            await handleFileUpload(file);
        } catch (error) {
            console.error("Error uploading audio file:", error);
            throw error;
        }
    };
    

    return (
        <UploadContainer>
            <UploadLabel htmlFor="audio-upload">Upload an Audio File</UploadLabel>
            <FileInput type="file" id="audio-upload" accept="audio/*" onChange={handleFileChange} />
            {selectedFile && <SelectedFile>Selected: {selectedFile.name}</SelectedFile>}
            <UploadButton onClick={fileUpload} disabled={!selectedFile}>
                Upload
            </UploadButton>
        </UploadContainer>
    );
};

export default AudioUpload;
