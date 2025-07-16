import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';

const protectedRoutes = express.Router();

// Apply JWT verification middleware to all routes in this router
protectedRoutes.use(verifyToken);

// Example protected route - get user profile
protectedRoutes.get('/profile', (req, res) => {
    try {
        // req.user contains the decoded JWT payload
        res.status(200).json({
            message: 'Access granted to protected route',
            user: {
                id: req.user.id,
                name: req.user.name
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Example protected route - get user dashboard
protectedRoutes.get('/dashboard', (req, res) => {
    try {
        res.status(200).json({
            message: 'Dashboard data retrieved successfully',
            user: {
                id: req.user.id,
                name: req.user.name
            },
            dashboard: {
                totalStudents: 150,
                totalTeachers: 25,
                totalCourses: 12
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default protectedRoutes; 