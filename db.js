const {Sequelize} = require('sequelize')

const data = new Sequelize('b2b_test', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = data;
