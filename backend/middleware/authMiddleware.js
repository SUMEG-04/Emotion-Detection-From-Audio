// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided, authorization denied' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token after 'Bearer '

    try {
        // Verify the token and decode it
        const secretKey = process.env.JWT_SECRET || 'yourSecretKey'; // Use a strong secret in production
        const decoded = jwt.verify(token, secretKey);

        // Attach user information to request object as `_id`
        req.user = { _id: decoded.userId }; // Assuming the token payload contains `userId`

        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ error: 'Token is not valid, authorization denied' });
    }
};

module.exports = authMiddleware;


module.exports = authMiddleware;
