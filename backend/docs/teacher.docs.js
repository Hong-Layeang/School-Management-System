/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Teacher ID
 *         name:
 *           type: string
 *           description: Teacher full name
 *         subject:
 *           type: string
 *           description: Subject taught by the teacher
 *         email:
 *           type: string
 *           format: email
 *           description: Teacher email address
 *         phone:
 *           type: string
 *           description: Teacher phone number
 *         experience:
 *           type: string
 *           description: Years of teaching experience
 *         education:
 *           type: string
 *           description: Teacher's educational background
 *         office:
 *           type: string
 *           description: Teacher's office location
 *         hireDate:
 *           type: string
 *           format: date
 *           description: Date when teacher was hired
 *     TeachersResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Success message
 *         teachers:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Teacher'
 *         total:
 *           type: integer
 *           description: Total number of teachers
 *         user:
 *           $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     summary: Get all teachers
 *     description: Retrieve a list of all teachers (requires JWT authentication)
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Teachers retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeachersResponse'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/teachers/{id}:
 *   get:
 *     summary: Get teacher by ID
 *     description: Retrieve a specific teacher by their ID (requires JWT authentication)
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Teacher retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 teacher:
 *                   $ref: '#/components/schemas/Teacher'
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Teacher not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/teachers:
 *   post:
 *     summary: Create a new teacher
 *     description: Create a new teacher record (requires JWT authentication)
 *     tags: [Teachers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - subject
 *               - email
 *               - experience
 *             properties:
 *               name:
 *                 type: string
 *                 description: Teacher's full name
 *               subject:
 *                 type: string
 *                 description: Subject taught by the teacher
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Teacher's email address
 *               experience:
 *                 type: string
 *                 description: Years of teaching experience
 *               education:
 *                 type: string
 *                 description: Teacher's educational background
 *               office:
 *                 type: string
 *                 description: Teacher's office location
 *               phone:
 *                 type: string
 *                 description: Teacher's phone number
 *     responses:
 *       201:
 *         description: Teacher created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Teacher created successfully"
 *                 teacher:
 *                   $ref: '#/components/schemas/Teacher'
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */