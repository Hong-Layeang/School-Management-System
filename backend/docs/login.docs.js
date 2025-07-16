/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate user with email and password, return JWT token
 *     tags: [Authentication]
 *     security: []  # No token required for login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             email: "john@example.com"
 *             rawPassword: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               message: "Login successful"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjM0NTY3ODkwLCJleHAiOjE2MzQ1NzE0OTB9.example"
 *               user:
 *                 id: 1
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 role: "user"
 *                 createdAt: "2024-01-01T00:00:00.000Z"
 *       401:
 *         description: Unauthorized - invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
