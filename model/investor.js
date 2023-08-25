const Sequelize = require('sequelize');
const sequelize = require('../db');

const Investor = sequelize.define('investors', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    first_name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    country: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    address: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    company_role: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    total_employees: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    assets_value: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    investor_type: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    investor_type_description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    investment_type: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    investment_type_description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    investment_industry_preferences1: {
        type: Sequelize.STRING,
        allowNull: false
    },
    investment_industry_preferences2: {
        type: Sequelize.STRING,
        allowNull: true
    },
    investment_industry_preferences3: {
        type: Sequelize.STRING,
        allowNull: true
    },
    investment_industry_preferences4: {
        type: Sequelize.STRING,
        allowNull: true
    },
})


module.exports = Investor;
