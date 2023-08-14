const Sequelize = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('company', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    contact: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})

module.exports = User;
