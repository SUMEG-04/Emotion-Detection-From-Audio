// routes/audioRoutes.js

const express = require('express');
const multer = require('multer');
const audioController = require('../controllers/audioController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Set up multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
      // Accept audio files only
      if (file.mimetype.startsWith('audio/')) {
        cb(null, true);
      } else {
        cb(new Error('Only audio files are allowed'));
      }
    }
  });

// Upload a new audio file (requires authentication)
router.post('/upload', authMiddleware, upload.single('file'), audioController.uploadAudio);

// Get all audio files for the authenticated user
router.get('/', authMiddleware, audioController.getUserAudioFiles);

// Get a specific audio file by ID
router.get('/:id', authMiddleware, audioController.getAudioById);

// Download an audio file by ID
router.get('/:id/download', authMiddleware, audioController.downloadAudio);

// Delete an audio file by ID
router.delete('/:id', authMiddleware, audioController.deleteAudio);

module.exports = router;
