// routes/authRoutes.js

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/register', authController.register);

// Login an existing user
router.post('/login', authController.login);

// Logout user (handled on client-side for JWT)
router.post('/logout', authController.logout);

// Validate the JWT token
router.get('/validateToken', authController.validateToken);

module.exports = router;
