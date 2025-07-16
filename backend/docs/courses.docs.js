/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       properties:
 *         id: { type: integer, description: Course ID }
 *         name: { type: string, description: Course name }
 *         teacher: { type: string, description: Teacher assigned to the course }
 *         students: { type: integer, description: Number of students enrolled }
 *         credits: { type: integer, description: Number of credits for the course }
 *         schedule: { type: string, description: Course schedule }
 *         room: { type: string, description: Classroom location }
 *         description: { type: string, description: Course description }
 *         prerequisites: { type: string, description: Required prerequisites }
 *         maxStudents: { type: integer, description: Maximum number of students allowed }
 *         createdDate: { type: string, format: date, description: Date when course was created }

 *     CoursesResponse:
 *       type: object
 *       properties:
 *         message: { type: string, description: Success message }
 *         courses:
 *           type: array
 *           items: { $ref: '#/components/schemas/Course' }
 *         total: { type: integer, description: Total number of courses }
 *         user: { $ref: '#/components/schemas/User' }
 */

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CoursesResponse'
 *             example:
 *               message: "Courses retrieved successfully"
 *               courses:
 *                 - id: 1
 *                   name: "Advanced Mathematics"
 *                   teacher: "Dr. Sarah Miller"
 *                   students: 25
 *                   credits: 4
 *                   schedule: "Mon/Wed 9:00 AM"
 *               total: 5
 *               user:
 *                 id: 1
 *                 name: "John Doe"
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       500:
 *         description: Internal server error

 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, teacherId, credits, schedule]
 *             properties:
 *               name: { type: string }
 *               teacherId: { type: integer }
 *               credits: { type: integer }
 *               schedule: { type: string }
 *               room: { type: string }
 *               description: { type: string }
 *               prerequisites: { type: string }
 *               maxStudents: { type: integer }
 *     responses:
 *       201:
 *         description: Course created successfully
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Courses]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string }
 *                 course: { $ref: '#/components/schemas/Course' }
 *                 user: { $ref: '#/components/schemas/User' }
 *       401:
 *         description: Unauthorized - invalid or missing token
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
