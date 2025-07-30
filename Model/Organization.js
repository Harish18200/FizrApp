const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Organization = sequelize.define('organizations', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    business_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    location: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    proprietor_name: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    contact: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    gst_no: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    pan_no: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    logo_image: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    banner_image: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
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
    tableName: 'organizations',
    timestamps: false,
});


module.exports = Organization;
