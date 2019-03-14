const Sequelize = require('sequelize');
const sequelize = 

module.exports = new Sequelize({
    database: 'turboyums',
    host: '192.168.99.100',
    username: 'root',
    password: 'password',
    dialect: 'mysql',
    port: '3306'
  });
