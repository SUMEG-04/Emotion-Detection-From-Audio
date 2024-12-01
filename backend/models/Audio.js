// models/Audio.js
const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
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
  duration: {
    type: Number
  },
  uploadDate: {
    type: Date,
    default: Date.now
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
});

module.exports = mongoose.model('Audio', audioSchema);
