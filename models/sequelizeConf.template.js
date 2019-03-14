const Sequelize = require('sequelize');
const sequelize = 

module.exports = new Sequelize({
    database: 'turboyums',
    host: 'localhost',
    username: 'root',
    password: 'password',
    dialect: 'mysql',
    port: '3306'
  });
