import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    try {
        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                error: 'Access denied. No token provided.',
                message: 'Authorization header must start with "Bearer "'
            });
        }

        // Extract token from "Bearer <token>"
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ 
                error: 'Access denied. No token provided.',
                message: 'Token is missing from Authorization header'
            });
        }

        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user information to request object for use in protected routes
        req.user = decoded;
        
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                error: 'Token expired',
                message: 'Your session has expired. Please login again.'
            });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ 
                error: 'Invalid token',
                message: 'The provided token is invalid or malformed.'
            });
        } else {
            return res.status(500).json({ 
                error: 'Token verification failed',
                message: 'An error occurred while verifying your token.'
            });
        }
    }
};