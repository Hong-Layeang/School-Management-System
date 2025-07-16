/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Student ID
 *         name:
 *           type: string
 *           description: Student full name
 *         grade:
 *           type: string
 *           description: Student grade level
 *         email:
 *           type: string
 *           format: email
 *           description: Student email address
 *         phone:
 *           type: string
 *           description: Student phone number
 *         address:
 *           type: string
 *           description: Student address
 *         enrollmentDate:
 *           type: string
 *           format: date
 *           description: Student enrollment date
 *         parentName:
 *           type: string
 *           description: Parent's name
 *         parentPhone:
 *           type: string
 *           description: Parent's phone number
 *     StudentsResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Success message
 *         students:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Student'
 *         total:
 *           type: integer
 *           description: Total number of students
 *         user:
 *           $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students
 *     description: Retrieve a list of all students (requires JWT authentication)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Students retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StudentsResponse'
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
 * /api/students/{id}:
 *   get:
 *     summary: Get student by ID
 *     description: Retrieve a specific student by their ID (requires JWT authentication)
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 student:
 *                   $ref: '#/components/schemas/Student'
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized - invalid or missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Student not found
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
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     description: Create a new student record (requires JWT authentication)
 *     tags: [Students]
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
 *               - email
 *               - grade
 *             properties:
 *               name:
 *                 type: string
 *                 description: Student's full name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Student's email address
 *               grade:
 *                 type: string
 *                 description: Student's grade level
 *               phone:
 *                 type: string
 *                 description: Student's phone number
 *               address:
 *                 type: string
 *                 description: Student's address
 *               parentName:
 *                 type: string
 *                 description: Parent's name
 *               parentPhone:
 *                 type: string
 *                 description: Parent's phone number
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student created successfully"
 *                 student:
 *                   $ref: '#/components/schemas/Student'
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

