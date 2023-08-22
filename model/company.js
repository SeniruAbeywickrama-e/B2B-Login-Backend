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
    },
    partnership_Type: {
        type: Sequelize.STRING(30),
    },
    investment_Type: {
        type: Sequelize.STRING(30),
    },
    investment_Type_Description: {
        type: Sequelize.STRING,
    },
    elevator_Pitch: {
        type: Sequelize.STRING,
    },
    partnership_Requirement: {
        type: Sequelize.STRING,
    },
    what_on_Offer: {
        type: Sequelize.STRING,
    },
    investor_type: {
        type: Sequelize.STRING(20),
    },
    is_Sustainable: {
        type: Sequelize.STRING(30),
    },
    number_Of_Employees: {
        type: Sequelize.INTEGER,
    },
    product_Maturity: {
        type: Sequelize.STRING(30),
    },
    product_Description: {
        type: Sequelize.STRING,
    },
    collaterals: {
        type: Sequelize.JSON,
    },
    referrals: {
        type: Sequelize.JSON,
    },
    product_Industry1: {
        type: Sequelize.STRING(30),
    },
    product_Industry2: {
        type: Sequelize.STRING(30),
    },
    product_Industry3: {
        type: Sequelize.STRING(30),
    },
    nature_Of_Business: {
        type: Sequelize.STRING(30),
    },
    company_Industry1: {
        type: Sequelize.STRING(30),
    },
    company_Industry2: {
        type: Sequelize.STRING(30),
    },
    company_Industry3: {
        type: Sequelize.STRING(30),
    },
    business_Process: {
        type: Sequelize.STRING(30),
    },
    company_Products: {
        type: Sequelize.STRING(30),
    },
    company_Resources: {
        type: Sequelize.STRING(30),
    },
    management_Employee: {
        type: Sequelize.STRING(30),
    },
    management_Experience: {
        type: Sequelize.INTEGER,
    },
    technical_Employee: {
        type: Sequelize.STRING(30),
    },
    admin_Employees: {
        type: Sequelize.STRING(30),
    },
    admin_Experience: {
        type: Sequelize.INTEGER,
    },
    marketing_Employees: {
        type: Sequelize.STRING(30),
    },
    marketing_Experience: {
        type: Sequelize.STRING(30),
    },
    other_Hr_Field: {
        type: Sequelize.STRING(30),
    },
    other_Hr_Employee: {
        type: Sequelize.STRING(30),
    },
    other_Hr_Experience: {
        type: Sequelize.INTEGER,
    },
    key_Value_Proposition: {
        type: Sequelize.STRING(30),
    },
    stakeholders: {
        type: Sequelize.JSON,
    },
    company_Collaterals: {
        type: Sequelize.JSON,
    },
    company_Referrals: {
        type: Sequelize.JSON,
    },
})


module.exports = Company;
