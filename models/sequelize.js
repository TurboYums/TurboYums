const config = require('../config.json');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

module.exports = new Sequelize({
    database: config.mysql.database || 'turboyums',
    host: config.mysql.host || 'localhost',
    username: config.mysql.username || 'root',
    password: config.mysql.password || 'password',
    dialect: config.mysql.dialect || 'mysql',
    port: config.mysql.port || '3306',
    logging: false
  });
