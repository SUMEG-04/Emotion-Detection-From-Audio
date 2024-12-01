// services/AudioService.js
const Audio = require('../models/Audio');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

class audioService {
  // Upload audio file
  static async saveAudio(file, userId) {
    try {
      if (!file || !file.buffer) {
        throw new Error('Invalid file data');
      }

      const fileId = uuidv4();
      const fileExtension = path.extname(file.originalname);
      const filePath = path.join('uploads', `${fileId}${fileExtension}`);
      
      // Ensure uploads directory exists
      const uploadsDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      // Save file to the server
      await fs.promises.writeFile(path.join(process.cwd(), filePath), file.buffer);
      
      // Create a new audio document in the database
      const audioDoc = new Audio({
        user: userId,
        filePath,
        originalFileName: file.originalname,
        format: file.mimetype.split('/')[1], // 'wav', 'mp3', etc.
        fileSize: file.size,
        uploadDate: new Date()
      });
      
      await audioDoc.save();
      return audioDoc;
    } catch (error) {
      throw new Error(`Audio upload failed: ${error.message}`);
    }
  }

  // Get all audio files for a specific user
  static async getUserAudioFiles(userId) {
    try {
      return await Audio.find({ user: userId });
    } catch (error) {
      throw new Error(`Failed to retrieve audio files: ${error.message}`);
    }
  }

  // Get a specific audio file by ID
  static async getAudioById(audioId, userId) {
    try {
      const audio = await Audio.findOne({ _id: audioId, user: userId });
      if (!audio) throw new Error('Audio file not found');
      return audio;
    } catch (error) {
      throw new Error(`Error fetching audio: ${error.message}`);
    }
  }

  // Delete an audio file by ID
  static async deleteAudio(audioId, userId) {
    try {
      const audio = await Audio.findOneAndDelete({ _id: audioId, user: userId });
      if (!audio) throw new Error('Audio file not found');
      
      // Remove the file from the file system
      fs.unlinkSync(audio.filePath);
      return { message: 'Audio file deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting audio: ${error.message}`);
    }
  }
}

module.exports = audioService;
