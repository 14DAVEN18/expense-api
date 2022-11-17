const { DataTypes } = require('sequelize');
const { db_connection } = require('../database/connection');

// Reference Models - Foreign keys
const { Authentication } = require('./authentication');

const User = db_connection.define('user', {
    user_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    user_email_address: {
        type: DataTypes.STRING
    },
    user_username: {
        type: DataTypes.STRING
    },
    auth_id: {
        type: DataTypes.STRING,
        references: {
            model: Authentication,
            key: 'auth_id'
        }
    }}, {
        freezeTableName: true,
        tableName: 'user',
        timestamps: false
    });

module.exports = { User };