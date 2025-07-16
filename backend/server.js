import express from 'express'
import dotenv from 'dotenv'
import registerRoutes from './routes/register.routes.js';
import loginRoutes from './routes/login.routes.js';
import protectedRoutes from './routes/protected.routes.js';
import usersRoutes from './routes/users.routes.js';
import studentsRoutes from './routes/students.routes.js';
import teachersRoutes from './routes/teachers.routes.js';
import coursesRoutes from './routes/courses.routes.js';
import cors from 'cors'
import './models/index.js'; // Initialize database and models
import { serveSwagger, setupSwagger } from './configs/swagger.config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/docs', serveSwagger, setupSwagger);

// Public routes (no authentication required)
app.use('/api/login', loginRoutes);
app.use('/api/register', registerRoutes);

// Protected routes (JWT authentication required)
app.use('/api/protected', protectedRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/courses', coursesRoutes);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));