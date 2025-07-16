import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const CourseEnrollment = sequelize.define('CourseEnrollment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'students',
                key: 'id'
            }
        },
        course_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'courses',
                key: 'id'
            }
        },
        enrollment_date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
        grade: {
            type: DataTypes.STRING(5),
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('enrolled', 'completed', 'dropped'),
            defaultValue: 'enrolled'
        }
    }, {
        tableName: 'course_enrollments',
        timestamps: true
    });

    return CourseEnrollment;
}; 