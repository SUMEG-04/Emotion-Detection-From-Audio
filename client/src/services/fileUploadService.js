// src/services/fileUploadService.js

import api from '../api/apiConfig';

// Upload an audio file to the server for emotion prediction
export const uploadAudioFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/upload/audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // Should return details about the uploaded file or a prediction reference ID
  } catch (error) {
    console.error("Error uploading audio file:", error);
    throw new Error("Audio file upload failed.");
  }
};
