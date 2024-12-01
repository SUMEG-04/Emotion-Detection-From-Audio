// models/Audio.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audioSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  filePath: { 
    type: String, 
    required: true 
  },
  originalFileName: { 
    type: String, 
    required: true 
  },
  format: { 
    type: String, 
    required: true,
    enum: ['mp3', 'wav', 'mpeg', 'x-wav', 'ogg', 'x-m4a', 'aac'],
    // Convert MIME subtypes to standard format names
    set: function(value) {
      const formatMap = {
        'mpeg': 'mp3',
        'x-wav': 'wav',
        'wav': 'wav',
        'mp3': 'mp3',
        'ogg': 'ogg',
        'x-m4a': 'm4a',
        'aac': 'aac'
      };
      return formatMap[value] || value;
    }
  },
  fileSize: { 
    type: Number, 
    required: true 
  },
  uploadDate: { 
    type: Date, 
    default: Date.now 
  }
});

const Audio = mongoose.model('Audio', audioSchema);
module.exports = Audio;

// audioService.js
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const Audio = require('../models/Audio');

class AudioService {
  static async saveAudio(file, userId) {
    try {
      if (!file || !file.buffer) {
        throw new Error('Invalid file data');
      }

      // Extract the format from mimetype and normalize it
      const format = file.mimetype.split('/')[1].toLowerCase();
      
      const fileId = uuidv4();
      // Use the normalized format for file extension
      const fileExtension = format === 'mpeg' ? '.mp3' : `.${format}`;
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
        format: format, // The setter in the schema will normalize this
        fileSize: file.size,
        uploadDate: new Date()
      });
      
      await audioDoc.save();
      return audioDoc;
    } catch (error) {
      throw new Error(`Audio upload failed: ${error.message}`);
    }
  }
}

module.exports = AudioService;

// routes/audioRoutes.js
const express = require('express');
const multer = require('multer');
const audioController = require('../controllers/audioController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Configure multer to store files in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // List of accepted MIME types
    const allowedMimeTypes = [
      'audio/mpeg',
      'audio/mp3',
      'audio/wav',
      'audio/x-wav',
      'audio/ogg',
      'audio/x-m4a',
      'audio/aac'
    ];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Allowed types: ${allowedMimeTypes.join(', ')}`));
    }
  }
});

router.post('/upload', 
  authMiddleware, 
  upload.single('file'), 
  audioController.uploadAudio
);

module.exports = router;