// src/contexts/AudioContext.js

import React, { createContext, useContext, useState } from 'react';
import { uploadAudioFile } from '../services/fileUploadService';

const AudioContext = createContext();

export const useAudio = () => {
  return useContext(AudioContext);
};

export const AudioProvider = ({ children }) => {
  const [audioFile, setAudioFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  

  // Handle the audio file upload process
  const handleFileUpload = async (file) => {
    if (!file) return;  // Avoid running if file is empty
    
    setUploadStatus('uploading');
    try {
        const uploadResponse = await uploadAudioFile(file);
        setAudioFile(file);
        setFileId(uploadResponse.audio.id); // Make sure `uploadResponse.audio.id` is returned from the server
        setUploadStatus('uploaded');
        console.log(audioFile);
        console.log(fileId);
        return uploadResponse;
    } catch (error) {
        console.error("Error uploading audio file:", error);
        setUploadStatus('error');
        throw error;
    }
  };


  // Clear the audio file and upload status
  const clearAudioFile = () => {
    setAudioFile(null);
    setFileId(null);
    setUploadStatus(null);
  };

  const value = {
    audioFile,
    fileId,
    uploadStatus,
    handleFileUpload,
    clearAudioFile,
  };

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};
