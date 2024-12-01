// controllers/userController.js

const User = require('../models/User');
const authService = require('../services/authService');

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id; // assuming user ID is available in req.user after authentication
        const user = await User.findById(userId).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error retrieving user profile:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email } = req.body;

        // Check if email is already used by another user
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== userId) {
            return res.status(400).json({ error: 'Email is already in use by another account' });
        }

        // Update user profile
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true, runValidators: true }
        ).select('-password'); // Exclude password from response

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user preferences
exports.updateUserPreferences = async (req, res) => {
    try {
        const userId = req.user._id;
        const { theme, notifications } = req.body;

        // Update preferences
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { preferences: { theme, notifications } },
            { new: true, runValidators: true }
        ).select('-password'); // Exclude password from response

        res.json(updatedUser.preferences);
    } catch (error) {
        console.error('Error updating user preferences:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete user account
exports.deleteUserAccount = async (req, res) => {
    try {
        const userId = req.user._id;
        
        // Delete user
        await User.findByIdAndDelete(userId);

        res.json({ message: 'User account deleted successfully' });
    } catch (error) {
        console.error('Error deleting user account:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Change user password
exports.changePassword = async (req, res) => {
    try {
        const userId = req.user._id;
        const { currentPassword, newPassword } = req.body;

        // Retrieve user and check current password
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await authService.verifyPassword(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Hash and update the new password
        user.password = await authService.hashPassword(newPassword);
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error changing password:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
