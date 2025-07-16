import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Student = sequelize.define('Student', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        grade: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        enrollment_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        parent_name: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        parent_phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        }
    }, {
        tableName: 'students',
        timestamps: true
    });

    return Student;
}; 