// controllers/authController.js

const User = require('../models/User');
const authService = require('../services/authService');

exports.register = async (req, res) => {
    try {
        console.log('Request body:', req.body);

        const { name,email, password } = req.body;

        // Call authService.registerUser to handle user registration
        const { user, token } = await authService.registerUser(name,email, password);

        res.status(201).json({ message: 'User registered successfully', user, token });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: 'Registration failed' });
    }
};



// Login an existing user
exports.login = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;

        // Authenticate user and retrieve token from authService.loginUser
        const { user, token } = await authService.loginUser(email, password);

        res.json({ message: 'Login successful', user, token });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ error: 'Login failed' });
    }
};


// Logout user
exports.logout = (req, res) => {
    try {
        // Invalidate token or clear session in client-side (for stateless JWTs)
        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error logging out:', error.message);
        res.status(500).json({ error: 'Logout failed' });
    }
};

// Get current authenticated user
exports.getCurrentUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error.message);
        res.status(500).json({ error: 'Could not retrieve user' });
    }
};

// Update password
exports.updatePassword = async (req, res) => {
    try {
        const userId = req.user._id;
        const { currentPassword, newPassword } = req.body;

        // Verify current password
        const user = await User.findById(userId);
        if (!user || !(await authService.verifyPassword(currentPassword, user.password))) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }

        // Update to new password
        user.password = await authService.hashPassword(newPassword);
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error.message);
        res.status(500).json({ error: 'Password update failed' });
    }
};

exports.validateToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Token not provided' });
        }

        // Verify token using authService
        const decoded = authService.verifyToken(token);

        // Respond with success if the token is valid
        res.status(200).json({ message: 'Token is valid', userId: decoded.userId });
    } catch (error) {
        console.error('Token validation failed:', error.message);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};

