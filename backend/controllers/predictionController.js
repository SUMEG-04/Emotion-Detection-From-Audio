// controllers/predictionController.js

const Audio = require('../models/Audio');
const Prediction = require('../models/Prediction');
const predictionService = require('../services/predictionService');
const mongoose = require('mongoose');

// Predict emotion from a specific audio file
exports.predictEmotion = async (req, res) => {
    try {
        const userId = req.user._id;
        const audioId = req.params._id;

        // Retrieve the audio file metadata from the database
        const audio = await Audio.findOne({ _id: audioId, user: userId });
        if (!audio) {
            return res.status(404).json({ error: 'Audio file not found' });
        }

        console.log(audio)
        // Perform prediction by sending the audio file path to the prediction service
        const predictedEmotion = await predictionService.getPrediction(audio.filePath);
        console.log(predictedEmotion)

        // Save the prediction result to the database
        const predictionDoc = new Prediction({
            user: userId,
            audio: audioId,
            predictedEmotion,
            predictionDate: new Date(),
        });
        await predictionDoc.save();

        res.json({ message: 'Prediction successful', emotion: predictedEmotion });
    } catch (error) {
        console.error('Error predicting emotion:', error.message);
        res.status(500).json({ error: 'Prediction failed' });
    }
};

// Get all predictions for the logged-in user
exports.getResultsHistory = async (req, res) => {
    try {
        const predictions = await Prediction.find({ user: req.user._id }).populate('audio');

        // Filter predictions with missing audio and map the results
        const results = predictions
            .filter(prediction => prediction.audio)  // Exclude predictions without audio
            .map(prediction => ({
                fileName: prediction.audio.originalFileName,
                timestamp: prediction.predictionDate,
                emotion: prediction.predictedEmotion,
            }));

        res.json(results);
    } catch (error) {
        console.error('Error fetching results history:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// Get emotion distribution data for charts
exports.getEmotionData = async (req, res) => {
    try {
        const userId =new mongoose.Types.ObjectId(req.user._id);  // Convert to ObjectId if needed
        console.log("User ID for aggregation:", userId);

        const data = await Prediction.aggregate([
            { $match: { user: userId } },  // Use the converted ObjectId for matching
            { $group: { _id: "$predictedEmotion", count: { $sum: 1 } } }
        ]);

        const emotionData = {};
        data.forEach(entry => {
            emotionData[entry._id] = entry.count;
        });

        res.json(emotionData);
    } catch (error) {
        console.error('Error fetching emotion data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a prediction by ID
exports.deletePrediction = async (req, res) => {
    try {
        const userId = req.user.id;
        const predictionId = req.params.id;

        const prediction = await Prediction.findOneAndDelete({ _id: predictionId, user: userId });
        if (!prediction) {
            return res.status(404).json({ error: 'Prediction not found' });
        }

        res.json({ message: 'Prediction deleted successfully' });
    } catch (error) {
        console.error('Error deleting prediction:', error.message);
        res.status(500).json({ error: 'Failed to delete prediction' });
    }
};
