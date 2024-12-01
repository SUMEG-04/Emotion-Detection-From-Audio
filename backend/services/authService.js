// services/authService.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

class authService {
  // Register a new user
  static async registerUser(name, email, password) {
    try {
        console.log(name,email,password)
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email is already registered');
        }

        // Include name in the new user document
        const user = new User({ name, email, password });
        await user.save();

        const token = authService.generateToken(user._id);
        return { user, token };
    } catch (error) {
        throw new Error(`Registration failed: ${error.message}`);
    }
    }


  // Login an existing user
  static async loginUser(email, password) {
    try {
        console.log(email)
        // Find user by email
        const user = await User.findOne({ email: email }); // Ensure email is a string
        console.log(user)
        if (!user) throw new Error('Invalid email or password');

        // Log passwords for comparison
        console.log("Entered Password:", password);
        console.log("Stored Hashed Password:", user.password);

        // Check if the provided password matches the stored hashed password
        const isMatch = await user.comparePassword(password);
        console.log(isMatch)
        if (!isMatch) throw new Error('Invalid email or password');

        // Generate JWT token upon successful login
        const token = authService.generateToken(user._id);

        return { user, token };
    } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
    }
    }


  // Generate a JWT token
  static generateToken(userId) {
    const payload = { userId };
    const secretKey = process.env.JWT_SECRET || 'yourSecretKey'; // Use a strong secret key in production

    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
  }

  // Verify a JWT token
  static verifyToken(token) {
    try {
      const secretKey = process.env.JWT_SECRET || 'yourSecretKey';
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  // Get user data by ID
  static async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error('User not found');
      return user;
    } catch (error) {
      throw new Error(`Failed to retrieve user: ${error.message}`);
    }
  }
}

module.exports = authService;
