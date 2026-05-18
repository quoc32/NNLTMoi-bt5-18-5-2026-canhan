const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Course = sequelize.define('Course', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    instructor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    level: {
        type: DataTypes.ENUM('Mới bắt đầu', 'Trung cấp', 'Chuyên gia'),
        defaultValue: 'Mới bắt đầu',
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
    discount: {
        type: DataTypes.INTEGER, // percentage
        defaultValue: 0,
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    studentCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    slots: {
        type: DataTypes.INTEGER, // total slots
        allowNull: true,
    },
    availableSlots: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    trailerUrl: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    isBestSeller: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    flashSaleEnd: {
        type: DataTypes.DATE,
        allowNull: true,
    }
});

module.exports = Course;
