/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account with name, email, and password
 *     tags: [Authentication]
 *     security: [] # Public route - no authentication required
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *           example:
 *             name: "John Doe"
 *             email: "john@example.com"
 *             rawPassword: "password123"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *             example:
 *               message: "User created successfully!"
 *               user:
 *                 id: 1
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 role: "user"
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               error: "User with this email already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
