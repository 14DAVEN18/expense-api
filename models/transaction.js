const { DataTypes, INTEGER } = require('sequelize');
const { db_connection } = require('../database/connection');

const { User } = require('./user');

const Transaction = db_connection.define('transaction', {
    trns_id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    trns_concept: {
        type: DataTypes.STRING
    },
    trns_amount: {
        type: INTEGER
    },
    trns_type: {
        type: DataTypes.STRING
    },
    trns_date: {
        type: DataTypes.DATE
    },
    user_id: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'user_id'
        }
    }}, {
        freezeTableName: true,
        tableName: 'transaction',
        timestamps: false
    });

module.exports = { Transaction };