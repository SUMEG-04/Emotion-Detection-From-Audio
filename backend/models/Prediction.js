// models/Prediction.js
const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  audio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Audio',
    required: true
  },
  predictedEmotion: {
    type: String,
    enum: ['angry', 'disgust', 'fearful', 'happy', 'neutral', 'sad', 'surprised'],
    required: true
  },
  confidenceScores: {
    angry: { type: Number, default: 0 },
    disgust: { type: Number, default: 0 },
    fearful: { type: Number, default: 0 },
    happy: { type: Number, default: 0 },
    neutral: { type: Number, default: 0 },
    sad: { type: Number, default: 0 },
    surprised: { type: Number, default: 0 }
  },
  predictionDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Prediction', predictionSchema);
