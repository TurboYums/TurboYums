const Sequelize = require('sequelize');
const sequelize = require('./sequelizeConf.js');

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
