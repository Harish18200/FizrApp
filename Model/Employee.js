const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('employees', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
     qualification: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
     specification: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    organization_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
   
    mobile: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
  
    profile: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    gender: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    deleted_flag: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },

    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,

    },
}, {
    tableName: 'employees',
    timestamps: false,
});


module.exports = Employee;
