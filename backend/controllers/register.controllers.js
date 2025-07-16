import { User } from '../models/index.js';
import hashPassword from '../node.bcrypt.js';

export async function register(req, res) {
  const { name, email, rawPassword } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Hash the password using bcrypt
    const hashedPassword = await hashPassword(rawPassword);

    // Create new user with default role
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'user' // Default role for new registrations
    });

    if (newUser) {
      res.status(201).json({
        message: "User created successfully!",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          createdAt: newUser.createdAt
        }
      });
    }
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: "Failed to create user" });
  }
}
