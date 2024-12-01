// routes/predictionRoutes.js

const express = require('express');
const predictionController = require('../controllers/predictionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Predict emotion from a specific audio file
router.get('/emotion/:_id', authMiddleware, predictionController.predictEmotion);

// Route to get all predictions for the logged-in user
router.get('/history', authMiddleware, predictionController.getResultsHistory);

// Route to get emotion distribution data
router.get('/emotion-data', authMiddleware, predictionController.getEmotionData);

// Delete a specific prediction by ID
router.delete('/:_id', authMiddleware, predictionController.deletePrediction);

module.exports = router;
