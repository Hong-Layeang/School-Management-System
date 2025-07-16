import { Student, User } from '../models/index.js';

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll({
            include: [{
                model: User,
                attributes: ['name', 'email']
            }]
        });

        const formattedStudents = students.map(student => ({
            id: student.id,
            name: student.User.name,
            grade: student.grade,
            email: student.User.email,
            phone: student.phone,
            address: student.address,
            enrollmentDate: student.enrollment_date,
            parentName: student.parent_name,
            parentPhone: student.parent_phone
        }));

        res.status(200).json({
            message: 'Students retrieved successfully',
            students: formattedStudents,
            total: formattedStudents.length,
            user: {
                id: req.user.id,
                name: req.user.name
            }
        });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Failed to retrieve students' });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        
        const student = await Student.findByPk(studentId, {
            include: [{
                model: User,
                attributes: ['name', 'email']
            }]
        });

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        const formattedStudent = {
            id: student.id,
            name: student.User.name,
            grade: student.grade,
            email: student.User.email,
            phone: student.phone,
            address: student.address,
            enrollmentDate: student.enrollment_date,
            parentName: student.parent_name,
            parentPhone: student.parent_phone
        };

        res.status(200).json({
            message: 'Student retrieved successfully',
            student: formattedStudent,
            user: {
                id: req.user.id,
                name: req.user.name
            }
        });
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ error: 'Failed to retrieve student' });
    }
};

export const createStudent = async (req, res) => {
    try {
        const { name, email, grade, phone, address, parentName, parentPhone } = req.body;
        
        // First create the user
        const user = await User.create({
            name,
            email,
            password: '$2b$10$rQZ9K8X2Y1L3M4N5O6P7Q8R9S0T1U2V3W4X5Y6Z7A8B9C0D1E2F3G4H5I6J', // default password
            role: 'student'
        });

        // Then create the student record
        const student = await Student.create({
            user_id: user.id,
            grade,
            phone,
            address,
            enrollment_date: new Date(),
            parent_name: parentName,
            parent_phone: parentPhone
        });

        const newStudent = await Student.findByPk(student.id, {
            include: [{
                model: User,
                attributes: ['name', 'email']
            }]
        });

        const formattedStudent = {
            id: newStudent.id,
            name: newStudent.User.name,
            grade: newStudent.grade,
            email: newStudent.User.email,
            phone: newStudent.phone,
            address: newStudent.address,
            enrollmentDate: newStudent.enrollment_date,
            parentName: newStudent.parent_name,
            parentPhone: newStudent.parent_phone
        };

        res.status(201).json({
            message: 'Student created successfully',
            student: formattedStudent,
            user: {
                id: req.user.id,
                name: req.user.name
            }
        });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Failed to create student' });
    }
}; 