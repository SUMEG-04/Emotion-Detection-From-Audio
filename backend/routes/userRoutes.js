// routes/userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get the authenticated user's profile
router.get('/profile', authMiddleware, userController.getUserProfile);

// Update the authenticated user's profile
router.put('/profile', authMiddleware, userController.updateUserProfile);

// Update the authenticated user's preferences
router.put('/preferences', authMiddleware, userController.updateUserPreferences);

// Change the authenticated user's password
router.put('/password', authMiddleware, userController.changePassword);

// Delete the authenticated user's account
router.delete('/delete', authMiddleware, userController.deleteUserAccount);

module.exports = router;
