const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  database: 'turboyums',
  host: '192.168.99.100',
  username: 'root',
  password: 'password',
  dialect: 'mysql',
  port: '3306'
});

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {

    username: Sequelize.STRING,
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    password: Sequelize.STRING,
    rewardpoints: Sequelize.INTEGER,
    accountType: Sequelize.INTEGER,
    addressId: Sequelize.INTEGER
  
  })
}
