// server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express(); // Import `app` from `app.js`

require('dotenv').config();
require('./config/db'); // Connect to the database

const port = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000', //included origin as true
    credentials: true, //included credentials as true
  };
  
  // Enable CORS for cross-origin requests
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());


const audioRoutes = require('./routes/audioRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const predictionRoutes = require('./routes/predictionRoutes');

app.use(express.json({ extended: false }));

app.use('/api/audio', audioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/predict', predictionRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
