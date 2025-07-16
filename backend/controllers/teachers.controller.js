import { Teacher, User } from '../models/index.js';

export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.findAll({
            include: [{
                model: User,
                attributes: ['name', 'email']
            }]
        });

        const formattedTeachers = teachers.map(teacher => ({
            id: teacher.id,
            name: teacher.User.name,
            subject: teacher.subject,
            email: teacher.User.email,
            phone: teacher.phone,
            experience: teacher.experience,
            education: teacher.education,
            office: teacher.office,
            hireDate: teacher.hire_date
        }));

        res.status(200).json({
            message: 'Teachers retrieved successfully',
            teachers: formattedTeachers,
            total: formattedTeachers.length,
            user: {
                id: req.user.id,
                name: req.user.name
            }
        });
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ error: 'Failed to retrieve teachers' });
    }
};

export const getTeacherById = async (req, res) => {
    try {
        const teacherId = req.params.id;
        
        const teacher = await Teacher.findByPk(teacherId, {
            include: [{
                model: User,
                attributes: ['name', 'email']
            }]
        });

        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        const formattedTeacher = {
            id: teacher.id,
            name: teacher.User.name,
            subject: teacher.subject,
            email: teacher.User.email,
            phone: teacher.phone,
            experience: teacher.experience,
            education: teacher.education,
            office: teacher.office,
            hireDate: teacher.hire_date
        };

        res.status(200).json({
            message: 'Teacher retrieved successfully',
            teacher: formattedTeacher,
            user: {
                id: req.user.id,
                name: req.user.name
            }
        });
    } catch (error) {
        console.error('Error fetching teacher:', error);
        res.status(500).json({ error: 'Failed to retrieve teacher' });
    }
};

export const createTeacher = async (req, res) => {
    try {
        const { name, email, subject, experience, education, office, phone } = req.body;
        
        // First create the user
        const user = await User.create({
            name,
            email,
            password: '$2b$10$rQZ9K8X2Y1L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D1E2F3G4H5I6J', // default password
            role: 'teacher'
        });

        // Then create the teacher record
        const teacher = await Teacher.create({
            user_id: user.id,
            subject,
            experience,
            education,
            office,
            phone,
            hire_date: new Date()
        });

        const newTeacher = await Teacher.findByPk(teacher.id, {
            include: [{
                model: User,
                attributes: ['name', 'email']
            }]
        });

        const formattedTeacher = {
            id: newTeacher.id,
            name: newTeacher.User.name,
            subject: newTeacher.subject,
            email: newTeacher.User.email,
            phone: newTeacher.phone,
            experience: newTeacher.experience,
            education: newTeacher.education,
            office: newTeacher.office,
            hireDate: newTeacher.hire_date
        };

        res.status(201).json({
            message: 'Teacher created successfully',
            teacher: formattedTeacher,
            user: {
                id: req.user.id,
                name: req.user.name
            }
        });
    } catch (error) {
        console.error('Error creating teacher:', error);
        res.status(500).json({ error: 'Failed to create teacher' });
    }
}; 