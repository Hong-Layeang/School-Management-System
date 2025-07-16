import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { User } from '../models/index.js';

const usersRoutes = express.Router();

// Apply JWT verification middleware to all user routes
usersRoutes.use(verifyToken);

// GET /api/users - Get all users (admin only)
usersRoutes.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'role', 'createdAt']
        });

        res.status(200).json({
            message: 'Users retrieved successfully',
            users: users,
            total: users.length,
            user: {
                id: req.user.id,
                name: req.user.name
            }
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
});

// GET /api/users/:id - Get specific user
usersRoutes.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'role', 'createdAt']
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: 'User retrieved successfully',
            user: user,
            requestingUser: {
                id: req.user.id,
                name: req.user.name
            }
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
});

// GET /api/users/profile - Get current user profile
usersRoutes.get('/profile/me', async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'name', 'email', 'role', 'createdAt']
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: 'Profile retrieved successfully',
            user: user
        });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to retrieve profile' });
    }
});

export default usersRoutes; 