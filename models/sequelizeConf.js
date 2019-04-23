const Sequelize = require('sequelize');
module.exports = new Sequelize({
    database: 'turboyums',
    host: '192.168.99.100',
    username: 'user',
    password: 'password',
    dialect: 'mysql',
    port: '3306'
  });