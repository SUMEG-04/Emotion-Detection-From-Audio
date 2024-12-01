// controllers/audioController.js

const Audio = require('../models/Audio');
const audioService = require('../services/audioService');
const path = require('path');

// Upload a new audio file
exports.uploadAudio = async (req, res) => {
    try {
        const userId = req.user._id; // User ID from authentication middleware
        const audioFile = req.file; // Multer provides the file as req.file
        console.log(req.user._id)

        if (!audioFile) {
            return res.status(400).json({ error: 'No audio file uploaded' });
        }

        // Save the audio file and create a new document in the database
        const audioDoc = await audioService.saveAudio(audioFile, userId);
        res.status(201).json({ message: 'Audio file uploaded successfully', audio: {
            id: audioDoc._id,  // Explicitly include the ID
            fileName: audioDoc.originalFileName,
            format: audioDoc.format,
            uploadDate: audioDoc.uploadDate
        } });
    } catch (error) {
        console.error('Error uploading audio file:', error.message);
        res.status(500).json({ error: 'Audio upload failed' });
    }
};

// Retrieve all audio files for the authenticated user
exports.getUserAudioFiles = async (req, res) => {
    try {
        const userId = req.user._id;
        const audioFiles = await Audio.find({ user: userId });

        res.json(audioFiles);
    } catch (error) {
        console.error('Error fetching audio files:', error.message);
        res.status(500).json({ error: 'Failed to retrieve audio files' });
    }
};

// Get a specific audio file by ID
exports.getAudioById = async (req, res) => {
    try {
        const userId = req.user._id;
        const audioId = req.params.id;

        const audio = await Audio.findOne({ _id: audioId, user: userId });
        if (!audio) {
            return res.status(404).json({ error: 'Audio file not found' });
        }

        res.json(audio);
    } catch (error) {
        console.error('Error retrieving audio file:', error.message);
        res.status(500).json({ error: 'Failed to retrieve audio file' });
    }
};

// Download an audio file by ID
exports.downloadAudio = async (req, res) => {
    try {
        const userId = req.user._id;
        const audioId = req.params.id;

        const audio = await Audio.findOne({ _id: audioId, user: userId });
        if (!audio) {
            return res.status(404).json({ error: 'Audio file not found' });
        }

        const filePath = path.resolve(audio.filePath);
        res.download(filePath);
    } catch (error) {
        console.error('Error downloading audio file:', error.message);
        res.status(500).json({ error: 'Failed to download audio file' });
    }
};

// Delete an audio file by ID
exports.deleteAudio = async (req, res) => {
    try {
        const userId = req.user._id;
        const audioId = req.params.id;

        const audio = await Audio.findOneAndDelete({ _id: audioId, user: userId });
        if (!audio) {
            return res.status(404).json({ error: 'Audio file not found' });
        }

        // Delete file from storage
        await audioService.deleteAudioFile(audio.filePath);

        res.json({ message: 'Audio file deleted successfully' });
    } catch (error) {
        console.error('Error deleting audio file:', error.message);
        res.status(500).json({ error: 'Failed to delete audio file' });
    }
};
