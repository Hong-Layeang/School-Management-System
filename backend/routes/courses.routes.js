import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import {
  getAllCourses,
  getCourseById,
  createCourse,
} from '../controllers/course.controller.js';

const coursesRoutes = express.Router();

coursesRoutes.use(verifyToken);

coursesRoutes.get('/', getAllCourses);
coursesRoutes.get('/:id', getCourseById);
coursesRoutes.post('/', createCourse);

export default coursesRoutes;
