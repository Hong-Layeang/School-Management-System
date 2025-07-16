import { sequelize } from '../configs/database.config.js';
import defineUser from './user.models.js';
import defineTeacher from './teacher.models.js';
import defineStudent from './student.models.js';
import defineCourse from './course.models.js';
import defineCourseEnrollment from './courseEnrollment.models.js';

// Initialize models
const User = defineUser(sequelize);
const Teacher = defineTeacher(sequelize);
const Student = defineStudent(sequelize);
const Course = defineCourse(sequelize);
const CourseEnrollment = defineCourseEnrollment(sequelize);

// Define associations
User.hasOne(Teacher, { foreignKey: 'user_id' });
Teacher.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Student, { foreignKey: 'user_id' });
Student.belongsTo(User, { foreignKey: 'user_id' });

Teacher.hasMany(Course, { foreignKey: 'teacher_id' });
Course.belongsTo(Teacher, { foreignKey: 'teacher_id' });

Student.belongsToMany(Course, { through: CourseEnrollment, foreignKey: 'student_id' });
Course.belongsToMany(Student, { through: CourseEnrollment, foreignKey: 'course_id' });

// Sync database (create tables if they don't exist)
const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};

syncDatabase();

export { User, Teacher, Student, Course, CourseEnrollment, sequelize }; 