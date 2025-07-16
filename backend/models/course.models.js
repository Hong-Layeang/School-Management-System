import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Course = sequelize.define('Course', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        teacher_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'teachers',
                key: 'id'
            }
        },
        credits: {
            type: DataTypes.INTEGER,
            defaultValue: 3
        },
        schedule: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        room: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        prerequisites: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        max_students: {
            type: DataTypes.INTEGER,
            defaultValue: 30
        }
    }, {
        tableName: 'courses',
        timestamps: true
    });

    return Course;
}; 