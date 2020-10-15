const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete','root','coderslab',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;