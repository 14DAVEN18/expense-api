const { Sequelize } = require("Sequelize");

const db_connection = new Sequelize (
    'expense_tracker',
    'root',
    '', {
        host: 'localhost',
        dialect: "mysql"
    });

module.exports = {
    db_connection
};