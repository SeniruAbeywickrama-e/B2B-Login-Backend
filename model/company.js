const Sequelize = require('sequelize');
const sequelize = require('../db');

const Company = sequelize.define('company', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date_Of_Incorporation: {
        type: Sequelize.DATE,
        allowNull: false
    },
    partnership_Type: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    investment_Type: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    investment_Type_Description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    elevator_Pitch: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    partnership_Requirement: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    what_on_Offer: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    investor_type: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    is_Sustainable: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    number_Of_Employees: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    product_Maturity: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    product_Description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    collaterals: {
        type: Sequelize.JSON,
        allowNull: false
    },
    referrals: {
        type: Sequelize.JSON,
        allowNull: false
    },
    product_Industry1: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    product_Industry2: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    product_Industry3: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    nature_Of_Business: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    company_Industry1: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    company_Industry2: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    company_Industry3: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    business_Process: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    company_Products: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    company_Resources: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    management_Employee: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    management_Experience: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    technical_Employee: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    admin_Employees: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    admin_Experience: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    marketing_Employees: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    marketing_Experience: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    other_Hr_Field: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    other_Hr_Employee: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    other_Hr_Experience: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    key_Value_Proposition: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    stakeholders: {
        type: Sequelize.JSON,
        allowNull: false
    },
    company_Collaterals: {
        type: Sequelize.JSON,
        allowNull: false
    },
    company_Referrals: {
        type: Sequelize.JSON,
        allowNull: false
    },
})


module.exports = Company;
