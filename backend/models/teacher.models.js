import { DataTypes } from 'sequelize';

export default (sequelize) => {
    const Teacher = sequelize.define('Teacher', {
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
        subject: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        experience: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        education: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        office: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        hire_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    }, {
        tableName: 'teachers',
        timestamps: true
    });

    return Teacher;
}; 