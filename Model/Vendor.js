const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Vendor = sequelize.define('vendors', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    last_name: {
        type: DataTypes.TEXT,
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
    tableName: 'vendors',
    timestamps: false,
});


module.exports = Vendor;
