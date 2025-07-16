import { Course, Teacher, User, CourseEnrollment } from '../models/index.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [{
        model: Teacher,
        include: [{ model: User, attributes: ['name'] }]
      }]
    });

    const formattedCourses = await Promise.all(courses.map(async (course) => {
      const enrolledStudents = await CourseEnrollment.count({
        where: { course_id: course.id, status: 'enrolled' }
      });

      return {
        id: course.id,
        name: course.name,
        teacher: course.Teacher?.User?.name || 'Unassigned',
        students: enrolledStudents,
        credits: course.credits,
        schedule: course.schedule,
        room: course.room,
        description: course.description,
        prerequisites: course.prerequisites,
        maxStudents: course.max_students,
        createdDate: course.created_at
      };
    }));

    res.status(200).json({
      message: 'Courses retrieved successfully',
      courses: formattedCourses,
      total: formattedCourses.length,
      user: {
        id: req.user.id,
        name: req.user.name
      }
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to retrieve courses' });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findByPk(courseId, {
      include: [{
        model: Teacher,
        include: [{ model: User, attributes: ['name'] }]
      }]
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const enrolledStudents = await CourseEnrollment.count({
      where: { course_id: course.id, status: 'enrolled' }
    });

    const formattedCourse = {
      id: course.id,
      name: course.name,
      teacher: course.Teacher?.User?.name || 'Unassigned',
      students: enrolledStudents,
      credits: course.credits,
      schedule: course.schedule,
      room: course.room,
      description: course.description,
      prerequisites: course.prerequisites,
      maxStudents: course.max_students,
      createdDate: course.created_at
    };

    res.status(200).json({
      message: 'Course retrieved successfully',
      course: formattedCourse,
      user: {
        id: req.user.id,
        name: req.user.name
      }
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to retrieve course' });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { name, teacherId, credits, schedule, room, description, prerequisites, maxStudents } = req.body;

    const course = await Course.create({
      name,
      teacher_id: teacherId,
      credits,
      schedule,
      room,
      description,
      prerequisites,
      max_students: maxStudents
    });

    const newCourse = await Course.findByPk(course.id, {
      include: [{
        model: Teacher,
        include: [{ model: User, attributes: ['name'] }]
      }]
    });

    const formattedCourse = {
      id: newCourse.id,
      name: newCourse.name,
      teacher: newCourse.Teacher?.User?.name || 'Unassigned',
      students: 0,
      credits: newCourse.credits,
      schedule: newCourse.schedule,
      room: newCourse.room,
      description: newCourse.description,
      prerequisites: newCourse.prerequisites,
      maxStudents: newCourse.max_students,
      createdDate: newCourse.created_at
    };

    res.status(201).json({
      message: 'Course created successfully',
      course: formattedCourse,
      user: {
        id: req.user.id,
        name: req.user.name
      }
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
};
